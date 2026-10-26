# foundation-adoption-review

<!-- release-skill:release-version: 0.29.0 -->

<!-- release-skill:managed:start id=latest-release -->
**0.29.0** (2026-10-26)

0.29.0新增foundation-initialize第7步默认TEST与Registry方法覆盖接线，精确依赖agent-method-registry@0.2.0 v1 API，支持显式覆盖与原选择保留，不隐式回退，设计开发与发布两流消费同一选择并各自验证业务结果。

**新增**

- 新增foundation-initialize第7步默认TEST接线，依赖agent-method-registry@0.2.0 v1公共API
- 新增项目entries/overrides或外部插件覆盖默认TEST的能力，支持显式选择
- 非空项目重入时保留合法原选择，禁用/坏覆盖/缺入口/缺验证根/歧义仅停止调用不回退
- 初始化入口不代签，设计开发与发布两流独立验证业务结果

**升级说明**

0.29.0版本四个发布单元精确锁步，新增初始化第7步默认TEST与agent-method-registry@0.2.0 v1方法覆盖接线。P1支持宿主仅限codex和claude-code。项目选择必须有效，外部插件需显式指定；禁用、坏覆盖、缺入口、缺验证根、歧义等五类失败仅停止对应依赖调用，不触发默认行为回退。本轮验收仅覆盖第7步存量工程重入、五类失败情形及12个plan/run入口组合的解析验证，该12个组合为解析验证数，非业务运行次数，不构成完整初始化、宿主安装加载或全宿主支持的证明。
<!-- release-skill:managed:end id=latest-release -->

`foundation-adoption-review` 是一个只读诊断 Skill，用来判断项目能否复用已经发布的 Foundation 能力。它读取调用方提供的 capability catalog 与 `adopt-plan` 结果，把需求归为直接采用、薄适配、候选匹配、无匹配或漏看已有能力。

`foundation-engineering-check` 是同一 Plugin 里的完整静态工程审阅 Skill。它按调用方选择的范围审阅工程声明、公共能力采用和公共调用边界，再投影 Foundation 专业结论。它不运行目标 Skill、业务脚本或 hooks。

`foundation-initialize` 是同一 Plugin 里的授权写入入口。它把经过验证的最小业务 Skill 落成可持续演进的技能族工程：还原业务路径、设计执行结构、经 Engineering Kit 生成或接入工程骨架、登记新增手写文件、构建宿主投影、接通适用的支撑入口，并通过生成的入口完成一次代表性业务试用。它只在调用方明确授权的范围内写入，不因此获得发布状态控制、独立审计结论或模型调度能力。

项目只有需求、尚未确认适用机制时，使用 `foundation-adoption-review`。需要对目标根做完整静态工程审阅，或读取已有 Foundation 证明时，使用 `foundation-engineering-check`。已有验证过的最小 Skill、需要在明确写入授权下落成工程时，使用 `foundation-initialize`。存量结构盘点使用 Engineering Kit 的 `adopt-plan`，局部声明核对使用 `check` 相关入口；`scaffold` 与 `projection` 只用于另行授权的写入流程。Plugin 不增加 setup、quickstart 或 repair Skill。采用诊断仍由 `foundation-adoption-review` 承担，该项 Skill 仍然不执行 `check`。

<!-- release-skill:capability:external-write-boundary -->

这项 Plugin 面向技能族维护者和其他需要判断“某个机制是否已经存在于已发布 Foundation 版本中”的开发者。`foundation-adoption-review` 只读取调用方提供的结果，不写入任何文件。`foundation-engineering-check` 只读目标，并在调用方明确给出的输出位置创建本次审阅结果和一份排他证明。`foundation-initialize` 是唯一会写入的入口：它在调用方授权的目标范围内创建并接入工程文件，而提交、推送、标签、远端发布或市场安装等外部动作仍需各自单独授权。Plugin 不会自行推送、发布、安装或更新 Foundation，不调用宿主，不执行资格检查，不判断 Audit 合规性。

