# Foundation 公共机制接线

本参考支撑 `foundation-initialize` 的第 4～6 步，说明 Engineering Kit 四个命令与五类公共机制的采用点和调用前提。正式合同以当前采用的精确版本包内源码与公开目录为准：`skill-family-engineering-kit` 的 `src/scaffold.mjs`、`src/skeleton.mjs`、`src/adopt-plan.mjs`、`src/relock.mjs`、`src/projection.mjs`、`src/cli.mjs`、`src/host.mjs`，`skill-family-harness-node` 的 `src/token-estimate.mjs`、`src/chokepoint.mjs`、`src/strict-read.mjs`、`src/atomic.mjs`，以及 `skill-family-contracts` 的 `src/schemas/adapter-source.schema.json`。本参考解释方法，不复制上游 API 全文。

## Kit 命令的采用点

### 空目标：`scaffold`

```text
skill-family-kit scaffold --root <target> --project-id <id> --profile generic --licensing-profile <licensing-id>
```

- 许可证 Profile 使用已确认事实对应的 `<licensing-id>`；该 Profile 有多个变体时同时传 `--licensing-variant <variant-id>`。Profile 携带的作者与许可信息必须与已确认事实相符；缺少匹配 Profile 时保留该接线缺口，不套用默认身份。
- 所选稳定机制可重复传 `--capability <id>` 声明。
- 目标父目录必须已存在；非空目录、符号链接和非法参数由原生错误拒绝，不建备用写入器。
- 结果中的 `files`、`verifications`、`closure`、`referenceImplementation`、`selectedCapabilities` 只证明生成与结构事实，不证明业务正确。
- 默认 `generic` 种子保留私有示例包与工程自检；业务源码选择 `skills/<skill-id>/SKILL.md` 及同目录 `references` 等必要文本。纯 Skill 不把示例包当作运行入口，也不把 `packages/**` 加进业务投影或发布白名单。

所选 SDK 确实提供新参数时，可在原 `scaffold` 命令后增加 `--engineering <JSON>`，或调用 `scaffoldTarget({ ...options, engineering })`；`describeSkeletonFiles({ ...inputs, engineering })` 使用同源内容。这里 `<JSON>` 是工程对象的 JSON 字符串，不是文件路径。该参数属于本地 `0.24.0` 候选，正式 `0.23.0` 不支持；省略保持原字节和路径，`null`、`{}`、未知字段和非法引用拒绝。

声明沿用 Contracts 的项目清单字段，取自真实业务定义：`entries` 每项包含 `name`、`form`、`physicalRef`，`form` 仅限 `skill_md` 或 `file`，前者指向 `SKILL.md`；`releaseUnits` 每项包含 `id`、`versionSource`，可选 `versionMirrors`。文本版本引用需 `path` 与 `format: "text"`；JSON 引用使用 `path`、`format: "json"` 和非空 `jsonPointer`。版本取自真实业务版本源，不取工程示例包、SDK 或 Profile 版本，不因 `package.json` 存在推导 npm 分发。

初始声明写入 `skill-family.project-manifest.json`，清单摘要与原 `skill-family.managed-file-lock.json` 由同一骨架生成器派生，不手写生成物。空目标只验证合同与根内路径形态，允许声明业务作者稍后创建的文件，不确认引用已存在，也不代写业务内容。事实未齐时保留不足，真实源落盘后再用官方更新与静态检查；只声明一分支时，缺失的另一 declared 分支仍为 `incomplete`。

### 非空目标：先 `adopt-plan`（严格只读）

```text
skill-family-kit adopt-plan --root <target> --project-id <id> --profile <profile-id> --licensing-profile <licensing-id> --no-git-spawn
```

