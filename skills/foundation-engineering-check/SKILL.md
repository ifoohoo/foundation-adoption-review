---
name: foundation-engineering-check
description: Run Foundation's complete static engineering review for a caller-selected scope, or read an existing Foundation professional proof, without executing target scripts or hooks.
---

# Foundation 静态工程检查

这项 Skill 对调用方给出的目标根执行完整静态工程审阅，并将领域结果投影为统一专业结论。它读取声明、公共目录、导出和合同，不运行目标 Skill、业务脚本或 hook（钩子程序）。

采用诊断仍由 `foundation-adoption-review` 负责。该 Skill 仅解释调用方已提供的材料，授权边界不变。本入口不替代 Audit（独立审计）的领域判断，也不将版本检查与入口检查两个机械分支通过合并为整个 Foundation 通过。

## 输入

业务选择仅限三项；输出根由宿主安排，不向业务用户索取临时目录：

1. 目标根。
2. 本次适用的工程范围。可选工程声明、公共能力采用、公共调用关系与参数边界，以及原生文件目录角色区分、原生运行闭包、原生公开边界，以及已选文档结构与字节基准，可分别选择或合选。三项原生工程范围的检查身份和实际范围见原生工程范围小节。未选中的项写入限制，不补跑。
3. 可选的已有本族证明，路径必须落在调用方明确给出的读取根内。有旧证明时只读取，不重新扫描。

不要无条件索取 `token_estimate_record`、固定旧注册对象清单或旧 0.15 能力集合，也不要求全部 Foundation 能力都适用。

## 已有证明

调用方提供旧证明时，仅运行：

```text
skill-family-kit check proof --proof-root <root> --proof <relative> --json
```

该命令解释本族公开领域码，不扫描目标，不追随 `details` 里的路径，不鉴定作者。`pass` 仅表示证明记载可接受。`ENGINEERING_*` 仍按证明中的实际入口和范围解释为局部工程检查结果，不能升格为完整静态审阅。`not_pass` 保留原发现或不完整记载。`unavailable` 表示当前读不到或无法解释；证明正文写着未能检查，仍是 `not_pass`。

人类答复用短回答。按这次读到的内容说明旧证明记载的结论和领域码、当时已覆盖范围和限制、所依据的现有记录，以及调用方下一步。

这次只读取历史，不重新审阅、不鉴伪、不出新证明。旧记载不能证明当前目标已经重验。答复里的 `ENGINEERING_*` 仍只记载证明中实际入口和范围的局部工程检查；固定文件引用不要求工程声明，也不能因此写成完整静态审阅已经通过。没有对应内容时省略该点，不要为凑栏目留空段。

## 无旧证明时的审阅

先按所选范围启用必要的确定性检查，再做需要 LLM（大语言模型）的静态语义审阅。两类结果分开记录，保留真实 `sourceRefs` 和 `reason`。未选中的项写入限制，不补跑。

### 确定性检查

只启用所选检查项及其必要证据对应的命令，并关闭 Git 探测。

选中工程声明时，必须先明确区分以下三个已有入口，不得将任一入口的通过结果视为其他入口已覆盖：

1. **完整工程检查** 使用现有 `runCoreCheck({ root: <target>, allowGitSpawn: false })`，其在已采用骨架的目标根对应生成文件 `<target-root>/scripts/check-core.mjs`（kit 写入的受管骨架，不是本 Skill 随附脚本）。该入口按封闭世界核对登记文件，并在存在有效 `engineering.releaseUnits` 时执行声明式版本核对。若未声明 `engineering.releaseUnits`，则内部版本类检查仍处于 `legacy` 范围；若声明存在但无效，不得回退为成功。
2. **声明式版本入口** 仅核对已声明的发行单元：

```text
skill-family-kit check --root <target> --policy declared --only version --no-git-spawn
```

3. **声明式入口检查** 仅核对已登记的物理入口：

```text
skill-family-kit check entries --root <target> --policy declared
```

`skill-family-kit check --root <target> --no-git-spawn` 与 `runChecks` 的默认 `policy` 为 `legacy`。省略 `--only` 时，仍启用全部九类检查：`contracts`、`drift`、`closure`、`version`、`docs`、`git`、`identity`、`boundary`、`platform`。其中，仅 `version` 子检查核对根 `package.json` 与相邻 `VERSION` 文件，并明确说明未声明范围。嵌套 `package.json` 与历史快照不属于当前发布单元。默认 `legacy` 通过，不能解释为已覆盖全部 `engineering.releaseUnits`。`declared` 版本检查、`declared` 入口检查与 `runCoreCheck` 失败，均不得回退为通过。不得静默变更此默认合同。

