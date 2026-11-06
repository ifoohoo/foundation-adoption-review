# 变更日志

<!-- release-skill:changelog:start version=0.38.0 locale=zh-CN baseline=sha256:60aade1160cb13dac7b16ecd695ed9a2c07e8ba607b8deb7c390ffcee284a107 -->
## [0.38.0] - 2026-11-06

foundation-engineering-check 新增两个显式可选范围，指定Skill文本声明对应与指定原生投影内容与资源对应，同时扩展原有固定文件引用检查，支持 raw literal 以连续 ../ 开头并接合法文件段，目标必须严格位于 root 内。新增固定Schema声明与采用链路检查能力，独立核对Markdown中完整$id与schemaVersion=N及实际普通2020-12 Schema必需版本const，可选在有限、直接、无歧义CST链路中验证Python实现中Schema加载与验证早于业务解释，JSON解码与直接版本头读取先行合法，无法分类仅实现不足并保留声明，Kit包根API无专用CLI，Plugin通过显式范围真实调用 runFixedSchemaUseCheck 及公共 readProfessionalProof。

### 变更

- foundation-engineering-check 新增两个显式可选范围，指定Skill文本声明对应与指定原生投影内容与资源对应，分别通过真实调用 runSkillSurfaceBindingCheck 或 runNativeProjectionCheck 及对应 CLI 验证，结果保留原始 professional-conclusion 并交`readProfessionalProof`。
- 原有固定文件引用检查能力扩展支持有限前置 ../ 路径，raw literal 可以一个或多个连续 ../ 开头，后接由 / 分隔的合法文件段，目标必须严格位于 root 内，路径由 path.posix.join 处理并执行规范化。 该范围直接调用 `runStaticReferenceCheck` 包根 API，并由公共读取器解释实际返回。
- 局部机械结果按实际 scope 使用，调用方负责选集的业务一致性、权威性与完整性，领域允许适配或违规由调用方 LLM 判断。
- 新增固定Schema声明与采用链路检查能力，独立比较Markdown中完整$id与schemaVersion=N及实际普通2020-12 Schema必需版本const。可选在有限、直接、无歧义CST链路中核对Python实现中实际采用的Schema文件、同一数据绑定与验证早于业务解释。JSON解码与直接版本头读取先行合法，无法分类仅实现不足并保留声明。Kit包根API无专用CLI，Plugin通过显式范围真实调用 runFixedSchemaUseCheck 及公共 readProfessionalProof。

### 升级说明

四单元必须同步采用精确版本 0.38.0，各阶段（源码候选、本地自测、正式渠道、安装、加载、业务结果）需分别核收。调用方需确保选集业务一致、权威完整，适配或违规由调用方 LLM 判断。新增固定Schema检查需独立核对声明与实际Schema对应关系，可选验证实现中Schema加载与验证早于业务解释，JSON解码与直接版本头读取先行合法，无法分类仅实现不足并保留声明，Kit无专用CLI，Plugin通过真实调用 runFixedSchemaUseCheck 及公共 readProfessionalProof 完成。
<!-- release-skill:changelog:end version=0.38.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.37.0 locale=zh-CN baseline=sha256:0bc314df4168c2875bc3f261286a2cb8d6ec0ebe945f8eacec3fba7bf7c508e3 -->
## [0.37.0] - 2026-11-05

在 0.37.0 版本中，`foundation-engineering-check` 新增对指定原生入口身份关系的机械检查范围，真实调用 `runNativeEntryBindingCheck` 或 `check native-entry-bindings`，保存原始 `professional-conclusion`，交由已有证明读取器解析局部四组比较结果。机械结果不通过 `proof-create` 手动填写。旧有双入口六比较逻辑与 peer 联合一致性范围维持不变。

### 变更

- 在 0.37.0 版本中，`foundation-engineering-check` 新增对指定原生入口身份关系的机械检查范围，真实调用 `runNativeEntryBindingCheck` 或 `check native-entry-bindings`，保存原始 `professional-conclusion`，交由已有证明读取器解析局部四组比较结果。机械结果不通过 `proof-create` 手动填写。旧有双入口六比较逻辑与 peer 联合一致性范围维持不变。

### 升级说明

