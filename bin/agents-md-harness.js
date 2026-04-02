#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const pkg = require("../package.json");

const VERSION = pkg.version;
const ROOT = path.resolve(__dirname, "..");
const KIT_ROOT = path.join(ROOT, "kit");
const MANIFEST_FILE = ".agents-md-harness-manifest.json";
const IGNORE_BLOCK_START = "# >>> agents-md-harness";
const IGNORE_BLOCK_END = "# <<< agents-md-harness";
const MODES = {
  PRIVATE: "private",
  COMMITTABLE: "committable",
};
const MODE_IGNORE_ENTRIES = {
  [MODES.PRIVATE]: ["AGENTS.local.md", "_harness/"],
  [MODES.COMMITTABLE]: ["AGENTS.local.md"],
};

function printHelp() {
  console.log(`agents-md-harness v${VERSION}

Usage:
  agents-md-harness setup [targetDir] [--force] [--committable]
  agents-md-harness update [targetDir] [--committable]
  agents-md-harness init [targetDir] [--force] [--committable]   # compatibility alias
  agents-md-harness --help

Commands:
  setup      Initialize the kit-based AGENTS.md harness into targetDir
  update     Refresh managed harness files in targetDir
  init       Compatibility alias for setup

Options:
  --force         Overwrite existing files in the target directory
  --committable   Generate a committable harness layout:
                  keep AGENTS.md + _harness/, skip AGENTS.local.md,
                  and stop ignoring _harness/
  -h, --help Show help
`);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stats = fs.lstatSync(targetPath);
  if (stats.isDirectory()) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    return;
  }

  fs.unlinkSync(targetPath);
}

function removeEmptyParentDirs(rootDir, targetPath) {
  let current = path.dirname(targetPath);
  const resolvedRoot = path.resolve(rootDir);

  while (current.startsWith(resolvedRoot) && current !== resolvedRoot) {
    if (!fs.existsSync(current)) {
      current = path.dirname(current);
      continue;
    }

    if (fs.readdirSync(current).length > 0) {
      break;
    }

    fs.rmdirSync(current);
    current = path.dirname(current);
  }
}

function listKitFiles(srcDir, baseDir = srcDir) {
  const files = [];

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listKitFiles(srcPath, baseDir));
      continue;
    }

    files.push(path.relative(baseDir, srcPath));
  }

  return files.sort();
}

function readManifest(targetDir) {
  const manifestPath = path.join(targetDir, MANIFEST_FILE);
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function writeManifest(targetDir, files, mode) {
  const manifestPath = path.join(targetDir, MANIFEST_FILE);
  const payload = {
    version: VERSION,
    mode,
    generatedAt: new Date().toISOString(),
    files,
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(payload, null, 2)}\n`);
}

function pruneManagedFiles(targetDir, previousManifest, currentFiles) {
  if (!previousManifest || !Array.isArray(previousManifest.files)) {
    return;
  }

  const currentSet = new Set(currentFiles);
  for (const relativePath of previousManifest.files) {
    if (currentSet.has(relativePath)) {
      continue;
    }

    const targetPath = path.join(targetDir, relativePath);
    removePath(targetPath);
    removeEmptyParentDirs(targetDir, targetPath);
  }
}

function copyManagedFiles(srcDir, destDir, files, force) {
  ensureDir(destDir);

  for (const relativePath of files) {
    const srcPath = path.join(srcDir, relativePath);
    const destPath = path.join(destDir, relativePath);

    ensureDir(path.dirname(destPath));

    if (fs.existsSync(destPath) && !force) {
      throw new Error(`Refusing to overwrite existing file: ${destPath}`);
    }

    fs.copyFileSync(srcPath, destPath);
  }
}

function stripManagedIgnoreContent(text) {
  let next = text.replace(
    new RegExp(`${IGNORE_BLOCK_START}[\\s\\S]*?${IGNORE_BLOCK_END}\\n?`, "g"),
    "",
  );

  next = next
    .split(/\r?\n/)
    .filter(
      (line) =>
        line !== "# agents-md-harness private files" &&
        line !== "AGENTS.local.md" &&
        line !== "_harness/",
    )
    .join("\n");

  return next.replace(/\n{3,}/g, "\n\n").replace(/^\n+/, "");
}

function ensureIgnoreEntries(targetDir, mode) {
  const gitignorePath = path.join(targetDir, ".gitignore");
  const existing = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, "utf8") : "";
  const cleaned = stripManagedIgnoreContent(existing).trimEnd();
  const entries = MODE_IGNORE_ENTRIES[mode] || MODE_IGNORE_ENTRIES[MODES.PRIVATE];
  const sections = [];

  if (cleaned.length > 0) {
    sections.push(cleaned);
  }

  if (entries.length > 0) {
    sections.push([IGNORE_BLOCK_START, ...entries, IGNORE_BLOCK_END].join("\n"));
  }

  const next = sections.join("\n\n");
  fs.writeFileSync(gitignorePath, next.length > 0 ? `${next}\n` : "");
}

function resolveMode(args, previousManifest) {
  if (args.includes("--committable")) {
    return MODES.COMMITTABLE;
  }

  if (previousManifest && previousManifest.mode === MODES.COMMITTABLE) {
    return MODES.COMMITTABLE;
  }

  return MODES.PRIVATE;
}

function listManagedKitFiles(mode) {
  const files = listKitFiles(KIT_ROOT);

  if (mode === MODES.COMMITTABLE) {
    return files.filter((relativePath) => relativePath !== "AGENTS.local.md");
  }

  return files;
}

function runInit(targetArg, force, mode) {
  const targetDir = path.resolve(process.cwd(), targetArg || ".");
  ensureDir(targetDir);
  const kitFiles = listManagedKitFiles(mode);
  const previousManifest = force ? readManifest(targetDir) : null;

  if (force) {
    pruneManagedFiles(targetDir, previousManifest, kitFiles);
  }

  copyManagedFiles(KIT_ROOT, targetDir, kitFiles, force);
  ensureIgnoreEntries(targetDir, mode);
  writeManifest(targetDir, kitFiles, mode);

  console.log(`✓ ${force ? "Updated" : "Initialized"} kit-based AGENTS.md harness into ${targetDir}

Mode: ${mode}

Next steps:
1. cd ${path.relative(process.cwd(), targetDir) || "."}
2. Read AGENTS.md first
3. If the project contains setup placeholders, ask your AI agent to continue the local harness supplementation
`);
}

function main(argv) {
  const args = argv.slice(2);
  const help = args.includes("--help") || args.includes("-h");

  if (help || args.length === 0) {
    printHelp();
    return;
  }

  const command = args[0];

  if (command !== "setup" && command !== "init" && command !== "update") {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const targetArg = args.find((arg, index) => index > 0 && !arg.startsWith("-")) || ".";
  const previousManifest = readManifest(path.resolve(process.cwd(), targetArg));
  const force = command === "update" || args.includes("--force");
  const mode = resolveMode(args, previousManifest);

  try {
    runInit(targetArg, force, mode);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main(process.argv);