`declared` 版本分支仅核对声明的发行单元；`declared` 入口分支仅核对已登记的物理入口。任一命令通过，仅证明所选声明分支成立。未通过时，按以下步骤处理，不得回退为通过。推荐骨架文件（如 `mkdocs.yml`）缺失，不构成必需合同失败；真实必需项缺失仍判定为失败。

原生工程不得将 `runCoreCheck` 视为必跑命令。该入口按封闭世界核对登记文件，未采用骨架的目标将触发 `unregistered-file` 诊断。原生范围继续依据后续语义审阅阅读已有权威材料。

本入口仅执行诊断，不修改目标文件，不自动应用采用计划，不新增迁移控制器。公开边界缺口须列出具体路径；配置变更须路由至已有 `release-config`；不得虚构 config CLI，不得复制发布载荷算法。

这两条命令已经说明当前所选声明分支没有数组，并且未进入实体核对时，只把这一声明项记为 `insufficient`，`reason` 保留这两条命令已经返回的原始诊断。不得把 `insufficient` 写成通过，也不得手填 `FOUNDATION_STATIC_CLEAR`。缺声明只限制这一项。

用户同时选了仍可独立执行的公共能力采用或公共调用关系与参数边界时，这些项继续，不因声明分支没有数组而跳过 `adopt-plan`、公共目录、导出或合同，也不要因此直接出证。

有声明且数组仍在时，下面的原文继续执行，包括「先读检查前提」和后续的 `adopt-plan` 条件。此逻辑仅说明声明分支的执行延续性，不构成对独立公共能力工作的准入限制。

先读检查前提和实际覆盖。`documentState` 表示声明是否足以启动该分支。入口检查依据 `data.entries` 判断；版本检查依据 `data.version.releaseUnits` 判断；两者均仅列出本次实际进入核对的对象。

公共项目清单合同允许 `engineering` 仅声明发行单元或仅声明入口，不要求两者共存。Schema 校验通过后，若当前所选分支无数组，记为 `incomplete`。检查将诊断结果放入底层 `findings`，且未进入实体核对。

1. 对照检查前提、实际已检查对象与对应公共合同，区分材料不足与已核实的违规。
2. 所选分支缺当前声明、且未进入实体核对时，该适用项记 `insufficient`，`reason` 保留原始诊断和原因。
3. 底层数组名为 `findings`，或进程退出码为 1，均不能单独判定为违规。
4. 若存在独立强制合同，且已获取真实违反证据，该项仍记为 `findings`。例如：Schema 本身无效、已声明入口的物理文件缺失、已声明发行单元来源与镜像不一致。不得将所有结构问题统一归为不足。

选中公共能力采用，或静态审阅确实需要采用计划作结构参考时，再运行：

```text
skill-family-kit adopt-plan --root <target> --no-git-spawn
```

`adopt-plan` 仅输出结构采用差异，不执行授权，也不将旧政策结果升格为通用工程结论。

若仅选中公共调用关系与参数边界，且无需上述命令提供证据，不得运行这三条命令。静态语义审阅应直接读取目标实际采用的公共目录、导出与合同。

### 已选固定文件引用

当已选公共调用关系或原生运行闭包包含固定文件调用时，按下述方式核对。先确认这些文字是实际调用，并确认选集涵盖当前范围的全部必要固定引用。

**使用前提**
- 仅适用于已明确的固定文件调用，不支持动态路径、通配符或运行时解析。
- 每个平台（源码、适配器等）的调用需分别记录 `sourceRef`、`line`、`literal`、`baseDir`，不得以一处源码替代其他平台。
- 调用方必须先实际阅读来源与基准说明，确认为真实调用，而非注释、否定句或示例。

**执行流程**
1. 确认调用方已提供获准根目录与解析基准；路径安全机制由 API 调用。
2. 调用 `runStaticReferenceCheck`，传入完整选集。
3. 读取返回的 `professional-conclusion`，逐项核对 `details.references` 中的 `status`、`reason`、`source`、`target` 及 `cause`（若有）。
4. 将实际读取的来源摘要与本次冻结目标的来源摘要进行比对，确保一致性。
5. 若所有必要项均完成且语义前提成立，方可将此机械子项记为 `pass`。

