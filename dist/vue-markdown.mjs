/**
 * vue-markdown-wrapper v2.0.0 - Vue Markdown component based on marked library
 * Copyright (c) 2024, Marc Jorge Gonzalez. (MIT Licensed)
 * https://github.com/mjorgegulab/vue-markdown-wrapper
 */
var Pn = Object.defineProperty;
var Bt = (c) => {
  throw TypeError(c);
};
var vn = (c, e, t) => e in c ? Pn(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var _ = (c, e, t) => vn(c, typeof e != "symbol" ? e + "" : e, t), Un = (c, e, t) => e.has(c) || Bt("Cannot " + t);
var Ht = (c, e, t) => e.has(c) ? Bt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(c) : e.set(c, t);
var fe = (c, e, t) => (Un(c, e, "access private method"), t);
import { defineComponent as Fn, ref as Bn, computed as Wt, watch as Hn, openBlock as Wn, createElementBlock as Gn, createCommentVNode as qn } from "vue";
function ot() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let ee = ot();
function sn(c) {
  ee = c;
}
const rn = /[&<>"']/, jn = new RegExp(rn.source, "g"), on = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Zn = new RegExp(on.source, "g"), Yn = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Gt = (c) => Yn[c];
function $(c, e) {
  if (e) {
    if (rn.test(c))
      return c.replace(jn, Gt);
  } else if (on.test(c))
    return c.replace(Zn, Gt);
  return c;
}
const Xn = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function Qn(c) {
  return c.replace(Xn, (e, t) => (t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
}
const Vn = /(^|[^\[])\^/g;
function w(c, e) {
  let t = typeof c == "string" ? c : c.source;
  e = e || "";
  const n = {
    replace: (i, s) => {
      let r = typeof s == "string" ? s : s.source;
      return r = r.replace(Vn, "$1"), t = t.replace(i, r), n;
    },
    getRegex: () => new RegExp(t, e)
  };
  return n;
}
function qt(c) {
  try {
    c = encodeURI(c).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return c;
}
const Te = { exec: () => null };
function jt(c, e) {
  const t = c.replace(/\|/g, (s, r, l) => {
    let a = !1, p = r;
    for (; --p >= 0 && l[p] === "\\"; )
      a = !a;
    return a ? "|" : " |";
  }), n = t.split(/ \|/);
  let i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), e)
    if (n.length > e)
      n.splice(e);
    else
      for (; n.length < e; )
        n.push("");
  for (; i < n.length; i++)
    n[i] = n[i].trim().replace(/\\\|/g, "|");
  return n;
}
function ge(c, e, t) {
  const n = c.length;
  if (n === 0)
    return "";
  let i = 0;
  for (; i < n; ) {
    const s = c.charAt(n - i - 1);
    if (s === e && !t)
      i++;
    else if (s !== e && t)
      i++;
    else
      break;
  }
  return c.slice(0, n - i);
}
function Kn(c, e) {
  if (c.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let n = 0; n < c.length; n++)
    if (c[n] === "\\")
      n++;
    else if (c[n] === e[0])
      t++;
    else if (c[n] === e[1] && (t--, t < 0))
      return n;
  return -1;
}
function Zt(c, e, t, n) {
  const i = e.href, s = e.title ? $(e.title) : null, r = c[1].replace(/\\([\[\]])/g, "$1");
  if (c[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const l = {
      type: "link",
      raw: t,
      href: i,
      title: s,
      text: r,
      tokens: n.inlineTokens(r)
    };
    return n.state.inLink = !1, l;
  }
  return {
    type: "image",
    raw: t,
    href: i,
    title: s,
    text: $(r)
  };
}
function Jn(c, e) {
  const t = c.match(/^(\s+)(?:```)/);
  if (t === null)
    return e;
  const n = t[1];
  return e.split(`
`).map((i) => {
    const s = i.match(/^\s+/);
    if (s === null)
      return i;
    const [r] = s;
    return r.length >= n.length ? i.slice(n.length) : i;
  }).join(`
`);
}
class Me {
  // set by the lexer
  constructor(e) {
    _(this, "options");
    _(this, "rules");
    // set by the lexer
    _(this, "lexer");
    this.options = e || ee;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : ge(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], i = Jn(n, t[3] || "");
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: i
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (/#$/.test(n)) {
        const i = ge(n, "#");
        (this.options.pedantic || !i || / $/.test(i)) && (n = i.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: ge(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = ge(t[0], `
`).split(`
`), i = "", s = "";
      const r = [];
      for (; n.length > 0; ) {
        let l = !1;
        const a = [];
        let p;
        for (p = 0; p < n.length; p++)
          if (/^ {0,3}>/.test(n[p]))
            a.push(n[p]), l = !0;
          else if (!l)
            a.push(n[p]);
          else
            break;
        n = n.slice(p);
        const h = a.join(`
`), d = h.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`).replace(/^ {0,3}>[ \t]?/gm, "");
        i = i ? `${i}
${h}` : h, s = s ? `${s}
${d}` : d;
        const x = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, r, !0), this.lexer.state.top = x, n.length === 0)
          break;
        const k = r[r.length - 1];
        if ((k == null ? void 0 : k.type) === "code")
          break;
        if ((k == null ? void 0 : k.type) === "blockquote") {
          const b = k, M = b.raw + `
` + n.join(`
`), v = this.blockquote(M);
          r[r.length - 1] = v, i = i.substring(0, i.length - b.raw.length) + v.raw, s = s.substring(0, s.length - b.text.length) + v.text;
          break;
        } else if ((k == null ? void 0 : k.type) === "list") {
          const b = k, M = b.raw + `
` + n.join(`
`), v = this.list(M);
          r[r.length - 1] = v, i = i.substring(0, i.length - k.raw.length) + v.raw, s = s.substring(0, s.length - b.raw.length) + v.raw, n = M.substring(r[r.length - 1].raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: i,
        tokens: r,
        text: s
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const i = n.length > 1, s = {
        type: "list",
        raw: "",
        ordered: i,
        start: i ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
      const r = new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let l = !1;
      for (; e; ) {
        let a = !1, p = "", h = "";
        if (!(t = r.exec(e)) || this.rules.block.hr.test(e))
          break;
        p = t[0], e = e.substring(p.length);
        let d = t[2].split(`
`, 1)[0].replace(/^\t+/, (ae) => " ".repeat(3 * ae.length)), x = e.split(`
`, 1)[0], k = !d.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, h = d.trimStart()) : k ? b = t[1].length + 1 : (b = t[2].search(/[^ ]/), b = b > 4 ? 1 : b, h = d.slice(b), b += t[1].length), k && /^ *$/.test(x) && (p += x + `
`, e = e.substring(x.length + 1), a = !0), !a) {
          const ae = new RegExp(`^ {0,${Math.min(3, b - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), te = new RegExp(`^ {0,${Math.min(3, b - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), A = new RegExp(`^ {0,${Math.min(3, b - 1)}}(?:\`\`\`|~~~)`), X = new RegExp(`^ {0,${Math.min(3, b - 1)}}#`);
          for (; e; ) {
            const Q = e.split(`
`, 1)[0];
            if (x = Q, this.options.pedantic && (x = x.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), A.test(x) || X.test(x) || ae.test(x) || te.test(e))
              break;
            if (x.search(/[^ ]/) >= b || !x.trim())
              h += `
` + x.slice(b);
            else {
              if (k || d.search(/[^ ]/) >= 4 || A.test(d) || X.test(d) || te.test(d))
                break;
              h += `
` + x;
            }
            !k && !x.trim() && (k = !0), p += Q + `
`, e = e.substring(Q.length + 1), d = x.slice(b);
          }
        }
        s.loose || (l ? s.loose = !0 : /\n *\n *$/.test(p) && (l = !0));
        let M = null, v;
        this.options.gfm && (M = /^\[[ xX]\] /.exec(h), M && (v = M[0] !== "[ ] ", h = h.replace(/^\[[ xX]\] +/, ""))), s.items.push({
          type: "list_item",
          raw: p,
          task: !!M,
          checked: v,
          loose: !1,
          text: h,
          tokens: []
        }), s.raw += p;
      }
      s.items[s.items.length - 1].raw = s.items[s.items.length - 1].raw.trimEnd(), s.items[s.items.length - 1].text = s.items[s.items.length - 1].text.trimEnd(), s.raw = s.raw.trimEnd();
      for (let a = 0; a < s.items.length; a++)
        if (this.lexer.state.top = !1, s.items[a].tokens = this.lexer.blockTokens(s.items[a].text, []), !s.loose) {
          const p = s.items[a].tokens.filter((d) => d.type === "space"), h = p.length > 0 && p.some((d) => /\n.*\n/.test(d.raw));
          s.loose = h;
        }
      if (s.loose)
        for (let a = 0; a < s.items.length; a++)
          s.items[a].loose = !0;
      return s;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(/\s+/g, " "), i = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: i,
        title: s
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !/[:|]/.test(t[2]))
      return;
    const n = jt(t[1]), i = t[2].replace(/^\||\| *$/g, "").split("|"), s = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : [], r = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === i.length) {
      for (const l of i)
        /^ *-+: *$/.test(l) ? r.align.push("right") : /^ *:-+: *$/.test(l) ? r.align.push("center") : /^ *:-+ *$/.test(l) ? r.align.push("left") : r.align.push(null);
      for (let l = 0; l < n.length; l++)
        r.header.push({
          text: n[l],
          tokens: this.lexer.inline(n[l]),
          header: !0,
          align: r.align[l]
        });
      for (const l of s)
        r.rows.push(jt(l, r.header.length).map((a, p) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: r.align[p]
        })));
      return r;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: $(t[1])
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && /^</.test(n)) {
        if (!/>$/.test(n))
          return;
        const r = ge(n.slice(0, -1), "\\");
        if ((n.length - r.length) % 2 === 0)
          return;
      } else {
        const r = Kn(t[2], "()");
        if (r > -1) {
          const a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + r;
          t[2] = t[2].substring(0, r), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let i = t[2], s = "";
      if (this.options.pedantic) {
        const r = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
        r && (i = r[1], s = r[3]);
      } else
        s = t[3] ? t[3].slice(1, -1) : "";
      return i = i.trim(), /^</.test(i) && (this.options.pedantic && !/>$/.test(n) ? i = i.slice(1) : i = i.slice(1, -1)), Zt(t, {
        href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
        title: s && s.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const i = (n[2] || n[1]).replace(/\s+/g, " "), s = t[i.toLowerCase()];
      if (!s) {
        const r = n[0].charAt(0);
        return {
          type: "text",
          raw: r,
          text: r
        };
      }
      return Zt(n, s, n[0], this.lexer);
    }
  }
  emStrong(e, t, n = "") {
    let i = this.rules.inline.emStrongLDelim.exec(e);
    if (!i || i[3] && n.match(/[\p{L}\p{N}]/u))
      return;
    if (!(i[1] || i[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const r = [...i[0]].length - 1;
      let l, a, p = r, h = 0;
      const d = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, t = t.slice(-1 * e.length + r); (i = d.exec(t)) != null; ) {
        if (l = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !l)
          continue;
        if (a = [...l].length, i[3] || i[4]) {
          p += a;
          continue;
        } else if ((i[5] || i[6]) && r % 3 && !((r + a) % 3)) {
          h += a;
          continue;
        }
        if (p -= a, p > 0)
          continue;
        a = Math.min(a, a + p + h);
        const x = [...i[0]][0].length, k = e.slice(0, r + i.index + x + a);
        if (Math.min(r, a) % 2) {
          const M = k.slice(1, -1);
          return {
            type: "em",
            raw: k,
            text: M,
            tokens: this.lexer.inlineTokens(M)
          };
        }
        const b = k.slice(2, -2);
        return {
          type: "strong",
          raw: k,
          text: b,
          tokens: this.lexer.inlineTokens(b)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(/\n/g, " ");
      const i = /[^ ]/.test(n), s = /^ /.test(n) && / $/.test(n);
      return i && s && (n = n.substring(1, n.length - 1)), n = $(n, !0), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, i;
      return t[2] === "@" ? (n = $(t[1]), i = "mailto:" + n) : (n = $(t[1]), i = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: i,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    var n;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, s;
      if (t[2] === "@")
        i = $(t[0]), s = "mailto:" + i;
      else {
        let r;
        do
          r = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (r !== t[0]);
        i = $(t[0]), t[1] === "www." ? s = "http://" + t[0] : s = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: i,
        href: s,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let n;
      return this.lexer.state.inRawBlock ? n = t[0] : n = $(t[0]), {
        type: "text",
        raw: t[0],
        text: n
      };
    }
  }
}
const ei = /^(?: *(?:\n|$))+/, ti = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, ni = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, ye = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ii = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ln = /(?:[*+-]|\d{1,9}[.)])/, an = w(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, ln).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), lt = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, si = /^[^\n]+/, at = /(?!\s*\])(?:\\.|[^\[\]\\])+/, ri = w(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", at).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), oi = w(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ln).getRegex(), Pe = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ct = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, li = w("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", ct).replace("tag", Pe).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), cn = w(lt).replace("hr", ye).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Pe).getRegex(), ai = w(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", cn).getRegex(), ut = {
  blockquote: ai,
  code: ti,
  def: ri,
  fences: ni,
  heading: ii,
  hr: ye,
  html: li,
  lheading: an,
  list: oi,
  newline: ei,
  paragraph: cn,
  table: Te,
  text: si
}, Yt = w("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", ye).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Pe).getRegex(), ci = {
  ...ut,
  table: Yt,
  paragraph: w(lt).replace("hr", ye).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Yt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Pe).getRegex()
}, ui = {
  ...ut,
  html: w(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ct).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Te,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: w(lt).replace("hr", ye).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", an).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, un = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, pi = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, pn = /^( {2,}|\\)\n(?!\s*$)/, hi = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, _e = "\\p{P}\\p{S}", fi = w(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _e).getRegex(), gi = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, di = w(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _e).getRegex(), mi = w("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _e).getRegex(), ki = w("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _e).getRegex(), bi = w(/\\([punct])/, "gu").replace(/punct/g, _e).getRegex(), xi = w(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ti = w(ct).replace("(?:-->|$)", "-->").getRegex(), wi = w("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ti).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ze = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, yi = w(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", ze).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), hn = w(/^!?\[(label)\]\[(ref)\]/).replace("label", ze).replace("ref", at).getRegex(), fn = w(/^!?\[(ref)\](?:\[\])?/).replace("ref", at).getRegex(), _i = w("reflink|nolink(?!\\()", "g").replace("reflink", hn).replace("nolink", fn).getRegex(), pt = {
  _backpedal: Te,
  // only used for GFM url
  anyPunctuation: bi,
  autolink: xi,
  blockSkip: gi,
  br: pn,
  code: pi,
  del: Te,
  emStrongLDelim: di,
  emStrongRDelimAst: mi,
  emStrongRDelimUnd: ki,
  escape: un,
  link: yi,
  nolink: fn,
  punctuation: fi,
  reflink: hn,
  reflinkSearch: _i,
  tag: wi,
  text: hi,
  url: Te
}, Ei = {
  ...pt,
  link: w(/^!?\[(label)\]\((.*?)\)/).replace("label", ze).getRegex(),
  reflink: w(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ze).getRegex()
}, nt = {
  ...pt,
  escape: w(un).replace("])", "~|])").getRegex(),
  url: w(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Ai = {
  ...nt,
  br: w(pn).replace("{2,}", "*").getRegex(),
  text: w(nt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Ie = {
  normal: ut,
  gfm: ci,
  pedantic: ui
}, de = {
  normal: pt,
  gfm: nt,
  breaks: Ai,
  pedantic: Ei
};
class G {
  constructor(e) {
    _(this, "tokens");
    _(this, "options");
    _(this, "state");
    _(this, "tokenizer");
    _(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || ee, this.options.tokenizer = this.options.tokenizer || new Me(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: Ie.normal,
      inline: de.normal
    };
    this.options.pedantic ? (t.block = Ie.pedantic, t.inline = de.pedantic) : this.options.gfm && (t.block = Ie.gfm, this.options.breaks ? t.inline = de.breaks : t.inline = de.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Ie,
      inline: de
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new G(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new G(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = !1) {
    this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (l, a, p) => a + "    ".repeat(p.length));
    let i, s, r;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((l) => (i = l.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1))) {
        if (i = this.tokenizer.space(e)) {
          e = e.substring(i.raw.length), i.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(i);
          continue;
        }
        if (i = this.tokenizer.code(e)) {
          e = e.substring(i.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + i.raw, s.text += `
` + i.text, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(i);
          continue;
        }
        if (i = this.tokenizer.fences(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.heading(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.hr(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.blockquote(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.list(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.html(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.def(e)) {
          e = e.substring(i.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + i.raw, s.text += `
` + i.raw, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
            href: i.href,
            title: i.title
          });
          continue;
        }
        if (i = this.tokenizer.table(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.lheading(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startBlock) {
          let l = 1 / 0;
          const a = e.slice(1);
          let p;
          this.options.extensions.startBlock.forEach((h) => {
            p = h.call({ lexer: this }, a), typeof p == "number" && p >= 0 && (l = Math.min(l, p));
          }), l < 1 / 0 && l >= 0 && (r = e.substring(0, l + 1));
        }
        if (this.state.top && (i = this.tokenizer.paragraph(r))) {
          s = t[t.length - 1], n && (s == null ? void 0 : s.type) === "paragraph" ? (s.raw += `
` + i.raw, s.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(i), n = r.length !== e.length, e = e.substring(i.raw.length);
          continue;
        }
        if (i = this.tokenizer.text(e)) {
          e = e.substring(i.raw.length), s = t[t.length - 1], s && s.type === "text" ? (s.raw += `
` + i.raw, s.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(i);
          continue;
        }
        if (e) {
          const l = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(l);
            break;
          } else
            throw new Error(l);
        }
      }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let n, i, s, r = e, l, a, p;
    if (this.tokens.links) {
      const h = Object.keys(this.tokens.links);
      if (h.length > 0)
        for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; )
          h.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (l = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; )
      r = r.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; )
      r = r.slice(0, l.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (a || (p = ""), a = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((h) => (n = h.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
        if (n = this.tokenizer.escape(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.tag(e)) {
          e = e.substring(n.raw.length), i = t[t.length - 1], i && n.type === "text" && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.link(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(n.raw.length), i = t[t.length - 1], i && n.type === "text" && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.emStrong(e, r, p)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.codespan(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.br(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.del(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.autolink(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (!this.state.inLink && (n = this.tokenizer.url(e))) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (s = e, this.options.extensions && this.options.extensions.startInline) {
          let h = 1 / 0;
          const d = e.slice(1);
          let x;
          this.options.extensions.startInline.forEach((k) => {
            x = k.call({ lexer: this }, d), typeof x == "number" && x >= 0 && (h = Math.min(h, x));
          }), h < 1 / 0 && h >= 0 && (s = e.substring(0, h + 1));
        }
        if (n = this.tokenizer.inlineText(s)) {
          e = e.substring(n.raw.length), n.raw.slice(-1) !== "_" && (p = n.raw.slice(-1)), a = !0, i = t[t.length - 1], i && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
          continue;
        }
        if (e) {
          const h = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(h);
            break;
          } else
            throw new Error(h);
        }
      }
    return t;
  }
}
class $e {
  // set by the parser
  constructor(e) {
    _(this, "options");
    _(this, "parser");
    this.options = e || ee;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var r;
    const i = (r = (t || "").match(/^\S*/)) == null ? void 0 : r[0], s = e.replace(/\n$/, "") + `
`;
    return i ? '<pre><code class="language-' + $(i) + '">' + (n ? s : $(s, !0)) + `</code></pre>
` : "<pre><code>" + (n ? s : $(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, n = e.start;
    let i = "";
    for (let l = 0; l < e.items.length; l++) {
      const a = e.items[l];
      i += this.listitem(a);
    }
    const s = t ? "ol" : "ul", r = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + s + r + `>
` + i + "</" + s + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      const n = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens.length > 0 && e.tokens[0].type === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + e.tokens[0].tokens[0].text)) : e.tokens.unshift({
        type: "text",
        raw: n + " ",
        text: n + " "
      }) : t += n + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let s = 0; s < e.header.length; s++)
      n += this.tablecell(e.header[s]);
    t += this.tablerow({ text: n });
    let i = "";
    for (let s = 0; s < e.rows.length; s++) {
      const r = e.rows[s];
      n = "";
      for (let l = 0; l < r.length; l++)
        n += this.tablecell(r[l]);
      i += this.tablerow({ text: n });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${e}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const i = this.parser.parseInline(n), s = qt(e);
    if (s === null)
      return i;
    e = s;
    let r = '<a href="' + e + '"';
    return t && (r += ' title="' + t + '"'), r += ">" + i + "</a>", r;
  }
  image({ href: e, title: t, text: n }) {
    const i = qt(e);
    if (i === null)
      return n;
    e = i;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${t}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : e.text;
  }
}
class ht {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class q {
  constructor(e) {
    _(this, "options");
    _(this, "renderer");
    _(this, "textRenderer");
    this.options = e || ee, this.options.renderer = this.options.renderer || new $e(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ht();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new q(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new q(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let n = "";
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const l = s, a = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type)) {
          n += a || "";
          continue;
        }
      }
      const r = s;
      switch (r.type) {
        case "space": {
          n += this.renderer.space(r);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(r);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(r);
          continue;
        }
        case "code": {
          n += this.renderer.code(r);
          continue;
        }
        case "table": {
          n += this.renderer.table(r);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(r);
          continue;
        }
        case "list": {
          n += this.renderer.list(r);
          continue;
        }
        case "html": {
          n += this.renderer.html(r);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(r);
          continue;
        }
        case "text": {
          let l = r, a = this.renderer.text(l);
          for (; i + 1 < e.length && e[i + 1].type === "text"; )
            l = e[++i], a += `
` + this.renderer.text(l);
          t ? n += this.renderer.paragraph({
            type: "paragraph",
            raw: a,
            text: a,
            tokens: [{ type: "text", raw: a, text: a }]
          }) : n += a;
          continue;
        }
        default: {
          const l = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t) {
    t = t || this.renderer;
    let n = "";
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const l = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (l !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          n += l || "";
          continue;
        }
      }
      const r = s;
      switch (r.type) {
        case "escape": {
          n += t.text(r);
          break;
        }
        case "html": {
          n += t.html(r);
          break;
        }
        case "link": {
          n += t.link(r);
          break;
        }
        case "image": {
          n += t.image(r);
          break;
        }
        case "strong": {
          n += t.strong(r);
          break;
        }
        case "em": {
          n += t.em(r);
          break;
        }
        case "codespan": {
          n += t.codespan(r);
          break;
        }
        case "br": {
          n += t.br(r);
          break;
        }
        case "del": {
          n += t.del(r);
          break;
        }
        case "text": {
          n += t.text(r);
          break;
        }
        default: {
          const l = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return n;
  }
}
class we {
  constructor(e) {
    _(this, "options");
    this.options = e || ee;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
}
_(we, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var Y, gn, it, dn;
class Ri {
  constructor(...e) {
    Ht(this, Y);
    _(this, "defaults", ot());
    _(this, "options", this.setOptions);
    _(this, "parse", fe(this, Y, it).call(this, G.lex, q.parse));
    _(this, "parseInline", fe(this, Y, it).call(this, G.lexInline, q.parseInline));
    _(this, "Parser", q);
    _(this, "Renderer", $e);
    _(this, "TextRenderer", ht);
    _(this, "Lexer", G);
    _(this, "Tokenizer", Me);
    _(this, "Hooks", we);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var i, s;
    let n = [];
    for (const r of e)
      switch (n = n.concat(t.call(this, r)), r.type) {
        case "table": {
          const l = r;
          for (const a of l.header)
            n = n.concat(this.walkTokens(a.tokens, t));
          for (const a of l.rows)
            for (const p of a)
              n = n.concat(this.walkTokens(p.tokens, t));
          break;
        }
        case "list": {
          const l = r;
          n = n.concat(this.walkTokens(l.items, t));
          break;
        }
        default: {
          const l = r;
          (s = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && s[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((a) => {
            const p = l[a].flat(1 / 0);
            n = n.concat(this.walkTokens(p, t));
          }) : l.tokens && (n = n.concat(this.walkTokens(l.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const i = { ...n };
      if (i.async = this.defaults.async || i.async || !1, n.extensions && (n.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const r = t.renderers[s.name];
          r ? t.renderers[s.name] = function(...l) {
            let a = s.renderer.apply(this, l);
            return a === !1 && (a = r.apply(this, l)), a;
          } : t.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const r = t[s.level];
          r ? r.unshift(s.tokenizer) : t[s.level] = [s.tokenizer], s.start && (s.level === "block" ? t.startBlock ? t.startBlock.push(s.start) : t.startBlock = [s.start] : s.level === "inline" && (t.startInline ? t.startInline.push(s.start) : t.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (t.childTokens[s.name] = s.childTokens);
      }), i.extensions = t), n.renderer) {
        const s = this.defaults.renderer || new $e(this.defaults);
        for (const r in n.renderer) {
          if (!(r in s))
            throw new Error(`renderer '${r}' does not exist`);
          if (["options", "parser"].includes(r))
            continue;
          const l = r;
          let a = n.renderer[l];
          const p = s[l];
          s[l] = (...h) => {
            n.useNewRenderer || (a = fe(this, Y, gn).call(this, a, l, s));
            let d = a.apply(s, h);
            return d === !1 && (d = p.apply(s, h)), d || "";
          };
        }
        i.renderer = s;
      }
      if (n.tokenizer) {
        const s = this.defaults.tokenizer || new Me(this.defaults);
        for (const r in n.tokenizer) {
          if (!(r in s))
            throw new Error(`tokenizer '${r}' does not exist`);
          if (["options", "rules", "lexer"].includes(r))
            continue;
          const l = r, a = n.tokenizer[l], p = s[l];
          s[l] = (...h) => {
            let d = a.apply(s, h);
            return d === !1 && (d = p.apply(s, h)), d;
          };
        }
        i.tokenizer = s;
      }
      if (n.hooks) {
        const s = this.defaults.hooks || new we();
        for (const r in n.hooks) {
          if (!(r in s))
            throw new Error(`hook '${r}' does not exist`);
          if (r === "options")
            continue;
          const l = r, a = n.hooks[l], p = s[l];
          we.passThroughHooks.has(r) ? s[l] = (h) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(s, h)).then((x) => p.call(s, x));
            const d = a.call(s, h);
            return p.call(s, d);
          } : s[l] = (...h) => {
            let d = a.apply(s, h);
            return d === !1 && (d = p.apply(s, h)), d;
          };
        }
        i.hooks = s;
      }
      if (n.walkTokens) {
        const s = this.defaults.walkTokens, r = n.walkTokens;
        i.walkTokens = function(l) {
          let a = [];
          return a.push(r.call(this, l)), s && (a = a.concat(s.call(this, l))), a;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return G.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return q.parse(e, t ?? this.defaults);
  }
}
Y = new WeakSet(), // TODO: Remove this in next major release
gn = function(e, t, n) {
  switch (t) {
    case "heading":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, n.parser.parseInline(i.tokens), i.depth, Qn(n.parser.parseInline(i.tokens, n.parser.textRenderer)));
      };
    case "code":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.text, i.lang, !!i.escaped);
      };
    case "table":
      return function(i) {
        if (!i.type || i.type !== t)
          return e.apply(this, arguments);
        let s = "", r = "";
        for (let a = 0; a < i.header.length; a++)
          r += this.tablecell({
            text: i.header[a].text,
            tokens: i.header[a].tokens,
            header: !0,
            align: i.align[a]
          });
        s += this.tablerow({ text: r });
        let l = "";
        for (let a = 0; a < i.rows.length; a++) {
          const p = i.rows[a];
          r = "";
          for (let h = 0; h < p.length; h++)
            r += this.tablecell({
              text: p[h].text,
              tokens: p[h].tokens,
              header: !1,
              align: i.align[h]
            });
          l += this.tablerow({ text: r });
        }
        return e.call(this, s, l);
      };
    case "blockquote":
      return function(i) {
        if (!i.type || i.type !== t)
          return e.apply(this, arguments);
        const s = this.parser.parse(i.tokens);
        return e.call(this, s);
      };
    case "list":
      return function(i) {
        if (!i.type || i.type !== t)
          return e.apply(this, arguments);
        const s = i.ordered, r = i.start, l = i.loose;
        let a = "";
        for (let p = 0; p < i.items.length; p++) {
          const h = i.items[p], d = h.checked, x = h.task;
          let k = "";
          if (h.task) {
            const b = this.checkbox({ checked: !!d });
            l ? h.tokens.length > 0 && h.tokens[0].type === "paragraph" ? (h.tokens[0].text = b + " " + h.tokens[0].text, h.tokens[0].tokens && h.tokens[0].tokens.length > 0 && h.tokens[0].tokens[0].type === "text" && (h.tokens[0].tokens[0].text = b + " " + h.tokens[0].tokens[0].text)) : h.tokens.unshift({
              type: "text",
              text: b + " "
            }) : k += b + " ";
          }
          k += this.parser.parse(h.tokens, l), a += this.listitem({
            type: "list_item",
            raw: k,
            text: k,
            task: x,
            checked: !!d,
            loose: l,
            tokens: h.tokens
          });
        }
        return e.call(this, a, s, r);
      };
    case "html":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.text, i.block);
      };
    case "paragraph":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, this.parser.parseInline(i.tokens));
      };
    case "escape":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.text);
      };
    case "link":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.href, i.title, this.parser.parseInline(i.tokens));
      };
    case "image":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.href, i.title, i.text);
      };
    case "strong":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, this.parser.parseInline(i.tokens));
      };
    case "em":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, this.parser.parseInline(i.tokens));
      };
    case "codespan":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.text);
      };
    case "del":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, this.parser.parseInline(i.tokens));
      };
    case "text":
      return function(i) {
        return !i.type || i.type !== t ? e.apply(this, arguments) : e.call(this, i.text);
      };
  }
  return e;
}, it = function(e, t) {
  return (n, i) => {
    const s = { ...i }, r = { ...this.defaults, ...s };
    this.defaults.async === !0 && s.async === !1 && (r.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), r.async = !0);
    const l = fe(this, Y, dn).call(this, !!r.silent, !!r.async);
    if (typeof n > "u" || n === null)
      return l(new Error("marked(): input parameter is undefined or null"));
    if (typeof n != "string")
      return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
    if (r.hooks && (r.hooks.options = r), r.async)
      return Promise.resolve(r.hooks ? r.hooks.preprocess(n) : n).then((a) => e(a, r)).then((a) => r.hooks ? r.hooks.processAllTokens(a) : a).then((a) => r.walkTokens ? Promise.all(this.walkTokens(a, r.walkTokens)).then(() => a) : a).then((a) => t(a, r)).then((a) => r.hooks ? r.hooks.postprocess(a) : a).catch(l);
    try {
      r.hooks && (n = r.hooks.preprocess(n));
      let a = e(n, r);
      r.hooks && (a = r.hooks.processAllTokens(a)), r.walkTokens && this.walkTokens(a, r.walkTokens);
      let p = t(a, r);
      return r.hooks && (p = r.hooks.postprocess(p)), p;
    } catch (a) {
      return l(a);
    }
  };
}, dn = function(e, t) {
  return (n) => {
    if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const i = "<p>An error occurred:</p><pre>" + $(n.message + "", !0) + "</pre>";
      return t ? Promise.resolve(i) : i;
    }
    if (t)
      return Promise.reject(n);
    throw n;
  };
};
const J = new Ri();
function T(c, e) {
  return J.parse(c, e);
}
T.options = T.setOptions = function(c) {
  return J.setOptions(c), T.defaults = J.defaults, sn(T.defaults), T;
};
T.getDefaults = ot;
T.defaults = ee;
T.use = function(...c) {
  return J.use(...c), T.defaults = J.defaults, sn(T.defaults), T;
};
T.walkTokens = function(c, e) {
  return J.walkTokens(c, e);
};
T.parseInline = J.parseInline;
T.Parser = q;
T.parser = q.parse;
T.Renderer = $e;
T.TextRenderer = ht;
T.Lexer = G;
T.lexer = G.lex;
T.Tokenizer = Me;
T.Hooks = we;
T.parse = T;
T.options;
T.setOptions;
T.use;
T.walkTokens;
T.parseInline;
q.parse;
G.lex;
/*! @license DOMPurify 3.1.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.5/LICENSE */
const {
  entries: mn,
  setPrototypeOf: Xt,
  isFrozen: Si,
  getPrototypeOf: Li,
  getOwnPropertyDescriptor: Ii
} = Object;
let {
  freeze: N,
  seal: U,
  create: kn
} = Object, {
  apply: st,
  construct: rt
} = typeof Reflect < "u" && Reflect;
N || (N = function(e) {
  return e;
});
U || (U = function(e) {
  return e;
});
st || (st = function(e, t, n) {
  return e.apply(t, n);
});
rt || (rt = function(e, t) {
  return new e(...t);
});
const Oe = P(Array.prototype.forEach), Qt = P(Array.prototype.pop), me = P(Array.prototype.push), Ne = P(String.prototype.toLowerCase), Ve = P(String.prototype.toString), Vt = P(String.prototype.match), ke = P(String.prototype.replace), Oi = P(String.prototype.indexOf), Ci = P(String.prototype.trim), F = P(Object.prototype.hasOwnProperty), D = P(RegExp.prototype.test), be = Di(TypeError);
function P(c) {
  return function(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
      n[i - 1] = arguments[i];
    return st(c, e, n);
  };
}
function Di(c) {
  return function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return rt(c, t);
  };
}
function m(c, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ne;
  Xt && Xt(c, null);
  let n = e.length;
  for (; n--; ) {
    let i = e[n];
    if (typeof i == "string") {
      const s = t(i);
      s !== i && (Si(e) || (e[n] = s), i = s);
    }
    c[i] = !0;
  }
  return c;
}
function Ni(c) {
  for (let e = 0; e < c.length; e++)
    F(c, e) || (c[e] = null);
  return c;
}
function K(c) {
  const e = kn(null);
  for (const [t, n] of mn(c))
    F(c, t) && (Array.isArray(n) ? e[t] = Ni(n) : n && typeof n == "object" && n.constructor === Object ? e[t] = K(n) : e[t] = n);
  return e;
}
function Ce(c, e) {
  for (; c !== null; ) {
    const n = Ii(c, e);
    if (n) {
      if (n.get)
        return P(n.get);
      if (typeof n.value == "function")
        return P(n.value);
    }
    c = Li(c);
  }
  function t() {
    return null;
  }
  return t;
}
const Kt = N(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ke = N(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Je = N(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Mi = N(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), et = N(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), zi = N(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Jt = N(["#text"]), en = N(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), tt = N(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), tn = N(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), De = N(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), $i = U(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Pi = U(/<%[\w\W]*|[\w\W]*%>/gm), vi = U(/\${[\w\W]*}/gm), Ui = U(/^data-[\-\w.\u00B7-\uFFFF]/), Fi = U(/^aria-[\-\w]+$/), bn = U(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Bi = U(/^(?:\w+script|data):/i), Hi = U(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), xn = U(/^html$/i), Wi = U(/^[a-z][.\w]*(-[.\w]+)+$/i);
var nn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: $i,
  ERB_EXPR: Pi,
  TMPLIT_EXPR: vi,
  DATA_ATTR: Ui,
  ARIA_ATTR: Fi,
  IS_ALLOWED_URI: bn,
  IS_SCRIPT_OR_DATA: Bi,
  ATTR_WHITESPACE: Hi,
  DOCTYPE_NAME: xn,
  CUSTOM_ELEMENT: Wi
});
const xe = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, Gi = function() {
  return typeof window > "u" ? null : window;
}, qi = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let n = null;
  const i = "data-tt-policy-suffix";
  t && t.hasAttribute(i) && (n = t.getAttribute(i));
  const s = "dompurify" + (n ? "#" + n : "");
  try {
    return e.createPolicy(s, {
      createHTML(r) {
        return r;
      },
      createScriptURL(r) {
        return r;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + s + " could not be created."), null;
  }
};
function Tn() {
  let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Gi();
  const e = (g) => Tn(g);
  if (e.version = "3.1.5", e.removed = [], !c || !c.document || c.document.nodeType !== xe.document)
    return e.isSupported = !1, e;
  let {
    document: t
  } = c;
  const n = t, i = n.currentScript, {
    DocumentFragment: s,
    HTMLTemplateElement: r,
    Node: l,
    Element: a,
    NodeFilter: p,
    NamedNodeMap: h = c.NamedNodeMap || c.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: x,
    trustedTypes: k
  } = c, b = a.prototype, M = Ce(b, "cloneNode"), v = Ce(b, "nextSibling"), ae = Ce(b, "childNodes"), te = Ce(b, "parentNode");
  if (typeof r == "function") {
    const g = t.createElement("template");
    g.content && g.content.ownerDocument && (t = g.content.ownerDocument);
  }
  let A, X = "";
  const {
    implementation: Q,
    createNodeIterator: wn,
    createDocumentFragment: yn,
    getElementsByTagName: _n
  } = t, {
    importNode: En
  } = n;
  let B = {};
  e.isSupported = typeof mn == "function" && typeof te == "function" && Q && Q.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: ve,
    ERB_EXPR: Ue,
    TMPLIT_EXPR: Fe,
    DATA_ATTR: An,
    ARIA_ATTR: Rn,
    IS_SCRIPT_OR_DATA: Sn,
    ATTR_WHITESPACE: ft,
    CUSTOM_ELEMENT: Ln
  } = nn;
  let {
    IS_ALLOWED_URI: gt
  } = nn, R = null;
  const dt = m({}, [...Kt, ...Ke, ...Je, ...et, ...Jt]);
  let S = null;
  const mt = m({}, [...en, ...tt, ...tn, ...De]);
  let E = Object.seal(kn(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), ce = null, Be = null, kt = !0, He = !0, bt = !1, xt = !0, ne = !1, We = !0, V = !1, Ge = !1, qe = !1, ie = !1, Ee = !1, Ae = !1, Tt = !0, wt = !1;
  const In = "user-content-";
  let je = !0, ue = !1, se = {}, re = null;
  const yt = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let _t = null;
  const Et = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ze = null;
  const At = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Re = "http://www.w3.org/1998/Math/MathML", Se = "http://www.w3.org/2000/svg", j = "http://www.w3.org/1999/xhtml";
  let oe = j, Ye = !1, Xe = null;
  const On = m({}, [Re, Se, j], Ve);
  let pe = null;
  const Cn = ["application/xhtml+xml", "text/html"], Dn = "text/html";
  let L = null, le = null;
  const Nn = t.createElement("form"), Rt = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, Qe = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(le && le === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = K(o), pe = // eslint-disable-next-line unicorn/prefer-includes
      Cn.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? Dn : o.PARSER_MEDIA_TYPE, L = pe === "application/xhtml+xml" ? Ve : Ne, R = F(o, "ALLOWED_TAGS") ? m({}, o.ALLOWED_TAGS, L) : dt, S = F(o, "ALLOWED_ATTR") ? m({}, o.ALLOWED_ATTR, L) : mt, Xe = F(o, "ALLOWED_NAMESPACES") ? m({}, o.ALLOWED_NAMESPACES, Ve) : On, Ze = F(o, "ADD_URI_SAFE_ATTR") ? m(
        K(At),
        // eslint-disable-line indent
        o.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        L
        // eslint-disable-line indent
      ) : At, _t = F(o, "ADD_DATA_URI_TAGS") ? m(
        K(Et),
        // eslint-disable-line indent
        o.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        L
        // eslint-disable-line indent
      ) : Et, re = F(o, "FORBID_CONTENTS") ? m({}, o.FORBID_CONTENTS, L) : yt, ce = F(o, "FORBID_TAGS") ? m({}, o.FORBID_TAGS, L) : {}, Be = F(o, "FORBID_ATTR") ? m({}, o.FORBID_ATTR, L) : {}, se = F(o, "USE_PROFILES") ? o.USE_PROFILES : !1, kt = o.ALLOW_ARIA_ATTR !== !1, He = o.ALLOW_DATA_ATTR !== !1, bt = o.ALLOW_UNKNOWN_PROTOCOLS || !1, xt = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ne = o.SAFE_FOR_TEMPLATES || !1, We = o.SAFE_FOR_XML !== !1, V = o.WHOLE_DOCUMENT || !1, ie = o.RETURN_DOM || !1, Ee = o.RETURN_DOM_FRAGMENT || !1, Ae = o.RETURN_TRUSTED_TYPE || !1, qe = o.FORCE_BODY || !1, Tt = o.SANITIZE_DOM !== !1, wt = o.SANITIZE_NAMED_PROPS || !1, je = o.KEEP_CONTENT !== !1, ue = o.IN_PLACE || !1, gt = o.ALLOWED_URI_REGEXP || bn, oe = o.NAMESPACE || j, E = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && Rt(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && Rt(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ne && (He = !1), Ee && (ie = !0), se && (R = m({}, Jt), S = [], se.html === !0 && (m(R, Kt), m(S, en)), se.svg === !0 && (m(R, Ke), m(S, tt), m(S, De)), se.svgFilters === !0 && (m(R, Je), m(S, tt), m(S, De)), se.mathMl === !0 && (m(R, et), m(S, tn), m(S, De))), o.ADD_TAGS && (R === dt && (R = K(R)), m(R, o.ADD_TAGS, L)), o.ADD_ATTR && (S === mt && (S = K(S)), m(S, o.ADD_ATTR, L)), o.ADD_URI_SAFE_ATTR && m(Ze, o.ADD_URI_SAFE_ATTR, L), o.FORBID_CONTENTS && (re === yt && (re = K(re)), m(re, o.FORBID_CONTENTS, L)), je && (R["#text"] = !0), V && m(R, ["html", "head", "body"]), R.table && (m(R, ["tbody"]), delete ce.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        A = o.TRUSTED_TYPES_POLICY, X = A.createHTML("");
      } else
        A === void 0 && (A = qi(k, i)), A !== null && typeof X == "string" && (X = A.createHTML(""));
      N && N(o), le = o;
    }
  }, St = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Lt = m({}, ["foreignobject", "annotation-xml"]), Mn = m({}, ["title", "style", "font", "a", "script"]), It = m({}, [...Ke, ...Je, ...Mi]), Ot = m({}, [...et, ...zi]), zn = function(o) {
    let u = te(o);
    (!u || !u.tagName) && (u = {
      namespaceURI: oe,
      tagName: "template"
    });
    const f = Ne(o.tagName), y = Ne(u.tagName);
    return Xe[o.namespaceURI] ? o.namespaceURI === Se ? u.namespaceURI === j ? f === "svg" : u.namespaceURI === Re ? f === "svg" && (y === "annotation-xml" || St[y]) : !!It[f] : o.namespaceURI === Re ? u.namespaceURI === j ? f === "math" : u.namespaceURI === Se ? f === "math" && Lt[y] : !!Ot[f] : o.namespaceURI === j ? u.namespaceURI === Se && !Lt[y] || u.namespaceURI === Re && !St[y] ? !1 : !Ot[f] && (Mn[f] || !It[f]) : !!(pe === "application/xhtml+xml" && Xe[o.namespaceURI]) : !1;
  }, H = function(o) {
    me(e.removed, {
      element: o
    });
    try {
      o.parentNode.removeChild(o);
    } catch {
      o.remove();
    }
  }, Le = function(o, u) {
    try {
      me(e.removed, {
        attribute: u.getAttributeNode(o),
        from: u
      });
    } catch {
      me(e.removed, {
        attribute: null,
        from: u
      });
    }
    if (u.removeAttribute(o), o === "is" && !S[o])
      if (ie || Ee)
        try {
          H(u);
        } catch {
        }
      else
        try {
          u.setAttribute(o, "");
        } catch {
        }
  }, Ct = function(o) {
    let u = null, f = null;
    if (qe)
      o = "<remove></remove>" + o;
    else {
      const I = Vt(o, /^[\r\n\t ]+/);
      f = I && I[0];
    }
    pe === "application/xhtml+xml" && oe === j && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const y = A ? A.createHTML(o) : o;
    if (oe === j)
      try {
        u = new x().parseFromString(y, pe);
      } catch {
      }
    if (!u || !u.documentElement) {
      u = Q.createDocument(oe, "template", null);
      try {
        u.documentElement.innerHTML = Ye ? X : y;
      } catch {
      }
    }
    const O = u.body || u.documentElement;
    return o && f && O.insertBefore(t.createTextNode(f), O.childNodes[0] || null), oe === j ? _n.call(u, V ? "html" : "body")[0] : V ? u.documentElement : O;
  }, Dt = function(o) {
    return wn.call(
      o.ownerDocument || o,
      o,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, Nt = function(o) {
    return o instanceof d && (typeof o.nodeName != "string" || typeof o.textContent != "string" || typeof o.removeChild != "function" || !(o.attributes instanceof h) || typeof o.removeAttribute != "function" || typeof o.setAttribute != "function" || typeof o.namespaceURI != "string" || typeof o.insertBefore != "function" || typeof o.hasChildNodes != "function");
  }, Mt = function(o) {
    return typeof l == "function" && o instanceof l;
  }, Z = function(o, u, f) {
    B[o] && Oe(B[o], (y) => {
      y.call(e, u, f, le);
    });
  }, zt = function(o) {
    let u = null;
    if (Z("beforeSanitizeElements", o, null), Nt(o))
      return H(o), !0;
    const f = L(o.nodeName);
    if (Z("uponSanitizeElement", o, {
      tagName: f,
      allowedTags: R
    }), o.hasChildNodes() && !Mt(o.firstElementChild) && D(/<[/\w]/g, o.innerHTML) && D(/<[/\w]/g, o.textContent) || o.nodeType === xe.progressingInstruction || We && o.nodeType === xe.comment && D(/<[/\w]/g, o.data))
      return H(o), !0;
    if (!R[f] || ce[f]) {
      if (!ce[f] && Pt(f) && (E.tagNameCheck instanceof RegExp && D(E.tagNameCheck, f) || E.tagNameCheck instanceof Function && E.tagNameCheck(f)))
        return !1;
      if (je && !re[f]) {
        const y = te(o) || o.parentNode, O = ae(o) || o.childNodes;
        if (O && y) {
          const I = O.length;
          for (let z = I - 1; z >= 0; --z) {
            const W = M(O[z], !0);
            W.__removalCount = (o.__removalCount || 0) + 1, y.insertBefore(W, v(o));
          }
        }
      }
      return H(o), !0;
    }
    return o instanceof a && !zn(o) || (f === "noscript" || f === "noembed" || f === "noframes") && D(/<\/no(script|embed|frames)/i, o.innerHTML) ? (H(o), !0) : (ne && o.nodeType === xe.text && (u = o.textContent, Oe([ve, Ue, Fe], (y) => {
      u = ke(u, y, " ");
    }), o.textContent !== u && (me(e.removed, {
      element: o.cloneNode()
    }), o.textContent = u)), Z("afterSanitizeElements", o, null), !1);
  }, $t = function(o, u, f) {
    if (Tt && (u === "id" || u === "name") && (f in t || f in Nn))
      return !1;
    if (!(He && !Be[u] && D(An, u))) {
      if (!(kt && D(Rn, u))) {
        if (!S[u] || Be[u]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Pt(o) && (E.tagNameCheck instanceof RegExp && D(E.tagNameCheck, o) || E.tagNameCheck instanceof Function && E.tagNameCheck(o)) && (E.attributeNameCheck instanceof RegExp && D(E.attributeNameCheck, u) || E.attributeNameCheck instanceof Function && E.attributeNameCheck(u)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            u === "is" && E.allowCustomizedBuiltInElements && (E.tagNameCheck instanceof RegExp && D(E.tagNameCheck, f) || E.tagNameCheck instanceof Function && E.tagNameCheck(f)))
          ) return !1;
        } else if (!Ze[u]) {
          if (!D(gt, ke(f, ft, ""))) {
            if (!((u === "src" || u === "xlink:href" || u === "href") && o !== "script" && Oi(f, "data:") === 0 && _t[o])) {
              if (!(bt && !D(Sn, ke(f, ft, "")))) {
                if (f)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Pt = function(o) {
    return o !== "annotation-xml" && Vt(o, Ln);
  }, vt = function(o) {
    Z("beforeSanitizeAttributes", o, null);
    const {
      attributes: u
    } = o;
    if (!u)
      return;
    const f = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: S
    };
    let y = u.length;
    for (; y--; ) {
      const O = u[y], {
        name: I,
        namespaceURI: z,
        value: W
      } = O, he = L(I);
      let C = I === "value" ? W : Ci(W);
      if (f.attrName = he, f.attrValue = C, f.keepAttr = !0, f.forceKeepAttr = void 0, Z("uponSanitizeAttribute", o, f), C = f.attrValue, f.forceKeepAttr || (Le(I, o), !f.keepAttr))
        continue;
      if (!xt && D(/\/>/i, C)) {
        Le(I, o);
        continue;
      }
      if (We && D(/((--!?|])>)|<\/(style|title)/i, C)) {
        Le(I, o);
        continue;
      }
      ne && Oe([ve, Ue, Fe], (Ft) => {
        C = ke(C, Ft, " ");
      });
      const Ut = L(o.nodeName);
      if ($t(Ut, he, C)) {
        if (wt && (he === "id" || he === "name") && (Le(I, o), C = In + C), A && typeof k == "object" && typeof k.getAttributeType == "function" && !z)
          switch (k.getAttributeType(Ut, he)) {
            case "TrustedHTML": {
              C = A.createHTML(C);
              break;
            }
            case "TrustedScriptURL": {
              C = A.createScriptURL(C);
              break;
            }
          }
        try {
          z ? o.setAttributeNS(z, I, C) : o.setAttribute(I, C), Nt(o) ? H(o) : Qt(e.removed);
        } catch {
        }
      }
    }
    Z("afterSanitizeAttributes", o, null);
  }, $n = function g(o) {
    let u = null;
    const f = Dt(o);
    for (Z("beforeSanitizeShadowDOM", o, null); u = f.nextNode(); )
      Z("uponSanitizeShadowNode", u, null), !zt(u) && (u.content instanceof s && g(u.content), vt(u));
    Z("afterSanitizeShadowDOM", o, null);
  };
  return e.sanitize = function(g) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = null, f = null, y = null, O = null;
    if (Ye = !g, Ye && (g = "<!-->"), typeof g != "string" && !Mt(g))
      if (typeof g.toString == "function") {
        if (g = g.toString(), typeof g != "string")
          throw be("dirty is not a string, aborting");
      } else
        throw be("toString is not a function");
    if (!e.isSupported)
      return g;
    if (Ge || Qe(o), e.removed = [], typeof g == "string" && (ue = !1), ue) {
      if (g.nodeName) {
        const W = L(g.nodeName);
        if (!R[W] || ce[W])
          throw be("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (g instanceof l)
      u = Ct("<!---->"), f = u.ownerDocument.importNode(g, !0), f.nodeType === xe.element && f.nodeName === "BODY" || f.nodeName === "HTML" ? u = f : u.appendChild(f);
    else {
      if (!ie && !ne && !V && // eslint-disable-next-line unicorn/prefer-includes
      g.indexOf("<") === -1)
        return A && Ae ? A.createHTML(g) : g;
      if (u = Ct(g), !u)
        return ie ? null : Ae ? X : "";
    }
    u && qe && H(u.firstChild);
    const I = Dt(ue ? g : u);
    for (; y = I.nextNode(); )
      zt(y) || (y.content instanceof s && $n(y.content), vt(y));
    if (ue)
      return g;
    if (ie) {
      if (Ee)
        for (O = yn.call(u.ownerDocument); u.firstChild; )
          O.appendChild(u.firstChild);
      else
        O = u;
      return (S.shadowroot || S.shadowrootmode) && (O = En.call(n, O, !0)), O;
    }
    let z = V ? u.outerHTML : u.innerHTML;
    return V && R["!doctype"] && u.ownerDocument && u.ownerDocument.doctype && u.ownerDocument.doctype.name && D(xn, u.ownerDocument.doctype.name) && (z = "<!DOCTYPE " + u.ownerDocument.doctype.name + `>
` + z), ne && Oe([ve, Ue, Fe], (W) => {
      z = ke(z, W, " ");
    }), A && Ae ? A.createHTML(z) : z;
  }, e.setConfig = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Qe(g), Ge = !0;
  }, e.clearConfig = function() {
    le = null, Ge = !1;
  }, e.isValidAttribute = function(g, o, u) {
    le || Qe({});
    const f = L(g), y = L(o);
    return $t(f, y, u);
  }, e.addHook = function(g, o) {
    typeof o == "function" && (B[g] = B[g] || [], me(B[g], o));
  }, e.removeHook = function(g) {
    if (B[g])
      return Qt(B[g]);
  }, e.removeHooks = function(g) {
    B[g] && (B[g] = []);
  }, e.removeAllHooks = function() {
    B = {};
  }, e;
}
var ji = Tn();
const Zi = ["innerHTML"], Qi = /* @__PURE__ */ Fn({
  __name: "VueMarkdown",
  props: {
    md: { default: null },
    silent: { type: Boolean, default: !1 },
    breaks: { type: Boolean, default: !1 },
    gfm: { type: Boolean, default: !0 },
    pedantic: { type: Boolean, default: !1 }
  },
  setup(c) {
    const e = c, t = Bn(""), n = Wt(() => e.md), i = Wt(() => ({
      ...typeof e.silent == "boolean" ? { silent: e.silent } : { silent: !1 },
      ...typeof e.breaks == "boolean" ? { breaks: e.breaks } : { breaks: !1 },
      ...typeof e.gfm == "boolean" ? { gfm: e.gfm } : { gfm: !0 },
      ...typeof e.pedantic == "boolean" ? { pedantic: e.pedantic } : { pedantic: !1 }
    })), s = (r) => ji.sanitize(r);
    return Hn(n, async (r) => {
      r && (t.value = s(await T.parse(r, { async: !0, ...i.value })));
    }), (r, l) => t.value ? (Wn(), Gn("div", {
      key: 0,
      innerHTML: t.value
    }, null, 8, Zi)) : qn("", !0);
  }
});
export {
  Qi as VueMarkdown
};
//# sourceMappingURL=vue-markdown.mjs.map