四单元需同步采用 0.37.0 版本，旧调用方式不强制迁移。源码候选、本地测试及静态退出均不能证明其在正式渠道中的可用性、安装加载能力或业务适用性。0.36.0 不包含此新功能。
<!-- release-skill:changelog:end version=0.37.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.36.0 locale=zh-CN baseline=sha256:ac390211637382f8cbe1e34ba2cf410445048ba8714e8c6c02a6a7ee003dbf46 -->
## [0.36.0] - 2026-11-03

`foundation-adoption-review`在原有`foundation-engineering-check`基础上新增“已选同级适配器共同闭包”机械范围，真实调用新包根API，保存完整原件交由原读取器处理。不以`proof-create`手填机械结果，各范围原件独立存储，不合成完整审计PASS。不判断Audit/SOURCE终态、源权威、独立资源或平台元数据，不执行目标或生成器，不证明发布/宿主安装加载业务。

### 变更

- `foundation-adoption-review`在原有`foundation-engineering-check`基础上新增“已选同级适配器共同闭包”机械范围，真实调用新包根API，保存完整原件交由原读取器处理。不以`proof-create`手填机械结果，各范围原件独立存储，不合成完整审计PASS。不判断Audit/SOURCE终态、源权威、独立资源或平台元数据，不执行目标或生成器，不证明发布/宿主安装加载业务。

### 升级说明

四单元需锁步采用0.36.0，旧调用不强制迁移。源候选、本地测试、静态退出均不能证明正式渠道、安装加载或业务可用性。正式0.35.0不包含新入口。
<!-- release-skill:changelog:end version=0.36.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.35.0 locale=zh-CN baseline=sha256:d6f7d26388a7a5fb9bff0bdd299c8527f6e5e4b14fe3a4f7ad0146ab6e9457ed -->
## [0.35.0] - 2026-11-02

0.35.0 在既有 `runBranchFieldCheck` / `check branch-fields` 中增加可选 `nodeType`，可明确选择回调或对象字段中的直接比较。旧六字段 `If` 请求兼容；精确唯一位置、直接字段和字符串语法边界不扩大。按每项实际结果区分发现与不足，不执行目标，不保证领域成功或全部分支覆盖。既有双公开入口绑定能力不变。

### 变更

- 0.35.0 在既有 `runBranchFieldCheck` / `check branch-fields` 中增加可选 `nodeType`，可明确选择回调或对象字段中的直接比较。旧六字段 `If` 请求兼容；精确唯一位置、直接字段和字符串语法边界不扩大。按每项实际结果区分发现与不足，不执行目标，不保证领域成功或全部分支覆盖。既有双公开入口绑定能力不变。

### 升级说明

四单元同时采用 0.35.0；需要新比较选择时显式提供 `nodeType`，旧调用不强制改写。候选、本地测试与静态退出 0 均不等于正式发布、安装、加载或业务通过；正式发布仍按四单元原发布合同核收。
<!-- release-skill:changelog:end version=0.35.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.34.0 locale=zh-CN baseline=sha256:db851b360a632153c355a3368e70fb36f08117ebf96d43d0774d08878c642be6 -->
## [0.34.0] - 2026-11-02

Plugin中新增 `foundation-engineering-check` 可选范围，明确选择后将实际调用Kit的公共API或CLI接口，保留原始 `professional-conclusion`，并通过 `readProfessionalProof` 或 `check proof` 进行解释。严禁手填通过码或以人工判断替代机械调用。调用范围选择后，各子项原件均须保留，局部 `CLEAR` 不代表完整 `METHOD003`、完整审阅、安装成功或业务执行通过。

所有关于公开性、同业务条件、Schema权威性、选集完整性及运行时语义的判断，仍由调用方负责。Kit与Plugin的职责边界清晰：Kit仅提供静态比对能力，不介入运行、不写入目标、不联网、不改用错误URI下的Schema。

### 变更

- Plugin中新增 `foundation-engineering-check` 可选范围，明确选择后将实际调用Kit的公共API或CLI接口，保留原始 `professional-conclusion`，并通过 `readProfessionalProof` 或 `check proof` 进行解释。

### 升级说明