**状态处理**
- `ENGINEERING_CLEAR` 仅覆盖所选固定引用选集，不表示完整 Foundation 静态审阅通过。
- `ENGINEERING_CHECK_INCOMPLETE` 必须在适用检查记录中保留 `insufficient`、来源、未覆盖项，并保留原始 `code`、`kind`（若有）。不得仅写 `limitations` 或直接判定为 `findings`。
- 本入口不处理参数、权限、自然语言条件、方法身份或完整工程审阅，这些职责仍由当前所选语义职责覆盖。
- 未采用 Schema 的接口不强制补 Schema。
- 动态路径、不支持路径不运行目标补证，不增加声明或全语言解析器。不得仅凭局部机械 `CLEAR` 跳过语义和覆盖核收、手填完整 `FOUNDATION_STATIC_CLEAR`；所选范围的完整语义核收完成后，仍按该明确限定范围沿既有 `proof-create` 出证。

**边界与限制**
- 读取失败、文件缺失、来源失配、动态路径均视为检查不足，不作为目标违规。
- 闭包摘要不符或计算失败时，受影响项降级为 `insufficient`，但其他项仍可完成；仅闭包整体失败时，所有参与项转为不足，`closure` 为 `null`。
- 不改变 `root` 与 `baseDir` 的语义，不将闭包相等视为原子快照。


### 已选文档结构与字节基准

当调用方在本次工程范围中明确选择本节作为独立检查项，且未提供任何只读历史证明时，适用本节。该检查不依赖目标是否采用 Foundation Profile、managed-lock 或 Registry 机制；仅选择本节时，不执行工程声明（engineering declaration）、adopt-plan 或其他未选范围的命令，未声明工程清单不影响本节独立运行。

本节的核心任务是确认调用方实际采用的 Schema 与其对应文档、可信 SHA256 摘要来源、给定版本与文件之间的事实关系，并验证当前选集的完整性。所有判断必须基于真实存在的配置与输出，不得：

- 凭源码自造未采用的 Schema；
- 从当前文件摘要反推 expected 基准；
- 将版本标签等同于已证明的文档版本。

实际内容版本约束由已采用 Schema 中的 `const` 或 `enum` 字段明确表达，入口点不提取版本信息，也不推导平台政策。

调用入口为 `runSelectedArtifactCheck({root, artifacts})`，需从精确安装版本的 `skill-family-engineering-kit` 包根目录发起。其中：

- `path` 为根目录内的普通文件路径；
- `schema: {path, dialect}` 指向独立 Schema 文件，支持 `draft-07` 与 `2020-12` 同步对象 Schema（含 `{}`），允许本地 `#` 片段引用；
- `baseline: {sha256, version?}` 必须提供可信摘要，可选附带版本标签；每项至少选择 schema 或 baseline。

CLI 等价入口为：
`skill-family-kit check selected-artifacts --root <dir> --selection <relative-json> --json`
选集文件恰含 artifacts 字段，其值是本次请求数组。

路径安全性由公共 API 实际核验，不可由宿主声称“已安全”代替。当前仅支持 `draft-07/2020-12` 同步对象 Schema，对以下特性不支持：

- `boolean` 类型作为 Schema；
- 外部引用（`$ref` 指向外部 URL）；
- `$async: true`；
- 其他非同步对象 Schema。

上述未支持项将被保留为“检查不足”状态，不执行目标补证或联网验证。

`schema` 与 `baseline` 均为可选对象，二者不强制同时选择。未选择时，整个 checks.schema 或 checks.bytes 为 `null`，不视为“不足”。支持边界明确，不强制补全缺失前提目标的 Schema。

#### 核收真实结果

对 `details.artifacts` 中的 `selection` 原请求与 `document/schemaSource` 回执进行逐项核对，核对原请求各自对应的文档、Schema 来源和可信摘要；CLI 侧通过 `details.selectionSource` 验证选集输入来源，将选集文件的实际来源与摘要核对到本次冻结输入。所有回执信息均基于真实运行时输出，不依赖历史证明或宿主声明。

`checks.schema` 与 `checks.bytes` 的 `status`、`reason` 及原始错误信息必须与实际检查结果一致，`scope.checked` 仅列已完成子项，`details.closure` 提供本次已读取资源的闭包摘要，不是原子快照。`bytes` 字段仅表示实际回传的字节数，不包含文件全文内容，且同 `$id` 缓存不一致或资源摘要冲突时仅报告“不足”，不修改 `$id` 也不清空缓存。

