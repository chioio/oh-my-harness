# 路由原则

agent 在本项目中应先做任务分类，再读取最小必要上下文。

默认顺序：

1. 先读 `AGENTS.md`
2. 按任务类型选择 `_harness/` 中最相关的文件
3. 仅在需要时组合读取多个文件
4. 涉及结构性或决策性变更时先确认

## 常见任务到文件的映射

### 理解项目定位 / harness 总体设计

优先读取：

- `_harness/readme.md`
- `_harness/catalog.md`

### 理解目录结构 / 查找职责边界

优先读取：

- `_harness/catalog.md`
- `_harness/rules.md`

### 理解执行方式 / 如何推进任务

优先读取：

- `_harness/workflow.md`
- `_harness/rules.md`

### 理解确认边界 / 风险控制 / 禁止事项

优先读取：

- `_harness/rules.md`

### 理解长期约束 / 稳定偏好 / 已确认结论

优先读取：

- `_harness/memory/project.md`

### 演化 harness 本身

优先读取：

- `_harness/readme.md`
- `_harness/rules.md`
- `_harness/workflow.md`
- `_harness/memory/project.md`

### 演化 `kit/` 输出

优先读取：

- `_harness/readme.md`
- `_harness/catalog.md`
- `_harness/rules.md`
- `_harness/workflow.md`

### 设计或修改 `setup` 流程

优先读取：

- `_harness/workflow.md`
- `_harness/rules.md`
- `_harness/catalog.md`

### 集成新的 harness engineering 工具

优先读取：

- `_harness/readme.md`
- `_harness/rules.md`
- `_harness/memory/project.md`

### 开发人员场景任务

优先角色：`dev-builder` 或 `dev-researcher`

优先读取：

- `_harness/workflow.md`
- `_harness/rules.md`
- 与目标目录相关的代码文件

### 数据 / 表格汇总场景任务

优先角色：`table-operator`

优先读取：

- `_harness/rules.md`
- `_harness/workflow.md`
- 与数据来源相关的输入文件

## setup 落地到目标项目时的路由要求

目标项目中的默认解析顺序应为：

1. 先读目标项目 `AGENTS.md`
2. 若存在 `AGENTS.local.md`，必须继续解析
3. `AGENTS.local.md` 再路由到目标项目中的 `_harness/`
4. 若检测到补充占位存在，agent 必须继续完成项目内补充，而不是忽略

## 读取原则

- 先路由，再加载
- 只读最小必要文件
- README 面向人类，不应替代 harness 规则
- 不要默认读取整个仓库
- 不要在信息不足时自行脑补结构，应继续查阅或提问