Contracts与Harness在本版无新增机制行为，仅进行锁步版本同步与必要派生，既有协议与算法保持不变。升级需同时满足Kit与Plugin均升级至0.34.0版本。旧有入口保持兼容，不强制旧消费者迁移。

0.33.0版本仅为未发布源码候选，不具备正式发布效力；0.34.0为首次合并交付，统一包含两项公共能力。本地候选状态不构成远端发布或授权证明，四单元正式验证通过后，方可认定整体发布。
<!-- release-skill:changelog:end version=0.34.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.33.0 locale=zh-CN baseline=sha256:01c7daaae703ca0deed83fd347dd1a6a0e483c8cc3cd94e20850b625ae6c2c1e -->
## [0.33.0] - 2026-11-01

`foundation-engineering-check` 新增指定分支字段与 Schema 对应的可选范围，使用 `runBranchFieldCheck` 或 `check branch-fields` 的实际输入与原始专业结论，再交原证明读取器解释。调用者需提供完整 ESM 源码、Schema 及精确行列位置，输入根与选集显式给定，返回原 `professional-conclusion`。直接封闭对象缺字段、字面值缺成员将被发现，不支持的语法、引用或约束保留不足；无 `enum`/`const` 时仅完成字段定位。其他同级字段的条件必填仅按已声明的封闭形状排除，不解释条件逻辑、不判断完整 Schema 有效性或业务成功。源码仅读取，不导入或执行。回执与闭包绑定实际读入字节，漂移导致依赖观察降级，独立事实仍保留。

### 变更

- `foundation-engineering-check` 新增指定分支字段与 Schema 对应的可选范围，使用 `runBranchFieldCheck` 或 `check branch-fields` 的实际输入与原始专业结论，再交原证明读取器解释。

### 升级说明

使用新入口需 Engineering Kit 0.33.0，新 Skill 范围需 `foundation-adoption-review` 0.33.0；旧消费者不强制迁移，原入口与兼容合同保留。Contracts 与 Harness 本版本无新增行为，仅同步锁步版本与必要派生。本地候选不证明远端发布完成，最终四单元载荷与外部动作仍按原流程核准。
<!-- release-skill:changelog:end version=0.33.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.32.0 locale=zh-CN baseline=sha256:0ea7b4f7fe301e7f5f4b28d69c69f999e599a664998d3803e77a3ac4a3cc44c0 -->
## [0.32.0] - 2026-11-01

`foundation-adoption-review` 中的 `foundation-engineering-check` 新增独立选择范围，按真实输入调用公共 API 或 CLI。结果保留原有专业结论，包括请求、定位、冲突、不足与实际字节来源。结果为局部解释，不以语义审阅或投影收据替代机械比较，不支持手填通过。不证明整个 Foundation 审阅、全部 SFA-ARTIFACT-030@2 合规性、任意反向依赖、生成效果或发布资格。声明权威、实际采用及完整范围仍由调用方负责解释。

### 变更

- `foundation-adoption-review` 中的 `foundation-engineering-check` 新增独立选择范围，按真实输入调用公共 API 或 CLI。

### 升级说明

该选择需要 Engineering Kit 0.32.0 和 foundation-adoption-review 0.32.0，结果边界与现有 reader 一致。既有能力仍按原兼容合同使用。不对外部消费者设置强制升级门。
<!-- release-skill:changelog:end version=0.32.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.31.0 locale=zh-CN baseline=sha256:002ad5f00afafc3678c54efbc0fb9ba6dbc3c503cfb38384117d677fcf9364a9 -->
## [0.31.0] - 2026-11-01

foundation-engineering-check 在调用公共API/CLI前，先核验Schema采用、基准信任及选集完整性。真实子检查与来源保留，proof-create 不能冒充实际检查。单独选择此范围时保留真实专业结论，合选语义审阅沿用原流程。旧证明仅可读解释，不重跑、不鉴伪。不强制未采用机器Schema的对象补全Schema。

### 变更

- foundation-engineering-check 在调用公共API/CLI前，真实校验Schema采用、基准信任及选集完整性。保留真实子检查与来源。

### 升级说明