- 项目身份、工程 Profile 与许可证取自既有工程和用户已确认的事实，不用目录名或默认 Profile 替代；多变体许可证同样传 `--licensing-variant`。
- 输出 `writeSet`、`conflicts`、`risks`、`verificationPlan` 供判断；该命令不写任何文件。
- 初始化只按用户已批准的写集做必要增量，不自动执行整个计划；`handwritten-conflict` 或 `managed-drift` 不通过覆盖解决。写入中途失败时如实报告失败节点与实际保留内容，保留已创建内容和原生输出，不承诺整次回滚。

所选 SDK 支持时，`adopt-plan` 可加 `--engineering <JSON>`，或调用 `planAdoption({ ...options, engineering, allowGitSpawn: false })`，提供与 `scaffold` 同源的工程声明内容。CLI 参数的值是工程对象的 JSON 字符串，不是文件路径。该机制不改变严格只读边界：不写任何文件，包括临时文件；`writeSet`、`conflicts`、`complete` 不授权执行，也不证明业务资格。`--engineering` 与 `--engineering-baseline` 独立，后者仍须与 `--compare-skeleton` 成对；能力目录查询不能混入工程声明。

本地 0.24.0 候选中，当目标工程的 `skill-family.project-manifest.json` 中存在 `engineering` 字段时，采用检查将调用已有的 `runCoreCheck` 进行完整工程验证；若该字段不存在，则沿用原有的 `runChecks` 作为 legacy 检查路径。计划阶段提供的 `engineering` 参数仅用于描述拟议生成内容，不能作为目标当前已采纳的事实依据，任何畸形声明均不得回退为通过状态。`migration.check.green` 取自实际检查报告的 `ok`，原冲突、待执行写入、旧实现退出、绑定关系以及 `unit`、`integration`、`consumer`、`independentAudit` 四类证明门槛维持不变，检查通过不等同于迁移完成，也不证明业务资格。

现有受管项目在获准写集内，用 `runProjection({ root: targetRoot, engineering })` 更新声明，CLI 为 `skill-family-kit projection --root <target> --engineering <JSON>`。该操作完整替换整个 `engineering`，不做深合并；传入完整已确认对象，保留仍需使用的旧 `entries` 和 `releaseUnits`。不能与 `manifest`、`candidateRoot` 或 `preparedProjection` 同传。这条新路径属于本地 `0.24.0` 候选，正式 `0.23.0` 不支持；采用前核对实际公共接口与三包精确锁步来源，不从版本号推导能力。

更新前，目标须为现有普通根，具备有效普通 registry、项目清单和受管锁。清单与锁均已由 registry 和 `managedFiles` 声明受管，清单锁条目由 Engineering Kit 拥有；其他受管文件须与原锁匹配，无缺覆盖、重复或未拥有的锁条目。业务入口和版本引用须为根内现存普通文件。缺前提只暂停这条更新路径，不自动接管任意非空项目，也不手写清单或锁候选掩盖漂移。

合法更新仅修改 `skill-family.project-manifest.json` 和 `skill-family.managed-file-lock.json`。其他清单字段、registry 与其他文件字节、其他锁条目、生成器、版本、`lockVersion` 和 mode 保留；清单摘要由原生成器派生，同内容幂等。结果沿用 `schemaVersion: 2` 的 `skill-family.projection-receipt`，内存候选的 `candidate.root` 和 `manifest.location` 为 `null`，不新增状态文件。

保留原始已核引用快照，重复读取不能替换基线；每次实际修改前及完成后重验。首写前拒绝不执行恢复写，未尝试输出的外来字节保留。实际尝试写入失败沿既有错误、验证和尽力回滚，仅恢复本模式实际尝试的路径；不承诺整次初始化、恶意并发或 ABA 事务安全，原 v1/v2 与 prepared 保护保留。

真实源尚未落盘时，如实报告不足；一旦落盘并完成合法更新，需使用所选 SDK 的公共 API `runCoreCheck({ root: targetRoot, allowGitSpawn: false })` 执行完整工程检查，并分别运行 `skill-family-kit check --root <target> --policy declared --only version --no-git-spawn` 与 `skill-family-kit check entries --root <target> --policy declared`。普通命令 `skill-family-kit check --root <target> --no-git-spawn` 保留 legacy 诊断能力，不可替代完整 core 检查或两个 declared 分支的独立校验。仅声明 `entries` 或 `releaseUnits` 之一时，另一项仍视为 `incomplete`；省略对象时保持旧行为，不表示声明已完成。生成、计划、静态检查、正式发现、真实业务、独立语义审阅与整体资格须分别报告。

