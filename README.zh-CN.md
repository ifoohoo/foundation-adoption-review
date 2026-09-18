# foundation-adoption-review

`foundation-adoption-review` 是一个只读诊断 Skill，用来判断项目能否复用已经发布的 Foundation 能力。它读取调用方提供的 capability catalog 与 `adopt-plan` 结果，把需求归为直接采用、薄适配、候选匹配、无匹配或漏看已有能力。

项目只有需求、尚未确认适用机制时，使用这项 Skill。存量结构盘点使用 Engineering Kit 的 `adopt-plan`，静态工程发现使用 `check` 相关入口；`scaffold` 与 `projection` 只用于另行授权的写入流程。Plugin 不增加 setup、quickstart、check 或 repair Skill，采用诊断由这一项 Skill 承担。

<!-- release-skill:capability:external-write-boundary -->

这项 Plugin 面向技能族维护者和其他需要判断“某个机制是否已经存在于已发布 Foundation 版本中”的开发者。它只读取调用方提供的结果，不写入任何文件，也不会推送、发布、安装或更新 Foundation，不调用宿主，不执行资格检查，不判断 Audit 合规性。

这个目录位于 Foundation monorepo 内，但它是独立的 Plugin 发布单元，不是第四个 Foundation npm 包。`package.json` 保持 `private`，目的只是禁止 `npm publish`；开源镜像是 [ifoohoo/foundation-adoption-review](https://github.com/ifoohoo/foundation-adoption-review)，按 Apache-2.0 许可证发布。

Plugin 只维护一份共享 Skill。根级 Agent Plugin manifest 用于准备 Cursor 分发；Claude、Codex、Kimi 与 Qoder 的 manifest 都指向同一个 `skills/` 目录。CodeBuddy 和 WorkBuddy 使用 Hub 已声明的 Claude manifest 兼容路径，宿主资格仍分别验收。任何宿主都不复制 Skill。

从 0.17.0 开始，Plugin 版本号通常与 Foundation 数值对齐。这是发布政策，不证明两个源码树或发布单元已经一起发布。Plugin 继续作为独立发布单元，历史 0.1.0 发布保持不变。

Plugin 只读取调用方提供的结果，不写入项目。它不会安装或更新 Foundation，不调用宿主，不执行资格检查，也不判断 Audit 合规性。

已发布、候选和本地源码是三种不同事实。标记为 `stable` 的能力只有在对应已发布 Foundation 版本的目录中声明后才可使用。`candidate` 条目、候选查询命中或未发布工作区中存在源码，都不能证明稳定 API 已经发布。Plugin 版本也不授予安装或升级 Foundation 的权限；具体能力以所用版本的公开目录和发布验证为准。

<!-- release-skill:capability:safe-first-command -->

## 安装

这是一个开源 Plugin，不是 npm 包。Skill Family Hub 是当前公开市场。插件仓携带一份根级 Agent Plugin manifest、四份宿主清单和一份 Skill 载荷，不携带市场索引。Cursor Marketplace 的提交与审核另行处理。先添加 Hub，再从已支持的 Hub 路径安装插件：

```text
# Codex
codex plugin marketplace add ifoohoo/skill-family-hub
# 然后从交互式 /plugins 浏览器安装 foundation-adoption-review。

# Claude
claude plugin marketplace add ifoohoo/skill-family-hub
claude plugin install foundation-adoption-review@skill-family-hub

# CodeBuddy
codebuddy plugin marketplace add ifoohoo/skill-family-hub
codebuddy plugin install foundation-adoption-review@skill-family-hub

# Qoder 1.1.30
qoder plugins marketplace add ifoohoo/skill-family-hub
qoder plugins install foundation-adoption-review@skill-family-hub
```

Kimi Code 由 release-skill 的受控交互流程从冻结的 Plugin 公开仓和精确 0.22.0 tag 安装。它在 Hub 中的登记与 gate 单独验证，Hub 更新完成后才执行宿主路径。WorkBuddy 使用桌面端插件市场，并与 CodeBuddy 共用 Hub 的 `codebuddy` 分发面，但它的安装、发现和调用结果必须独立检查。Qoder 使用 Hub 的 `qoder` 分发面；安装、发现、来源绑定、Skill 加载和一次只读调用须在 Qoder CLI 1.1.30 上分别验收。

只有发布完成、验证通过且 Hub 接受登记后，才执行这些宿主检查。发布后验证步骤会为既有条目生成冻结的更新提案，再由 Hub 的独立流程摄入、校验并发布。仓库当前的源码状态不能单独证明市场已经可用。

## 最小用法

调用 `foundation-adoption-review` 时，需要同时提供诊断所依据的事实：已发布的 Foundation 版本、`capability-catalog` 查询结果和 `adopt-plan` 结果。请求保持只读：

```text
请帮助我调用 foundation-adoption-review 评估这份方案。
我会提供：
- 已发布的 Foundation 版本；
- capability-catalog 查询结果；
- adopt-plan 结果。
不要修改文件，不要安装或更新任何内容，不要调用宿主，不要执行资格检查，也不要判断 Audit 合规性。
```

诊断会读取输入中的能力入口、副作用、失败语义、调用方责任，以及计划的写集和冲突。它不会自行运行 `adopt-plan` 或 `check`。正常回答应指出最小公共入口、调用方拥有的薄适配和仍缺事实，不宣称已经实现全量跨语言或跨宿主治理。

Foundation 的普通工程检查属于静态检查：它读取声明、配置和文件，不运行目标 Skill、业务脚本或 hooks。检查发现只在所选政策的适用范围内成立。Foundation 既有版本与入口假设不是单包、独立版本单元、非 npm 来源或所有语言与宿主都必须遵守的通用规则。

## 出现失败时

安装或诊断失败时，只报告错误并停止。由人工核对 GitHub 访问、Marketplace 条目与版本，以及三份输入是否完整。不要自动修复安装或输入。

拿到诊断结果后，按报告中的能力 ID 和最小采用路径人工处理下一步。资格检查与 Audit 判断另行评审。

在获授权的 Plugin 研发流程中运行本地闭包测试：

```bash
pnpm test
```

该测试核对 Plugin 闭包、manifest、README 发布措辞和冻结 Skill 字节。它不运行目标项目，也不判断诊断回答是否正确。宿主资格与 Foundation 采用状态分别由消费者检查和对应评审给出。
