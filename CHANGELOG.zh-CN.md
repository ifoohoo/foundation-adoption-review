# 变更日志

<!-- release-skill:changelog:start version=0.27.0 locale=zh-CN baseline=sha256:b11da9d1ed85afde108330a37b1bf19b86ec1b3df6ba850ed8096b7dd763b4d9 -->
## [0.27.0] - 2026-10-21

Foundation Adoption Review 0.27.0 与四个发布单元锁步前移，并更新 `foundation-initialize` 路由与能力目录：非空首次登记走 `skill-family-kit check register-existing`。`relock` 仍不为缺锁工程播种。未新增共享运行时 API。

### 变更

- 非空且缺三份官方闭域文件时，路由到 `skill-family-kit check register-existing`。`relock` 仍不为缺锁工程播种。空目标仍走 `scaffold`。已有合法登记的非空目标仍先只读执行 `adopt-plan`。
- 能力目录自 0.27.0 起登记 `foundation.kit.register-existing`。目录 overlay 字段沿用既有目录合同。
- 更新包版本及受管版本派生，不重做 0.26.0 已发布功能。

### 升级说明

三个 Foundation npm 包及独立 Plugin 须精确同版为 0.27.0。消费以实际正式发布的公共接口及来源为准。完成首次非空登记或目录路由不表示正式采用或初始化已完成。本说明不替代发布后验证和正式消费者验收。
<!-- release-skill:changelog:end version=0.27.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.26.0 locale=zh-CN baseline=sha256:b28dbd79d8d4560e9a9764417df1b25761acf88e707db28bb947dc27c2e205f7 -->
## [0.26.0] - 2026-10-17

Foundation Adoption Review 0.26.0 仅随四发布单元锁步前移，未新增 Skill 行为或共享运行时 API。

### 变更

- 只更新版本号与受管投影，保留 0.25.0 已接受的初始化推荐与权威路由指引。不将读取清单或完成路由等同于正式采用完成。

### 升级说明

三个 Foundation npm 包及独立 Plugin 须精确同版为 0.26.0。消费方应使用实际正式发布的公共接口及来源；本说明不替代发布后验证和正式消费者验收，也不宣称两者已经完成。
<!-- release-skill:changelog:end version=0.26.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.25.0 locale=zh-CN baseline=sha256:3e48a59b6b89ba6bfee3879af82ce43733ee375833aac426694ecfd7566e55f1 -->
## [0.25.0] - 2026-10-15

Foundation Adoption Review 0.25.0 与四个发布单元锁步前移，并纳入已接受的初始化推荐与权威路由指引；没有新增共享运行时 API。

### 变更

- 明确制品推荐从已发布 artifact-graph/project-artifact-profiles 入口读取，实际采用交给 artifact-chain-bootstrap；保留项目已有扩展，区分推荐与采用。
- 正式清单不可用时只暂停依赖清单的推荐分支，其余初始化继续；不复制清单数组，不把候选接口写成正式消费完成。
- 更新包版本及受管版本派生，0.24.1 原发布说明与冻结载荷保持原样。

### 升级说明

三个 Foundation npm 包与独立插件保持精确同版，核对实际已发布接口与来源。读取清单或完成路由不证明项目已采用或初始化已完成；本说明不替代正式消费者验收和发布后验证。
<!-- release-skill:changelog:end version=0.25.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.24.1 locale=zh-CN baseline=sha256:b90e58dae9e6c3cdf3af21558361711e1f30a0d483a080a77d91971f31ea4823 -->
## [0.24.1] - 2026-10-12

Foundation Adoption Review 0.24.1 修正初始化入口及公共机制接线中的版本状态说明，没有新增能力或接口。

### 变更

- 将五处误称本地候选或待发布的能力说明改为自 0.24.0 提供，更新现行状态页，保留 0.23.0 的兼容限制、实际接口核查及全部授权和失败边界。

### 升级说明

三个 Foundation npm 包与插件按既有合同保持同版。消费时核对所选版本的实际公共接口与三包精确锁步来源；版本号本身不证明能力或兼容性。0.24.0 的原发布说明和冻结载荷保持原样，本说明不替代本版本的发布后验证。
<!-- release-skill:changelog:end version=0.24.1 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.24.0 locale=zh-CN baseline=sha256:0bd2c9bffee371165dac731354230c4d882875ffd95610edaa736166a4779787 -->
## [0.24.0] - 2026-10-07

Foundation Adoption Review 0.24.0 在现有插件中新增 `foundation-initialize` 入口，承接已通过真实业务验证的最小 Skill 或等价流程材料，将业务方法落成可继续开发的技能族工程。该能力当前为本地锁步候选，不证明完整初始化、远端发布或真实宿主验收已完成。

### 新增

- 新增入口仅在调用方授权范围内写入目标工程，分别设计 Skill 层次、子智能体职责与会话边界，沿用既有工程骨架、宿主投影及支撑入口，保留原业务规则与人工判断；纯 Skill、无脚本、无 npm 发布均可成为正常路径。

### 变更

- 既有 `foundation-adoption-review` 与 `foundation-engineering-check` 保持只读职责不变；本次初始化不新增 Foundation 机制包、顶层命令、公共 Schema、发布状态机或独立审计结论。
- 吸收原 0.23.1 候选修复：当工程声明缺失且实体核对尚未开始时，仅将该声明项标记为 `insufficient`，`reason` 字段保留原始诊断信息；其他仍可独立运行的已选专业检查继续。材料不足不视为通过，禁止手填 `FOUNDATION_STATIC_CLEAR`。
- 初始化过程明确登记新增手写源，工具锁使用支持 `trackedToolLocks` 的新版本；投影、生成物或日志不视为手写源。宿主投影前必须核对正式入口的 frontmatter（正文前置元数据），不得以发现成功推断原业务已通过。

