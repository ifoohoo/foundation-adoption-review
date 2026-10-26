# 支撑技能族接线

本参考支撑 `foundation-initialize` 的第 7 步。发布、制品、知识站与独立审计分别由对应专业方负责；本入口只按适用范围接线并解释结果，不复制它们的机制，也不把接线成功合并成单一完成结论。各项能力的正式合同以当前采用版本的公开技能正文为准；以下只说明调用顺序与授权边界。

## 发布接线（release-setup / release-assess）

目标尚无正式发布配置时按原生首次接入处理：官方工程骨架只含占位文件 `skill-family.release-integration.json`，没有 `.release-skill/project.yaml`。从宿主实际技能元数据解析 release-skill CLI 入口后，按正式技能执行：

1. `setup --root <target> --json`：只读发现，机械提取 `recommendedAnswers`；发现冲突先解决，不猜测选边。
2. 用户基于已知事实选择发布单元、公开文件、版本与必要验证。纯 Skill 单元使用 `distributions: []`；工程私有包不是 npm 发布单元。
3. `setup --root <target> --answers <answers> --json`：形成绑定报告，展示配置差异与精确 `setupDigest`；答案修改后重新绑定。
4. 用户确认该精确摘要；已有初始化授权不等于对未展示配置的确认。
5. 确认后以 `--write --confirm-setup <digest>` 首次创建；观察到 `CONFIG_CREATED` 后再次发现应返回 `ALREADY_CONFIGURED`。
6. 运行 `setup --assess-adoption`：仅当结果为 `ADOPTED` 或 `ADOPTED_WITH_SUGGESTIONS` 且退出码为 0 时，接入检查通过。
7. 执行 `assess --root <target> --offline --json`：仅当返回 `ASSESSED` 且退出码为 0 时，报告离线评估完成。不继续执行 `prepare`、`publish` 或 `verify`。

完整报告与会话文件按发布技能的原步骤保留和清理，只把原生紧凑结果交回初始化入口，不另建发布记录。目标已有正式配置时，转只读评估与获准增量修改，既有配置字节保持不变，禁止删除后重建。无远端时保留 `LOCAL_ONLY_DETECTED`，只交付本地结果；`distributions: []` 仍需独立授权 GitHub 发布，不能从配置存在推导远端已存在。

### 公开边界、运行目录与配置路由

公开载荷的权威定义来自目标项目中已存在的 `.release-skill/project.yaml`，其 `publicFiles`、`requiredPublicFiles` 与 `policy.forbiddenPaths` 三项字段共同构成公开范围的依据。工程内部的正式文件不自动等同于公开载荷。骨架中的 `skill-family.release-integration.json` 仅为接线占位文件，不可扩展为第二份公开清单，也不得用来覆盖或补充 `.release-skill/project.yaml` 的声明。

扫描阶段需明确列出三类问题：一是缺失的必需公开文件（路径必须具体）；二是误入载荷的日志草稿或私有设计；三是尚未确认是否公开的项。配置变更走已有 `release-config` 技能：确认是配置-only 差异后，按该技能评估、准备与写入。禁止虚构 Foundation 自带的 config CLI，禁止自动覆盖已有配置，禁止把接线成功写成已发布。

运行记录只放根级 `/.runs/`，证据只放根级 `/.evidence/`。这是新项目默认目录约定，不是强制把旧运行目录迁过去。这两个默认目录会被忽略，不进入跟踪源面，也不进入公开载荷。公开边界核对使用目标已有 `.release-skill/project.yaml` 和 release-skill 的原生结果；本入口只核对接线参数、列出具体漏失项并路由到 `release-config`，不复制载荷算法。

## 制品接线（artifact-chain-assistant / artifact-graph）

- 由 `artifact-chain-setup` 检查环境，`artifact-chain-bootstrap` 选择最小制品类型、路径和配置；再用需求、场景等专业制作入口编写内容。
- 存量目标先诊断已有接线，不隐式升级；语义审阅完成后才建立或刷新关系锁；不自动安装 hooks，不运行 `bootstrap --force`。
- 制品工具能读到已登记关系才算接通；缺失项在结果中明确列出。图检查通过不代表内容正确。

### 初始化推荐与权威路由

Graph 拥有共同最小清单、项目类型标准、阶段项和条件项；Assistant 拥有模板、制作方法与项目采用；Foundation 只做初始化推荐与交接，不另存一份清单真源。

读取路径：沿目标工程已安装、可核验的 `artifact-graph` 运行时包定位公开数据，消费子路径 `artifact-graph/project-artifact-profiles`。`schema_version` 必须为 `1.0`。不导入相邻 Graph 工作树源码，不把工作区源码目录或本机旧 CLI 当作本入口的提供方。当前锁定的已发布包 `artifact-graph@0.12.0` 的 `exports` 不含该子路径；未发布候选不得表述为已发布能力。

读取成功时按下列规则推荐，并解释选择依据：

- **来源区分与依据说明**：按输出字段区分来源：`common_minimum`、`project_standards`、`lifecycle`、`conditional`。每项推荐须明确指出其来自哪一类，并说明该类内容为何适用于当前项目。
- **普通技能族初始化**：仅当清单中存在已批准的 `skill-plugin` 类别标准时，推荐该类别标准及其声明的追加类型；不得把旧 `SHAPE_CANDIDATES` 或其他形态表当成强制标准。其余项目形态只按共同最小集与实际条件形成候选。
- **项目追加项**：结合真实业务与 `lifecycle`、`conditional` 中的适用条件，提示可能需要追加的类型；条件由技能解释，不新建条件解释器。项目明确选择后，由项目自己保存采用结果。
- **存量扩展兼容**：已有配置、方法绑定和项目已启用的额外类型全部保留，不因推荐清单而删除或覆盖，不强制填充无关空模板。
- **推荐不自动启用类型**：清单可读不等于项目已采用，也不等于注册、模板、方法已就绪。已有 bootstrap 的登记、模板、方法就绪检查继续执行。
- **交接不复制清单数组**：Foundation 不把清单数组复制进本入口、目标工程或交接文档。交接只引用 Graph 入口、实际读到的来源字段、推荐依据和项目选择。

