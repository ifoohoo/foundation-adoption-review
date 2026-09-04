---
name: foundation-adoption-review
description: Read caller-provided Foundation capability catalog and adopt-plan results to diagnose reuse, thin adaptation, candidate matches, and missed existing capabilities without changing projects or making qualification decisions.
---

# Foundation 采用诊断

这项能力只做只读判断。输入由调用方提供，通常包括 Foundation 的 `capability-catalog.json` 查询结果、`adopt-plan` 结果，以及待解决的行为描述或变更计划。先确认输入中的 Foundation 版本和结果生成方式，再以输入里携带的事实作判断。

## 诊断范围

逐项回答“这个需求是否已有 Foundation 能力可复用”，并区分以下五种结果。能力 ID（稳定标识）用于把结论追溯回目录条目：

- **完整匹配**：目录中的稳定能力已经覆盖需求的结构性机制、入口和失败边界。建议直接采用现有公共 API（编程接口）；技能族只保留领域语义和必要的参数组合。
- **部分匹配**：Foundation 已覆盖共享机制，但调用方仍有领域语义、平台差异或产品约束需要表达。建议增加薄适配层，并说明适配层保留的责任；不要复制 Foundation 的 Harness（业务中立执行机制）、Registry（能力登记表）或 runner（执行器）。
- **候选匹配**：结果只表示搜索命中、`supportedMatches` 或 `needsDecision`，还没有证明用途和边界完全相同。列出需要补充的事实，暂不把候选写成已采用能力。
- **无匹配**：没有稳定能力覆盖需求，或查询明确返回 `no-text-match`。说明未命中的查询条件；不要据此自行创建 Foundation 替代实现。若机制确实属于共性缺口，建议把最小能力合同交给 Foundation；若属于领域语义，留在调用方。
- **漏看已有能力**：提案正在新建或保留的机制，已被目录或 `adopt-plan` 的现状、写集、旧实现退出清单覆盖。指出对应能力 ID、入口或计划字段，建议先复用并删除被替代的重复实现。

`no-text-match`、`boundary-found`、候选命中和 migration（迁移）`complete` 都只描述查询或迁移状态。它们不能单独证明契约接入完成、真实宿主资格或领域合规。

## 读取顺序

1. 先读能力目录条目的 `id`、`layer`、`intent`、`entrypoints` 和 `sideEffects`（字段存在时）。这些字段说明能力是什么、从哪里调用以及会产生什么副作用。
2. 再读 `failureSemantics`、`ownedByCaller`、`sourceRefs` 和 `positiveTestRefs`（字段存在时）。这些字段说明如何失败、哪些责任仍由调用方承担，以及事实和测试的来源。
3. 再读 `adopt-plan` 的 `target`、`project`、`writeSet`、`conflicts`、`risks`、`migration` 和 `verificationPlan`（字段存在时）。这些结果用于判断现状、精确写集、冲突和完成条件；`adopt-plan` 是只读计划，不是执行授权。
4. 把用户的需求拆成结构性机制、领域语义、平台约束和验收要求四部分。只把结构性机制与 Foundation 目录逐项比较，避免把领域裁决误归给 Foundation。
5. 为每一项保留可回看的证据：能力 ID、入口或计划路径、输入中的版本，以及支持或不足的具体字段。证据缺失时标记为“待确认”，不补写推断事实。

## 输出格式

先给整体结论，再给逐项诊断。推荐使用下列列：

| 需求片段 | 结论 | 证据 | 最小下一步 |
| --- | --- | --- | --- |
| 结构性机制或领域约束 | 完整匹配 / 部分匹配 / 候选匹配 / 无匹配 / 漏看已有能力 | 能力 ID、入口或 `adopt-plan` 字段 | 直接采用、薄适配、补充事实、交给 Foundation 或删除重复实现 |

结论必须同时说明：

- 现有能力是否足够，以及足够到哪一层；
- 需要薄适配时，适配层由谁拥有、不得重复什么；
- 仍是候选或无匹配时，缺少哪一项事实、由谁补齐；
- `adopt-plan` 的只读边界、写集和冲突是否影响下一步。

## 明确禁止

- 不安装或更新 Foundation、插件、CLI（命令行工具）或宿主，不修改项目文件，不写入运行记录或证据目录。
- 不执行 `scaffold`、`projection`、`check`、资格探测或宿主调用；如需运行命令，只能由调用方另行授权并提供结果。
- 不创建新的 Harness、Registry、runner、receipt、认证层或第二套能力目录。
- 不把 Audit（独立审计）规则、工程基线、发布状态或真实宿主资格当作本能力的裁决对象。
- 不因为目录结构不同就判定不合规；先比较稳定能力、入口、失败边界和责任归属。
- 不把“候选”“迁移完成”或一次领域测试写成 Foundation 已采用或领域已经通过。

Foundation 负责共享合同、业务中立机制和工程接入；技能族负责领域解释；Audit（独立审计）负责独立规则与审计。诊断报告应把问题交给对应责任方，保持这三类判断彼此独立。
