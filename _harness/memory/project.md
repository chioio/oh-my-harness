---
role: agent-memory
scope: project
---

# 项目长期记忆

## 项目定位

- 本项目是个人 harness engineering CLI / workspace
- 项目本身就是 `agents-md-harness`
- 目标是持续演化个人 harness 工作环境，并通过 `setup` 落地到实际项目
- 需要作为 npm 包发布

## 已确认结构原则

- setup 输出源目录命名为 `kit/`
- `kit/` 不是普通 template，而是 setup 到目标项目的实际 harness 工具包来源
- 项目本身的 `_harness/` 用于维护本仓库自身
- 除根 `AGENTS.md` 外，所有工具定义都应放在 `_harness/`

## 已确认 setup 落地原则

当 harness 落地到实际项目时：

- `AGENTS.md` 应存在并可提交到远端仓库
- 默认模式下 `AGENTS.local.md` 应由 setup 生成，作为本地私有增强层
- 默认模式下 `_harness/` 应作为本地私有 harness 目录存在于目标项目中
- 默认模式下目标项目应忽略：
  - `AGENTS.local.md`
  - `_harness/`
- 若 setup 启用可提交 harness 模式：
  - 可不生成 `AGENTS.local.md`
  - `_harness/` 可作为共享 harness 被提交
- 目标项目中的 `AGENTS.md` 需要追加规则：
  - 若 `AGENTS.local.md` 存在，agent 必须继续解析它
  - 若 `AGENTS.local.md` 不存在但 `_harness/` 存在，agent 也必须继续解析共享 `_harness/`
- setup 后应存在补充占位；若 agent 检测到该占位存在，应继续完成项目内补充

## 已确认行为原则

- 默认使用中文
- agent 默认先分析指示、查阅资料、给出建议与结论
- 决策性质改动需要确认
- 常规读写文件、分析 harness 结构、更新文档、执行项目相关命令可直接进行

## 已确认使用模式

- 以单 agent 为主
- 不依赖外部 roles / skills 体系
- 目标是做到“kit 即系统”

## 已确认轻量角色

- `dev-builder`
- `dev-researcher`
- `table-operator`
- `harness-maintainer`
