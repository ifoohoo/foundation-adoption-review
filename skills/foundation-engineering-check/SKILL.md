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
2. 本次适用的工程范围。可选工程声明、公共能力采用、公共调用关系与参数边界，以及原生文件目录角色区分、原生运行闭包、原生公开边界，以及已选同级适配器共同闭包、已选文档结构与字节基准、来源与生成根方向，以及指定分支字段与 Schema 对应、指定双入口与共同协议声明对应，可分别选择或合选。三项原生工程范围的检查身份和实际范围见原生工程范围小节。未选中的项写入限制，不补跑。
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

### 已选同级适配器共同闭包

该入口在0.36.0版本引入，正式发布版本0.35.0中不包含该功能。未发布源码候选仅用于已授权的开发验证，不得据此宣称功能已正式发布；正式消费必须基于实际安装的精确已发布版本及其公开导出的API。

#### 1. 确认调用者选集与实际对象

- 验证 `request` 中显式列出的 `peerId` 集合与 `peerRoots` 映射键集完全一致，且每个 `peerId` 对应的路径为规范绝对真实根路径。
- 确保 `root` 为目录字符串，经既有 `resolveTargetRoot` 解析后生成 `subject.ref`，不作为 peer 根处理，不对 `root` 进行树扫描。
- 调用方负责保证 peer 间适配关系、源权威、完整选集及授权，不传入自报 `finding` 或预计算闭包。

#### 2. 调用真实包根 API

- 调用入口为 `skill-family-engineering-kit` 包根的 `runPeerAdapterCheck({root, request, peerRoots})`。
- 所有输入在首次 `await` 前完整复制，包括 `request`、嵌套 mapping 与 `peerRoots` 映射表。
- **API 内部完成全部三阶段机制**：
  - 第一阶段：对每个显式 `peerRoot` 执行一次前观察，调用 `createFilesystemRootBinding` 与 `observeFilesystemTree`，记录绑定与成员路径、类型、SHA256、字节数、权限字段。
  - 第二阶段：按 `peerId` 字典序排序，固定首个 `peerId` 为锚点，对剩余每个 `peerId` 调用一次原 `verifyPeerAdapterDirectories` 接口，共 N−1 次（四 peer 为三次）。
  - 第三阶段：对具备前观察的 `peerRoot` 执行一次后观察，调用 `createFilesystemRootBinding` 与 `observeFilesystemTree`。
- 这些阶段由 API 完成，宿主核对 `details`，不额外重复调用观察或 peer 机制。前观察不足时，相应 pair 不调用并保留不足原因；N−1 是完整选集的必需 pair 数。

#### 3. 核查实际 pair、观察与异常

- 仅保留路径、类型、摘要、字节数、权限等字段，不复制 `contentBase64` 或文件全文，不创建永久 manifest、历史基准、锁、控制账或原子隔离承诺。
- 实际成功 manifest 与对应前观察的完整成员/原字节衔接；前后观察不一致、不可用或 manifest 不相符时，撤销关联 pair 的 `checked` 状态及其发现归因。
- 真实原调用结果仍保留供定位，不因漂移或不一致而丢失。
- **闭包相等与 logicalMappings 语义相等为等价关系**，因此仅需 N−1 次锚对调用即可判断全 peer 联合一致性，**不执行全部两两比较**，原机制来源冲突后可能短路，不宣称内部 mapping 子比较已运行。

`scope.checked` 仅列有效的 `pair:<anchor>:<peer>:equivalence`；未调用、未完成或漂移失效的项不列入。

#### 4. 保存真实返回并交 reader

- 宿主在获准证据位置独占保存 `runPeerAdapterCheck` 的完整返回结果，包括 `details` 中的复制 `selection`、前后观察数据、实际 pair 原返回或异常的 `code`、`message`、`details` 及不足原因。
- 不承诺保存 Error 堆栈等全部进程内部对象。
- 将真实返回交由 `readProfessionalProof` 解释，**禁止以 `proof-create` 手填机械结果**。

#### 5. 合选场景下的原件保留原则

- 与语义范围、其他机械范围合选时，**分别保留各范围的原件**，不汇总伪完整。
- 本入口不生成、不合并、不替代任何其他范围的结论，仅输出自身真实调用结果。
- 不因合选而修改 `scope.checked`、`outcome.code` 或 `completion` 的判定逻辑。

#### 6. 完整互斥 completion 与 outcome.code 条件

