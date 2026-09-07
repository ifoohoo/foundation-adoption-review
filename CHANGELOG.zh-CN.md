# 变更日志

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
