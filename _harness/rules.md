# 约束、边界与演化规则

## 默认行为

agent 默认应：

1. 分析用户指示
2. 查阅必要资料或仓库上下文
3. 给出建议与结论
4. 在无需确认的范围内执行最小必要改动

## 范围控制规则（防止 scope drift）

**在进行任何多文件改动或结构性变更前，必须：**

1. **明确列出目标文件**
   - 列出将要修改的文件路径
   - 说明每个文件的改动目的

2. **明确列出非目标文件**
   - 列出不应触碰的文件或目录
   - 特别标注受保护区域

3. **用 3-5 条总结改动思路**
   - 说明为什么这样改
   - 说明预期影响范围
   - 说明是否有替代方案

4. **等待确认后再执行**
   - 多文件改动必须先得到确认
   - 结构性变更必须先得到确认
   - 涉及 `kit/`、CLI、发布流程的改动必须先确认

**禁止行为：**

- 不要在未列出的文件中"顺便"做改动
- 不要在改 A 的时候"顺便优化" B
- 不要擅自改 README、package.json、.gitignore 等关键文件
- 不要在实现过程中偷偷扩大范围

## 确认边界

以下属于决策性质改动，必须先确认：

- 调整核心目录哲学或关键结构分层
- 变更 `kit/` 的职责边界或输出模型
- 变更 setup 落地策略
- 大规模重构 harness 规则体系
- 引入会显著改变系统定位的新机制
- 影响 npm 包发布接口、行为或对外契约的重大变更

以下通常可直接进行：

- 读取与分析文件
- 更新 harness 文档
- 分析 harness 结构
- 执行项目相关命令
- 进行小步、可解释、可回滚的实现与改进

## 目录与职责约束

- 除根 `AGENTS.md` 外，所有工具定义都应放在 `_harness/` 中
- `kit/` 是 setup 输出源目录，不应当作普通 demo 或 sample
- `kit` 的目标是逐步做到“kit 即系统”
- 仓库自身的 harness 与 setup 输出系统要明确分层，但允许共享同一设计原则

## setup 落地约束

当 harness 通过 setup 落地到实际项目时，应满足：

- 生成 `AGENTS.md`，并允许其被提交到远端仓库
- 默认生成 `AGENTS.local.md`，用于个人私有增强
- 默认生成 `_harness/`，作为本地私有 harness 系统
- 默认目标项目应忽略：
  - `AGENTS.local.md`
  - `_harness/`
- 若 setup 显式启用“可提交 harness”模式：
  - 可不生成 `AGENTS.local.md`
  - `_harness/` 可作为共享 harness 被提交
  - 不应继续忽略 `_harness/`
- 目标项目中的 `AGENTS.md` 必须追加规则：
  - 若存在 `AGENTS.local.md`，agent 必须继续解析它
  - 若不存在 `AGENTS.local.md` 但存在 `_harness/`，agent 也必须继续解析共享的 `_harness/`
- setup 后应保留一个补充占位
  - 若 agent 检测到补充占位存在，则必须继续在项目中完成实际补充

## 文档与语言规则

- 默认使用中文
- README 面向人类
- `AGENTS.md` 与 `_harness/*.md` 面向 agent
- harness 文档应优先写规则、路由、workflow、边界，而不是宽泛介绍

## memory 规则

- 长期稳定结论写入 `_harness/memory/project.md`
- 短期 agent 上下文写入 `_harness/memory/agents/*.local.md`
- 不要把 memory 写成流水账
- 临时日志、重复分析、失效假设应压缩或删除
- 只有跨任务仍有价值的信息才应进入长期 memory

## 角色定义原则

本项目以单 agent 为主，不依赖外部角色体系。

为提高意图识别稳定性，可在 harness 中识别以下轻量角色：

- `dev-builder`
- `dev-researcher`
- `table-operator`
- `harness-maintainer`

这些角色属于任务视角，而不是独立多 agent 编排系统。
