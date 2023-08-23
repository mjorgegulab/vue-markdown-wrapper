/**
 * vue-markdown-wrapper v1.0.0 - Vue Markdown component based on marked library
 * Copyright (c) 2023, Marc Jorge Gonzalez. (MIT Licensed)
 * https://github.com/mjorgegulab/vue-markdown-wrapper
 */
var fn = Object.defineProperty;
var dn = (l, e, n) => e in l ? fn(l, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : l[e] = n;
var w = (l, e, n) => (dn(l, typeof e != "symbol" ? e + "" : e, n), n), mn = (l, e, n) => {
  if (!e.has(l))
    throw TypeError("Cannot " + n);
};
var Ze = (l, e, n) => {
  if (e.has(l))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(l) : e.set(l, n);
};
var Te = (l, e, n) => (mn(l, e, "access private method"), n);
import { defineComponent as gn, ref as kn, computed as It, watch as bn, openBlock as _n, createElementBlock as xn, createCommentVNode as wn } from "vue";
function nt() {
  return {
    async: !1,
    baseUrl: null,
    breaks: !1,
    extensions: null,
    gfm: !0,
    headerIds: !1,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: !1,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartypants: !1,
    tokenizer: null,
    walkTokens: null,
    xhtml: !1
  };
}
let ee = nt();
function Bt(l) {
  ee = l;
}
const Ht = /[&<>"']/, Tn = new RegExp(Ht.source, "g"), Wt = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, yn = new RegExp(Wt.source, "g"), An = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Lt = (l) => An[l];
function z(l, e) {
  if (e) {
    if (Ht.test(l))
      return l.replace(Tn, Lt);
  } else if (Wt.test(l))
    return l.replace(yn, Lt);
  return l;
}
const En = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function Gt(l) {
  return l.replace(En, (e, n) => (n = n.toLowerCase(), n === "colon" ? ":" : n.charAt(0) === "#" ? n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1)) : ""));
}
const Sn = /(^|[^\[])\^/g;
function y(l, e) {
  l = typeof l == "string" ? l : l.source, e = e || "";
  const n = {
    replace: (t, i) => (i = typeof i == "object" && "source" in i ? i.source : i, i = i.replace(Sn, "$1"), l = l.replace(t, i), n),
    getRegex: () => new RegExp(l, e)
  };
  return n;
}
const Rn = /[^\w:]/g, In = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function Dt(l, e, n) {
  if (l) {
    let t;
    try {
      t = decodeURIComponent(Gt(n)).replace(Rn, "").toLowerCase();
    } catch {
      return null;
    }
    if (t.indexOf("javascript:") === 0 || t.indexOf("vbscript:") === 0 || t.indexOf("data:") === 0)
      return null;
  }
  e && !In.test(n) && (n = Cn(e, n));
  try {
    n = encodeURI(n).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return n;
}
const ye = {}, Ln = /^[^:]+:\/*[^/]*$/, Dn = /^([^:]+:)[\s\S]*$/, On = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function Cn(l, e) {
  ye[" " + l] || (Ln.test(l) ? ye[" " + l] = l + "/" : ye[" " + l] = Se(l, "/", !0)), l = ye[" " + l];
  const n = l.indexOf(":") === -1;
  return e.substring(0, 2) === "//" ? n ? e : l.replace(Dn, "$1") + e : e.charAt(0) === "/" ? n ? e : l.replace(On, "$1") + e : l + e;
}
const Ie = { exec: () => null };
function Ot(l, e) {
  const n = l.replace(/\|/g, (s, o, a) => {
    let u = !1, f = o;
    for (; --f >= 0 && a[f] === "\\"; )
      u = !u;
    return u ? "|" : " |";
  }), t = n.split(/ \|/);
  let i = 0;
  if (t[0].trim() || t.shift(), t.length > 0 && !t[t.length - 1].trim() && t.pop(), e)
    if (t.length > e)
      t.splice(e);
    else
      for (; t.length < e; )
        t.push("");
  for (; i < t.length; i++)
    t[i] = t[i].trim().replace(/\\\|/g, "|");
  return t;
}
function Se(l, e, n) {
  const t = l.length;
  if (t === 0)
    return "";
  let i = 0;
  for (; i < t; ) {
    const s = l.charAt(t - i - 1);
    if (s === e && !n)
      i++;
    else if (s !== e && n)
      i++;
    else
      break;
  }
  return l.slice(0, t - i);
}
function Nn(l, e) {
  if (l.indexOf(e[1]) === -1)
    return -1;
  let n = 0;
  for (let t = 0; t < l.length; t++)
    if (l[t] === "\\")
      t++;
    else if (l[t] === e[0])
      n++;
    else if (l[t] === e[1] && (n--, n < 0))
      return t;
  return -1;
}
function zn(l, e) {
  !l || l.silent || (e && console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"), (l.sanitize || l.sanitizer) && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"), (l.highlight || l.langPrefix !== "language-") && console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."), l.mangle && console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`."), l.baseUrl && console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."), l.smartypants && console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."), l.xhtml && console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."), (l.headerIds || l.headerPrefix) && console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`."));
}
function Ct(l, e, n, t) {
  const i = e.href, s = e.title ? z(e.title) : null, o = l[1].replace(/\\([\[\]])/g, "$1");
  if (l[0].charAt(0) !== "!") {
    t.state.inLink = !0;
    const a = {
      type: "link",
      raw: n,
      href: i,
      title: s,
      text: o,
      tokens: t.inlineTokens(o)
    };
    return t.state.inLink = !1, a;
  }
  return {
    type: "image",
    raw: n,
    href: i,
    title: s,
    text: z(o)
  };
}
function Mn(l, e) {
  const n = l.match(/^(\s+)(?:```)/);
  if (n === null)
    return e;
  const t = n[1];
  return e.split(`
`).map((i) => {
    const s = i.match(/^\s+/);
    if (s === null)
      return i;
    const [o] = s;
    return o.length >= t.length ? i.slice(t.length) : i;
  }).join(`
`);
}
class Le {
  constructor(e) {
    w(this, "options");
    // TODO: Fix this rules type
    w(this, "rules");
    w(this, "lexer");
    this.options = e || ee;
  }
  space(e) {
    const n = this.rules.block.newline.exec(e);
    if (n && n[0].length > 0)
      return {
        type: "space",
        raw: n[0]
      };
  }
  code(e) {
    const n = this.rules.block.code.exec(e);
    if (n) {
      const t = n[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? t : Se(t, `
`)
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const t = n[0], i = Mn(t, n[3] || "");
      return {
        type: "code",
        raw: t,
        lang: n[2] ? n[2].trim().replace(this.rules.inline._escapes, "$1") : n[2],
        text: i
      };
    }
  }
  heading(e) {
    const n = this.rules.block.heading.exec(e);
    if (n) {
      let t = n[2].trim();
      if (/#$/.test(t)) {
        const i = Se(t, "#");
        (this.options.pedantic || !i || / $/.test(i)) && (t = i.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  hr(e) {
    const n = this.rules.block.hr.exec(e);
    if (n)
      return {
        type: "hr",
        raw: n[0]
      };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      const t = n[0].replace(/^ *>[ \t]?/gm, ""), i = this.lexer.state.top;
      this.lexer.state.top = !0;
      const s = this.lexer.blockTokens(t);
      return this.lexer.state.top = i, {
        type: "blockquote",
        raw: n[0],
        tokens: s,
        text: t
      };
    }
  }
  list(e) {
    let n = this.rules.block.list.exec(e);
    if (n) {
      let t = n[1].trim();
      const i = t.length > 1, s = {
        type: "list",
        raw: "",
        ordered: i,
        start: i ? +t.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      t = i ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = i ? t : "[*+-]");
      const o = new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let a = "", u = "", f = !1;
      for (; e; ) {
        let d = !1;
        if (!(n = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        a = n[0], e = e.substring(a.length);
        let b = n[2].split(`
`, 1)[0].replace(/^\t+/, (ce) => " ".repeat(3 * ce.length)), m = e.split(`
`, 1)[0], x = 0;
        this.options.pedantic ? (x = 2, u = b.trimLeft()) : (x = n[2].search(/[^ ]/), x = x > 4 ? 1 : x, u = b.slice(x), x += n[1].length);
        let E = !1;
        if (!b && /^ *$/.test(m) && (a += m + `
`, e = e.substring(m.length + 1), d = !0), !d) {
          const ce = new RegExp(`^ {0,${Math.min(3, x - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), te = new RegExp(`^ {0,${Math.min(3, x - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), L = new RegExp(`^ {0,${Math.min(3, x - 1)}}(?:\`\`\`|~~~)`), Y = new RegExp(`^ {0,${Math.min(3, x - 1)}}#`);
          for (; e; ) {
            const X = e.split(`
`, 1)[0];
            if (m = X, this.options.pedantic && (m = m.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), L.test(m) || Y.test(m) || ce.test(m) || te.test(e))
              break;
            if (m.search(/[^ ]/) >= x || !m.trim())
              u += `
` + m.slice(x);
            else {
              if (E || b.search(/[^ ]/) >= 4 || L.test(b) || Y.test(b) || te.test(b))
                break;
              u += `
` + m;
            }
            !E && !m.trim() && (E = !0), a += X + `
`, e = e.substring(X.length + 1), b = m.slice(x);
          }
        }
        s.loose || (f ? s.loose = !0 : /\n *\n *$/.test(a) && (f = !0));
        let I = null, M;
        this.options.gfm && (I = /^\[[ xX]\] /.exec(u), I && (M = I[0] !== "[ ] ", u = u.replace(/^\[[ xX]\] +/, ""))), s.items.push({
          type: "list_item",
          raw: a,
          task: !!I,
          checked: M,
          loose: !1,
          text: u,
          tokens: []
        }), s.raw += a;
      }
      s.items[s.items.length - 1].raw = a.trimRight(), s.items[s.items.length - 1].text = u.trimRight(), s.raw = s.raw.trimRight();
      for (let d = 0; d < s.items.length; d++)
        if (this.lexer.state.top = !1, s.items[d].tokens = this.lexer.blockTokens(s.items[d].text, []), !s.loose) {
          const b = s.items[d].tokens.filter((x) => x.type === "space"), m = b.length > 0 && b.some((x) => /\n.*\n/.test(x.raw));
          s.loose = m;
        }
      if (s.loose)
        for (let d = 0; d < s.items.length; d++)
          s.items[d].loose = !0;
      return s;
    }
  }
  html(e) {
    const n = this.rules.block.html.exec(e);
    if (n) {
      const t = {
        type: "html",
        block: !0,
        raw: n[0],
        pre: !this.options.sanitizer && (n[1] === "pre" || n[1] === "script" || n[1] === "style"),
        text: n[0]
      };
      if (this.options.sanitize) {
        const i = this.options.sanitizer ? this.options.sanitizer(n[0]) : z(n[0]), s = t;
        s.type = "paragraph", s.text = i, s.tokens = this.lexer.inline(i);
      }
      return t;
    }
  }
  def(e) {
    const n = this.rules.block.def.exec(e);
    if (n) {
      const t = n[1].toLowerCase().replace(/\s+/g, " "), i = n[2] ? n[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "", s = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline._escapes, "$1") : n[3];
      return {
        type: "def",
        tag: t,
        raw: n[0],
        href: i,
        title: s
      };
    }
  }
  table(e) {
    const n = this.rules.block.table.exec(e);
    if (n) {
      const t = {
        type: "table",
        raw: n[0],
        header: Ot(n[1]).map((i) => ({ text: i, tokens: [] })),
        align: n[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: n[3] && n[3].trim() ? n[3].replace(/\n[ \t]*$/, "").split(`
`) : []
      };
      if (t.header.length === t.align.length) {
        let i = t.align.length, s, o, a, u;
        for (s = 0; s < i; s++) {
          const f = t.align[s];
          f && (/^ *-+: *$/.test(f) ? t.align[s] = "right" : /^ *:-+: *$/.test(f) ? t.align[s] = "center" : /^ *:-+ *$/.test(f) ? t.align[s] = "left" : t.align[s] = null);
        }
        for (i = t.rows.length, s = 0; s < i; s++)
          t.rows[s] = Ot(t.rows[s], t.header.length).map((f) => ({ text: f, tokens: [] }));
        for (i = t.header.length, o = 0; o < i; o++)
          t.header[o].tokens = this.lexer.inline(t.header[o].text);
        for (i = t.rows.length, o = 0; o < i; o++)
          for (u = t.rows[o], a = 0; a < u.length; a++)
            u[a].tokens = this.lexer.inline(u[a].text);
        return t;
      }
    }
  }
  lheading(e) {
    const n = this.rules.block.lheading.exec(e);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1])
      };
  }
  paragraph(e) {
    const n = this.rules.block.paragraph.exec(e);
    if (n) {
      const t = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  text(e) {
    const n = this.rules.block.text.exec(e);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0])
      };
  }
  escape(e) {
    const n = this.rules.inline.escape.exec(e);
    if (n)
      return {
        type: "escape",
        raw: n[0],
        text: z(n[1])
      };
  }
  tag(e) {
    const n = this.rules.inline.tag.exec(e);
    if (n)
      return !this.lexer.state.inLink && /^<a /i.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
        type: this.options.sanitize ? "text" : "html",
        raw: n[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(n[0]) : z(n[0]) : n[0]
      };
  }
  link(e) {
    const n = this.rules.inline.link.exec(e);
    if (n) {
      const t = n[2].trim();
      if (!this.options.pedantic && /^</.test(t)) {
        if (!/>$/.test(t))
          return;
        const o = Se(t.slice(0, -1), "\\");
        if ((t.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Nn(n[2], "()");
        if (o > -1) {
          const u = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + o;
          n[2] = n[2].substring(0, o), n[0] = n[0].substring(0, u).trim(), n[3] = "";
        }
      }
      let i = n[2], s = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
        o && (i = o[1], s = o[3]);
      } else
        s = n[3] ? n[3].slice(1, -1) : "";
      return i = i.trim(), /^</.test(i) && (this.options.pedantic && !/>$/.test(t) ? i = i.slice(1) : i = i.slice(1, -1)), Ct(n, {
        href: i && i.replace(this.rules.inline._escapes, "$1"),
        title: s && s.replace(this.rules.inline._escapes, "$1")
      }, n[0], this.lexer);
    }
  }
  reflink(e, n) {
    let t;
    if ((t = this.rules.inline.reflink.exec(e)) || (t = this.rules.inline.nolink.exec(e))) {
      let i = (t[2] || t[1]).replace(/\s+/g, " ");
      if (i = n[i.toLowerCase()], !i) {
        const s = t[0].charAt(0);
        return {
          type: "text",
          raw: s,
          text: s
        };
      }
      return Ct(t, i, t[0], this.lexer);
    }
  }
  emStrong(e, n, t = "") {
    let i = this.rules.inline.emStrong.lDelim.exec(e);
    if (!i || i[3] && t.match(/[\p{L}\p{N}]/u))
      return;
    if (!(i[1] || i[2] || "") || !t || this.rules.inline.punctuation.exec(t)) {
      const o = [...i[0]].length - 1;
      let a, u, f = o, d = 0;
      const b = i[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      for (b.lastIndex = 0, n = n.slice(-1 * e.length + o); (i = b.exec(n)) != null; ) {
        if (a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !a)
          continue;
        if (u = [...a].length, i[3] || i[4]) {
          f += u;
          continue;
        } else if ((i[5] || i[6]) && o % 3 && !((o + u) % 3)) {
          d += u;
          continue;
        }
        if (f -= u, f > 0)
          continue;
        u = Math.min(u, u + f + d);
        const m = [...e].slice(0, o + i.index + u + 1).join("");
        if (Math.min(o, u) % 2) {
          const E = m.slice(1, -1);
          return {
            type: "em",
            raw: m,
            text: E,
            tokens: this.lexer.inlineTokens(E)
          };
        }
        const x = m.slice(2, -2);
        return {
          type: "strong",
          raw: m,
          text: x,
          tokens: this.lexer.inlineTokens(x)
        };
      }
    }
  }
  codespan(e) {
    const n = this.rules.inline.code.exec(e);
    if (n) {
      let t = n[2].replace(/\n/g, " ");
      const i = /[^ ]/.test(t), s = /^ /.test(t) && / $/.test(t);
      return i && s && (t = t.substring(1, t.length - 1)), t = z(t, !0), {
        type: "codespan",
        raw: n[0],
        text: t
      };
    }
  }
  br(e) {
    const n = this.rules.inline.br.exec(e);
    if (n)
      return {
        type: "br",
        raw: n[0]
      };
  }
  del(e) {
    const n = this.rules.inline.del.exec(e);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2])
      };
  }
  autolink(e, n) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let i, s;
      return t[2] === "@" ? (i = z(this.options.mangle ? n(t[1]) : t[1]), s = "mailto:" + i) : (i = z(t[1]), s = i), {
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
  url(e, n) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, s;
      if (t[2] === "@")
        i = z(this.options.mangle ? n(t[0]) : t[0]), s = "mailto:" + i;
      else {
        let o;
        do
          o = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])[0];
        while (o !== t[0]);
        i = z(t[0]), t[1] === "www." ? s = "http://" + t[0] : s = t[0];
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
  inlineText(e, n) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let i;
      return this.lexer.state.inRawBlock ? i = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : z(t[0]) : t[0] : i = z(this.options.smartypants ? n(t[0]) : t[0]), {
        type: "text",
        raw: t[0],
        text: i
      };
    }
  }
}
const k = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: Ie,
  lheading: /^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
k._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
k._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
k.def = y(k.def).replace("label", k._label).replace("title", k._title).getRegex();
k.bullet = /(?:[*+-]|\d{1,9}[.)])/;
k.listItemStart = y(/^( *)(bull) */).replace("bull", k.bullet).getRegex();
k.list = y(k.list).replace(/bull/g, k.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + k.def.source + ")").getRegex();
k._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
k._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
k.html = y(k.html, "i").replace("comment", k._comment).replace("tag", k._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
k.lheading = y(k.lheading).replace(/bull/g, k.bullet).getRegex();
k.paragraph = y(k._paragraph).replace("hr", k.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", k._tag).getRegex();
k.blockquote = y(k.blockquote).replace("paragraph", k.paragraph).getRegex();
k.normal = { ...k };
k.gfm = {
  ...k.normal,
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
};
k.gfm.table = y(k.gfm.table).replace("hr", k.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", k._tag).getRegex();
k.gfm.paragraph = y(k._paragraph).replace("hr", k.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", k.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", k._tag).getRegex();
k.pedantic = {
  ...k.normal,
  html: y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", k._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Ie,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: y(k.normal._paragraph).replace("hr", k.hr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", k.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
const p = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: Ie,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    //         (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //         | Skip orphan inside strong      | Consume to delim | (1) #***              | (2) a***#, a***                    | (3) #***a, ***a                  | (4) ***#                 | (5) #***#                         | (6) a***a
    rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: Ie,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^((?![*_])[\spunctuation])/
};
p._punctuation = "\\p{P}$+<=>`^|~";
p.punctuation = y(p.punctuation, "u").replace(/punctuation/g, p._punctuation).getRegex();
p.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
p.anyPunctuation = /\\[punct]/g;
p._escapes = /\\([punct])/g;
p._comment = y(k._comment).replace("(?:-->|$)", "-->").getRegex();
p.emStrong.lDelim = y(p.emStrong.lDelim, "u").replace(/punct/g, p._punctuation).getRegex();
p.emStrong.rDelimAst = y(p.emStrong.rDelimAst, "gu").replace(/punct/g, p._punctuation).getRegex();
p.emStrong.rDelimUnd = y(p.emStrong.rDelimUnd, "gu").replace(/punct/g, p._punctuation).getRegex();
p.anyPunctuation = y(p.anyPunctuation, "gu").replace(/punct/g, p._punctuation).getRegex();
p._escapes = y(p._escapes, "gu").replace(/punct/g, p._punctuation).getRegex();
p._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
p._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
p.autolink = y(p.autolink).replace("scheme", p._scheme).replace("email", p._email).getRegex();
p._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
p.tag = y(p.tag).replace("comment", p._comment).replace("attribute", p._attribute).getRegex();
p._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
p._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
p._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
p.link = y(p.link).replace("label", p._label).replace("href", p._href).replace("title", p._title).getRegex();
p.reflink = y(p.reflink).replace("label", p._label).replace("ref", k._label).getRegex();
p.nolink = y(p.nolink).replace("ref", k._label).getRegex();
p.reflinkSearch = y(p.reflinkSearch, "g").replace("reflink", p.reflink).replace("nolink", p.nolink).getRegex();
p.normal = { ...p };
p.pedantic = {
  ...p.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: y(/^!?\[(label)\]\((.*?)\)/).replace("label", p._label).getRegex(),
  reflink: y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", p._label).getRegex()
};
p.gfm = {
  ...p.normal,
  escape: y(p.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
p.gfm.url = y(p.gfm.url, "i").replace("email", p.gfm._extended_email).getRegex();
p.breaks = {
  ...p.gfm,
  br: y(p.br).replace("{2,}", "*").getRegex(),
  text: y(p.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
function vn(l) {
  return l.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
}
function Nt(l) {
  let e = "";
  for (let n = 0; n < l.length; n++) {
    const t = Math.random() > 0.5 ? "x" + l.charCodeAt(n).toString(16) : l.charCodeAt(n).toString();
    e += "&#" + t + ";";
  }
  return e;
}
class G {
  constructor(e) {
    w(this, "tokens");
    w(this, "options");
    w(this, "state");
    w(this, "tokenizer");
    w(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || ee, this.options.tokenizer = this.options.tokenizer || new Le(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      block: k.normal,
      inline: p.normal
    };
    this.options.pedantic ? (n.block = k.pedantic, n.inline = p.pedantic) : this.options.gfm && (n.block = k.gfm, this.options.breaks ? n.inline = p.breaks : n.inline = p.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: k,
      inline: p
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new G(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new G(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    let n;
    for (; n = this.inlineQueue.shift(); )
      this.inlineTokens(n.src, n.tokens);
    return this.tokens;
  }
  blockTokens(e, n = []) {
    this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (a, u, f) => u + "    ".repeat(f.length));
    let t, i, s, o;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((a) => (t = a.call({ lexer: this }, e, n)) ? (e = e.substring(t.raw.length), n.push(t), !0) : !1))) {
        if (t = this.tokenizer.space(e)) {
          e = e.substring(t.raw.length), t.raw.length === 1 && n.length > 0 ? n[n.length - 1].raw += `
` : n.push(t);
          continue;
        }
        if (t = this.tokenizer.code(e)) {
          e = e.substring(t.raw.length), i = n[n.length - 1], i && (i.type === "paragraph" || i.type === "text") ? (i.raw += `
` + t.raw, i.text += `
` + t.text, this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : n.push(t);
          continue;
        }
        if (t = this.tokenizer.fences(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.heading(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.hr(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.blockquote(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.list(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.html(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.def(e)) {
          e = e.substring(t.raw.length), i = n[n.length - 1], i && (i.type === "paragraph" || i.type === "text") ? (i.raw += `
` + t.raw, i.text += `
` + t.raw, this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : this.tokens.links[t.tag] || (this.tokens.links[t.tag] = {
            href: t.href,
            title: t.title
          });
          continue;
        }
        if (t = this.tokenizer.table(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.lheading(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (s = e, this.options.extensions && this.options.extensions.startBlock) {
          let a = 1 / 0;
          const u = e.slice(1);
          let f;
          this.options.extensions.startBlock.forEach((d) => {
            f = d.call({ lexer: this }, u), typeof f == "number" && f >= 0 && (a = Math.min(a, f));
          }), a < 1 / 0 && a >= 0 && (s = e.substring(0, a + 1));
        }
        if (this.state.top && (t = this.tokenizer.paragraph(s))) {
          i = n[n.length - 1], o && i.type === "paragraph" ? (i.raw += `
` + t.raw, i.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : n.push(t), o = s.length !== e.length, e = e.substring(t.raw.length);
          continue;
        }
        if (t = this.tokenizer.text(e)) {
          e = e.substring(t.raw.length), i = n[n.length - 1], i && i.type === "text" ? (i.raw += `
` + t.raw, i.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : n.push(t);
          continue;
        }
        if (e) {
          const a = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(a);
            break;
          } else
            throw new Error(a);
        }
      }
    return this.state.top = !0, n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, n = []) {
    let t, i, s, o = e, a, u, f;
    if (this.tokens.links) {
      const d = Object.keys(this.tokens.links);
      if (d.length > 0)
        for (; (a = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          d.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (a = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (a = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, a.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (u || (f = ""), u = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((d) => (t = d.call({ lexer: this }, e, n)) ? (e = e.substring(t.raw.length), n.push(t), !0) : !1))) {
        if (t = this.tokenizer.escape(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.tag(e)) {
          e = e.substring(t.raw.length), i = n[n.length - 1], i && t.type === "text" && i.type === "text" ? (i.raw += t.raw, i.text += t.text) : n.push(t);
          continue;
        }
        if (t = this.tokenizer.link(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(t.raw.length), i = n[n.length - 1], i && t.type === "text" && i.type === "text" ? (i.raw += t.raw, i.text += t.text) : n.push(t);
          continue;
        }
        if (t = this.tokenizer.emStrong(e, o, f)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.codespan(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.br(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.del(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.autolink(e, Nt)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (!this.state.inLink && (t = this.tokenizer.url(e, Nt))) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (s = e, this.options.extensions && this.options.extensions.startInline) {
          let d = 1 / 0;
          const b = e.slice(1);
          let m;
          this.options.extensions.startInline.forEach((x) => {
            m = x.call({ lexer: this }, b), typeof m == "number" && m >= 0 && (d = Math.min(d, m));
          }), d < 1 / 0 && d >= 0 && (s = e.substring(0, d + 1));
        }
        if (t = this.tokenizer.inlineText(s, vn)) {
          e = e.substring(t.raw.length), t.raw.slice(-1) !== "_" && (f = t.raw.slice(-1)), u = !0, i = n[n.length - 1], i && i.type === "text" ? (i.raw += t.raw, i.text += t.text) : n.push(t);
          continue;
        }
        if (e) {
          const d = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else
            throw new Error(d);
        }
      }
    return n;
  }
}
class De {
  constructor(e) {
    w(this, "options");
    this.options = e || ee;
  }
  code(e, n, t) {
    var s;
    const i = (s = (n || "").match(/^\S*/)) == null ? void 0 : s[0];
    if (this.options.highlight) {
      const o = this.options.highlight(e, i);
      o != null && o !== e && (t = !0, e = o);
    }
    return e = e.replace(/\n$/, "") + `
`, i ? '<pre><code class="' + this.options.langPrefix + z(i) + '">' + (t ? e : z(e, !0)) + `</code></pre>
` : "<pre><code>" + (t ? e : z(e, !0)) + `</code></pre>
`;
  }
  blockquote(e) {
    return `<blockquote>
${e}</blockquote>
`;
  }
  html(e, n) {
    return e;
  }
  heading(e, n, t, i) {
    if (this.options.headerIds) {
      const s = this.options.headerPrefix + i.slug(t);
      return `<h${n} id="${s}">${e}</h${n}>
`;
    }
    return `<h${n}>${e}</h${n}>
`;
  }
  hr() {
    return this.options.xhtml ? `<hr/>
` : `<hr>
`;
  }
  list(e, n, t) {
    const i = n ? "ol" : "ul", s = n && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + i + s + `>
` + e + "</" + i + `>
`;
  }
  listitem(e, n, t) {
    return `<li>${e}</li>
`;
  }
  checkbox(e) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(e) {
    return `<p>${e}</p>
`;
  }
  table(e, n) {
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + n + `</table>
`;
  }
  tablerow(e) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e, n) {
    const t = n.header ? "th" : "td";
    return (n.align ? `<${t} align="${n.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  /**
   * span level renderer
   */
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, n, t) {
    const i = Dt(this.options.sanitize, this.options.baseUrl, e);
    if (i === null)
      return t;
    e = i;
    let s = '<a href="' + e + '"';
    return n && (s += ' title="' + n + '"'), s += ">" + t + "</a>", s;
  }
  image(e, n, t) {
    const i = Dt(this.options.sanitize, this.options.baseUrl, e);
    if (i === null)
      return t;
    e = i;
    let s = `<img src="${e}" alt="${t}"`;
    return n && (s += ` title="${n}"`), s += this.options.xhtml ? "/>" : ">", s;
  }
  text(e) {
    return e;
  }
}
class it {
  // no need for block level renderers
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, n, t) {
    return "" + t;
  }
  image(e, n, t) {
    return "" + t;
  }
  br() {
    return "";
  }
}
class st {
  constructor() {
    w(this, "seen");
    this.seen = {};
  }
  serialize(e) {
    return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  /**
   * Finds the next safe (unique) slug to use
   */
  getNextSafeSlug(e, n) {
    let t = e, i = 0;
    if (this.seen.hasOwnProperty(t)) {
      i = this.seen[e];
      do
        i++, t = e + "-" + i;
      while (this.seen.hasOwnProperty(t));
    }
    return n || (this.seen[e] = i, this.seen[t] = 0), t;
  }
  /**
   * Convert string to unique id
   */
  slug(e, n = {}) {
    const t = this.serialize(e);
    return this.getNextSafeSlug(t, n.dryrun);
  }
}
class j {
  constructor(e) {
    w(this, "options");
    w(this, "renderer");
    w(this, "textRenderer");
    w(this, "slugger");
    this.options = e || ee, this.options.renderer = this.options.renderer || new De(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new it(), this.slugger = new st();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new j(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new j(n).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, n = !0) {
    let t = "";
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const o = s, a = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
          t += a || "";
          continue;
        }
      }
      switch (s.type) {
        case "space":
          continue;
        case "hr": {
          t += this.renderer.hr();
          continue;
        }
        case "heading": {
          const o = s;
          t += this.renderer.heading(this.parseInline(o.tokens), o.depth, Gt(this.parseInline(o.tokens, this.textRenderer)), this.slugger);
          continue;
        }
        case "code": {
          const o = s;
          t += this.renderer.code(o.text, o.lang, !!o.escaped);
          continue;
        }
        case "table": {
          const o = s;
          let a = "", u = "";
          for (let d = 0; d < o.header.length; d++)
            u += this.renderer.tablecell(this.parseInline(o.header[d].tokens), { header: !0, align: o.align[d] });
          a += this.renderer.tablerow(u);
          let f = "";
          for (let d = 0; d < o.rows.length; d++) {
            const b = o.rows[d];
            u = "";
            for (let m = 0; m < b.length; m++)
              u += this.renderer.tablecell(this.parseInline(b[m].tokens), { header: !1, align: o.align[m] });
            f += this.renderer.tablerow(u);
          }
          t += this.renderer.table(a, f);
          continue;
        }
        case "blockquote": {
          const o = s, a = this.parse(o.tokens);
          t += this.renderer.blockquote(a);
          continue;
        }
        case "list": {
          const o = s, a = o.ordered, u = o.start, f = o.loose;
          let d = "";
          for (let b = 0; b < o.items.length; b++) {
            const m = o.items[b], x = m.checked, E = m.task;
            let I = "";
            if (m.task) {
              const M = this.renderer.checkbox(!!x);
              f ? m.tokens.length > 0 && m.tokens[0].type === "paragraph" ? (m.tokens[0].text = M + " " + m.tokens[0].text, m.tokens[0].tokens && m.tokens[0].tokens.length > 0 && m.tokens[0].tokens[0].type === "text" && (m.tokens[0].tokens[0].text = M + " " + m.tokens[0].tokens[0].text)) : m.tokens.unshift({
                type: "text",
                text: M
              }) : I += M;
            }
            I += this.parse(m.tokens, f), d += this.renderer.listitem(I, E, !!x);
          }
          t += this.renderer.list(d, a, u);
          continue;
        }
        case "html": {
          const o = s;
          t += this.renderer.html(o.text, o.block);
          continue;
        }
        case "paragraph": {
          const o = s;
          t += this.renderer.paragraph(this.parseInline(o.tokens));
          continue;
        }
        case "text": {
          let o = s, a = o.tokens ? this.parseInline(o.tokens) : o.text;
          for (; i + 1 < e.length && e[i + 1].type === "text"; )
            o = e[++i], a += `
` + (o.tokens ? this.parseInline(o.tokens) : o.text);
          t += n ? this.renderer.paragraph(a) : a;
          continue;
        }
        default: {
          const o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return t;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, n) {
    n = n || this.renderer;
    let t = "";
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const o = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          t += o || "";
          continue;
        }
      }
      switch (s.type) {
        case "escape": {
          const o = s;
          t += n.text(o.text);
          break;
        }
        case "html": {
          const o = s;
          t += n.html(o.text);
          break;
        }
        case "link": {
          const o = s;
          t += n.link(o.href, o.title, this.parseInline(o.tokens, n));
          break;
        }
        case "image": {
          const o = s;
          t += n.image(o.href, o.title, o.text);
          break;
        }
        case "strong": {
          const o = s;
          t += n.strong(this.parseInline(o.tokens, n));
          break;
        }
        case "em": {
          const o = s;
          t += n.em(this.parseInline(o.tokens, n));
          break;
        }
        case "codespan": {
          const o = s;
          t += n.codespan(o.text);
          break;
        }
        case "br": {
          t += n.br();
          break;
        }
        case "del": {
          const o = s;
          t += n.del(this.parseInline(o.tokens, n));
          break;
        }
        case "text": {
          const o = s;
          t += n.text(o.text);
          break;
        }
        default: {
          const o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return t;
  }
}
class de {
  constructor(e) {
    w(this, "options");
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
}
w(de, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess"
]));
var me, Je, Oe, jt;
class $n {
  constructor(...e) {
    Ze(this, me);
    Ze(this, Oe);
    w(this, "defaults", nt());
    w(this, "options", this.setOptions);
    w(this, "parse", Te(this, me, Je).call(this, G.lex, j.parse));
    w(this, "parseInline", Te(this, me, Je).call(this, G.lexInline, j.parseInline));
    w(this, "Parser", j);
    w(this, "parser", j.parse);
    w(this, "Renderer", De);
    w(this, "TextRenderer", it);
    w(this, "Lexer", G);
    w(this, "lexer", G.lex);
    w(this, "Tokenizer", Le);
    w(this, "Slugger", st);
    w(this, "Hooks", de);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, n) {
    var i, s;
    let t = [];
    for (const o of e)
      switch (t = t.concat(n.call(this, o)), o.type) {
        case "table": {
          const a = o;
          for (const u of a.header)
            t = t.concat(this.walkTokens(u.tokens, n));
          for (const u of a.rows)
            for (const f of u)
              t = t.concat(this.walkTokens(f.tokens, n));
          break;
        }
        case "list": {
          const a = o;
          t = t.concat(this.walkTokens(a.items, n));
          break;
        }
        default: {
          const a = o;
          (s = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && s[a.type] ? this.defaults.extensions.childTokens[a.type].forEach((u) => {
            t = t.concat(this.walkTokens(a[u], n));
          }) : a.tokens && (t = t.concat(this.walkTokens(a.tokens, n)));
        }
      }
    return t;
  }
  use(...e) {
    const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((t) => {
      const i = { ...t };
      if (i.async = this.defaults.async || i.async || !1, t.extensions && (t.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const o = n.renderers[s.name];
          o ? n.renderers[s.name] = function(...a) {
            let u = s.renderer.apply(this, a);
            return u === !1 && (u = o.apply(this, a)), u;
          } : n.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = n[s.level];
          o ? o.unshift(s.tokenizer) : n[s.level] = [s.tokenizer], s.start && (s.level === "block" ? n.startBlock ? n.startBlock.push(s.start) : n.startBlock = [s.start] : s.level === "inline" && (n.startInline ? n.startInline.push(s.start) : n.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (n.childTokens[s.name] = s.childTokens);
      }), i.extensions = n), t.renderer) {
        const s = this.defaults.renderer || new De(this.defaults);
        for (const o in t.renderer) {
          const a = t.renderer[o], u = o, f = s[u];
          s[u] = (...d) => {
            let b = a.apply(s, d);
            return b === !1 && (b = f.apply(s, d)), b || "";
          };
        }
        i.renderer = s;
      }
      if (t.tokenizer) {
        const s = this.defaults.tokenizer || new Le(this.defaults);
        for (const o in t.tokenizer) {
          const a = t.tokenizer[o], u = o, f = s[u];
          s[u] = (...d) => {
            let b = a.apply(s, d);
            return b === !1 && (b = f.apply(s, d)), b;
          };
        }
        i.tokenizer = s;
      }
      if (t.hooks) {
        const s = this.defaults.hooks || new de();
        for (const o in t.hooks) {
          const a = t.hooks[o], u = o, f = s[u];
          de.passThroughHooks.has(o) ? s[u] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(s, d)).then((m) => f.call(s, m));
            const b = a.call(s, d);
            return f.call(s, b);
          } : s[u] = (...d) => {
            let b = a.apply(s, d);
            return b === !1 && (b = f.apply(s, d)), b;
          };
        }
        i.hooks = s;
      }
      if (t.walkTokens) {
        const s = this.defaults.walkTokens, o = t.walkTokens;
        i.walkTokens = function(a) {
          let u = [];
          return u.push(o.call(this, a)), s && (u = u.concat(s.call(this, a))), u;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
}
me = new WeakSet(), Je = function(e, n) {
  return (t, i, s) => {
    typeof i == "function" && (s = i, i = null);
    const o = { ...i }, a = { ...this.defaults, ...o };
    this.defaults.async === !0 && o.async === !1 && (a.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), a.async = !0);
    const u = Te(this, Oe, jt).call(this, !!a.silent, !!a.async, s);
    if (typeof t > "u" || t === null)
      return u(new Error("marked(): input parameter is undefined or null"));
    if (typeof t != "string")
      return u(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
    if (zn(a, s), a.hooks && (a.hooks.options = a), s) {
      const f = s, d = a.highlight;
      let b;
      try {
        a.hooks && (t = a.hooks.preprocess(t)), b = e(t, a);
      } catch (E) {
        return u(E);
      }
      const m = (E) => {
        let I;
        if (!E)
          try {
            a.walkTokens && this.walkTokens(b, a.walkTokens), I = n(b, a), a.hooks && (I = a.hooks.postprocess(I));
          } catch (M) {
            E = M;
          }
        return a.highlight = d, E ? u(E) : f(null, I);
      };
      if (!d || d.length < 3 || (delete a.highlight, !b.length))
        return m();
      let x = 0;
      this.walkTokens(b, (E) => {
        E.type === "code" && (x++, setTimeout(() => {
          d(E.text, E.lang, (I, M) => {
            if (I)
              return m(I);
            M != null && M !== E.text && (E.text = M, E.escaped = !0), x--, x === 0 && m();
          });
        }, 0));
      }), x === 0 && m();
      return;
    }
    if (a.async)
      return Promise.resolve(a.hooks ? a.hooks.preprocess(t) : t).then((f) => e(f, a)).then((f) => a.walkTokens ? Promise.all(this.walkTokens(f, a.walkTokens)).then(() => f) : f).then((f) => n(f, a)).then((f) => a.hooks ? a.hooks.postprocess(f) : f).catch(u);
    try {
      a.hooks && (t = a.hooks.preprocess(t));
      const f = e(t, a);
      a.walkTokens && this.walkTokens(f, a.walkTokens);
      let d = n(f, a);
      return a.hooks && (d = a.hooks.postprocess(d)), d;
    } catch (f) {
      return u(f);
    }
  };
}, Oe = new WeakSet(), jt = function(e, n, t) {
  return (i) => {
    if (i.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const s = "<p>An error occurred:</p><pre>" + z(i.message + "", !0) + "</pre>";
      if (n)
        return Promise.resolve(s);
      if (t) {
        t(null, s);
        return;
      }
      return s;
    }
    if (n)
      return Promise.reject(i);
    if (t) {
      t(i);
      return;
    }
    throw i;
  };
};
const J = new $n();
function T(l, e, n) {
  return J.parse(l, e, n);
}
T.options = T.setOptions = function(l) {
  return J.setOptions(l), T.defaults = J.defaults, Bt(T.defaults), T;
};
T.getDefaults = nt;
T.defaults = ee;
T.use = function(...l) {
  return J.use(...l), T.defaults = J.defaults, Bt(T.defaults), T;
};
T.walkTokens = function(l, e) {
  return J.walkTokens(l, e);
};
T.parseInline = J.parseInline;
T.Parser = j;
T.parser = j.parse;
T.Renderer = De;
T.TextRenderer = it;
T.Lexer = G;
T.lexer = G.lex;
T.Tokenizer = Le;
T.Slugger = st;
T.Hooks = de;
T.parse = T;
T.options;
T.setOptions;
T.use;
T.walkTokens;
T.parseInline;
j.parse;
G.lex;
/*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE */
const {
  entries: qt,
  setPrototypeOf: zt,
  isFrozen: Pn,
  getPrototypeOf: Un,
  getOwnPropertyDescriptor: Fn
} = Object;
let {
  freeze: v,
  seal: B,
  create: Bn
} = Object, {
  apply: et,
  construct: tt
} = typeof Reflect < "u" && Reflect;
et || (et = function(e, n, t) {
  return e.apply(n, t);
});
v || (v = function(e) {
  return e;
});
B || (B = function(e) {
  return e;
});
tt || (tt = function(e, n) {
  return new e(...n);
});
const Hn = U(Array.prototype.forEach), Mt = U(Array.prototype.pop), he = U(Array.prototype.push), Re = U(String.prototype.toLowerCase), Ye = U(String.prototype.toString), Wn = U(String.prototype.match), F = U(String.prototype.replace), Gn = U(String.prototype.indexOf), jn = U(String.prototype.trim), $ = U(RegExp.prototype.test), fe = qn(TypeError);
function U(l) {
  return function(e) {
    for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      t[i - 1] = arguments[i];
    return et(l, e, t);
  };
}
function qn(l) {
  return function() {
    for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
      n[t] = arguments[t];
    return tt(l, n);
  };
}
function _(l, e, n) {
  var t;
  n = (t = n) !== null && t !== void 0 ? t : Re, zt && zt(l, null);
  let i = e.length;
  for (; i--; ) {
    let s = e[i];
    if (typeof s == "string") {
      const o = n(s);
      o !== s && (Pn(e) || (e[i] = o), s = o);
    }
    l[s] = !0;
  }
  return l;
}
function ae(l) {
  const e = Bn(null);
  for (const [n, t] of qt(l))
    e[n] = t;
  return e;
}
function Ae(l, e) {
  for (; l !== null; ) {
    const t = Fn(l, e);
    if (t) {
      if (t.get)
        return U(t.get);
      if (typeof t.value == "function")
        return U(t.value);
    }
    l = Un(l);
  }
  function n(t) {
    return console.warn("fallback value for", t), null;
  }
  return n;
}
const vt = v(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Xe = v(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Qe = v(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Zn = v(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Ve = v(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Yn = v(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), $t = v(["#text"]), Pt = v(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Ke = v(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Ut = v(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ee = v(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Xn = B(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Qn = B(/<%[\w\W]*|[\w\W]*%>/gm), Vn = B(/\${[\w\W]*}/gm), Kn = B(/^data-[\-\w.\u00B7-\uFFFF]/), Jn = B(/^aria-[\-\w]+$/), Zt = B(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ei = B(/^(?:\w+script|data):/i), ti = B(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Yt = B(/^html$/i);
var Ft = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: Xn,
  ERB_EXPR: Qn,
  TMPLIT_EXPR: Vn,
  DATA_ATTR: Kn,
  ARIA_ATTR: Jn,
  IS_ALLOWED_URI: Zt,
  IS_SCRIPT_OR_DATA: ei,
  ATTR_WHITESPACE: ti,
  DOCTYPE_NAME: Yt
});
const ni = () => typeof window > "u" ? null : window, ii = function(e, n) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let t = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (t = n.getAttribute(i));
  const s = "dompurify" + (t ? "#" + t : "");
  try {
    return e.createPolicy(s, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + s + " could not be created."), null;
  }
};
function Xt() {
  let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ni();
  const e = (g) => Xt(g);
  if (e.version = "3.0.5", e.removed = [], !l || !l.document || l.document.nodeType !== 9)
    return e.isSupported = !1, e;
  const n = l.document, t = n.currentScript;
  let {
    document: i
  } = l;
  const {
    DocumentFragment: s,
    HTMLTemplateElement: o,
    Node: a,
    Element: u,
    NodeFilter: f,
    NamedNodeMap: d = l.NamedNodeMap || l.MozNamedAttrMap,
    HTMLFormElement: b,
    DOMParser: m,
    trustedTypes: x
  } = l, E = u.prototype, I = Ae(E, "cloneNode"), M = Ae(E, "nextSibling"), ce = Ae(E, "childNodes"), te = Ae(E, "parentNode");
  if (typeof o == "function") {
    const g = i.createElement("template");
    g.content && g.content.ownerDocument && (i = g.content.ownerDocument);
  }
  let L, Y = "";
  const {
    implementation: X,
    createNodeIterator: Qt,
    createDocumentFragment: Vt,
    getElementsByTagName: Kt
  } = i, {
    importNode: Jt
  } = n;
  let H = {};
  e.isSupported = typeof qt == "function" && typeof te == "function" && X && X.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Ce,
    ERB_EXPR: Ne,
    TMPLIT_EXPR: ze,
    DATA_ATTR: en,
    ARIA_ATTR: tn,
    IS_SCRIPT_OR_DATA: nn,
    ATTR_WHITESPACE: rt
  } = Ft;
  let {
    IS_ALLOWED_URI: ot
  } = Ft, D = null;
  const lt = _({}, [...vt, ...Xe, ...Qe, ...Ve, ...$t]);
  let O = null;
  const at = _({}, [...Pt, ...Ke, ...Ut, ...Ee]);
  let R = Object.seal(Object.create(null, {
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
  })), ue = null, Me = null, ct = !0, ve = !0, ut = !1, pt = !0, ne = !1, Q = !1, $e = !1, Pe = !1, ie = !1, ge = !1, ke = !1, ht = !0, ft = !1;
  const sn = "user-content-";
  let Ue = !0, pe = !1, se = {}, re = null;
  const dt = _({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let mt = null;
  const gt = _({}, ["audio", "video", "img", "source", "image", "track"]);
  let Fe = null;
  const kt = _({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), be = "http://www.w3.org/1998/Math/MathML", _e = "http://www.w3.org/2000/svg", q = "http://www.w3.org/1999/xhtml";
  let oe = q, Be = !1, He = null;
  const rn = _({}, [be, _e, q], Ye);
  let V;
  const on = ["application/xhtml+xml", "text/html"], ln = "text/html";
  let C, le = null;
  const an = i.createElement("form"), bt = function(r) {
    return r instanceof RegExp || r instanceof Function;
  }, We = function(r) {
    if (!(le && le === r)) {
      if ((!r || typeof r != "object") && (r = {}), r = ae(r), V = // eslint-disable-next-line unicorn/prefer-includes
      on.indexOf(r.PARSER_MEDIA_TYPE) === -1 ? V = ln : V = r.PARSER_MEDIA_TYPE, C = V === "application/xhtml+xml" ? Ye : Re, D = "ALLOWED_TAGS" in r ? _({}, r.ALLOWED_TAGS, C) : lt, O = "ALLOWED_ATTR" in r ? _({}, r.ALLOWED_ATTR, C) : at, He = "ALLOWED_NAMESPACES" in r ? _({}, r.ALLOWED_NAMESPACES, Ye) : rn, Fe = "ADD_URI_SAFE_ATTR" in r ? _(
        ae(kt),
        // eslint-disable-line indent
        r.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        C
        // eslint-disable-line indent
      ) : kt, mt = "ADD_DATA_URI_TAGS" in r ? _(
        ae(gt),
        // eslint-disable-line indent
        r.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        C
        // eslint-disable-line indent
      ) : gt, re = "FORBID_CONTENTS" in r ? _({}, r.FORBID_CONTENTS, C) : dt, ue = "FORBID_TAGS" in r ? _({}, r.FORBID_TAGS, C) : {}, Me = "FORBID_ATTR" in r ? _({}, r.FORBID_ATTR, C) : {}, se = "USE_PROFILES" in r ? r.USE_PROFILES : !1, ct = r.ALLOW_ARIA_ATTR !== !1, ve = r.ALLOW_DATA_ATTR !== !1, ut = r.ALLOW_UNKNOWN_PROTOCOLS || !1, pt = r.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ne = r.SAFE_FOR_TEMPLATES || !1, Q = r.WHOLE_DOCUMENT || !1, ie = r.RETURN_DOM || !1, ge = r.RETURN_DOM_FRAGMENT || !1, ke = r.RETURN_TRUSTED_TYPE || !1, Pe = r.FORCE_BODY || !1, ht = r.SANITIZE_DOM !== !1, ft = r.SANITIZE_NAMED_PROPS || !1, Ue = r.KEEP_CONTENT !== !1, pe = r.IN_PLACE || !1, ot = r.ALLOWED_URI_REGEXP || Zt, oe = r.NAMESPACE || q, R = r.CUSTOM_ELEMENT_HANDLING || {}, r.CUSTOM_ELEMENT_HANDLING && bt(r.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (R.tagNameCheck = r.CUSTOM_ELEMENT_HANDLING.tagNameCheck), r.CUSTOM_ELEMENT_HANDLING && bt(r.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (R.attributeNameCheck = r.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), r.CUSTOM_ELEMENT_HANDLING && typeof r.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (R.allowCustomizedBuiltInElements = r.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ne && (ve = !1), ge && (ie = !0), se && (D = _({}, [...$t]), O = [], se.html === !0 && (_(D, vt), _(O, Pt)), se.svg === !0 && (_(D, Xe), _(O, Ke), _(O, Ee)), se.svgFilters === !0 && (_(D, Qe), _(O, Ke), _(O, Ee)), se.mathMl === !0 && (_(D, Ve), _(O, Ut), _(O, Ee))), r.ADD_TAGS && (D === lt && (D = ae(D)), _(D, r.ADD_TAGS, C)), r.ADD_ATTR && (O === at && (O = ae(O)), _(O, r.ADD_ATTR, C)), r.ADD_URI_SAFE_ATTR && _(Fe, r.ADD_URI_SAFE_ATTR, C), r.FORBID_CONTENTS && (re === dt && (re = ae(re)), _(re, r.FORBID_CONTENTS, C)), Ue && (D["#text"] = !0), Q && _(D, ["html", "head", "body"]), D.table && (_(D, ["tbody"]), delete ue.tbody), r.TRUSTED_TYPES_POLICY) {
        if (typeof r.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw fe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof r.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw fe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        L = r.TRUSTED_TYPES_POLICY, Y = L.createHTML("");
      } else
        L === void 0 && (L = ii(x, t)), L !== null && typeof Y == "string" && (Y = L.createHTML(""));
      v && v(r), le = r;
    }
  }, _t = _({}, ["mi", "mo", "mn", "ms", "mtext"]), xt = _({}, ["foreignobject", "desc", "title", "annotation-xml"]), cn = _({}, ["title", "style", "font", "a", "script"]), xe = _({}, Xe);
  _(xe, Qe), _(xe, Zn);
  const Ge = _({}, Ve);
  _(Ge, Yn);
  const un = function(r) {
    let c = te(r);
    (!c || !c.tagName) && (c = {
      namespaceURI: oe,
      tagName: "template"
    });
    const h = Re(r.tagName), A = Re(c.tagName);
    return He[r.namespaceURI] ? r.namespaceURI === _e ? c.namespaceURI === q ? h === "svg" : c.namespaceURI === be ? h === "svg" && (A === "annotation-xml" || _t[A]) : !!xe[h] : r.namespaceURI === be ? c.namespaceURI === q ? h === "math" : c.namespaceURI === _e ? h === "math" && xt[A] : !!Ge[h] : r.namespaceURI === q ? c.namespaceURI === _e && !xt[A] || c.namespaceURI === be && !_t[A] ? !1 : !Ge[h] && (cn[h] || !xe[h]) : !!(V === "application/xhtml+xml" && He[r.namespaceURI]) : !1;
  }, K = function(r) {
    he(e.removed, {
      element: r
    });
    try {
      r.parentNode.removeChild(r);
    } catch {
      r.remove();
    }
  }, je = function(r, c) {
    try {
      he(e.removed, {
        attribute: c.getAttributeNode(r),
        from: c
      });
    } catch {
      he(e.removed, {
        attribute: null,
        from: c
      });
    }
    if (c.removeAttribute(r), r === "is" && !O[r])
      if (ie || ge)
        try {
          K(c);
        } catch {
        }
      else
        try {
          c.setAttribute(r, "");
        } catch {
        }
  }, wt = function(r) {
    let c, h;
    if (Pe)
      r = "<remove></remove>" + r;
    else {
      const P = Wn(r, /^[\r\n\t ]+/);
      h = P && P[0];
    }
    V === "application/xhtml+xml" && oe === q && (r = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + r + "</body></html>");
    const A = L ? L.createHTML(r) : r;
    if (oe === q)
      try {
        c = new m().parseFromString(A, V);
      } catch {
      }
    if (!c || !c.documentElement) {
      c = X.createDocument(oe, "template", null);
      try {
        c.documentElement.innerHTML = Be ? Y : A;
      } catch {
      }
    }
    const N = c.body || c.documentElement;
    return r && h && N.insertBefore(i.createTextNode(h), N.childNodes[0] || null), oe === q ? Kt.call(c, Q ? "html" : "body")[0] : Q ? c.documentElement : N;
  }, Tt = function(r) {
    return Qt.call(
      r.ownerDocument || r,
      r,
      // eslint-disable-next-line no-bitwise
      f.SHOW_ELEMENT | f.SHOW_COMMENT | f.SHOW_TEXT,
      null,
      !1
    );
  }, pn = function(r) {
    return r instanceof b && (typeof r.nodeName != "string" || typeof r.textContent != "string" || typeof r.removeChild != "function" || !(r.attributes instanceof d) || typeof r.removeAttribute != "function" || typeof r.setAttribute != "function" || typeof r.namespaceURI != "string" || typeof r.insertBefore != "function" || typeof r.hasChildNodes != "function");
  }, we = function(r) {
    return typeof a == "object" ? r instanceof a : r && typeof r == "object" && typeof r.nodeType == "number" && typeof r.nodeName == "string";
  }, Z = function(r, c, h) {
    H[r] && Hn(H[r], (A) => {
      A.call(e, c, h, le);
    });
  }, yt = function(r) {
    let c;
    if (Z("beforeSanitizeElements", r, null), pn(r))
      return K(r), !0;
    const h = C(r.nodeName);
    if (Z("uponSanitizeElement", r, {
      tagName: h,
      allowedTags: D
    }), r.hasChildNodes() && !we(r.firstElementChild) && (!we(r.content) || !we(r.content.firstElementChild)) && $(/<[/\w]/g, r.innerHTML) && $(/<[/\w]/g, r.textContent))
      return K(r), !0;
    if (!D[h] || ue[h]) {
      if (!ue[h] && Et(h) && (R.tagNameCheck instanceof RegExp && $(R.tagNameCheck, h) || R.tagNameCheck instanceof Function && R.tagNameCheck(h)))
        return !1;
      if (Ue && !re[h]) {
        const A = te(r) || r.parentNode, N = ce(r) || r.childNodes;
        if (N && A) {
          const P = N.length;
          for (let S = P - 1; S >= 0; --S)
            A.insertBefore(I(N[S], !0), M(r));
        }
      }
      return K(r), !0;
    }
    return r instanceof u && !un(r) || (h === "noscript" || h === "noembed" || h === "noframes") && $(/<\/no(script|embed|frames)/i, r.innerHTML) ? (K(r), !0) : (ne && r.nodeType === 3 && (c = r.textContent, c = F(c, Ce, " "), c = F(c, Ne, " "), c = F(c, ze, " "), r.textContent !== c && (he(e.removed, {
      element: r.cloneNode()
    }), r.textContent = c)), Z("afterSanitizeElements", r, null), !1);
  }, At = function(r, c, h) {
    if (ht && (c === "id" || c === "name") && (h in i || h in an))
      return !1;
    if (!(ve && !Me[c] && $(en, c))) {
      if (!(ct && $(tn, c))) {
        if (!O[c] || Me[c]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Et(r) && (R.tagNameCheck instanceof RegExp && $(R.tagNameCheck, r) || R.tagNameCheck instanceof Function && R.tagNameCheck(r)) && (R.attributeNameCheck instanceof RegExp && $(R.attributeNameCheck, c) || R.attributeNameCheck instanceof Function && R.attributeNameCheck(c)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            c === "is" && R.allowCustomizedBuiltInElements && (R.tagNameCheck instanceof RegExp && $(R.tagNameCheck, h) || R.tagNameCheck instanceof Function && R.tagNameCheck(h)))
          )
            return !1;
        } else if (!Fe[c]) {
          if (!$(ot, F(h, rt, ""))) {
            if (!((c === "src" || c === "xlink:href" || c === "href") && r !== "script" && Gn(h, "data:") === 0 && mt[r])) {
              if (!(ut && !$(nn, F(h, rt, "")))) {
                if (h)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Et = function(r) {
    return r.indexOf("-") > 0;
  }, St = function(r) {
    let c, h, A, N;
    Z("beforeSanitizeAttributes", r, null);
    const {
      attributes: P
    } = r;
    if (!P)
      return;
    const S = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: O
    };
    for (N = P.length; N--; ) {
      c = P[N];
      const {
        name: W,
        namespaceURI: qe
      } = c;
      if (h = W === "value" ? c.value : jn(c.value), A = C(W), S.attrName = A, S.attrValue = h, S.keepAttr = !0, S.forceKeepAttr = void 0, Z("uponSanitizeAttribute", r, S), h = S.attrValue, S.forceKeepAttr || (je(W, r), !S.keepAttr))
        continue;
      if (!pt && $(/\/>/i, h)) {
        je(W, r);
        continue;
      }
      ne && (h = F(h, Ce, " "), h = F(h, Ne, " "), h = F(h, ze, " "));
      const Rt = C(r.nodeName);
      if (At(Rt, A, h)) {
        if (ft && (A === "id" || A === "name") && (je(W, r), h = sn + h), L && typeof x == "object" && typeof x.getAttributeType == "function" && !qe)
          switch (x.getAttributeType(Rt, A)) {
            case "TrustedHTML": {
              h = L.createHTML(h);
              break;
            }
            case "TrustedScriptURL": {
              h = L.createScriptURL(h);
              break;
            }
          }
        try {
          qe ? r.setAttributeNS(qe, W, h) : r.setAttribute(W, h), Mt(e.removed);
        } catch {
        }
      }
    }
    Z("afterSanitizeAttributes", r, null);
  }, hn = function g(r) {
    let c;
    const h = Tt(r);
    for (Z("beforeSanitizeShadowDOM", r, null); c = h.nextNode(); )
      Z("uponSanitizeShadowNode", c, null), !yt(c) && (c.content instanceof s && g(c.content), St(c));
    Z("afterSanitizeShadowDOM", r, null);
  };
  return e.sanitize = function(g) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c, h, A, N;
    if (Be = !g, Be && (g = "<!-->"), typeof g != "string" && !we(g))
      if (typeof g.toString == "function") {
        if (g = g.toString(), typeof g != "string")
          throw fe("dirty is not a string, aborting");
      } else
        throw fe("toString is not a function");
    if (!e.isSupported)
      return g;
    if ($e || We(r), e.removed = [], typeof g == "string" && (pe = !1), pe) {
      if (g.nodeName) {
        const W = C(g.nodeName);
        if (!D[W] || ue[W])
          throw fe("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (g instanceof a)
      c = wt("<!---->"), h = c.ownerDocument.importNode(g, !0), h.nodeType === 1 && h.nodeName === "BODY" || h.nodeName === "HTML" ? c = h : c.appendChild(h);
    else {
      if (!ie && !ne && !Q && // eslint-disable-next-line unicorn/prefer-includes
      g.indexOf("<") === -1)
        return L && ke ? L.createHTML(g) : g;
      if (c = wt(g), !c)
        return ie ? null : ke ? Y : "";
    }
    c && Pe && K(c.firstChild);
    const P = Tt(pe ? g : c);
    for (; A = P.nextNode(); )
      yt(A) || (A.content instanceof s && hn(A.content), St(A));
    if (pe)
      return g;
    if (ie) {
      if (ge)
        for (N = Vt.call(c.ownerDocument); c.firstChild; )
          N.appendChild(c.firstChild);
      else
        N = c;
      return (O.shadowroot || O.shadowrootmode) && (N = Jt.call(n, N, !0)), N;
    }
    let S = Q ? c.outerHTML : c.innerHTML;
    return Q && D["!doctype"] && c.ownerDocument && c.ownerDocument.doctype && c.ownerDocument.doctype.name && $(Yt, c.ownerDocument.doctype.name) && (S = "<!DOCTYPE " + c.ownerDocument.doctype.name + `>
` + S), ne && (S = F(S, Ce, " "), S = F(S, Ne, " "), S = F(S, ze, " ")), L && ke ? L.createHTML(S) : S;
  }, e.setConfig = function(g) {
    We(g), $e = !0;
  }, e.clearConfig = function() {
    le = null, $e = !1;
  }, e.isValidAttribute = function(g, r, c) {
    le || We({});
    const h = C(g), A = C(r);
    return At(h, A, c);
  }, e.addHook = function(g, r) {
    typeof r == "function" && (H[g] = H[g] || [], he(H[g], r));
  }, e.removeHook = function(g) {
    if (H[g])
      return Mt(H[g]);
  }, e.removeHooks = function(g) {
    H[g] && (H[g] = []);
  }, e.removeAllHooks = function() {
    H = {};
  }, e;
}
var si = Xt();
const ri = ["innerHTML"], ci = /* @__PURE__ */ gn({
  __name: "VueMarkdown",
  props: {
    md: { default: null },
    silent: { type: Boolean, default: !1 },
    breaks: { type: Boolean, default: !1 },
    gfm: { type: Boolean, default: !0 },
    pedantic: { type: Boolean, default: !1 }
  },
  setup(l) {
    const e = l, n = kn(""), t = It(() => e.md), i = It(() => ({
      ...typeof e.silent == "boolean" ? { silent: e.silent } : { silent: !1 },
      ...typeof e.breaks == "boolean" ? { breaks: e.breaks } : { breaks: !1 },
      ...typeof e.gfm == "boolean" ? { gfm: e.gfm } : { gfm: !0 },
      ...typeof e.pedantic == "boolean" ? { pedantic: e.pedantic } : { pedantic: !1 }
    })), s = (o) => si.sanitize(o);
    return bn(t, async (o) => {
      o && (n.value = s(await T.parse(o, { async: !0, ...i.value })));
    }), (o, a) => n.value ? (_n(), xn("div", {
      key: 0,
      innerHTML: n.value
    }, null, 8, ri)) : wn("", !0);
  }
});
export {
  ci as VueMarkdown
};
//# sourceMappingURL=vue-markdown.mjs.map
