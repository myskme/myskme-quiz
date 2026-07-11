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

## 发布（2026-07-12 起）

改文件 → `git commit` → `git push`，GitHub Pages 约 1 分钟生效。**不再走 Netlify，不需要口令。**

## 历史与注意

- 2026-07-12 前托管于 Netlify `myskme-games.netlify.app`（源码私库 `myskme/myskme-games`，现归档）。旧站保持在线，已印发的试卷二维码不断链；新内容只更新本仓库。
- **plain.html 从 2026-07 起不再是单文件自包含**：拷贝分发时要连 `assets/` 目录整体拷；只拷 HTML 也能玩（立绘会静默回退成字形），但会少了立绘。
- **换立绘必改 `plain.html` 里的 `ART_V`**（cache-buster），否则玩家端长缓存看不到新图。
- 词灵对决排行榜走 Cloudflare Worker（与本站托管无关，CORS 已放行 myskme.github.io）。