这个目录位于 Foundation monorepo 内，但它是独立的 Plugin 发布单元，不是第四个 Foundation npm 包。`package.json` 保持 `private`，目的只是禁止 `npm publish`；开源镜像是 [ifoohoo/foundation-adoption-review](https://github.com/ifoohoo/foundation-adoption-review)，按 Apache-2.0 许可证发布。

Plugin 维护三份共享 Skill。根级 Agent Plugin manifest 用于准备 Cursor 分发；Claude、Codex、Kimi 与 Qoder 的 manifest 都指向同一个 `skills/` 目录。CodeBuddy 和 WorkBuddy 使用 Hub 已声明的 Claude manifest 兼容路径，宿主资格仍分别验收。任何宿主都不复制 Skill。

从 0.17.0 开始，Plugin 版本号通常与 Foundation 数值对齐。这是发布政策，不证明两个源码树或发布单元已经一起发布。Plugin 继续作为独立发布单元，历史 0.1.0 发布保持不变。

`foundation-adoption-review` 只读取调用方提供的结果，不写入项目。`foundation-engineering-check` 不修改目标，只在显式输出位置创建审阅结果和证明。`foundation-initialize` 只在调用方对本次初始化明确授权的目标范围内写入，并把已创建文件、接线结果和业务试用结果分开报告。Plugin 不会安装或更新 Foundation，不调用宿主，不执行资格检查，也不判断 Audit 合规性。

已发布、候选和本地源码是三种不同事实。标记为 `stable` 的能力只有在对应已发布 Foundation 版本的目录中声明后才可使用。`candidate` 条目、候选查询命中或未发布工作区中存在源码，都不能证明稳定 API 已经发布。Plugin 版本也不授予安装或升级 Foundation 的权限；具体能力以所用版本的公开目录和发布验证为准。

<!-- release-skill:capability:safe-first-command -->

## 安装

本插件为开源Plugin，不通过npm发布。Skill Family Hub为当前公开市场入口。仓库包含根级Agent Plugin manifest、四份宿主manifest及三个Skill载荷，不含市场索引。Cursor Marketplace提交审核需另行处理。安装流程为：先添加Hub，再按已支持Hub路径安装。

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

Kimi Code 通过 release-skill 的受控交互流程，从冻结的 Plugin 公开仓以 0.29.0 版本的精确 tag 安装。其在 Skill Family Hub 中的登记与门禁验证独立进行，仅在 Hub 更新完成并确认接受后，才执行对应宿主路径的安装与检查。WorkBuddy 依赖桌面端插件市场，与 CodeBuddy 共用 Hub 的 codebuddy 分发面，但其安装流程、发现机制、调用结果需独立验证。Qoder 使用 Hub 的 qoder 分发面，其安装、发现、来源绑定、Skill 加载及一次只读调用，均依据 Qoder CLI 1.1.30 的原验收范围分别进行检查。

只有发布完成、验证通过且 Hub 接受登记后，才执行这些宿主检查。发布后验证步骤会为既有条目生成冻结的更新提案，再由 Hub 的独立流程摄入、校验并发布。仓库当前的源码状态不能单独证明市场已经可用。

## 最小用法

调用 `foundation-adoption-review` 时，需要同时提供诊断所依据的事实：已发布的 Foundation 版本、`capability-catalog` 查询结果和 `adopt-plan` 结果。请求保持只读。对目标根做完整静态工程审阅时，改调 `foundation-engineering-check`，并提供目标、所选工程范围和可选的已有 Foundation 证明：

```text
请帮助我调用 foundation-adoption-review 评估这份方案。
我会提供：
- 已发布的 Foundation 版本；
- capability-catalog 查询结果；
- adopt-plan 结果。
不要修改文件，不要安装或更新任何内容，不要调用宿主，不要执行资格检查，也不要判断 Audit 合规性。
```

```text
请帮助我调用 foundation-engineering-check 审阅这个项目。
我会提供：
- 目标根；
- 适用的工程范围；
- 可选的已有 Foundation 证明。
不要运行目标 Skill、脚本或 hooks。不要把声明式版本检查和入口检查当成完整 Foundation 通过。
```

需要初始化时，调用 `foundation-initialize`，并提供验证过的最小 Skill 和明确的写入范围：

```text
请帮助我调用 foundation-initialize 处理这份最小 Skill。
我会提供：
- 最小 Skill 正文与代表性业务材料；
- 目标目录和我本次授权的具体写入范围；
- 项目身份、许可证事实和目标宿主。
不要在本范围之外提交、推送、打标签、发布或安装任何内容。
```

初始化入口每一步只读取当时需要的参考，只在授权范围内写入，人工确认点仍由用户判断。纯 Skill、无脚本、不发 npm 都是正常结果。

采用诊断会读取输入中的能力入口、副作用、失败语义、调用方责任，以及计划的写集和冲突。它不会自行运行 `adopt-plan` 或 `check`。正常回答应指出最小公共入口、调用方拥有的薄适配和仍缺事实，不宣称已经实现全量跨语言或跨宿主治理。`foundation-engineering-check` 可按所选范围把声明式版本检查、入口检查或 `adopt-plan` 当作必要证据；两个机械分支通过不等于完整 Foundation 通过。

Foundation 的普通工程检查属于静态检查：它读取声明、配置和文件，不运行目标 Skill、业务脚本或 hooks。检查发现只在所选政策的适用范围内成立。Foundation 既有版本与入口假设不是单包、独立版本单元、非 npm 来源或所有语言与宿主都必须遵守的通用规则。

## 出现失败时

安装或诊断失败时，只报告错误并停止。由人工核对 GitHub 访问、Marketplace 条目与版本，以及三份输入是否完整。不要自动修复安装或输入。

拿到诊断结果后，按报告中的能力 ID 和最小采用路径人工处理下一步。资格检查与 Audit 判断另行评审。

在获授权的 Plugin 研发流程中运行本地闭包测试：

```bash
pnpm test
```

该测试核对 Plugin 闭包、manifest、README 发布措辞和冻结 Skill 字节。它不运行目标项目，也不判断诊断回答是否正确。宿主资格与 Foundation 采用状态分别由消费者检查和对应评审给出。

## Windows 支持与使用边界

Foundation Adoption Review 0.28.0 的 Windows 范围为 Windows 11 x64、本地 NTFS 和普通用户。

Plugin 的工程检查入口只做只读扫描，不安装或执行目标资源。静态退出码 0、安装成功或宿主装载扫描均不构成 Windows 宿主业务通过。本版本不改变旧发布物的能力；精确版本的远端可用性须由正式发布凭据核实，真实资格需由对应宿主的业务证据核实。详见 [兼容性矩阵](https://ifoohoo.github.io/skill-family-engineering-kit/reference/compatibility/) 与 [API 文档](https://ifoohoo.github.io/skill-family-engineering-kit/reference/api/harness/)。