读取失败，包括包无法定位、子路径不存在、`schema_version` 不兼容或字节不可读时：

- 明确报告缺口：缺失的是已发布入口还是版本不兼容。
- 只暂停依赖正式清单的推荐分支，标为待接线。
- 不静默回退到 Foundation 内复制表，不伪造新接口返回值。
- `artifact-chain-setup`、`artifact-chain-bootstrap`、发布接线、知识站、审计、骨架与宿主投影继续按原步骤执行。

四种交接必须能从本小节正文核对：

- 普通技能族初始化：有正式清单则推荐 `skill-plugin` 标准并解释依据；无清单则报告待接线，仍可完成其余初始化。
- 项目追加项：根据实际业务提示条件项，由项目保存选择。
- 存量扩展兼容：保留原扩展配置。
- 提供方缺失：暂停清单推荐，其余流程继续，不得宣称正式消费完成。


## 默认测试与项目方法选择（TEST / Registry v1）

两流 P0 默认 TEST 调用已分别验收后，才进行本 P1 接线。初始化不重新证明 P0，不把配置生成当作业务通过。

- **同一原选择**：读取项目现有采用记录和 `agent-methods/project.yaml` 的 `entries`、`overrides`、`disabled`。没有覆盖时，明确采用用户所选 TEST 公开包内 `agent-methods/catalog.yaml`，不自动纳入其他已安装目录。项目原选择及公开目录位置来自现有采用记录或同一权威执行计划；effective-index 只是派生物，不用于反推用户意图。
- **写入与重入**：首次创建或修改 overlay 前展示精确差异，仅写获准配置。重入读取并保留合法覆盖、非空工程内容与既有发布配置；未经用户明确选择，不写入外部目录或 ref，不覆盖已有选择。
- **公开 API**：使用插件精确依赖 `agent-method-registry@0.2.0` 的 `buildEffectiveIndex`、`queryEffectiveIndex`、`resolveEntry` 与 `verifyProvider`。把明确采用的 catalogs 和项目 overlay 交给 Registry，以 `domains:[testing]`、`artifactTypes:[skill-family]` 及所需 `plan` 或 `run` 查询唯一候选，再带真实 host 和 `strictProvider:true` 解析；只有 verified 入口才能交给消费者。不得复制合并、优先级、去重或路径查找算法，不手写 effective-index。
- **提供方根**：plugin provider 的 `pluginRoots[provider.plugin]` 是实际宿主中该插件的技能目录根列表，例如包含 `<skill-id>/SKILL.md` 的 `.agents/skills`，不是笼统包根或 ACA 子目录。project provider 使用项目 `entries/overrides`，`projectRoots` 必须指向获准项目的真实 Skill 目录根。正常项目自有覆盖必须能实际解析；专项缺根、入口缺失、realpath 歧义或未验证均拒绝。
- **替换**：项目自有 Skill 用项目 entries/overrides；外部插件使用用户明确选择的不同 ref 目录，并在 overlay 禁用原默认 ref，保证共同能力查询唯一。相同 ref 跨目录冲突、多候选、坏覆盖和显式禁用均按 Registry 原错误处理，不按目录顺序选择，也不静默回落 TEST。
- **宿主范围**：P1 仅迁移 `codex` 与 `claude-code` 执行面，不省略 host 绕过验证，不宣称其他宿主获得 P1 支持。v2 绑定不用于没有相应图事实的项目。
- **两流分别验证**：ACA 与 release 读取同一原选择及 overlay，各自完成独立业务调用。初始化只负责接线和分别报告“配置已创建/保留”“入口已解析/拒绝”“业务已验证/未覆盖”；联合业务结果由两消费者验收，不由本入口代签。

默认方法被禁用、坏覆盖、缺目录/入口/验证根或出现歧义时，只暂停依赖该方法的调用，需求收集、发布配置及其他不依赖片段继续，已有用户内容和权限保持不变。

## 知识站接线（可选）

仅在用户明确需要时启用，使用 `skill-family-docs-setup` 或 `skill-family-docs-render-site` 完成配置与渲染；渲染器与插件是独立版本坐标。配置完成后分别报告“配置完成”“正文待生成”“站点就绪”。不默认发布站点；发布行为需要显式授权。无知识站需求时说明不适用，不留空栏目。

## 工程检查与独立审计

- 完整静态工程审阅使用同插件的 `foundation-engineering-check`，保留必要工程声明与实际选中的全部检查；局部命令通过不能称为完整检查通过。
- 独立审计由正式技能 `skill-family-audit-conformance-audit` 执行，消费其标准合同要求的证据集合与规范来源，不执行被审目标本身。本入口不重写审计规则，不以产品自测充当独立审计。

## 授权边界

- 初始化授权不扩展为提交、推送、标签、远端发布或市场安装；已有同范围授权继续有效，外部动作逐项单独核清。
- 各支撑命令的真实前置条件（已安装、可用入口、必要输入）必须实际满足；缺失时指出具体前提，只暂停依赖它的接线。
- 支撑工具的版本高于开发基线且保留已采用公共合同时，原接线继续可用，并在结果中记录实际验证版本；新版新增功能列为暂未适配。必要接口实际缺失或破坏性变化时，指出实际接口变化与受影响接线，只暂停依赖该接口的工作，失败依据是合同不兼容，不是版本字符串与基线不同。
