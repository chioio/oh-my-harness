# AGENTS.md

This repository uses an AGENTS.md harness system.

## Repository split

This repository has two harness layers:

1. Root `AGENTS.md` + root `_harness/`
   - used to maintain this repository itself
2. `kit/`
   - the setup output source for target projects
   - contains the harness files that `agents-md-harness setup` writes into a real project

## How to use this file

Read this file first, then route into the root `_harness/` for work on this repository itself.

If you are working on setup output behavior, also inspect `kit/` because it defines what target projects will receive.

## Routing

- Project overview → `_harness/readme.md`
- Task-to-file routing → `_harness/routing.md`
- Project structure lookup → `_harness/catalog.md`
- Hard rules and constraints → `_harness/rules.md`
- Execution procedures → `_harness/workflow.md`
- Long-term memory → `_harness/memory/project.md`

## Loading Principles

- Prefer minimum necessary reads
- Route before loading
- Separate repo-self harness concerns from `kit/` output concerns
- Combine multiple files only when truly needed

## kit responsibilities

`kit/` is not a generic template directory.
It is the first-class output source for setup into target projects.

Target projects should receive:

- shared `AGENTS.md`
- private `AGENTS.local.md`
- private `_harness/`
- a supplementation placeholder if local harness completion is still required

## Evolution

This harness evolves with the project:

- Core harness files can be updated through user-approved proposals
- `kit/` should evolve toward “kit 即系统”
- When harness is insufficient, propose changes and wait for approval
- See `_harness/rules.md` for evolution rules and risk levels