`complete/ENGINEERING_CLEAR` 仅在本节所有选定子检查均实际完成且无发现时生效，其覆盖范围限于当前选集；存在真实发现时状态为 `ENGINEERING_FINDINGS`，同时有不足时保留 `partial` 完成状态，已核发现不得丢弃。无发现但存在不足时为 `ENGINEERING_CHECK_INCOMPLETE`，全部选定检查均不足时为 `not-performed`。未选择的检查项为 `null`，不视为不足。CLI 完整 CLEAR 退出 0，有发现或不足退出 1，用法或未处理机制错误退出 2；退出码 1 本身不能作为领域违规判据。

仅选择本节时，直接保留公共入口返回的真实专业结论，宿主仅在当前获准输出目录保存该结果，随后结束本次检查，并可沿 `check proof` 或 `readProfessionalProof` 解释其记载；读取不重跑、不鉴伪。不通过 `proof-create` 手动填充 `ENGINEERING_*` 状态，也不将局部 `CLEAR` 视为整体通过。若与其他语义合选，该机械输出作为实际检查依据，保留 `sourceRefs/reason` 后继续原有语义审阅与出证流程，调用方仍负责 Schema 采用、基准可信性、平台语义、版本政策与选集完整性。

### 静态语义审阅

声明式版本检查或入口检查已经说明当前所选声明分支没有数组，并且未进入实体核对时，只把这一声明项记为 `insufficient`，`reason` 保留这次命令已经返回的原始诊断。不得把 `insufficient` 写成通过，也不得手填 `FOUNDATION_STATIC_CLEAR`。缺声明只限制这一项。用户同时选了仍可独立执行的公共能力采用或公共调用关系与参数边界时，这些项继续按下面的原文阅读目标实际采用的公共目录、导出和合同，不因声明分支没有数组而跳过，也不要写完这一条就直接出证。有声明且数组仍在时，下面的原文同样继续执行。

按用户选择的范围，阅读目标实际采用的公共目录、导出和合同：

- 工程配置是否与所选公共能力一致。
- 公共调用是否落在已发布入口、参数和失败边界内。
- 每个已选、适用但无法完成的项，必须保留一条 `insufficient` 检查记录；`limitations` 只补充原因，不能替代该记录。未选范围，以及动态运行等固有静态限制，仍可只写限制。不要执行目标来补证。

版本对象分三类：

- npm 包版本：发布包坐标，读包 `package.json` 的 `version` 和依赖声明。
- Contracts 规格版本：协议坐标。公开常量 `CONTRACTS_VERSION` 定义它；Kit 清单生成把它写入项目清单 `contracts.version`，采用计划把它投影为 `contractsVersion`。
- 目标发行单元版本：调用方工程自己的声明，由声明式版本检查核对该单元来源与镜像。

核对版本时，先确认对象，再比较：

1. 读目标实际采用版本的公开说明。
2. 确认该字段由谁生成、由谁消费。
3. 据此判断它属于上面哪一类。
4. 只比较同一对象。

同一份采用计划可以同时写出规格版本和发行包版本。这不表示两者冲突。合同 Schema 的短说明、字段同名或数字不同，都不能单独判冲突。材料不足以确认对象时，该适用项记 `insufficient`。

不新造全语言分析器。看不清就标明限制。

### 原生工程范围的静态语义审阅

原生文件目录角色区分、原生运行闭包、原生公开边界可分别选中，也可与前述范围合选。工程声明缺失不自动阻断这些独立范围；审阅须基于目标已有且获准读取的权威材料，不要求其改写为通用骨架，亦不强制创建通用锁文件或额外声明。原生工程中已存在的 `source-authority`、`runtime-layout`、`.release-skill/project.yaml`，以及对应工具的原始检查输出，均可作为真实职责范围内的依据。文件名本身不构成证据充分性保证，应结合正文内容、实际入口点及关联源码进行交叉核对。

