/**
 * vue-markdown-wrapper v2.1.0 - Vue Markdown component based on marked library
 * Copyright (c) 2025, Marc Jorge Gonzalez. (MIT Licensed)
 * https://github.com/mjorgegulab/vue-markdown-wrapper
 */
var zn = Object.defineProperty;
var vn = (u, e, t) => e in u ? zn(u, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : u[e] = t;
var _ = (u, e, t) => vn(u, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as $n, ref as Un, computed as Wt, watch as Bn, createElementBlock as Fn, createCommentVNode as Hn, openBlock as Gn } from "vue";
function ut() {
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
let te = ut();
function on(u) {
  te = u;
}
const _e = { exec: () => null };
function x(u, e = "") {
  let t = typeof u == "string" ? u : u.source;
  const n = {
    replace: (s, r) => {
      let o = typeof r == "string" ? r : r.source;
      return o = o.replace(P.caret, "$1"), t = t.replace(s, o), n;
    },
    getRegex: () => new RegExp(t, e)
  };
  return n;
}
const P = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (u) => new RegExp(`^( {0,3}${u})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}#`),
  htmlBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}<(?:[a-z].*>|!--)`, "i")
}, Wn = /^(?:[ \t]*(?:\n|$))+/, qn = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Zn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ee = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, jn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, pt = /(?:[*+-]|\d{1,9}[.)])/, ln = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, an = x(ln).replace(/bull/g, pt).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Yn = x(ln).replace(/bull/g, pt).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ht = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Xn = /^[^\n]+/, ft = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Vn = x(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ft).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Qn = x(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, pt).getRegex(), Be = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", gt = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Kn = x("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", gt).replace("tag", Be).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), cn = x(ht).replace("hr", Ee).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Be).getRegex(), Jn = x(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", cn).getRegex(), dt = {
  blockquote: Jn,
  code: qn,
  def: Vn,
  fences: Zn,
  heading: jn,
  hr: Ee,
  html: Kn,
  lheading: an,
  list: Qn,
  newline: Wn,
  paragraph: cn,
  table: _e,
  text: Xn
}, qt = x("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ee).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Be).getRegex(), ei = {
  ...dt,
  lheading: Yn,
  table: qt,
  paragraph: x(ht).replace("hr", Ee).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", qt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Be).getRegex()
}, ti = {
  ...dt,
  html: x(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", gt).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: _e,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: x(ht).replace("hr", Ee).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", an).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, ni = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ii = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, un = /^( {2,}|\\)\n(?!\s*$)/, ri = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Fe = /[\p{P}\p{S}]/u, mt = /[\s\p{P}\p{S}]/u, pn = /[^\s\p{P}\p{S}]/u, si = x(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, mt).getRegex(), hn = /(?!~)[\p{P}\p{S}]/u, oi = /(?!~)[\s\p{P}\p{S}]/u, li = /(?:[^\s\p{P}\p{S}]|~)/u, ai = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, fn = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, ci = x(fn, "u").replace(/punct/g, Fe).getRegex(), ui = x(fn, "u").replace(/punct/g, hn).getRegex(), gn = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", pi = x(gn, "gu").replace(/notPunctSpace/g, pn).replace(/punctSpace/g, mt).replace(/punct/g, Fe).getRegex(), hi = x(gn, "gu").replace(/notPunctSpace/g, li).replace(/punctSpace/g, oi).replace(/punct/g, hn).getRegex(), fi = x("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, pn).replace(/punctSpace/g, mt).replace(/punct/g, Fe).getRegex(), gi = x(/\\(punct)/, "gu").replace(/punct/g, Fe).getRegex(), di = x(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), mi = x(gt).replace("(?:-->|$)", "-->").getRegex(), ki = x("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", mi).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ve = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, bi = x(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", ve).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), dn = x(/^!?\[(label)\]\[(ref)\]/).replace("label", ve).replace("ref", ft).getRegex(), mn = x(/^!?\[(ref)\](?:\[\])?/).replace("ref", ft).getRegex(), xi = x("reflink|nolink(?!\\()", "g").replace("reflink", dn).replace("nolink", mn).getRegex(), kt = {
  _backpedal: _e,
  // only used for GFM url
  anyPunctuation: gi,
  autolink: di,
  blockSkip: ai,
  br: un,
  code: ii,
  del: _e,
  emStrongLDelim: ci,
  emStrongRDelimAst: pi,
  emStrongRDelimUnd: fi,
  escape: ni,
  link: bi,
  nolink: mn,
  punctuation: si,
  reflink: dn,
  reflinkSearch: xi,
  tag: ki,
  text: ri,
  url: _e
}, Ti = {
  ...kt,
  link: x(/^!?\[(label)\]\((.*?)\)/).replace("label", ve).getRegex(),
  reflink: x(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ve).getRegex()
}, lt = {
  ...kt,
  emStrongRDelimAst: hi,
  emStrongLDelim: ui,
  url: x(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, wi = {
  ...lt,
  br: x(un).replace("{2,}", "*").getRegex(),
  text: x(lt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Ne = {
  normal: dt,
  gfm: ei,
  pedantic: ti
}, de = {
  normal: kt,
  gfm: lt,
  breaks: wi,
  pedantic: Ti
}, _i = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Zt = (u) => _i[u];
function Z(u, e) {
  if (e) {
    if (P.escapeTest.test(u))
      return u.replace(P.escapeReplace, Zt);
  } else if (P.escapeTestNoEncode.test(u))
    return u.replace(P.escapeReplaceNoEncode, Zt);
  return u;
}
function jt(u) {
  try {
    u = encodeURI(u).replace(P.percentDecode, "%");
  } catch {
    return null;
  }
  return u;
}
function Yt(u, e) {
  var r;
  const t = u.replace(P.findPipe, (o, l, p) => {
    let a = !1, c = l;
    for (; --c >= 0 && p[c] === "\\"; )
      a = !a;
    return a ? "|" : " |";
  }), n = t.split(P.splitPipe);
  let s = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((r = n.at(-1)) != null && r.trim()) && n.pop(), e)
    if (n.length > e)
      n.splice(e);
    else
      for (; n.length < e; )
        n.push("");
  for (; s < n.length; s++)
    n[s] = n[s].trim().replace(P.slashPipe, "|");
  return n;
}
function me(u, e, t) {
  const n = u.length;
  if (n === 0)
    return "";
  let s = 0;
  for (; s < n && u.charAt(n - s - 1) === e; )
    s++;
  return u.slice(0, n - s);
}
function Ai(u, e) {
  if (u.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let n = 0; n < u.length; n++)
    if (u[n] === "\\")
      n++;
    else if (u[n] === e[0])
      t++;
    else if (u[n] === e[1] && (t--, t < 0))
      return n;
  return -1;
}
function Xt(u, e, t, n, s) {
  const r = e.href, o = e.title || null, l = u[1].replace(s.other.outputLinkReplace, "$1");
  if (u[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const p = {
      type: "link",
      raw: t,
      href: r,
      title: o,
      text: l,
      tokens: n.inlineTokens(l)
    };
    return n.state.inLink = !1, p;
  }
  return {
    type: "image",
    raw: t,
    href: r,
    title: o,
    text: l
  };
}
function Ei(u, e, t) {
  const n = u.match(t.other.indentCodeCompensation);
  if (n === null)
    return e;
  const s = n[1];
  return e.split(`
`).map((r) => {
    const o = r.match(t.other.beginningSpace);
    if (o === null)
      return r;
    const [l] = o;
    return l.length >= s.length ? r.slice(s.length) : r;
  }).join(`
`);
}
class $e {
  // set by the lexer
  constructor(e) {
    _(this, "options");
    _(this, "rules");
    // set by the lexer
    _(this, "lexer");
    this.options = e || te;
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
      const n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : me(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = Ei(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: s
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const s = me(n, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
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
        raw: me(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = me(t[0], `
`).split(`
`), s = "", r = "";
      const o = [];
      for (; n.length > 0; ) {
        let l = !1;
        const p = [];
        let a;
        for (a = 0; a < n.length; a++)
          if (this.rules.other.blockquoteStart.test(n[a]))
            p.push(n[a]), l = !0;
          else if (!l)
            p.push(n[a]);
          else
            break;
        n = n.slice(a);
        const c = p.join(`
`), d = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${c}` : c, r = r ? `${r}
${d}` : d;
        const m = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, o, !0), this.lexer.state.top = m, n.length === 0)
          break;
        const k = o.at(-1);
        if ((k == null ? void 0 : k.type) === "code")
          break;
        if ((k == null ? void 0 : k.type) === "blockquote") {
          const A = k, w = A.raw + `
` + n.join(`
`), $ = this.blockquote(w);
          o[o.length - 1] = $, s = s.substring(0, s.length - A.raw.length) + $.raw, r = r.substring(0, r.length - A.text.length) + $.text;
          break;
        } else if ((k == null ? void 0 : k.type) === "list") {
          const A = k, w = A.raw + `
` + n.join(`
`), $ = this.list(w);
          o[o.length - 1] = $, s = s.substring(0, s.length - k.raw.length) + $.raw, r = r.substring(0, r.length - A.raw.length) + $.raw, n = w.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: s,
        tokens: o,
        text: r
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const s = n.length > 1, r = {
        type: "list",
        raw: "",
        ordered: s,
        start: s ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
      const o = this.rules.other.listItemRegex(n);
      let l = !1;
      for (; e; ) {
        let a = !1, c = "", d = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        c = t[0], e = e.substring(c.length);
        let m = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (ae) => " ".repeat(3 * ae.length)), k = e.split(`
`, 1)[0], A = !m.trim(), w = 0;
        if (this.options.pedantic ? (w = 2, d = m.trimStart()) : A ? w = t[1].length + 1 : (w = t[2].search(this.rules.other.nonSpaceChar), w = w > 4 ? 1 : w, d = m.slice(w), w += t[1].length), A && this.rules.other.blankLine.test(k) && (c += k + `
`, e = e.substring(k.length + 1), a = !0), !a) {
          const ae = this.rules.other.nextBulletRegex(w), V = this.rules.other.hrRegex(w), y = this.rules.other.fencesBeginRegex(w), X = this.rules.other.headingBeginRegex(w), ce = this.rules.other.htmlBeginRegex(w);
          for (; e; ) {
            const ue = e.split(`
`, 1)[0];
            let Q;
            if (k = ue, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), Q = k) : Q = k.replace(this.rules.other.tabCharGlobal, "    "), y.test(k) || X.test(k) || ce.test(k) || ae.test(k) || V.test(k))
              break;
            if (Q.search(this.rules.other.nonSpaceChar) >= w || !k.trim())
              d += `
` + Q.slice(w);
            else {
              if (A || m.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || y.test(m) || X.test(m) || V.test(m))
                break;
              d += `
` + k;
            }
            !A && !k.trim() && (A = !0), c += ue + `
`, e = e.substring(ue.length + 1), m = Q.slice(w);
          }
        }
        r.loose || (l ? r.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (l = !0));
        let $ = null, Se;
        this.options.gfm && ($ = this.rules.other.listIsTask.exec(d), $ && (Se = $[0] !== "[ ] ", d = d.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: c,
          task: !!$,
          checked: Se,
          loose: !1,
          text: d,
          tokens: []
        }), r.raw += c;
      }
      const p = r.items.at(-1);
      if (p)
        p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let a = 0; a < r.items.length; a++)
        if (this.lexer.state.top = !1, r.items[a].tokens = this.lexer.blockTokens(r.items[a].text, []), !r.loose) {
          const c = r.items[a].tokens.filter((m) => m.type === "space"), d = c.length > 0 && c.some((m) => this.rules.other.anyLine.test(m.raw));
          r.loose = d;
        }
      if (r.loose)
        for (let a = 0; a < r.items.length; a++)
          r.items[a].loose = !0;
      return r;
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
      const n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: s,
        title: r
      };
    }
  }
  table(e) {
    var l;
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const n = Yt(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (l = t[3]) != null && l.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === s.length) {
      for (const p of s)
        this.rules.other.tableAlignRight.test(p) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(p) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(p) ? o.align.push("left") : o.align.push(null);
      for (let p = 0; p < n.length; p++)
        o.header.push({
          text: n[p],
          tokens: this.lexer.inline(n[p]),
          header: !0,
          align: o.align[p]
        });
      for (const p of r)
        o.rows.push(Yt(p, o.header.length).map((a, c) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: o.align[c]
        })));
      return o;
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
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
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
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n))
          return;
        const o = me(n.slice(0, -1), "\\");
        if ((n.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Ai(t[2], "()");
        if (o > -1) {
          const p = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + o;
          t[2] = t[2].substring(0, o), t[0] = t[0].substring(0, p).trim(), t[3] = "";
        }
      }
      let s = t[2], r = "";
      if (this.options.pedantic) {
        const o = this.rules.other.pedanticHrefTitle.exec(s);
        o && (s = o[1], r = o[3]);
      } else
        r = t[3] ? t[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Xt(t, {
        href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = t[s.toLowerCase()];
      if (!r) {
        const o = n[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Xt(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const o = [...s[0]].length - 1;
      let l, p, a = o, c = 0;
      const d = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, t = t.slice(-1 * e.length + o); (s = d.exec(t)) != null; ) {
        if (l = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !l)
          continue;
        if (p = [...l].length, s[3] || s[4]) {
          a += p;
          continue;
        } else if ((s[5] || s[6]) && o % 3 && !((o + p) % 3)) {
          c += p;
          continue;
        }
        if (a -= p, a > 0)
          continue;
        p = Math.min(p, p + a + c);
        const m = [...s[0]][0].length, k = e.slice(0, o + s.index + m + p);
        if (Math.min(o, p) % 2) {
          const w = k.slice(1, -1);
          return {
            type: "em",
            raw: k,
            text: w,
            tokens: this.lexer.inlineTokens(w)
          };
        }
        const A = k.slice(2, -2);
        return {
          type: "strong",
          raw: k,
          text: A,
          tokens: this.lexer.inlineTokens(A)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return s && r && (n = n.substring(1, n.length - 1)), {
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
      let n, s;
      return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: s,
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
      let s, r;
      if (t[2] === "@")
        s = t[0], r = "mailto:" + s;
      else {
        let o;
        do
          o = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (o !== t[0]);
        s = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: s,
        href: r,
        tokens: [
          {
            type: "text",
            raw: s,
            text: s
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const n = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: n
      };
    }
  }
}
class B {
  constructor(e) {
    _(this, "tokens");
    _(this, "options");
    _(this, "state");
    _(this, "tokenizer");
    _(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || te, this.options.tokenizer = this.options.tokenizer || new $e(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      other: P,
      block: Ne.normal,
      inline: de.normal
    };
    this.options.pedantic ? (t.block = Ne.pedantic, t.inline = de.pedantic) : this.options.gfm && (t.block = Ne.gfm, this.options.breaks ? t.inline = de.breaks : t.inline = de.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Ne,
      inline: de
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new B(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new B(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(P.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = !1) {
    var s, r, o;
    for (this.options.pedantic && (e = e.replace(P.tabCharGlobal, "    ").replace(P.spaceLine, "")); e; ) {
      let l;
      if ((r = (s = this.options.extensions) == null ? void 0 : s.block) != null && r.some((a) => (l = a.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        const a = t.at(-1);
        l.raw.length === 1 && a !== void 0 ? a.raw += `
` : t.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        const a = t.at(-1);
        (a == null ? void 0 : a.type) === "paragraph" || (a == null ? void 0 : a.type) === "text" ? (a.raw += `
` + l.raw, a.text += `
` + l.text, this.inlineQueue.at(-1).src = a.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.list(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.html(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.def(e)) {
        e = e.substring(l.raw.length);
        const a = t.at(-1);
        (a == null ? void 0 : a.type) === "paragraph" || (a == null ? void 0 : a.type) === "text" ? (a.raw += `
` + l.raw, a.text += `
` + l.raw, this.inlineQueue.at(-1).src = a.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = {
          href: l.href,
          title: l.title
        });
        continue;
      }
      if (l = this.tokenizer.table(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let p = e;
      if ((o = this.options.extensions) != null && o.startBlock) {
        let a = 1 / 0;
        const c = e.slice(1);
        let d;
        this.options.extensions.startBlock.forEach((m) => {
          d = m.call({ lexer: this }, c), typeof d == "number" && d >= 0 && (a = Math.min(a, d));
        }), a < 1 / 0 && a >= 0 && (p = e.substring(0, a + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(p))) {
        const a = t.at(-1);
        n && (a == null ? void 0 : a.type) === "paragraph" ? (a.raw += `
` + l.raw, a.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(l), n = p.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        const a = t.at(-1);
        (a == null ? void 0 : a.type) === "text" ? (a.raw += `
` + l.raw, a.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(l);
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
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    var l, p, a;
    let n = e, s = null;
    if (this.tokens.links) {
      const c = Object.keys(this.tokens.links);
      if (c.length > 0)
        for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; )
          c.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; )
      n = n.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; )
      n = n.slice(0, s.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let r = !1, o = "";
    for (; e; ) {
      r || (o = ""), r = !1;
      let c;
      if ((p = (l = this.options.extensions) == null ? void 0 : l.inline) != null && p.some((m) => (c = m.call({ lexer: this }, e, t)) ? (e = e.substring(c.raw.length), t.push(c), !0) : !1))
        continue;
      if (c = this.tokenizer.escape(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.tag(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.link(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(c.raw.length);
        const m = t.at(-1);
        c.type === "text" && (m == null ? void 0 : m.type) === "text" ? (m.raw += c.raw, m.text += c.text) : t.push(c);
        continue;
      }
      if (c = this.tokenizer.emStrong(e, n, o)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.codespan(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.br(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.del(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.autolink(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (!this.state.inLink && (c = this.tokenizer.url(e))) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      let d = e;
      if ((a = this.options.extensions) != null && a.startInline) {
        let m = 1 / 0;
        const k = e.slice(1);
        let A;
        this.options.extensions.startInline.forEach((w) => {
          A = w.call({ lexer: this }, k), typeof A == "number" && A >= 0 && (m = Math.min(m, A));
        }), m < 1 / 0 && m >= 0 && (d = e.substring(0, m + 1));
      }
      if (c = this.tokenizer.inlineText(d)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (o = c.raw.slice(-1)), r = !0;
        const m = t.at(-1);
        (m == null ? void 0 : m.type) === "text" ? (m.raw += c.raw, m.text += c.text) : t.push(c);
        continue;
      }
      if (e) {
        const m = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(m);
          break;
        } else
          throw new Error(m);
      }
    }
    return t;
  }
}
class Ue {
  // set by the parser
  constructor(e) {
    _(this, "options");
    _(this, "parser");
    this.options = e || te;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var o;
    const s = (o = (t || "").match(P.notSpaceStart)) == null ? void 0 : o[0], r = e.replace(P.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + Z(s) + '">' + (n ? r : Z(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : Z(r, !0)) + `</code></pre>
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
    let s = "";
    for (let l = 0; l < e.items.length; l++) {
      const p = e.items[l];
      s += this.listitem(p);
    }
    const r = t ? "ol" : "ul", o = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + r + o + `>
` + s + "</" + r + `>
`;
  }
  listitem(e) {
    var n;
    let t = "";
    if (e.task) {
      const s = this.checkbox({ checked: !!e.checked });
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = s + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = s + " " + Z(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: s + " ",
        text: s + " ",
        escaped: !0
      }) : t += s + " ";
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
    for (let r = 0; r < e.header.length; r++)
      n += this.tablecell(e.header[r]);
    t += this.tablerow({ text: n });
    let s = "";
    for (let r = 0; r < e.rows.length; r++) {
      const o = e.rows[r];
      n = "";
      for (let l = 0; l < o.length; l++)
        n += this.tablecell(o[l]);
      s += this.tablerow({ text: n });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
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
    return `<code>${Z(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const s = this.parser.parseInline(n), r = jt(e);
    if (r === null)
      return s;
    e = r;
    let o = '<a href="' + e + '"';
    return t && (o += ' title="' + Z(t) + '"'), o += ">" + s + "</a>", o;
  }
  image({ href: e, title: t, text: n }) {
    const s = jt(e);
    if (s === null)
      return Z(n);
    e = s;
    let r = `<img src="${e}" alt="${n}"`;
    return t && (r += ` title="${Z(t)}"`), r += ">", r;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Z(e.text);
  }
}
class bt {
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
class F {
  constructor(e) {
    _(this, "options");
    _(this, "renderer");
    _(this, "textRenderer");
    this.options = e || te, this.options.renderer = this.options.renderer || new Ue(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new bt();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new F(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new F(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    var s, r;
    let n = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if ((r = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && r[l.type]) {
        const a = l, c = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(a.type)) {
          n += c || "";
          continue;
        }
      }
      const p = l;
      switch (p.type) {
        case "space": {
          n += this.renderer.space(p);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(p);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(p);
          continue;
        }
        case "code": {
          n += this.renderer.code(p);
          continue;
        }
        case "table": {
          n += this.renderer.table(p);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(p);
          continue;
        }
        case "list": {
          n += this.renderer.list(p);
          continue;
        }
        case "html": {
          n += this.renderer.html(p);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(p);
          continue;
        }
        case "text": {
          let a = p, c = this.renderer.text(a);
          for (; o + 1 < e.length && e[o + 1].type === "text"; )
            a = e[++o], c += `
` + this.renderer.text(a);
          t ? n += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : n += c;
          continue;
        }
        default: {
          const a = 'Token with "' + p.type + '" type was not found.';
          if (this.options.silent)
            return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t = this.renderer) {
    var s, r;
    let n = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if ((r = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && r[l.type]) {
        const a = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (a !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          n += a || "";
          continue;
        }
      }
      const p = l;
      switch (p.type) {
        case "escape": {
          n += t.text(p);
          break;
        }
        case "html": {
          n += t.html(p);
          break;
        }
        case "link": {
          n += t.link(p);
          break;
        }
        case "image": {
          n += t.image(p);
          break;
        }
        case "strong": {
          n += t.strong(p);
          break;
        }
        case "em": {
          n += t.em(p);
          break;
        }
        case "codespan": {
          n += t.codespan(p);
          break;
        }
        case "br": {
          n += t.br(p);
          break;
        }
        case "del": {
          n += t.del(p);
          break;
        }
        case "text": {
          n += t.text(p);
          break;
        }
        default: {
          const a = 'Token with "' + p.type + '" type was not found.';
          if (this.options.silent)
            return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n;
  }
}
class Ae {
  constructor(e) {
    _(this, "options");
    _(this, "block");
    this.options = e || te;
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
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? B.lex : B.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? F.parse : F.parseInline;
  }
}
_(Ae, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class Si {
  constructor(...e) {
    _(this, "defaults", ut());
    _(this, "options", this.setOptions);
    _(this, "parse", this.parseMarkdown(!0));
    _(this, "parseInline", this.parseMarkdown(!1));
    _(this, "Parser", F);
    _(this, "Renderer", Ue);
    _(this, "TextRenderer", bt);
    _(this, "Lexer", B);
    _(this, "Tokenizer", $e);
    _(this, "Hooks", Ae);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var s, r;
    let n = [];
    for (const o of e)
      switch (n = n.concat(t.call(this, o)), o.type) {
        case "table": {
          const l = o;
          for (const p of l.header)
            n = n.concat(this.walkTokens(p.tokens, t));
          for (const p of l.rows)
            for (const a of p)
              n = n.concat(this.walkTokens(a.tokens, t));
          break;
        }
        case "list": {
          const l = o;
          n = n.concat(this.walkTokens(l.items, t));
          break;
        }
        default: {
          const l = o;
          (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((p) => {
            const a = l[p].flat(1 / 0);
            n = n.concat(this.walkTokens(a, t));
          }) : l.tokens && (n = n.concat(this.walkTokens(l.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const s = { ...n };
      if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const o = t.renderers[r.name];
          o ? t.renderers[r.name] = function(...l) {
            let p = r.renderer.apply(this, l);
            return p === !1 && (p = o.apply(this, l)), p;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = t[r.level];
          o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), s.extensions = t), n.renderer) {
        const r = this.defaults.renderer || new Ue(this.defaults);
        for (const o in n.renderer) {
          if (!(o in r))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, p = n.renderer[l], a = r[l];
          r[l] = (...c) => {
            let d = p.apply(r, c);
            return d === !1 && (d = a.apply(r, c)), d || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new $e(this.defaults);
        for (const o in n.tokenizer) {
          if (!(o in r))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, p = n.tokenizer[l], a = r[l];
          r[l] = (...c) => {
            let d = p.apply(r, c);
            return d === !1 && (d = a.apply(r, c)), d;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new Ae();
        for (const o in n.hooks) {
          if (!(o in r))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, p = n.hooks[l], a = r[l];
          Ae.passThroughHooks.has(o) ? r[l] = (c) => {
            if (this.defaults.async)
              return Promise.resolve(p.call(r, c)).then((m) => a.call(r, m));
            const d = p.call(r, c);
            return a.call(r, d);
          } : r[l] = (...c) => {
            let d = p.apply(r, c);
            return d === !1 && (d = a.apply(r, c)), d;
          };
        }
        s.hooks = r;
      }
      if (n.walkTokens) {
        const r = this.defaults.walkTokens, o = n.walkTokens;
        s.walkTokens = function(l) {
          let p = [];
          return p.push(o.call(this, l)), r && (p = p.concat(r.call(this, l))), p;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return B.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return F.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, s) => {
      const r = { ...s }, o = { ...this.defaults, ...r }, l = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && r.async === !1)
        return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const p = o.hooks ? o.hooks.provideLexer() : e ? B.lex : B.lexInline, a = o.hooks ? o.hooks.provideParser() : e ? F.parse : F.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(n) : n).then((c) => p(c, o)).then((c) => o.hooks ? o.hooks.processAllTokens(c) : c).then((c) => o.walkTokens ? Promise.all(this.walkTokens(c, o.walkTokens)).then(() => c) : c).then((c) => a(c, o)).then((c) => o.hooks ? o.hooks.postprocess(c) : c).catch(l);
      try {
        o.hooks && (n = o.hooks.preprocess(n));
        let c = p(n, o);
        o.hooks && (c = o.hooks.processAllTokens(c)), o.walkTokens && this.walkTokens(c, o.walkTokens);
        let d = a(c, o);
        return o.hooks && (d = o.hooks.postprocess(d)), d;
      } catch (c) {
        return l(c);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const s = "<p>An error occurred:</p><pre>" + Z(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}
const ee = new Si();
function T(u, e) {
  return ee.parse(u, e);
}
T.options = T.setOptions = function(u) {
  return ee.setOptions(u), T.defaults = ee.defaults, on(T.defaults), T;
};
T.getDefaults = ut;
T.defaults = te;
T.use = function(...u) {
  return ee.use(...u), T.defaults = ee.defaults, on(T.defaults), T;
};
T.walkTokens = function(u, e) {
  return ee.walkTokens(u, e);
};
T.parseInline = ee.parseInline;
T.Parser = F;
T.parser = F.parse;
T.Renderer = Ue;
T.TextRenderer = bt;
T.Lexer = B;
T.lexer = B.lex;
T.Tokenizer = $e;
T.Hooks = Ae;
T.parse = T;
T.options;
T.setOptions;
T.use;
T.walkTokens;
T.parseInline;
F.parse;
B.lex;
/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */
const {
  entries: kn,
  setPrototypeOf: Vt,
  isFrozen: yi,
  getPrototypeOf: Ri,
  getOwnPropertyDescriptor: Li
} = Object;
let {
  freeze: z,
  seal: H,
  create: bn
} = Object, {
  apply: at,
  construct: ct
} = typeof Reflect < "u" && Reflect;
z || (z = function(e) {
  return e;
});
H || (H = function(e) {
  return e;
});
at || (at = function(e, t, n) {
  return e.apply(t, n);
});
ct || (ct = function(e, t) {
  return new e(...t);
});
const Me = v(Array.prototype.forEach), Ii = v(Array.prototype.lastIndexOf), Qt = v(Array.prototype.pop), ke = v(Array.prototype.push), Ci = v(Array.prototype.splice), ze = v(String.prototype.toLowerCase), nt = v(String.prototype.toString), Kt = v(String.prototype.match), be = v(String.prototype.replace), Oi = v(String.prototype.indexOf), Di = v(String.prototype.trim), G = v(Object.prototype.hasOwnProperty), M = v(RegExp.prototype.test), xe = Ni(TypeError);
function v(u) {
  return function(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    return at(u, e, n);
  };
}
function Ni(u) {
  return function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return ct(u, t);
  };
}
function b(u, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ze;
  Vt && Vt(u, null);
  let n = e.length;
  for (; n--; ) {
    let s = e[n];
    if (typeof s == "string") {
      const r = t(s);
      r !== s && (yi(e) || (e[n] = r), s = r);
    }
    u[s] = !0;
  }
  return u;
}
function Mi(u) {
  for (let e = 0; e < u.length; e++)
    G(u, e) || (u[e] = null);
  return u;
}
function J(u) {
  const e = bn(null);
  for (const [t, n] of kn(u))
    G(u, t) && (Array.isArray(n) ? e[t] = Mi(n) : n && typeof n == "object" && n.constructor === Object ? e[t] = J(n) : e[t] = n);
  return e;
}
function Te(u, e) {
  for (; u !== null; ) {
    const n = Li(u, e);
    if (n) {
      if (n.get)
        return v(n.get);
      if (typeof n.value == "function")
        return v(n.value);
    }
    u = Ri(u);
  }
  function t() {
    return null;
  }
  return t;
}
const Jt = z(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), it = z(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), rt = z(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Pi = z(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), st = z(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), zi = z(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), en = z(["#text"]), tn = z(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), ot = z(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), nn = z(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Pe = z(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), vi = H(/\{\{[\w\W]*|[\w\W]*\}\}/gm), $i = H(/<%[\w\W]*|[\w\W]*%>/gm), Ui = H(/\$\{[\w\W]*/gm), Bi = H(/^data-[\-\w.\u00B7-\uFFFF]+$/), Fi = H(/^aria-[\-\w]+$/), xn = H(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Hi = H(/^(?:\w+script|data):/i), Gi = H(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Tn = H(/^html$/i), Wi = H(/^[a-z][.\w]*(-[.\w]+)+$/i);
var rn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Fi,
  ATTR_WHITESPACE: Gi,
  CUSTOM_ELEMENT: Wi,
  DATA_ATTR: Bi,
  DOCTYPE_NAME: Tn,
  ERB_EXPR: $i,
  IS_ALLOWED_URI: xn,
  IS_SCRIPT_OR_DATA: Hi,
  MUSTACHE_EXPR: vi,
  TMPLIT_EXPR: Ui
});
const we = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, qi = function() {
  return typeof window > "u" ? null : window;
}, Zi = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let n = null;
  const s = "data-tt-policy-suffix";
  t && t.hasAttribute(s) && (n = t.getAttribute(s));
  const r = "dompurify" + (n ? "#" + n : "");
  try {
    return e.createPolicy(r, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + r + " could not be created."), null;
  }
}, sn = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function wn() {
  let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : qi();
  const e = (g) => wn(g);
  if (e.version = "3.2.4", e.removed = [], !u || !u.document || u.document.nodeType !== we.document || !u.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = u;
  const n = t, s = n.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: o,
    Node: l,
    Element: p,
    NodeFilter: a,
    NamedNodeMap: c = u.NamedNodeMap || u.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: m,
    trustedTypes: k
  } = u, A = p.prototype, w = Te(A, "cloneNode"), $ = Te(A, "remove"), Se = Te(A, "nextSibling"), ae = Te(A, "childNodes"), V = Te(A, "parentNode");
  if (typeof o == "function") {
    const g = t.createElement("template");
    g.content && g.content.ownerDocument && (t = g.content.ownerDocument);
  }
  let y, X = "";
  const {
    implementation: ce,
    createNodeIterator: ue,
    createDocumentFragment: Q,
    getElementsByTagName: _n
  } = t, {
    importNode: An
  } = n;
  let D = sn();
  e.isSupported = typeof kn == "function" && typeof V == "function" && ce && ce.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: He,
    ERB_EXPR: Ge,
    TMPLIT_EXPR: We,
    DATA_ATTR: En,
    ARIA_ATTR: Sn,
    IS_SCRIPT_OR_DATA: yn,
    ATTR_WHITESPACE: xt,
    CUSTOM_ELEMENT: Rn
  } = rn;
  let {
    IS_ALLOWED_URI: Tt
  } = rn, R = null;
  const wt = b({}, [...Jt, ...it, ...rt, ...st, ...en]);
  let I = null;
  const _t = b({}, [...tn, ...ot, ...nn, ...Pe]);
  let S = Object.seal(bn(null, {
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
  })), pe = null, qe = null, At = !0, Ze = !0, Et = !1, St = !0, ne = !1, je = !0, K = !1, Ye = !1, Xe = !1, ie = !1, ye = !1, Re = !1, yt = !0, Rt = !1;
  const Ln = "user-content-";
  let Ve = !0, he = !1, re = {}, se = null;
  const Lt = b({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let It = null;
  const Ct = b({}, ["audio", "video", "img", "source", "image", "track"]);
  let Qe = null;
  const Ot = b({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Le = "http://www.w3.org/1998/Math/MathML", Ie = "http://www.w3.org/2000/svg", j = "http://www.w3.org/1999/xhtml";
  let oe = j, Ke = !1, Je = null;
  const In = b({}, [Le, Ie, j], nt);
  let Ce = b({}, ["mi", "mo", "mn", "ms", "mtext"]), Oe = b({}, ["annotation-xml"]);
  const Cn = b({}, ["title", "style", "font", "a", "script"]);
  let fe = null;
  const On = ["application/xhtml+xml", "text/html"], Dn = "text/html";
  let L = null, le = null;
  const Nn = t.createElement("form"), Dt = function(i) {
    return i instanceof RegExp || i instanceof Function;
  }, et = function() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(le && le === i)) {
      if ((!i || typeof i != "object") && (i = {}), i = J(i), fe = // eslint-disable-next-line unicorn/prefer-includes
      On.indexOf(i.PARSER_MEDIA_TYPE) === -1 ? Dn : i.PARSER_MEDIA_TYPE, L = fe === "application/xhtml+xml" ? nt : ze, R = G(i, "ALLOWED_TAGS") ? b({}, i.ALLOWED_TAGS, L) : wt, I = G(i, "ALLOWED_ATTR") ? b({}, i.ALLOWED_ATTR, L) : _t, Je = G(i, "ALLOWED_NAMESPACES") ? b({}, i.ALLOWED_NAMESPACES, nt) : In, Qe = G(i, "ADD_URI_SAFE_ATTR") ? b(J(Ot), i.ADD_URI_SAFE_ATTR, L) : Ot, It = G(i, "ADD_DATA_URI_TAGS") ? b(J(Ct), i.ADD_DATA_URI_TAGS, L) : Ct, se = G(i, "FORBID_CONTENTS") ? b({}, i.FORBID_CONTENTS, L) : Lt, pe = G(i, "FORBID_TAGS") ? b({}, i.FORBID_TAGS, L) : {}, qe = G(i, "FORBID_ATTR") ? b({}, i.FORBID_ATTR, L) : {}, re = G(i, "USE_PROFILES") ? i.USE_PROFILES : !1, At = i.ALLOW_ARIA_ATTR !== !1, Ze = i.ALLOW_DATA_ATTR !== !1, Et = i.ALLOW_UNKNOWN_PROTOCOLS || !1, St = i.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ne = i.SAFE_FOR_TEMPLATES || !1, je = i.SAFE_FOR_XML !== !1, K = i.WHOLE_DOCUMENT || !1, ie = i.RETURN_DOM || !1, ye = i.RETURN_DOM_FRAGMENT || !1, Re = i.RETURN_TRUSTED_TYPE || !1, Xe = i.FORCE_BODY || !1, yt = i.SANITIZE_DOM !== !1, Rt = i.SANITIZE_NAMED_PROPS || !1, Ve = i.KEEP_CONTENT !== !1, he = i.IN_PLACE || !1, Tt = i.ALLOWED_URI_REGEXP || xn, oe = i.NAMESPACE || j, Ce = i.MATHML_TEXT_INTEGRATION_POINTS || Ce, Oe = i.HTML_INTEGRATION_POINTS || Oe, S = i.CUSTOM_ELEMENT_HANDLING || {}, i.CUSTOM_ELEMENT_HANDLING && Dt(i.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (S.tagNameCheck = i.CUSTOM_ELEMENT_HANDLING.tagNameCheck), i.CUSTOM_ELEMENT_HANDLING && Dt(i.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (S.attributeNameCheck = i.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), i.CUSTOM_ELEMENT_HANDLING && typeof i.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (S.allowCustomizedBuiltInElements = i.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ne && (Ze = !1), ye && (ie = !0), re && (R = b({}, en), I = [], re.html === !0 && (b(R, Jt), b(I, tn)), re.svg === !0 && (b(R, it), b(I, ot), b(I, Pe)), re.svgFilters === !0 && (b(R, rt), b(I, ot), b(I, Pe)), re.mathMl === !0 && (b(R, st), b(I, nn), b(I, Pe))), i.ADD_TAGS && (R === wt && (R = J(R)), b(R, i.ADD_TAGS, L)), i.ADD_ATTR && (I === _t && (I = J(I)), b(I, i.ADD_ATTR, L)), i.ADD_URI_SAFE_ATTR && b(Qe, i.ADD_URI_SAFE_ATTR, L), i.FORBID_CONTENTS && (se === Lt && (se = J(se)), b(se, i.FORBID_CONTENTS, L)), Ve && (R["#text"] = !0), K && b(R, ["html", "head", "body"]), R.table && (b(R, ["tbody"]), delete pe.tbody), i.TRUSTED_TYPES_POLICY) {
        if (typeof i.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw xe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof i.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw xe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        y = i.TRUSTED_TYPES_POLICY, X = y.createHTML("");
      } else
        y === void 0 && (y = Zi(k, s)), y !== null && typeof X == "string" && (X = y.createHTML(""));
      z && z(i), le = i;
    }
  }, Nt = b({}, [...it, ...rt, ...Pi]), Mt = b({}, [...st, ...zi]), Mn = function(i) {
    let h = V(i);
    (!h || !h.tagName) && (h = {
      namespaceURI: oe,
      tagName: "template"
    });
    const f = ze(i.tagName), E = ze(h.tagName);
    return Je[i.namespaceURI] ? i.namespaceURI === Ie ? h.namespaceURI === j ? f === "svg" : h.namespaceURI === Le ? f === "svg" && (E === "annotation-xml" || Ce[E]) : !!Nt[f] : i.namespaceURI === Le ? h.namespaceURI === j ? f === "math" : h.namespaceURI === Ie ? f === "math" && Oe[E] : !!Mt[f] : i.namespaceURI === j ? h.namespaceURI === Ie && !Oe[E] || h.namespaceURI === Le && !Ce[E] ? !1 : !Mt[f] && (Cn[f] || !Nt[f]) : !!(fe === "application/xhtml+xml" && Je[i.namespaceURI]) : !1;
  }, W = function(i) {
    ke(e.removed, {
      element: i
    });
    try {
      V(i).removeChild(i);
    } catch {
      $(i);
    }
  }, De = function(i, h) {
    try {
      ke(e.removed, {
        attribute: h.getAttributeNode(i),
        from: h
      });
    } catch {
      ke(e.removed, {
        attribute: null,
        from: h
      });
    }
    if (h.removeAttribute(i), i === "is")
      if (ie || ye)
        try {
          W(h);
        } catch {
        }
      else
        try {
          h.setAttribute(i, "");
        } catch {
        }
  }, Pt = function(i) {
    let h = null, f = null;
    if (Xe)
      i = "<remove></remove>" + i;
    else {
      const C = Kt(i, /^[\r\n\t ]+/);
      f = C && C[0];
    }
    fe === "application/xhtml+xml" && oe === j && (i = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + i + "</body></html>");
    const E = y ? y.createHTML(i) : i;
    if (oe === j)
      try {
        h = new m().parseFromString(E, fe);
      } catch {
      }
    if (!h || !h.documentElement) {
      h = ce.createDocument(oe, "template", null);
      try {
        h.documentElement.innerHTML = Ke ? X : E;
      } catch {
      }
    }
    const O = h.body || h.documentElement;
    return i && f && O.insertBefore(t.createTextNode(f), O.childNodes[0] || null), oe === j ? _n.call(h, K ? "html" : "body")[0] : K ? h.documentElement : O;
  }, zt = function(i) {
    return ue.call(
      i.ownerDocument || i,
      i,
      // eslint-disable-next-line no-bitwise
      a.SHOW_ELEMENT | a.SHOW_COMMENT | a.SHOW_TEXT | a.SHOW_PROCESSING_INSTRUCTION | a.SHOW_CDATA_SECTION,
      null
    );
  }, tt = function(i) {
    return i instanceof d && (typeof i.nodeName != "string" || typeof i.textContent != "string" || typeof i.removeChild != "function" || !(i.attributes instanceof c) || typeof i.removeAttribute != "function" || typeof i.setAttribute != "function" || typeof i.namespaceURI != "string" || typeof i.insertBefore != "function" || typeof i.hasChildNodes != "function");
  }, vt = function(i) {
    return typeof l == "function" && i instanceof l;
  };
  function Y(g, i, h) {
    Me(g, (f) => {
      f.call(e, i, h, le);
    });
  }
  const $t = function(i) {
    let h = null;
    if (Y(D.beforeSanitizeElements, i, null), tt(i))
      return W(i), !0;
    const f = L(i.nodeName);
    if (Y(D.uponSanitizeElement, i, {
      tagName: f,
      allowedTags: R
    }), i.hasChildNodes() && !vt(i.firstElementChild) && M(/<[/\w]/g, i.innerHTML) && M(/<[/\w]/g, i.textContent) || i.nodeType === we.progressingInstruction || je && i.nodeType === we.comment && M(/<[/\w]/g, i.data))
      return W(i), !0;
    if (!R[f] || pe[f]) {
      if (!pe[f] && Bt(f) && (S.tagNameCheck instanceof RegExp && M(S.tagNameCheck, f) || S.tagNameCheck instanceof Function && S.tagNameCheck(f)))
        return !1;
      if (Ve && !se[f]) {
        const E = V(i) || i.parentNode, O = ae(i) || i.childNodes;
        if (O && E) {
          const C = O.length;
          for (let U = C - 1; U >= 0; --U) {
            const q = w(O[U], !0);
            q.__removalCount = (i.__removalCount || 0) + 1, E.insertBefore(q, Se(i));
          }
        }
      }
      return W(i), !0;
    }
    return i instanceof p && !Mn(i) || (f === "noscript" || f === "noembed" || f === "noframes") && M(/<\/no(script|embed|frames)/i, i.innerHTML) ? (W(i), !0) : (ne && i.nodeType === we.text && (h = i.textContent, Me([He, Ge, We], (E) => {
      h = be(h, E, " ");
    }), i.textContent !== h && (ke(e.removed, {
      element: i.cloneNode()
    }), i.textContent = h)), Y(D.afterSanitizeElements, i, null), !1);
  }, Ut = function(i, h, f) {
    if (yt && (h === "id" || h === "name") && (f in t || f in Nn))
      return !1;
    if (!(Ze && !qe[h] && M(En, h))) {
      if (!(At && M(Sn, h))) {
        if (!I[h] || qe[h]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Bt(i) && (S.tagNameCheck instanceof RegExp && M(S.tagNameCheck, i) || S.tagNameCheck instanceof Function && S.tagNameCheck(i)) && (S.attributeNameCheck instanceof RegExp && M(S.attributeNameCheck, h) || S.attributeNameCheck instanceof Function && S.attributeNameCheck(h)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            h === "is" && S.allowCustomizedBuiltInElements && (S.tagNameCheck instanceof RegExp && M(S.tagNameCheck, f) || S.tagNameCheck instanceof Function && S.tagNameCheck(f)))
          ) return !1;
        } else if (!Qe[h]) {
          if (!M(Tt, be(f, xt, ""))) {
            if (!((h === "src" || h === "xlink:href" || h === "href") && i !== "script" && Oi(f, "data:") === 0 && It[i])) {
              if (!(Et && !M(yn, be(f, xt, "")))) {
                if (f)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Bt = function(i) {
    return i !== "annotation-xml" && Kt(i, Rn);
  }, Ft = function(i) {
    Y(D.beforeSanitizeAttributes, i, null);
    const {
      attributes: h
    } = i;
    if (!h || tt(i))
      return;
    const f = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: I,
      forceKeepAttr: void 0
    };
    let E = h.length;
    for (; E--; ) {
      const O = h[E], {
        name: C,
        namespaceURI: U,
        value: q
      } = O, ge = L(C);
      let N = C === "value" ? q : Di(q);
      if (f.attrName = ge, f.attrValue = N, f.keepAttr = !0, f.forceKeepAttr = void 0, Y(D.uponSanitizeAttribute, i, f), N = f.attrValue, Rt && (ge === "id" || ge === "name") && (De(C, i), N = Ln + N), je && M(/((--!?|])>)|<\/(style|title)/i, N)) {
        De(C, i);
        continue;
      }
      if (f.forceKeepAttr || (De(C, i), !f.keepAttr))
        continue;
      if (!St && M(/\/>/i, N)) {
        De(C, i);
        continue;
      }
      ne && Me([He, Ge, We], (Gt) => {
        N = be(N, Gt, " ");
      });
      const Ht = L(i.nodeName);
      if (Ut(Ht, ge, N)) {
        if (y && typeof k == "object" && typeof k.getAttributeType == "function" && !U)
          switch (k.getAttributeType(Ht, ge)) {
            case "TrustedHTML": {
              N = y.createHTML(N);
              break;
            }
            case "TrustedScriptURL": {
              N = y.createScriptURL(N);
              break;
            }
          }
        try {
          U ? i.setAttributeNS(U, C, N) : i.setAttribute(C, N), tt(i) ? W(i) : Qt(e.removed);
        } catch {
        }
      }
    }
    Y(D.afterSanitizeAttributes, i, null);
  }, Pn = function g(i) {
    let h = null;
    const f = zt(i);
    for (Y(D.beforeSanitizeShadowDOM, i, null); h = f.nextNode(); )
      Y(D.uponSanitizeShadowNode, h, null), $t(h), Ft(h), h.content instanceof r && g(h.content);
    Y(D.afterSanitizeShadowDOM, i, null);
  };
  return e.sanitize = function(g) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, h = null, f = null, E = null, O = null;
    if (Ke = !g, Ke && (g = "<!-->"), typeof g != "string" && !vt(g))
      if (typeof g.toString == "function") {
        if (g = g.toString(), typeof g != "string")
          throw xe("dirty is not a string, aborting");
      } else
        throw xe("toString is not a function");
    if (!e.isSupported)
      return g;
    if (Ye || et(i), e.removed = [], typeof g == "string" && (he = !1), he) {
      if (g.nodeName) {
        const q = L(g.nodeName);
        if (!R[q] || pe[q])
          throw xe("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (g instanceof l)
      h = Pt("<!---->"), f = h.ownerDocument.importNode(g, !0), f.nodeType === we.element && f.nodeName === "BODY" || f.nodeName === "HTML" ? h = f : h.appendChild(f);
    else {
      if (!ie && !ne && !K && // eslint-disable-next-line unicorn/prefer-includes
      g.indexOf("<") === -1)
        return y && Re ? y.createHTML(g) : g;
      if (h = Pt(g), !h)
        return ie ? null : Re ? X : "";
    }
    h && Xe && W(h.firstChild);
    const C = zt(he ? g : h);
    for (; E = C.nextNode(); )
      $t(E), Ft(E), E.content instanceof r && Pn(E.content);
    if (he)
      return g;
    if (ie) {
      if (ye)
        for (O = Q.call(h.ownerDocument); h.firstChild; )
          O.appendChild(h.firstChild);
      else
        O = h;
      return (I.shadowroot || I.shadowrootmode) && (O = An.call(n, O, !0)), O;
    }
    let U = K ? h.outerHTML : h.innerHTML;
    return K && R["!doctype"] && h.ownerDocument && h.ownerDocument.doctype && h.ownerDocument.doctype.name && M(Tn, h.ownerDocument.doctype.name) && (U = "<!DOCTYPE " + h.ownerDocument.doctype.name + `>
` + U), ne && Me([He, Ge, We], (q) => {
      U = be(U, q, " ");
    }), y && Re ? y.createHTML(U) : U;
  }, e.setConfig = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    et(g), Ye = !0;
  }, e.clearConfig = function() {
    le = null, Ye = !1;
  }, e.isValidAttribute = function(g, i, h) {
    le || et({});
    const f = L(g), E = L(i);
    return Ut(f, E, h);
  }, e.addHook = function(g, i) {
    typeof i == "function" && ke(D[g], i);
  }, e.removeHook = function(g, i) {
    if (i !== void 0) {
      const h = Ii(D[g], i);
      return h === -1 ? void 0 : Ci(D[g], h, 1)[0];
    }
    return Qt(D[g]);
  }, e.removeHooks = function(g) {
    D[g] = [];
  }, e.removeAllHooks = function() {
    D = sn();
  }, e;
}
var ji = wn();
const Yi = ["innerHTML"], Qi = /* @__PURE__ */ $n({
  __name: "VueMarkdown",
  props: {
    md: { default: null },
    silent: { type: Boolean, default: !1 },
    breaks: { type: Boolean, default: !1 },
    gfm: { type: Boolean, default: !0 },
    pedantic: { type: Boolean, default: !1 }
  },
  setup(u) {
    const e = u, t = Un(""), n = Wt(() => e.md), s = Wt(() => ({
      ...typeof e.silent == "boolean" ? { silent: e.silent } : { silent: !1 },
      ...typeof e.breaks == "boolean" ? { breaks: e.breaks } : { breaks: !1 },
      ...typeof e.gfm == "boolean" ? { gfm: e.gfm } : { gfm: !0 },
      ...typeof e.pedantic == "boolean" ? { pedantic: e.pedantic } : { pedantic: !1 }
    })), r = (o) => ji.sanitize(o);
    return Bn(n, async (o) => {
      o && (t.value = r(await T.parse(o, { async: !0, ...s.value })));
    }), (o, l) => t.value ? (Gn(), Fn("div", {
      key: 0,
      innerHTML: t.value
    }, null, 8, Yi)) : Hn("", !0);
  }
});
export {
  Qi as VueMarkdown
};
//# sourceMappingURL=vue-markdown.mjs.map
