# AGENTS.local.md

这是当前项目的本地私有增强入口，不应提交到远端仓库。

## 作用

- 为当前操作者提供私有 harness 增强层
- 将 agent 路由到本地 `_harness/`
- 承载不适合同步给团队的个人工作环境规则与工具能力

## 路由顺序

在读取完根 `AGENTS.md` 后，如果本文件存在，agent 必须继续读取：

- `_harness/readme.md`
- `_harness/routing.md`
- `_harness/rules.md`
- `_harness/workflow.md`
- `_harness/memory/project.md`

根据任务需要最小化加载，不要求一次性读取全部文件。

## 补充占位

如果项目仍存在本地补充占位，说明 `_harness/` 还需要继续按当前项目实际情况补全。

agent 发现占位后应继续完成本地补充流程。
