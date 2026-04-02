const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const BIN = path.join(__dirname, "..", "bin", "agents-md-harness.js");

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "agents-md-harness-"));
}

function run(args, cwd) {
  execFileSync(process.execPath, [BIN, ...args], {
    cwd,
    stdio: "pipe",
  });
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

test("setup 默认输出私有模式", () => {
  const targetDir = makeTempDir();

  run(["setup", targetDir], path.dirname(BIN));

  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.md")), true);
  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.local.md")), true);
  assert.equal(fs.existsSync(path.join(targetDir, "_harness")), true);

  const gitignore = read(path.join(targetDir, ".gitignore"));
  assert.match(gitignore, /AGENTS\.local\.md/);
  assert.match(gitignore, /_harness\//);

  const manifest = JSON.parse(read(path.join(targetDir, ".agents-md-harness-manifest.json")));
  assert.equal(manifest.mode, "private");
  assert.equal(manifest.files.includes("AGENTS.local.md"), true);
});

test("setup --committable 不生成 AGENTS.local.md 且不忽略 _harness/", () => {
  const targetDir = makeTempDir();

  run(["setup", targetDir, "--committable"], path.dirname(BIN));

  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.md")), true);
  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.local.md")), false);
  assert.equal(fs.existsSync(path.join(targetDir, "_harness")), true);

  const gitignore = read(path.join(targetDir, ".gitignore"));
  assert.match(gitignore, /AGENTS\.local\.md/);
  assert.doesNotMatch(gitignore, /^_harness\/$/m);

  const manifest = JSON.parse(read(path.join(targetDir, ".agents-md-harness-manifest.json")));
  assert.equal(manifest.mode, "committable");
  assert.equal(manifest.files.includes("AGENTS.local.md"), false);
});

test("update --committable 可把已有私有模式切换为可提交模式", () => {
  const targetDir = makeTempDir();

  run(["setup", targetDir], path.dirname(BIN));
  run(["update", targetDir, "--committable"], path.dirname(BIN));

  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.local.md")), false);

  const gitignore = read(path.join(targetDir, ".gitignore"));
  assert.doesNotMatch(gitignore, /^_harness\/$/m);

  const manifest = JSON.parse(read(path.join(targetDir, ".agents-md-harness-manifest.json")));
  assert.equal(manifest.mode, "committable");
});
