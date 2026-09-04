# foundation-adoption-review

`foundation-adoption-review` 是一个只读诊断 Skill，用来判断项目能否复用已经发布的 Foundation 能力。它读取调用方提供的 capability catalog 与 `adopt-plan` 结果，把需求归为直接采用、薄适配、候选匹配、无匹配或漏看已有能力。

<!-- release-skill:capability:external-write-boundary -->

这项 Plugin 面向技能族维护者和其他需要判断“某个机制是否已经存在于已发布 Foundation 版本中”的开发者。它只读取调用方提供的结果，不写入任何文件，也不会推送、发布、安装或更新 Foundation，不调用宿主，不执行资格检查，不判断 Audit 合规性。

这个目录位于 Foundation monorepo 内，但它是独立的 Plugin 发布单元，不是第四个 Foundation npm 包。`package.json` 保持 `private`，目的只是禁止 `npm publish`；开源镜像是 [ifoohoo/foundation-adoption-review](https://github.com/ifoohoo/foundation-adoption-review)，按 Apache-2.0 许可证发布。

Plugin 只维护一份共享 Skill。Codex 与 Claude 使用各自的 manifest；Kimi、Qoder、WorkBuddy 和 CodeBuddy 通过各自的宿主接入路径使用同一份 Skill 内容，不在这里复制额外 manifest。

从 0.17.0 开始，Plugin 版本号与 Foundation 数值对齐。该调整只涉及版本号；Plugin 继续作为独立发布单元，历史 0.1.0 发布保持不变。

Plugin 只读取调用方提供的结果，不写入项目。它不会安装或更新 Foundation，不调用宿主，不执行资格检查，也不判断 Audit 合规性。

<!-- release-skill:capability:safe-first-command -->

## 安装

这是一个开源 Plugin，不是 npm 包。Skill Family Hub 是唯一公开市场。插件仓只携带两份宿主清单和 Skill 载荷，不携带市场索引。先添加 Hub，再安装插件：

```text
# Codex
codex plugin marketplace add ifoohoo/skill-family-hub
# 然后从交互式 /plugins 浏览器安装 foundation-adoption-review。

# Claude
claude plugin marketplace add ifoohoo/skill-family-hub
claude plugin install foundation-adoption-review@skill-family-hub
```

只有发布完成、验证通过且 Hub 接受登记后，上述命令才成立。仓库当前的源码状态不能单独证明市场已经可用。

这是该插件首次进入 Hub，因此发布后流程只生成一份人工登记交接单。条目建立后，后续版本才能使用 Hub 的既有条目更新提案入口。

## 最小用法

调用 `foundation-adoption-review` 时，需要同时提供诊断所依据的事实：已发布的 Foundation 版本、`capability-catalog` 查询结果和 `adopt-plan` 结果。请求保持只读：

```text
请帮助我调用 foundation-adoption-review 评估这份方案。
我会提供：
- 已发布的 Foundation 版本；
- capability-catalog 查询结果；
- adopt-plan 结果。
不要修改文件，不要安装或更新任何内容，不要调用宿主，不要执行资格检查，也不要判断 Audit 合规性。
```

## 出现失败时

安装或诊断失败时，只报告错误并停止。由人工核对 GitHub 访问、Marketplace 条目与版本，以及三份输入是否完整。不要自动修复安装或输入。

拿到诊断结果后，按报告中的能力 ID 和最小采用路径人工处理下一步。资格检查与 Audit 判断另行评审。

运行本地闭包测试：

```bash
pnpm test
```