| 检查身份 | 实际核对范围 |
|---------|------------|
| `native_role_separation` | 区分实际存在的源码根、生成投影、运行材料、隔离副本与证据的文件目录角色，核对唯一编辑权威、源与生成物的关系，以及运行材料、隔离副本或证据是否被混作源码或发行内容。依据实际读到的对象和适用合同判断，不将目录角色扩大为智能体职责、工具权限或编排方式审计。 |
| `native_runtime_closure` | 从本次所选原生入口出发，追踪实际依赖的脚本、配置文件、引用资源及公开包调用链路，核对运行布局与源码权威声明、必要成员及其生成关系。仅覆盖已读取并可定位的依赖项；动态引入或未能读取的必要成员保留不足状态，不通过执行入口、构建流程或 Hook 补证。 |
| `native_public_boundary` | 对照目标已有的公开范围权威声明、源码归属、生成物分布及可取得的公开文件清单或专业输出结果，核对所选公开对象与私有研发、证据和运行材料之间的界限。`.release-skill/project.yaml` 的 `publicFiles`、`requiredPublicFiles`、`policy.forbiddenPaths` 可提供已声明边界，但实际载荷范围须由其现有工具输出支持；漏失项列出具体路径，配置变更路由到 `release-config`。不得重建发布载荷解析、白名单展开或摘要算法，不得把 `skill-family.release-integration.json` 扩成平行清单。正式文件不等于公开文件。运行记录与证据分别在 `/.runs/`、`/.evidence/`，二者不得进入公开载荷。 |

每项检查沿用 `checks` 中同名 `id`，记录实际阅读的 `sourceRefs`，在 `reason` 中说明对象、范围、依据与结论。仅覆盖部分请求范围、缺少必要材料或无法确认时，该项记为 `insufficient`，并明确标注未覆盖部分；不可用其他检查通过或总体通过替代。触发前提确实不成立时方可记为 `not_applicable`，并保留可核对的依据。未选中的范围仅列限制，不补扫。

上述为静态专业审阅，不同于 `runChecks` 的机械 `closure` 或 `boundary` 检查。已有原始机械输出仅按其中实际对象、方法与覆盖范围复用；若未执行对应机械项，或其输出不涵盖当前对象，须如实标注“未执行”或“未覆盖”，不得将专业静态判断转述为机械通过。不可仅凭通用锁文件或额外声明缺失判定目标违规，亦不可因原生清单存在即认定闭包或公开边界已通过。

完成所选范围后，仍使用下节既有审阅 JSON 与 `proof-create` 出证，不增加报告格式、字段、状态或检查器。结论仅覆盖本次选中且经实际证实的静态范围，不证明业务运行效果、宿主安全隔离、发布资格或外部动作已获授权。

## 出证

审阅结束后，把领域结果写成 JSON。结构为 `{subject:{ref,revision?}, checks:[{id,status,sourceRefs,reason}], limitations:[]}`。`checks` 不能为空。`status` 只能是 `pass`、`findings`、`insufficient`、`not_applicable`。`sourceRefs` 和 `reason` 必须是这次实际读到的依据，不能手填通过结果。

然后运行：

```text
skill-family-kit check proof-create --review-root <root> --review-input <relative-json> --conclusion-root <root> --conclusion-output <relative-json> --json
```

该命令只做本族结果投影和结构检查，不鉴伪、不重新审阅。已有文件拒绝覆盖。全部适用项 `pass` 才得到 `FOUNDATION_STATIC_CLEAR`。存在真实发现得到 `FOUNDATION_STATIC_FINDINGS`。出现 `insufficient`、未完成覆盖，或全部 `not_applicable`，都得到 `FOUNDATION_STATIC_INCOMPLETE`。

人类答复从本次实际审阅 JSON 和 `proof-create` 结果自然组织完整说明。有对应内容时写清结论与领域码、选中且已审阅范围、关键 `sourceRefs` 与 `reason`、真实发现或不足、已有 review 与 proof 产物路径、未覆盖项和最小下一步。没有对应内容时省略，不要机械填六段空栏目。

完整静态审阅通过，只覆盖这次选中且实际审阅的静态项；动态行为、运行效果和安全隔离仍不在治理证明范围内。

## 明确禁止

- 不运行目标 Skill、业务脚本、hook、安装、资格探测或宿主调用。
- 不把 `ENGINEERING_CLEAR`（局部工程检查通过码）、manifest 存在或两个机械分支通过写成完整 Foundation 通过。
- 不追随证明 `details` 中的任意路径，不鉴定作者，不覆盖旧证明。
- 不修改目标来补治理证据，不自动 apply 采用计划，不新增迁移控制器。
- 不把历史快照或未声明嵌套包当成当前发布单元，不把推荐模板缺失写成必需合同失败。
- 不为原生工程强制运行 `runCoreCheck`。
- 不调用虚构的 config CLI；公开边界配置变更路由到 `release-config`。