// 词灵对决 · 两队对抗「抢答」计分回归
// 复现路径：金队答错 → 点「抢答！」→ 紫队点对 → 应为 金0 / 紫5（曾经是 金10 / 紫5）
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const ROOT = process.argv[2];
const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    const f = p === '/' ? 'word-duel.html' : p.replace(/^\/+/, '');
    res.writeHead(200); res.end(await readFile(ROOT + '/' + f));
  } catch { if (!res.headersSent) res.writeHead(404); res.end('404'); }
});
await new Promise(r => server.listen(0, r));
const url = `http://localhost:${server.address().port}/word-duel.html`;

const browser = await chromium.launch();
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(700);

const out = await page.evaluate(async () => {
  // 造一道确定的题：正确答案是下标 0
  const q = { sh: { ops: ['对', '错甲', '错乙', '错丙'], ans: 0 }, q: '测试题 ___ ?', why: '' };
  VS = { n1: '金队', n2: '紫队', s: [0, 0], try: [0, 0], hit: [0, 0], streak: [0, 0],
         qs: [q], qi: 0, turn: 0, total: 1 };
  renderVsQ();
  const ops = () => [...document.getElementById('vs-ops').children];

  // 1) 金队(turn=0)点错误选项 1
  ops()[1].click();
  const afterWrong = { gold: VS.s[0], purple: VS.s[1] };

  // 2) 点「抢答！」
  const stealBtn = [...document.querySelectorAll('#vs-steal button')].find(b => /抢\s*答/.test(b.textContent));
  if (!stealBtn) return { err: '没找到抢答按钮' };
  stealBtn.click();

  // 3) 紫队点正确选项 0
  ops()[0].click();
  await new Promise(r => setTimeout(r, 60));

  return {
    afterWrong,
    gold: VS.s[0], purple: VS.s[1],
    goldHit: VS.hit[0], purpleHit: VS.hit[1],
    nextBtns: document.getElementById('vs-next').querySelectorAll('button').length,
  };
});

console.log('  金队答错后:', JSON.stringify(out.afterWrong));
console.log('  抢答结束后: 金队', out.gold, '/ 紫队', out.purple, '| 金队命中', out.goldHit, '| 「下一题」按钮', out.nextBtns, '个');
const ok = out.gold === 0 && out.purple === 5 && out.goldHit === 0 && out.nextBtns === 1;
console.log(ok ? '  ✅ 计分正确（金0 紫5，一个下一题按钮）' : '  ❌ 计分错误');
if (errs.length) console.log('  JS 报错:', errs.slice(0, 2).join(' | '));

await browser.close(); server.close();
process.exit(ok ? 0 : 1);
