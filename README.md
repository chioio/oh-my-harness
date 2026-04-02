# @chioio/oh-my-harness

Turn `AGENTS.md` into an agent-usable harness.

`@chioio/oh-my-harness` is my personal harness engineering CLI and workspace package.
It is the personal package that can later be refined and extracted into more public packages such as `agents-md-harness`.

It gives a project a structured instruction layer:

- a root `AGENTS.md` entrypoint
- a modular `_harness/` directory
- optional `AGENTS.local.md` for local/private augmentation
- setup placeholders for project-specific completion

## Install / run

Use with `npx`:

```bash
npx @chioio/oh-my-harness setup
```

Or install globally:

```bash
npm install -g @chioio/oh-my-harness
oh-my-harness setup
```

Installed command aliases:

- `oh-my-harness`
- `agents-md-harness`

## Commands

### `setup`

Initialize the harness into a target directory.

```bash
oh-my-harness setup
oh-my-harness setup my-project
oh-my-harness setup my-project --force
```

### `update`

Refresh previously managed harness files in a target directory.

```bash
oh-my-harness update
oh-my-harness update my-project
```

### `--committable`

By default, setup creates a private local layer and ignores it from git.

```bash
oh-my-harness setup my-project --committable
oh-my-harness update my-project --committable
```

Behavior:

- default mode
  - generates `AGENTS.md`
  - generates `AGENTS.local.md`
  - generates `_harness/`
  - ignores `AGENTS.local.md` and `_harness/`
- `--committable`
  - generates `AGENTS.md`
  - generates `_harness/`
  - skips `AGENTS.local.md`
  - keeps `_harness/` committable
  - still ignores `AGENTS.local.md`

## Why

Most `AGENTS.md` files eventually become one long flat document.
That makes them harder for agents to route, load selectively, and maintain over time.

This project keeps:

- `AGENTS.md` short as the entrypoint
- `_harness/` modular
- local vs shared guidance explicit
- setup/update behavior repeatable

## Local development

```bash
pnpm install
pnpm format
pnpm test
```

## Release flow

This repo uses Changesets.

- Add a changeset for user-facing changes
- Merge to `main`
- GitHub Actions opens or updates a release PR
- Merging the release PR publishes to npm and creates the git tag / GitHub release

Trusted Publishing should point to:

- owner/user: `chioio`
- repository: `oh-my-harness`
- workflow filename: `publish.yml`

## License

MIT
