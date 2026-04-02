# 这个项目是什么

这是我的个人 harness engineering CLI / workspace 项目。

它的目标不是只提供一份静态模板，而是持续演化我的个人 harness 工作环境，并通过 `setup` 将其中一套可工作的 harness 系统落地到实际项目中。

项目本身既是：

- 个人长期使用的 harness 工作环境
- `agents-md-harness` 的实现仓库
- 可发布到 npm 的 CLI 工具
- 各类 harness engineering 能力、规则、技能、工作流的集成与演化中心

## 核心设计

- 仓库自身有一套自用 harness，用于维护本项目
- `kit/` 是 setup 输出源目录，保存将要落地到目标项目的 harness 系统内容
- `kit` 不是普通 template，而是 setup 时写入目标项目的实际 harness 工具包
- 所有工具定义都应放在 `_harness/` 中
- 目标是逐步做到 **kit 即系统**：setup 到项目中的那套内容本身就是完整系统

## 主要任务类型

这个项目中的 agent 主要处理以下类型任务：

- 演化 harness 结构、规则、路由、workflow、memory、GC
- 设计和实现 `setup` 流程
- 集成优��的 harness engineering 工具
- 调研外部项目、工具与做法，并沉淀为可复用能力
- 维护 npm 包发布所需的 CLI、结构与约束
- 改进 kit 输出质量，使其更适合真实项目落地

## 面向的主要使用场景

### 1. 开发人员场景

围绕代码、配置、脚本、文档和项目工作流展开。

### 2. 数据 / 表格汇总场景

围绕结构化信息整理、表格生成、归类和轻量汇总展开。

## 文档语言

默认使用中文。

除非用户明确要求，否则新增或更新的 harness 文档应优先保持中文表达。
