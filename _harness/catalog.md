# 项目结构总览

本项目是 `agents-md-harness` 的实现与演化仓库，同时也是我个人真实使用的 harness engineering workspace。

## 顶层结构

- `AGENTS.md`
  - 仓库入口文件
  - agent 首先���取的说明入口
- `_harness/`
  - 本仓库自身的 harness 系统
  - 存放 routing、rules、workflow、memory、GC、skills 与工具定义
- `kit/`
  - setup 输出源目录
  - 保存将要落地到目标项目中的 harness 系统内容
  - 这是 setup 的实际写入来源，不应被理解为普通 template
- `package.json`
  - npm 包信息、CLI 入口、脚本与依赖管理
- `pnpm-lock.yaml`
  - pnpm 锁文件
- `node_modules/`
  - 依赖安装目录
- `.agents-md-harness-manifest.json`
  - setup 生成的清单文件

## \_harness 目录职责

`_harness/` 是本项目自己的 agent 工作系统，负责：

- 项目上下文说明
- 任务路由
- 约束与边界
- 执行工作流
- 长期 / 短期 memory
- GC 规则
- skills 与工具定义

### 当前已存在的关键子目录

- `_harness/.setup/`
  - harness 初始化对话与生成相关文件
- `_harness/gc/`
  - memory 与文档维护相关 GC 规则
- `_harness/memory/`
  - 项目长期记忆与 agent 本地记忆
- `_harness/skills/`
  - harness 技能与相关工具脚本

## kit 目录职责

`kit/` 应作为 setup 到实际项目时的输出源目录。

其职责是：

- 提供 setup 写入目标项目的文件来源
- 定义目标项目中的 `AGENTS.md`、`AGENTS.local.md`、`_harness/` 与相关补充占位的落地内容
- 承载“kit 即系统”的设计：setup 到项目中的内容本身就是完整 harness 系统

## README / harness / code / memory 分工

- README 面向人类用户，说明 CLI 与项目用途
- `AGENTS.md` 与 `_harness/*.md` 面向 agent，提供任务路由和行为约束
- CLI / 脚本 / 工具代码负责 setup、集成、校验与演化
- memory 仅保留长期有效或当前任务需要的高信号信息

## 结构演化原则

- 优先围绕真实工作环境演化，不为展示而设计
- `kit/` 作为 setup 输出源应保持清晰、可维护、可验证
- 所有工具定义应统一收敛到 `_harness/`
- 结构性重构属于决策型改动，应先确认
