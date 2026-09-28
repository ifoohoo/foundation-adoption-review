---
name: foundation-engineering-check
description: Run Foundation's complete static engineering review for a caller-selected scope, or read an existing Foundation professional proof, without executing target scripts or hooks.
---

# Foundation 静态工程检查

这项 Skill 对调用方给出的目标根做完整静态工程审阅，并把领域结果投影成共同专业结论。它读取声明、公共目录、导出和合同，不运行目标 Skill、业务脚本或 hook（钩子程序）。

采用诊断仍由 `foundation-adoption-review` 负责。那项 Skill 只解释调用方已经提供的材料，授权边界不变。本入口不替代 Audit（独立审计）的领域判断，也不把版本检查与入口检查两个机械分支通过，写成整个 Foundation 通过。

## 输入

业务选择只有三项；输出根由宿主安排，不向业务用户索取临时目录：

1. 目标根。
2. 本次适用的工程范围。可选范围是工程声明、公共能力采用、公共调用关系与参数边界。未选中的项写入限制，不补跑。
3. 可选的已有本族证明，路径必须落在调用方明确给出的读取根内。有旧证明时只读取，不重新扫描。

不要无条件索取 `token_estimate_record`、固定旧注册对象清单或旧 0.15 能力集合，也不要求全部 Foundation 能力都适用。

## 已有证明

调用方提供旧证明时，只运行：

```text
skill-family-kit check proof --proof-root <root> --proof <relative> --json
```

该命令解释本族公开领域码，不扫描目标，不追随 `details` 里的路径，不鉴定作者。`pass` 只表示证明记载可接受。`ENGINEERING_*` 仍按原局部声明检查解释，不能升格为完整静态审阅。`not_pass` 保留原发现或不完整记载。`unavailable` 表示当前读不到或无法解释；证明正文写着未能检查，仍是 `not_pass`。

人类答复用短回答。按这次读到的内容说明旧证明记载的结论和领域码、当时已覆盖范围和限制、所依据的现有记录，以及调用方下一步。

这次只读取历史，不重新审阅、不鉴伪、不出新证明。旧记载不能证明当前目标已经重验。答复里的 `ENGINEERING_*` 仍是原局部声明检查的记载，不能写成完整静态审阅已经通过。没有对应内容时省略该点，不要为凑栏目留空段。

## 无旧证明时的审阅

先按所选范围启用必要的确定性检查，再做需要 LLM（大语言模型）的静态语义审阅。两类结果分开记录，保留真实 `sourceRefs` 和 `reason`。未选中的项写入限制，不补跑。

### 确定性检查

只启用所选检查项及其必要证据对应的命令，并关闭 Git 探测。

选中工程声明时，在目标根运行声明式版本检查和入口检查：

```text
skill-family-kit check --root <target> --policy declared --only version --no-git-spawn
skill-family-kit check entries --root <target> --policy declared
```

`declared` 版本分支只核对应声明的发行单元；`declared` 入口分支只核对已登记的物理入口。这些命令通过，只证明所选声明分支成立。未通过时按下面步骤解释。

先读检查前提和实际覆盖。`documentState` 表示声明是否足以启动该分支。入口检查看 `data.entries`，版本检查看 `data.version.releaseUnits`，两者都只列出这次实际进入核对的对象。

公共项目清单合同允许 `engineering` 只声明发行单元或只声明入口，不要求两者同时存在。Schema 校验通过后，当前所选分支没有数组时记 `incomplete`。检查把诊断放进底层 `findings`，且未进入实体核对。

1. 对照检查前提、实际已检查对象和对应公共合同，区分材料不足与已经核实的违规。
2. 所选分支缺当前声明、且未进入实体核对时，该适用项记 `insufficient`，`reason` 保留原始诊断和原因。
3. 底层数组名叫 `findings`，或进程退出 1，都不能单独改成确定违规。
4. 另有独立强制合同，并且已经拿到真实违反证据时，该项仍记 `findings`。例如 Schema 本身无效、已声明入口的物理文件缺失、已声明发行单元来源与镜像不一致。不能把所有结构问题统一改成不足。

选中公共能力采用，或静态审阅确实需要采用计划作结构参考时，再运行：

```text
skill-family-kit adopt-plan --root <target> --no-git-spawn
```

`adopt-plan` 给出结构采用差异，不是执行授权，也不把旧政策结果升格为通用工程结论。

只选公共调用关系与参数边界、且不需要上述命令作证据时，不要跑这三条命令。静态语义审阅直接阅读目标实际采用的公共目录、导出和合同。

### 静态语义审阅

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
- 不把 `ENGINEERING_CLEAR`（局部声明检查通过码）、manifest 存在或两个机械分支通过写成完整 Foundation 通过。
- 不追随证明 `details` 中的任意路径，不鉴定作者，不覆盖旧证明。
- 不修改目标来补治理证据。
