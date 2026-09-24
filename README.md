# MYSKME 题库训练场 · QUIZ TRAINER

线上：**https://myskme.github.io/myskme-quiz/** （GitHub Pages，git push 即上线）

| 文件 | 作品 |
|---|---|
| `plain.html` | 无名之原 · 仲夏夜之战（三幕肉鸽卡牌，课堂跟老师玩，无题库） |
| `word-duel.html` | 词灵对决（自己刷题 · 有题库/兑换码，兑换码即卷号如 S1E7） |
| `index.html` | 入口页（讲清两个玩法的分工） |
| `banks/` | 内置题库 JSON（书架目录取自 hub；新卷题库放这里 push 即上架） |
| `assets/chars/` | 无名之原 27 位正典角色透明立绘（webp） |
| `_headers` | 旧 Netlify 缓存策略遗留（GitHub Pages 不识别，无害；缓存击穿靠 `ART_V` 查询参数） |

## 发布（2026-09 起：EdgeOne，正式域名 quiz.myskme.com）

GitHub 已停用，`git push` 到 GitLab **不会**自动上线。发布照 hub 仓库 `deploy/LOCAL-EDGEONE-RELEASE.md`：
`git archive HEAD` 导出目录，`edgeone makers deploy <目录> -n myskme-quiz -a overseas`，先 `-e preview` 验，再 `-e production`。
发布前跑 `node selftest-vs.mjs .`（本机没有 playwright 自带浏览器时加 `PW_CHANNEL=chrome`）。

（2026-07-12 到 2026-08 是 GitHub Pages：改文件 push 约 1 分钟生效。）

## 历史与注意

- 2026-07-12 前托管于 Netlify `myskme-games.netlify.app`（源码私库 `myskme/myskme-games`，现归档）。旧站保持在线，已印发的试卷二维码不断链；新内容只更新本仓库。
- **plain.html 从 2026-07 起不再是单文件自包含**：拷贝分发时要连 `assets/` 目录整体拷；只拷 HTML 也能玩（立绘会静默回退成字形），但会少了立绘。
- **换立绘必改 `plain.html` 里的 `ART_V`**（cache-buster），否则玩家端长缓存看不到新图。
- 词灵对决排行榜统一走 `https://myskme.com/api/quiz` 品牌网关，再固定转发到
  原 Cloudflare Worker；原榜单不迁移、不双写，客户端不再直连 `workers.dev`。