| completion | outcome.code | 条件说明 |
|------------|--------------|----------|
| `complete` | `ENGINEERING_CLEAR` | 全部必需 pair 有效完成，且无 finding |
| `complete` | `ENGINEERING_FINDINGS` | 全部必需 pair 有效完成，且存在 finding |
| `partial` | `ENGINEERING_FINDINGS` | 有有效 finding，且其他必需 pair 不足 |
| `partial` | `ENGINEERING_CHECK_INCOMPLETE` | 无 finding 但未全部完成，有至少一个有效已完成 pair |
| `not-performed` | `ENGINEERING_CHECK_INCOMPLETE` | 无任何有效已完成 pair（可能已有失败尝试，不等于未调用） |

> **关键边界与失败语义**
> - **真实 `finding`** 仅当满足：
>   - `SFC2004` 且 `details.kind=closure-conflict`
>   - `details.peerId` 属于本次调用 pair
>   - 输入/根/前后观察可对应
>   - 且未被漂移撤销
> - **`insufficient`** 保留于：
>   - 请求结构合法但对实际 SKILL 集合缺漏/悬空的 mapping
>   - 缺失 peer 目录
>   - 不可读/不安全/不支持的 peer 读取
>   - 未完成的 pair
> - **非法全局请求结构**（如未知字段、重复 `peerId`、根键集或坐标格式错误）在检查前抛出参数错误，抛出 `SFC2003`，不返回 `not-performed` 或其他专业结论。
> - **未知运行异常** 继续抛出，不捕获，不改记为 `insufficient` 或 `not-performed`。
> - **外部进程终止** 时不保证结论存在，不承诺完整性。

#### 7. 仅选本机械范围时的执行终止条件

- 仅选本项时，完成保存真实返回并交 `readProfessionalProof` 后即结束，**不进入 `proof-create`**。
- 合选场景下仍遵循原件分存原则，不合并、不伪造、不升格。

> 本入口不判 Audit/SOURCE 规则，不验任意生成器，不承担独立共同资源或平台元数据检查，不证明宿主安装/加载/业务运行/发布。完整源权威静态审阅等仍独立核收，不可由 peer 结论替代。

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

### 来源与生成根方向

公共入口为 `runSourceGeneratedCheck({root, declaration})`，其中：
- `root`：显式非空的本地目录路径，表示声明文件所在根目录。
- `declaration`：相对于 `root` 的 JSON 文件路径，如 `config/source-generated.json`。

CLI 调用形式为：
```bash
skill-family-kit check source-generated --root <dir> --declaration <relative-json> --json
```
- `--json` 为必选项，仅向 `stdout` 输出结构化 JSON 结果。

共享读取合同路径为：
```
skill-family-engineering-kit/source-generated-declaration.schema.json
```
合同 ID 常量为：
```js
SOURCE_GENERATED_DECLARATION_SCHEMA_ID
```
检查使用该共享读取合同核对声明结构；匹配结构不证明项目此前已采用它，不匹配时记为 `insufficient`。

检查机制读取一份真实存在的JSON文件，不接收临时构造的数组或内存对象。可选的共享读取合同位于 `source-generated-declaration.schema.json`，其定义了当前支持的配置结构，但**不证明**项目此前已采用该Schema。其他项目可继续保留旧格式，未匹配的声明将被标记为“不足”而非强制迁移。

未知字段、缺字段、空根数组或版本不匹配时，保留结构错误位置并记为不足，不进入方向判断。合同要求根对象满足以下条件：
- `schemaVersion` 为 `1`
- `kind` 为 `skill-family.source-authority-declaration`
- `mappings` 为非空数组

每条 `mapping` 必须包含：
- 非空字符串 `capabilityId`
- 非空字符串数组 `sourceRoots` 与 `generatedRoots`
- `generator.path` 为非空字符串，表示生成器路径坐标

`generator.checkArgument` 为可选字段，仅用于记录检查参数，**不解析、不传递、不执行**，也不验证生成器是否存在或是否工作正常。

路径坐标遵循以下规范：
- 使用正斜杠 `/` 分隔
- 每段仅允许字母、数字、下划线 `_`、点 `.` 和连字符 `-`
- 不接受空段、`.` 段、`..` 段
- 可省略开头的 `./`，但不支持变量、通配符、排除表达式、反斜杠或绝对路径

检查仅比较路径的**词法规范化形式**，不探测实际文件存在性、符号链接、磁盘大小写归一化或目录层级结构。但会识别路径之间的词法祖先/后代关系，若存在此类关系，当前版本不推断其是否合规，一律记为“不足”。