### 新增文件登记：`check relock`

```text
skill-family-kit check relock --root <target> --files <relative-paths>
```

- 默认类别是 `handwritten`。`--files` 是逗号分隔的显式清单，只登记真正新增且尚未登记的手写源；拒绝既有受管文件漂移，不用来洗掉差异。
- 生成源变更遵守目标原有 synth 规则，不手改受管文件。
- 支撑工具的受管或可再生输出（如宿主投影、构建清单、生成锁）和运行日志，按项目既有分类及原生成入口处理，不纳入手写登记。缺适用公开入口时保留该接线缺口，不手改 registry、不新建分类器；不用自动发现纳入无关文件。
- 工具生成不等于可忽略缓存。持久工具锁须遵守提供方公开合同，保存在不被忽略的项目路径。按 `artifact-graph` 的 `INSTALL.md` 中“Store locks per project”约定，默认锁路径为 `artifacts/traceability-version-lock.json`，不得放入被忽略的 `/.artifacts/`。
- 持久锁由原工具生成，并通过目标既有正式声明或生成入口归类，不手拼登记表或摘要。缺少适用登记入口时，仅将对应工程资格标为未通过，列明具体接入缺口；其他不受影响的路径继续。

持久工具锁使用独立的登记类别，不归入手写源。API 参数 `registrationClass` 只接受 `handwritten` 或 `trackedToolLocks`；CLI 对应 `--registration-class`。已采用的精确版本公开接口支持新模式时，显式登记原工具生成的锁：

```text
skill-family-kit check relock --root <target> --registration-class trackedToolLocks --files <relative-paths>
```

`trackedToolLocks` 必须提供非空显式清单，其中每个路径都须指向目标内现存的普通文件；不执行自动发现。沿用原有路径、符号链接、已登记路径、状态文档和受管漂移拒绝规则。登记表缺省 `classes.trackedToolLocks` 时，在同一原事务中初始化其 `entries` 数组，再追加明确路径；类别字段已存在但不是对象，或 `entries` 不是数组时，拒绝处理，不覆盖异常字段。事务仍只更新原 registry 与受管文件锁，不把工具锁内容纳入受管摘要，不读取内容推断工具语义。

默认手写模式及其缺省或空清单时的自动发现行为不变。本新增模式属于待发布实现，不表示基线 `0.23.0` 已支持；正式采用以实际发布版本的公开接口为准，缺少该入口时保留对应接线缺口。

### 宿主投影：`host-build`

1. 由调用方读取 `skills/<skill-id>/` 下明确获准的文本，组成 `adapter-source`：`schemaVersion`、`kind`、`skillFamilyId`、`skills`；每项含 `id` 与 `files`，每个文件含 `path`、`content`，至少包含 `SKILL.md`。相对引用的全部必要文本进入同一闭包；二进制资源不在该合同内；不把完整工程目录当作输入。组成前先确认：凡将作为目标宿主正式入口的 `SKILL.md`，其字节必须已携带该宿主加载器要求的 YAML frontmatter（Codex：`---` 包裹，含 `name`/`description` 等该宿主合同要求字段；字段清单以该宿主正式合同与 Design 记录的宿主事实为准，不虚构）。`host-build` 对 `skill-directory-v1` 做字节透传，不替你校验或注入 frontmatter；缺 frontmatter 的输入会被原样投影，随后被宿主加载器拒绝（Codex 0.154.0 实测报 `missing YAML frontmatter delimited by ---`）。落盘前由调用方静态正面校验 frontmatter 存在性与必需字段，不以运行时试运行代替该校验。
2. 用 `describeHost` 或 `adopt-plan host-describe` 读取目标宿主描述符，选择其中实际存在的 `pathCategoryId`。宿主描述符根必须由调用方显式提供：CLI 传 `--hosts-root <dir>`（已安装包内为 `data/hosts`），API 则注入 registry；描述符不来自猜测的默认路径。
3. 落盘使用：