四单元必须精确升级至0.31.0。初始化、其他Skill及既有宿主边界不扩张。局部CLEAR不表示完整Foundation审阅、宿主安装/更新/启用或业务运行成功。
<!-- release-skill:changelog:end version=0.31.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.30.0 locale=zh-CN baseline=sha256:6f237414104d97b225f63cce5c122126928bbb53fbde547a2a020851c05f665c -->
## [0.30.0] - 2026-10-31

foundation-engineering-check 在已选公共调用关系或原生运行闭包内接通 runStaticReferenceCheck API。

### 新增

- 先读原文确认实际调用、解析基准与选集完整性，再分别检查源码及各适配器，不用一处替代其他平台。

### 变更

- 机械结果与语义职责分开，不足项保留 insufficient，不能仅凭局部 CLEAR 跳过语义和覆盖核收。

### 升级说明

四个发布单元须精确锁步采用 0.30.0。未采用机器 Schema 的接口不因此强制补 Schema；原初始化、其他 Skill 与宿主边界不扩展。
<!-- release-skill:changelog:end version=0.30.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.29.0 locale=zh-CN baseline=sha256:cd55773d895c56fc448c0bb68c2e53640abe8cc73e9e5472dde1b1d97df9fd88 -->
## [0.29.0] - 2026-10-26

0.29.0新增foundation-initialize第7步默认TEST与Registry方法覆盖接线，精确依赖agent-method-registry@0.2.0 v1 API，支持显式覆盖与原选择保留，不隐式回退，设计开发与发布两流消费同一选择并各自验证业务结果。

### 新增

- 新增foundation-initialize第7步默认TEST接线，依赖agent-method-registry@0.2.0 v1公共API
- 新增项目entries/overrides或外部插件覆盖默认TEST的能力，支持显式选择
- 非空项目重入时保留合法原选择，禁用/坏覆盖/缺入口/缺验证根/歧义仅停止调用不回退
- 初始化入口不代签，设计开发与发布两流独立验证业务结果

### 升级说明

0.29.0版本四个发布单元精确锁步，新增初始化第7步默认TEST与agent-method-registry@0.2.0 v1方法覆盖接线。P1支持宿主仅限codex和claude-code。项目选择必须有效，外部插件需显式指定；禁用、坏覆盖、缺入口、缺验证根、歧义等五类失败仅停止对应依赖调用，不触发默认行为回退。本轮验收仅覆盖第7步存量工程重入、五类失败情形及12个plan/run入口组合的解析验证，该12个组合为解析验证数，非业务运行次数，不构成完整初始化、宿主安装加载或全宿主支持的证明。
<!-- release-skill:changelog:end version=0.29.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.28.0 locale=zh-CN baseline=sha256:156f724fe79ea483310fe6710f36954c1ce22cd4c7ff94f80c64b407d6e3fdd2 -->
## [0.28.0] - 2026-10-24

Foundation Adoption Review 0.28.0 保持三个 Skill 入口，与新增 Windows 能力的 Foundation 三包锁步前移。

### 变更

- 既有初始化接线参考新增 Windows 显式投影参数及 v3 文档说明。Skill 业务指令与原职责保持不变。

### 升级说明

Plugin 须与三个 npm 包精确锁定 0.28.0 安装。所选 WorkBuddy 手动路径的业务证据不证明自动宿主构建，也不覆盖全部模型或宿主。安装、实际加载、setup 与业务完成为独立阶段，本说明不替代发布后核验。
<!-- release-skill:changelog:end version=0.28.0 locale=zh-CN -->


<!-- release-skill:changelog:start version=0.27.1 locale=zh-CN baseline=sha256:227cd9a4b29497baff4a8dfa3ee54f197c3a5afc1f9025e320c84ff6ed013baa -->
## [0.27.1] - 2026-10-21

Foundation Adoption Review 0.27.1 与四个发布单元锁步前移，未新增 Skill 行为或共享运行时 API。已发布的 0.27.0 不改写。

### 变更

- 没有新增能力。插件按 0.27.1 重新发布，使四个发布单元保持同一版本坐标。

### 升级说明

本插件须与三个 Foundation npm 包精确锁定 0.27.1。工程包兼容修复在该 npm 版本中，不是新的插件命令。本说明不替代发布后验证。
<!-- release-skill:changelog:end version=0.27.1 locale=zh-CN -->


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