在同一条 `mapping` 内，若任一 `sourceRoot` 与任一 `generatedRoot` 在规范化后完全相等，则判定为方向冲突。结果将记录该冲突的两个字段的 JSON 指针及共同路径坐标。

跨 `mapping` 之间允许前级生成物作为后级来源，例如 `mapping[0].generatedRoots` 中的某个路径作为 `mapping[1].sourceRoots` 中的某个路径，此为允许的多阶段串联。

无关路径不因文件名相似而被误判为同一根。所有判断均基于显式声明的固定路径坐标，不依赖上下文或隐含规则。

#### 如何判断检查结果

检查结果的完成状态分为三种：
- **complete**：所有选中的 `mapping` 均已完成比较，无论是否发现冲突；
- **partial**：存在已完成的比较，但同条或其他映射仍有未支持的根坐标；
- **not-performed**：没有有效的映射方向比较贡献。

结果中若存在冲突，必须明确列出冲突路径的JSON指针与共同坐标；若存在未覆盖的 `mapping`，也需说明其不足原因（如动态路径或祖先关系的语义未支持）。**结果不证明生成成功、文件存在或运行合规**，也不替代发布资格或运行时验证。所有判断仅限于当前配置中声明的路径坐标，不扩展至祖先关系、执行效果或跨阶段业务合法性。

仅选择本节时，保留 `runSourceGeneratedCheck` 实际返回的专业结论，随后沿 `check proof` 或 `readProfessionalProof` 解释；不通过 `proof-create` 手填 `ENGINEERING_*` 结果，不运行目标生成器或强制工程登记。与其他范围合选时，保留真实 `sourceRefs/reason`、原始发现和不足，再继续原有语义审阅。调用方仍负责声明权威、实际采用和选集完整性。

### 指定分支字段与 Schema 对应

#### runBranchFieldCheck

#### API 定义

`runBranchFieldCheck({ root, branches })` 接受显式非空本地目录路径 `root` 和非空数组 `branches`。每项 `branches` 必须包含以下六个必填字段：`sourceRef`、`line`、`column`、`resultIdentifier`、`schemaRef`、`schemaPointer`。其中，`sourceRef` 与 `schemaRef` 为根内相对路径，分别指向源文件与 Schema 定义文件；`line` 与 `column` 为从 1 开始的安全正整数，精确指向有效 AST 节点的起点；`resultIdentifier` 为符合 ASCII JavaScript 根标识符命名规则的字符串；`schemaPointer` 为空串时表示选中 Schema 根节点，非空时为 RFC6901 指针，指向对象定义。

可选字段 `nodeType` 仅接受 `IfStatement` 或 `BinaryExpression`，省略时默认为 `IfStatement`。节点起点必须精确匹配 AST 中该节点的起始位置：`IfStatement` 指整个 `if` 语句的起始位置（即 `if` 关键字所在行列），而非其 `test` 子表达式的起点；`BinaryExpression` 指该表达式自身在源码中的起始位置，不能以根标识符或运算符位置替代。在无括号的直接比较中，节点起点与最左端根标识符重合；若左侧成员访问带括号，节点起点可能从左括号开始。例如 `export const ok = (packet.status) === 'READY';` 中，`BinaryExpression` 节点起点为 `1:19`，根标识符 `packet` 起始于 `1:20`，若选择 `1:20` 则无法匹配有效节点，返回 `insufficient` 且不执行任何比较。

若存在未知字段、未知 `nodeType`、必填字段缺失或重复选择（以六字段身份与有效 `nodeType` 为依据去重，省略 `nodeType` 与显式指定 `IfStatement` 视为同一项），均按参数错误拒绝。整个请求（含显式 `nodeType`）在首次 `await` 前完成复制。

#### CLI 命令  
`skill-family-kit check branch-fields --root <dir> --selection <relative-json> --json`  
- `selection` 文件仅允许 `branches` 字段，与 API 一致；  
- 复用既有严格选择文件读取方式；  
- 缺参数、缺 `--json`、未知或重复选项、坏请求时退出码 2；  
- 产生真实发现或检查不足时退出码 1；  
- 仅当结果为 `complete / ENGINEERING_CLEAR` 时退出码 0。

#### 输出结构

结果采用 `professional-conclusion` 格式：

- `provider.entry`：`runBranchFieldCheck`；
- `subject.ref`：实际根路径；
- `details.branches`：保留原六个选择字段及 `index`、`source`/`schema` 摘要、`status`、`reason` 和 `comparisons`。仅当调用方显式传入 `nodeType` 时才回显该字段，旧请求不额外补写；
- `details.closure`：既有闭包信息或 `null`。