```text
skill-family-kit scaffold host-build --root <target> --host <host-id> --path-category <category> --input <manifest-path> --out <build-dir>
```

- 在目标工程内的新构建目录生成，不直接安装到用户目录；构建清单与闭包由既有机制派生，不维护第二份摘要登记。
- 首版自动投影与真实入口验收以 Codex 项目级 Skill 为代表，对应描述符映射到 `.agents/skills`；试用固定以 `<target>/<build-dir>` 为工作目录，从其中的 `.agents/skills` 正式发现候选，不把同一产物复制到另一处发现目录。
- 发现证据记录本次试用工作目录、宿主正式入口列表中的技能身份及来源路径，并能与构建清单成员一一对应；无法区分候选与父目录或用户目录中的同名入口时，发现资格标为未确认。宿主当前不能从该工作区正式发现入口时，报告该路径未通过，不临时改用直接读取正文作为成功依据。
- 其他宿主按描述符的 `supported`、`manual`、`unsupported` 原样处理：`supported` 只表示机制可构建，仍需实际发现与业务试用才能声称入口可用；`manual` 路径（如 Kimi）不包装成自动接入。
- 普通受管工程投影继续用 `skill-family-kit projection --manifest <relative-path>`；它不是任意宿主安装器。

### 能力目录查询

```text
skill-family-kit adopt-plan --list-capabilities --all --scope <scope>
```

先取当前用途范围，再按 `--capability <exact-id>` 展开。`--scope` 取自同版本目录，不自造。初始化提供实际业务节点和精确目录给 `foundation-adoption-review` 作只读判断；每项采用在目标 Design 制品中记录直接采用、薄适配、领域保留或上游缺口，说明调用位置、输入输出、策略、责任和最近验证。

## 五类公共机制的采用前提

| 需要保障的节点 | 公共入口 | 调用前提与剩余责任 |
| --- | --- | --- |
| 上下文内容估算 | `estimateTokens` / `estimateTokenUpperBound`，或 `skill-family-token-estimate --file <path> --estimator both` | 前者是启发式估算，后者是 UTF-8 字节上界，范围均仅 `content-text-only`；宿主容量、非文本输入与全部上下文预算不能由它证明 |
| 已登记对象校验 | Contracts 的 `validateDocument` / `compileSchema` | 调用方选择合法 Schema、检查 `valid`，业务字段与语义归目标技能族；不能假称已登记对象覆盖任意交接 |
| 获准路径读取 | `createReadChokepoint({ allowRoots, allowIdentity })` | 允许根、身份规则与调用路由由调用方提供；只保护经过它的 I/O，不控制宿主其他工具 |
| 冻结材料读取 | `readFileStrict(root, relPath, { encoding, expectedSha256 })` | 摘要的可信来源与业务新鲜度由调用方负责；不自己复制严格读取算法 |
| 文件输出 | `writeFileAtomic`；拒绝覆盖用 `publishFileExclusive`；获准替换用 `replaceFileAtomic` | 内容、路径策略、覆盖授权与后续行为由调用方负责；单文件原子性不代表整任务事务 |

只有实际需要机制执行的业务才增加调用机制的薄脚本；纯文本 Skill 不为形式完整强插代码。未修改上游内部算法时复用其同版本证据，目标侧只验证入口、参数、机制组合和领域结果。实际写出节点需要的保证无法由运行版本满足时，说明所缺保证、只暂停依赖片段，最小能力缺口交上游，不在目标工程生成平行机制；调用前提不符时指出具体条件，保持该接线未完成，原输入和已有输出保持可检查。