### 升级说明

四个发布单元同步前移至 0.24.0 版本，三个 npm 包须精确锁定同版。完整业务试用、有效 Profile 采用、容量超限交接、真实人工判断、Release 接线及正式安装后的消费仍待完成，不可由本说明或局部接线替代。2026-10-06 的 0.23.0 公开版本为既有点时核实记录，本窗口未查询远端；0.24.0 仍为本地候选。
<!-- release-skill:changelog:end version=0.24.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.23.0 locale=zh-CN baseline=sha256:cd0a84b52e8c58f9a9001652626d1747cbe3fa556e0098656014d5a20837f0a0 -->
## [0.23.0] - 2026-09-26

Foundation Adoption Review 0.23.0 新增 `foundation-engineering-check`，用于完整静态工程审阅和读取已有 Foundation 证明，并修正两项已经接受的判断错误。本说明只记录本地锁步候选，不表示已经远端发布，也不表示真实宿主已经接受。

### 新增

- 新增 `foundation-engineering-check` Skill。它按调用方选定的范围做静态审阅，或读取一份已有的本族证明；不执行目标 Skill、业务脚本或 hook（钩子程序）。既有 `foundation-adoption-review` 仍只诊断调用方已经提供的材料。

### 变更

- 版本比较区分 npm 包版本、Contracts 规格版本和目标发行单元版本，并且只比较同一对象。Contracts 1.20.0 与包版本 0.22.0 并排出现，本身不构成冲突。无法确认对象时，该项保持 `insufficient`。
- 入口检查尚未进入实体核对，只是因为缺少 `engineering.entries`，而 `releaseUnits` 仍符合已发布 Schema 时，记为 `insufficient`。底层数组名叫 `findings`，或进程退出 1，都不能单独证明违规。另有强制合同并且已经取得违反证据时，该项仍记 `findings`。
- 独立 Plugin 源、根级 Agent Plugin manifest 和四份宿主 manifest 与 Foundation 0.23.0 对齐。

### 升级说明

四个 Foundation 发布单元一起前移到 0.23.0。远端发布、真实宿主验证和 Cursor Marketplace 提交仍不在本说明范围内。0.22.0 的 Plugin 发布仍是最近一次已验证的公开基线。
<!-- release-skill:changelog:end version=0.23.0 locale=zh-CN -->


## [0.22.0] - 2026-09-18

- 没有新增能力：本版本只为让四个发布单元重新与 Foundation 0.22.0 保持数值锁步。
- 独立 Plugin 源码、根级 Agent Plugin manifest 和四份宿主 manifest 与 Foundation 0.22.0 对齐；共用的只读 Skill 与全部诊断语义保持不变。
- 从已发布的 0.20.0 直接前移到 0.22.0，因为上一轮 Foundation 发布有意保持本单元不变，不存在 0.21.0 的 Plugin 发布。
- Cursor Marketplace 的提交与审核、本机宿主升级仍不属于本次 GitHub 发布。

## [0.20.0] - 2026-09-10

- 增加标准根级 `plugin.json`，公开镜像可以据此提交 Cursor Agent Plugin 审核。
- 经验证的公开发布闭包纳入 Cursor manifest，继续共用一份只读 Skill，并保留既有宿主清单。
- 独立 Plugin 源码与 Foundation 0.20.0 数值对齐，诊断语义和三包依赖边界不变。
- Cursor Marketplace 的提交与审核不属于本次 GitHub 发布。

## [0.19.3] - 2026-09-08

- 新增 Qoder manifest，指向既有规范、只读的 Skill。
- 准备通过 Skill Family Hub 提供不可变 Qoder 分发；安装、发现、来源绑定、Skill 加载和调用仍在发布后分别验收。
- 独立 Plugin 源码候选版本与 Foundation 0.19.3 数值对齐，诊断语义和三包依赖边界不变。

## [0.19.2] - 2026-09-08

- 新增 Kimi Code manifest，继续只维护一份规范、只读的 Skill。
- Skill Family Hub 分发兼容面扩展到 Kimi Code 和 CodeBuddy/WorkBuddy 共享入口。CodeBuddy 与 WorkBuddy 保留 Claude manifest 兼容回退，并分别验收宿主结果。
- 独立 Plugin 源码候选版本与 Foundation 0.19.2 数值对齐，诊断语义和三包依赖边界不变。

## [0.19.1] - 2026-09-08

- Plugin 源码候选版本与 Foundation 0.19.1 补丁版本对齐；独立发布权威和包边界不变。
- 使用 Foundation 0.19.0 与 0.18.0 的精确输入，经真实 Skill 入口复核批量入口选择指引。既有指令已覆盖冻结场景，无需修改 Skill。

## [0.19.0] - 2026-09-07

- 将 Plugin 版本号与 Foundation 0.19.0 对齐，独立发布权威和包边界保持不变。
- Skill 补充最小批量入口选择指导：同进程调用保留既有对象入口；跨进程、相互独立且容量允许的 canonical-json 请求作为批量候选；有依赖、超限或未支持的请求保留原路径；旧精确版本没有该入口时不能声称可用。

## [0.17.0] - 2026-09-05

- 将 Plugin 版本号与 Foundation 0.17.0 对齐，独立发布权威和包边界保持不变。
- 将 Skill Family Hub 设为唯一公开市场，移除已经失效的 `release-skill` 市场依赖。
- 首次 Hub 登记改为验证通过后的人工交接；既有条目建立后，后续版本才走提案入口更新。

## [0.1.0] - 2026-09-01

- 新增只读的 `foundation-adoption-review` Skill，以及 Codex/Claude 两份 Plugin manifest。
- 将 Plugin 声明为 Foundation monorepo 内的独立开源镜像发布单元。