每条 `comparison` 包含：

- **源码字段链**：属性链的数组形式，表示从 `resultIdentifier` 开始的字段访问路径；
- **运算符**：`===` 或 `!==`；
- **字符串字面值**：运算符右侧的字符串字面量；
- **字段 Schema 指针**（`schemaPointer`）：字段对应的 Schema 指针；
- **`status`**：取值为 `checked`、`findings` 或 `insufficient`；
- **`reason`**：具体原因说明；
- **实际存在的 `enum`/`const` 成员**：列出 Schema 中实际声明的枚举或常量值。

`scope.checked` 仅列出已完成比较的 `branch-<序号>-comparison-<序号>`，其中第一个序号对应 `details.branches` 中的 `index`（从 1 开始），第二个序号对应该分支内 `comparisons` 数组中的位置（从 1 开始），两个序号共同标识一次比较，组合保持唯一。

当字段没有 `enum` 或 `const` 定义时，仅完成字段定位，不认定字面值有效。

## 算法与错误处理

#### AST 选取规则

仅匹配指定类型且起点唯一、精确的 AST 节点；无匹配或不唯一时返回 `insufficient`，且 `comparisons` 为空。`IfStatement` 仍对其 `test` 按原有限 `&&`/`||` 叶子算法进行检查。`BinaryExpression` 仅承接同一行、以 `resultIdentifier` 为根的非计算、非可选 ASCII 直接属性链、`===` 或 `!==` 运算，且右侧无转义字符串字面量。在 `BinaryExpression` 模式下，若选中节点但语法不支持，或位置不匹配、不唯一，均返回 `insufficient` 且 `comparisons` 为空。新模式不选择整个 `LogicalExpression`，需多个比较时调用方应分别选择叶子节点。注释、字符串、函数调用、可选链、计算属性、模板字面量、其他语言或位置不符的节点均不猜测。保持原 Schema 的 `properties`、`enum`、`const` 支持边界，所有实际读取资源摘要闭包与漂移撤销机制不变；闭包非原子快照，不执行源码，不推断运行真假或完整覆盖。

#### Schema 核对规则  
- 仅从所选对象沿直接 `properties` 链定位；  
- 仅核对直接 `enum` 或 `const` 的成员关系；  
- 选中路径上的 `$ref`、组合、条件、`patternProperties` 或未知约束原则上保留不足；本批唯一的排除形状如下，不增加通用求解器；  
- 即使是本地片段 `$ref` 也不解析；  
- 无关兄弟属性的约束不影响已选字段；  
- 缺字段仅在以下条件成立时可产生 `findings`：  
  - 该层 `type` 为 `object`；  
  - `properties` 为对象；  
  - `additionalProperties` 为 `false`；  
  - 无其他不支持约束；  
- 缺字段时，开放对象或不确定封闭性为 `insufficient`；已声明字段不因对象开放而失去直接定位依据；  
- `enum` 必须为非空数组，`const` 使用真实 JSON 值，逐一比较实际字符串成员；  
- `enum` 与 `const` 同时出现时分别核对，不把它们合并成另一套值域；没有两者时只贡献字段定位；
- 不判断其他 Schema 条件、完整对象有效性、业务状态或分支穷尽。

#### 其他同级字段的条件必填边界

当仅检查所选对象的直接属性时，可排除一类不涉及目标属性的条件必填结构：该对象的 `allOf` 必须为非空数组，且每项恰好包含 `if` 与 `then`；其中 `if` 仅含 `properties` 与 `required`，`then` 仅含 `required`。`if.properties` 的键以及两处 `required` 数组中的成员必须均为该对象已声明的其他同级属性，且不得包含目标属性。此排除仅基于结构与名称匹配，不涉及条件求值、不解析子 Schema 内容，亦不推导整对象是否可满足。

其他组合形状、`else` 分支、选中路径的引用，或这三处名称位置涉及目标属性时，均视为不足。该边界不扩展至多层属性链的嵌套组合推导。必须保留限制说明：未检查其他字段的条件必填状态，不证明比较值在任意整对象中有效，亦不保证完整状态全集或 Schema 合规。沿用原有 `scope.checked` 与 `limitations` 表达，不新增请求参数或协议字段。

原 `release-run` Schema 的两项根条件仅依据 `command` 与 `stateSequence` 要求其他字段存在，未涉及 `status`。因此，可核对原源码中对 `status` 的引用、Schema 直接声明该字段，以及 `PARTIAL` 属于其直接枚举。不得删除原件 `allOf` 或替换为简化 Schema。

