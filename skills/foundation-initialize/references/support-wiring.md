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

## 制品接线（artifact-chain-assistant / artifact-graph）

- 由 `artifact-chain-setup` 检查环境，`artifact-chain-bootstrap` 选择最小制品类型、路径和配置；再用需求、场景等专业制作入口编写内容。
- 存量目标先诊断已有接线，不隐式升级；语义审阅完成后才建立或刷新关系锁；不自动安装 hooks，不运行 `bootstrap --force`。
- 制品工具能读到已登记关系才算接通；缺失项在结果中明确列出。图检查通过不代表内容正确。

## 知识站接线（可选）

仅在用户明确需要时启用，使用 `skill-family-docs-setup` 或 `skill-family-docs-render-site` 完成配置与渲染；渲染器与插件是独立版本坐标。配置完成后分别报告“配置完成”“正文待生成”“站点就绪”。不默认发布站点；发布行为需要显式授权。无知识站需求时说明不适用，不留空栏目。

## 工程检查与独立审计

- 完整静态工程审阅使用同插件的 `foundation-engineering-check`，保留必要工程声明与实际选中的全部检查；局部命令通过不能称为完整检查通过。
- 独立审计由正式技能 `skill-family-audit-conformance-audit` 执行，消费其标准合同要求的证据集合与规范来源，不执行被审目标本身。本入口不重写审计规则，不以产品自测充当独立审计。

## 授权边界

- 初始化授权不扩展为提交、推送、标签、远端发布或市场安装；已有同范围授权继续有效，外部动作逐项单独核清。
- 各支撑命令的真实前置条件（已安装、可用入口、必要输入）必须实际满足；缺失时指出具体前提，只暂停依赖它的接线。
- 支撑工具的版本高于开发基线且保留已采用公共合同时，原接线继续可用，并在结果中记录实际验证版本；新版新增功能列为暂未适配。必要接口实际缺失或破坏性变化时，指出实际接口变化与受影响接线，只暂停依赖该接口的工作，失败依据是合同不兼容，不是版本字符串与基线不同。
