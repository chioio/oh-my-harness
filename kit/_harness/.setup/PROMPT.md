# Setup Prompt

你正在为当前项目补充本地私有 harness。

## 背景

当前项目已经有共享 `AGENTS.md`，但本地私有层 `AGENTS.local.md` 与 `_harness/` 仍需要结合当前项目情况继续补全。

## 你的任务

通过简短对话理解当前项目，并补全本地 `_harness/` 中的核心文件：

- `_harness/readme.md`
- `_harness/routing.md`
- `_harness/catalog.md`
- `_harness/rules.md`
- `_harness/workflow.md`
- `_harness/memory/project.md`

## 原则

- 优先最小可用
- 优先中文，除非用户另有要求
- 先理解项目，再生成内容
- 不要把共享团队规则和个人私有增强混在一起
- 所有工具定义都应留在 `_harness/` 内
- 如果信息不足，应继续提问而不是假设