#### 闭包与漂移处理  
- 读取、解析失败或不支持语法均视为 `insufficient`，不将缺资源转化为产品字段发现；  
- 结果保留读入字节摘要；  
- 闭包再读与原摘要不一致时，将依赖这些资源的比较（包括 `findings`）降为 `insufficient`；  
- 同一路径多次读取有冲突也降级；  
- 闭包失败使对应观察全部不足。

#### 状态判定逻辑  
- 有发现加未知 → `partial / ENGINEERING_FINDINGS`；  
- 没有有效贡献 → `not-performed / ENGINEERING_CHECK_INCOMPLETE`；  
- 全部支持且无发现 → `complete / ENGINEERING_CLEAR`；  
- 独立未知不抹除另一项有稳定前提的 `findings`：  
  - 有发现 + 未知 → `partial`；  
  - 无有效贡献 → `not-performed`；  
  - 全部支持且无发现 → `complete`。

既有 reader 仅解释局部结论，不重跑、不认证作者，不将局部 `CLEAR` 提升为完整工程审阅或发布批准。


仅选择本节时，保留 `runBranchFieldCheck` 实际返回的原始专业结论，再由 `check proof` 或 `readProfessionalProof` 解释。与其他范围合选时，本节的局部事实不代替其他范围的审阅，也不将结果改写成完整工程通过。

### 指定双入口与共同协议声明对应

本小节仅在调用方明确选择该范围时执行，且依赖 Engineering Kit 与 foundation-adoption-review 0.34.0 版本。源码候选状态不等同于正式发布，调用前需明确本地读取根目录。

调用方须明确提供输入：既有 Skill 身份字段、Python 路由文件中根级纯字典的完整语句行范围、常量名与选定键名、共同 Method 的四 RFC6901 指针（分别指向方法身份、profile、参数 URI、输出 URI）、以及权威 task/result/parameters/domainResult 四 Schema。四指针用于定位实际 JSON 值，不要求固定字段名。公开性、同一业务上下文、条件一致性、Schema 权威性及选集完整性由调用方或审计方负责，系统不主动验证或强制修改原始声明。

实际执行通过 `runPublicSurfaceBindingCheck({root, bindings})` 或 CLI 命令 `skill-family-kit check public-surface-bindings --root <dir> --selection <relative-json> --json` 完成。选集 JSON 仅包含 `bindings` 字段，结构与公开 API 一致，不包含额外元数据或逻辑。输入完整嵌套结构由 Engineering Kit 的 `runPublicSurfaceBindingCheck` 公开 API 说明定义，本节不重新实现或维护算法逻辑。禁止使用人工语义判断或手填通过码替代机械调用。

机械比较六组直接值：Skill 身份对 Method 身份；Python 路由中选定字典值对同一 Method 身份；Method 的 taskContract 与 resultContract 分别对 task 和 result Schema 的根 `$id`；参数与输出 URI 分别对 parameters 和 domainResult Schema 的根 `$id`。不解析 URI 为文件路径，不因错误 URI 切换至另一份 Schema。所有比对基于原始声明值，不进行路径推导或语义归一化。

执行后保留原始返回的 `professional-conclusion`，并使用 `readProfessionalProof` 或 `check proof` 解释其内容。完成状态（`complete`、`partial`、`not-performed`）与 ENGINEERING 状态码（如 `ENGINEERING_CLEAR`、`ENGINEERING_FINDINGS`、`ENGINEERING_CHECK_INCOMPLETE`）为独立字段，需分别保留，并保留 `scope.checked`、`scope.limitations` 与实际读取来源。若结果为 `partial` 或 `insufficient`，不得标记为完整通过。漂移导致的绑定失效按原入口整组失效处理，不手动恢复 findings 或修改 checked 状态。

当仅选择本范围时，直接交付原始专业结论与读取器返回结果，不进入手写 review 或 proof-create 投影流程。若与其他机械或语义范围合并选择，各范围结果分别保留原件，局部 `CLEAR` 不代表整体 METHOD003 合规，亦不覆盖运行时分派、安装加载、发布授权或业务同一性等更高阶保证。

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

仅选择“已选同级适配器共同闭包”、“指定分支字段与 Schema 对应”或“指定双入口与共同协议声明对应”机械范围时，保留公共入口返回的原始专业结论，并由原证明读取器解释，不进入下述手写审阅投影。与语义范围合选时分别保留实际原件，不以手填工程码替代机械结果。

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