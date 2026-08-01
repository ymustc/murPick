# 知选 murPick

**AI 调研，像点菜一样。**

让 AI 帮你调研同类产品，你会收到一份五千字长报告——读到结尾忘了开头，更糟的
是：在报告中间的某处，AI 已经悄悄替你把功能范围定好了。

murPick 是一个 [Agent Skill](https://agentskills.io)，把产品调研变成一件你天生
就会的事：**点菜**。AI 消化你给的参考素材、调研整个品类，然后把每一个候选功能
做成一个勾选框。你像在餐厅点菜一样勾选：勾了的进 spec，**没勾的成为明确边界**
——是"决定不做"，而不是"被遗忘"。

## 工作流程

1. **素材消化**——丢进来截图、录屏、链接或整个文件夹。skill 逐个查看（视频会
   抽帧）、重命名成描述性文件名、查重、识别每个素材背后的产品。
2. **联网调研**——开源同类、商业头部、品类综述。带诚实规则：演示好看但要手动
   喂数据的功能会被标记；平台 API 资质、反爬条款这类现实门槛会被直说。
3. **点菜菜单**——自包含单文件 HTML。每个功能一个稳定 id 的勾选框，按产品卡
   分组、附来源链接。边勾边自动保存（localStorage），手机上就能勾。
4. **定制报告**——把勾好的文件发回去。勾选项逐一映射进能力域，一项不漏；未勾
   选项生成边界清单。产出带决策表、纯 CSS 架构图、诚实风险表的 HTML 报告。

回传是整个设计的巧劲：菜单的**「另存为已勾选文件」**按钮把勾选状态烧录进 HTML
本身（`data-burned` 属性）再下载。不要账号、不要服务器、不用在手机上复制粘贴
一大段 Markdown——**文件本身就是数据**。

## 为什么是菜单？

因为 AI 辅助调研的真正失败模式不是调研得差，而是**决策被悄悄代做**。我们的基线
测试（同素材、同 prompt、无 skill）里，AI 产出了一份合格的报告，结尾却是：

> "V1 = 「一个骨架 + 三个模块 + 一条原则」……明确不做清单（写进 README 防止
> 范围蔓延）"

用户还没勾选任何东西，范围已经定了。装上 murPick 后，同样的 AI 产出了 97 项
菜单，把选择权交还给人。粒度也一样关键：无 skill 基线把整个领域压成 19 条主题
级条目；菜单保留了 97–143 个可逐项勾选的功能点。

## 安装

Claude Code：

```bash
git clone https://github.com/ymustc/murPick.git ~/.claude/skills/murpick
```

读取 `~/.agents/skills/` 的运行时（Codex、Copilot CLI、Gemini CLI）：

```bash
git clone https://github.com/ymustc/murPick.git ~/.agents/skills/murpick
```

**国内使用提示**：murPick 遵循开放的 [Agent Skills 规范](https://agentskills.io)，
流程只依赖通用工具（shell、网页抓取、ffmpeg、Node）。不必非用 Anthropic 官方
服务——Claude Code 支持任何 Anthropic 兼容的模型端点，国内主流大模型（智谱
GLM、Kimi、DeepSeek 等）均提供此类 API，配置 `ANTHROPIC_BASE_URL` 即可低门槛
使用。兼容 Agent Skills 规范的其他 CLI 理论上同样可用，但未经正式测试——
欢迎提 issue 反馈你的运行时实测结果。

## 使用

> 我在 ./refs 收集了一批我喜欢的习惯打卡 App 截图，帮我调研这个品类，
> 我要决定自己的 App 第一版做什么。

或者直接：

> 把这些调研结果做成点菜菜单。

勾完点**「另存为已勾选文件」**，把下载的文件发回去：

> 这是我勾好的菜单，出选型报告。

## 质量：像测代码一样测出来的，不是拍脑袋写的

这个 skill 用文档 TDD（[RED-GREEN-REFACTOR](https://github.com/obra/superpowers)）
打磨：先在无 skill 状态下逐字记录真实失败作为基线，每条条款都对应一个真实失败；
再用压力测试（时间压力、素材不适配）堵住漏洞。

机器可判的硬要求交给脚本而非文字：`scripts/validate-menu.js` 对每份生成的菜单
跑 12 项硬检查（checkbox id 唯一性、烧录另存逻辑、localStorage、自包含性……）。
测试集中它对无 skill 基线菜单判 5/12 FAIL，对所有 skill 生成菜单全 PASS——
包括一个 143 项的真实案例。

## 示例

见 [`examples/`](examples/)：一份生成的菜单、一份勾选后的回传件、一份最终报告。

---

**mur** 工具家族成员，作者 [Miao YU](https://github.com/ymustc)。
「知选」是它的中文名。

MIT License。
