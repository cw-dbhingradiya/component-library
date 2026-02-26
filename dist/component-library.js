import { jsx as s, jsxs as y, Fragment as Ue } from "react/jsx-runtime";
import * as N from "react";
function Se(e) {
  var o, t, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (o = 0; o < n; o++) e[o] && (t = Se(e[o])) && (r && (r += " "), r += t);
  } else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function qe() {
  for (var e, o, t = 0, r = "", n = arguments.length; t < n; t++) (e = arguments[t]) && (o = Se(e)) && (r && (r += " "), r += o);
  return r;
}
const He = (e, o) => {
  const t = new Array(e.length + o.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e[r];
  for (let r = 0; r < o.length; r++)
    t[e.length + r] = o[r];
  return t;
}, Ye = (e, o) => ({
  classGroupId: e,
  validator: o
}), Re = (e = /* @__PURE__ */ new Map(), o = null, t) => ({
  nextPart: e,
  validators: o,
  classGroupId: t
}), ue = "-", we = [], Qe = "arbitrary..", Xe = (e) => {
  const o = Ze(e), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Je(i);
      const m = i.split(ue), l = m[0] === "" && m.length > 1 ? 1 : 0;
      return Ae(m, l, o);
    },
    getConflictingClassGroupIds: (i, m) => {
      if (m) {
        const l = r[i], f = t[i];
        return l ? f ? He(f, l) : l : f || we;
      }
      return t[i] || we;
    }
  };
}, Ae = (e, o, t) => {
  if (e.length - o === 0)
    return t.classGroupId;
  const n = e[o], a = t.nextPart.get(n);
  if (a) {
    const f = Ae(e, o + 1, a);
    if (f) return f;
  }
  const i = t.validators;
  if (i === null)
    return;
  const m = o === 0 ? e.join(ue) : e.slice(o).join(ue), l = i.length;
  for (let f = 0; f < l; f++) {
    const w = i[f];
    if (w.validator(m))
      return w.classGroupId;
  }
}, Je = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = e.slice(1, -1), t = o.indexOf(":"), r = o.slice(0, t);
  return r ? Qe + r : void 0;
})(), Ze = (e) => {
  const {
    theme: o,
    classGroups: t
  } = e;
  return er(t, o);
}, er = (e, o) => {
  const t = Re();
  for (const r in e) {
    const n = e[r];
    pe(n, t, r, o);
  }
  return t;
}, pe = (e, o, t, r) => {
  const n = e.length;
  for (let a = 0; a < n; a++) {
    const i = e[a];
    rr(i, o, t, r);
  }
}, rr = (e, o, t, r) => {
  if (typeof e == "string") {
    tr(e, o, t);
    return;
  }
  if (typeof e == "function") {
    or(e, o, t, r);
    return;
  }
  nr(e, o, t, r);
}, tr = (e, o, t) => {
  const r = e === "" ? o : Me(o, e);
  r.classGroupId = t;
}, or = (e, o, t, r) => {
  if (sr(e)) {
    pe(e(r), o, t, r);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(Ye(t, e));
}, nr = (e, o, t, r) => {
  const n = Object.entries(e), a = n.length;
  for (let i = 0; i < a; i++) {
    const [m, l] = n[i];
    pe(l, Me(o, m), t, r);
  }
}, Me = (e, o) => {
  let t = e;
  const r = o.split(ue), n = r.length;
  for (let a = 0; a < n; a++) {
    const i = r[a];
    let m = t.nextPart.get(i);
    m || (m = Re(), t.nextPart.set(i, m)), t = m;
  }
  return t;
}, sr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, ir = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, t = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  const n = (a, i) => {
    t[a] = i, o++, o > e && (o = 0, r = t, t = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(a) {
      let i = t[a];
      if (i !== void 0)
        return i;
      if ((i = r[a]) !== void 0)
        return n(a, i), i;
    },
    set(a, i) {
      a in t ? t[a] = i : n(a, i);
    }
  };
}, fe = "!", ve = ":", ar = [], ke = (e, o, t, r, n) => ({
  modifiers: e,
  hasImportantModifier: o,
  baseClassName: t,
  maybePostfixModifierPosition: r,
  isExternal: n
}), lr = (e) => {
  const {
    prefix: o,
    experimentalParseClassName: t
  } = e;
  let r = (n) => {
    const a = [];
    let i = 0, m = 0, l = 0, f;
    const w = n.length;
    for (let S = 0; S < w; S++) {
      const v = n[S];
      if (i === 0 && m === 0) {
        if (v === ve) {
          a.push(n.slice(l, S)), l = S + 1;
          continue;
        }
        if (v === "/") {
          f = S;
          continue;
        }
      }
      v === "[" ? i++ : v === "]" ? i-- : v === "(" ? m++ : v === ")" && m--;
    }
    const C = a.length === 0 ? n : n.slice(l);
    let M = C, j = !1;
    C.endsWith(fe) ? (M = C.slice(0, -1), j = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      C.startsWith(fe) && (M = C.slice(1), j = !0)
    );
    const E = f && f > l ? f - l : void 0;
    return ke(a, j, M, E);
  };
  if (o) {
    const n = o + ve, a = r;
    r = (i) => i.startsWith(n) ? a(i.slice(n.length)) : ke(ar, !1, i, void 0, !0);
  }
  if (t) {
    const n = r;
    r = (a) => t({
      className: a,
      parseClassName: n
    });
  }
  return r;
}, cr = (e) => {
  const o = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((t, r) => {
    o.set(t, 1e6 + r);
  }), (t) => {
    const r = [];
    let n = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], m = i[0] === "[", l = o.has(i);
      m || l ? (n.length > 0 && (n.sort(), r.push(...n), n = []), r.push(i)) : n.push(i);
    }
    return n.length > 0 && (n.sort(), r.push(...n)), r;
  };
}, dr = (e) => ({
  cache: ir(e.cacheSize),
  parseClassName: lr(e),
  sortModifiers: cr(e),
  ...Xe(e)
}), ur = /\s+/, mr = (e, o) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: a
  } = o, i = [], m = e.trim().split(ur);
  let l = "";
  for (let f = m.length - 1; f >= 0; f -= 1) {
    const w = m[f], {
      isExternal: C,
      modifiers: M,
      hasImportantModifier: j,
      baseClassName: E,
      maybePostfixModifierPosition: S
    } = t(w);
    if (C) {
      l = w + (l.length > 0 ? " " + l : l);
      continue;
    }
    let v = !!S, O = r(v ? E.substring(0, S) : E);
    if (!O) {
      if (!v) {
        l = w + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (O = r(E), !O) {
        l = w + (l.length > 0 ? " " + l : l);
        continue;
      }
      v = !1;
    }
    const U = M.length === 0 ? "" : M.length === 1 ? M[0] : a(M).join(":"), D = j ? U + fe : U, W = D + O;
    if (i.indexOf(W) > -1)
      continue;
    i.push(W);
    const A = n(O, v);
    for (let L = 0; L < A.length; ++L) {
      const V = A[L];
      i.push(D + V);
    }
    l = w + (l.length > 0 ? " " + l : l);
  }
  return l;
}, gr = (...e) => {
  let o = 0, t, r, n = "";
  for (; o < e.length; )
    (t = e[o++]) && (r = Le(t)) && (n && (n += " "), n += r);
  return n;
}, Le = (e) => {
  if (typeof e == "string")
    return e;
  let o, t = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (o = Le(e[r])) && (t && (t += " "), t += o);
  return t;
}, br = (e, ...o) => {
  let t, r, n, a;
  const i = (l) => {
    const f = o.reduce((w, C) => C(w), e());
    return t = dr(f), r = t.cache.get, n = t.cache.set, a = m, m(l);
  }, m = (l) => {
    const f = r(l);
    if (f)
      return f;
    const w = mr(l, t);
    return n(l, w), w;
  };
  return a = i, (...l) => a(gr(...l));
}, fr = [], G = (e) => {
  const o = (t) => t[e] || fr;
  return o.isThemeGetter = !0, o;
}, Ie = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ee = /^\((?:(\w[\w-]*):)?(.+)\)$/i, pr = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, hr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, xr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, yr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, wr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, vr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, J = (e) => pr.test(e), x = (e) => !!e && !Number.isNaN(Number(e)), Z = (e) => !!e && Number.isInteger(Number(e)), be = (e) => e.endsWith("%") && x(e.slice(0, -1)), Q = (e) => hr.test(e), je = () => !0, kr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  xr.test(e) && !yr.test(e)
), he = () => !1, Nr = (e) => wr.test(e), zr = (e) => vr.test(e), Cr = (e) => !c(e) && !d(e), Sr = (e) => ee(e, Te, he), c = (e) => Ie.test(e), te = (e) => ee(e, Be, kr), Ne = (e) => ee(e, Wr, x), Rr = (e) => ee(e, Oe, je), Ar = (e) => ee(e, Ge, he), ze = (e) => ee(e, We, he), Mr = (e) => ee(e, Pe, zr), ce = (e) => ee(e, Ve, Nr), d = (e) => Ee.test(e), ne = (e) => oe(e, Be), Lr = (e) => oe(e, Ge), Ce = (e) => oe(e, We), Ir = (e) => oe(e, Te), Er = (e) => oe(e, Pe), de = (e) => oe(e, Ve, !0), jr = (e) => oe(e, Oe, !0), ee = (e, o, t) => {
  const r = Ie.exec(e);
  return r ? r[1] ? o(r[1]) : t(r[2]) : !1;
}, oe = (e, o, t = !1) => {
  const r = Ee.exec(e);
  return r ? r[1] ? o(r[1]) : t : !1;
}, We = (e) => e === "position" || e === "percentage", Pe = (e) => e === "image" || e === "url", Te = (e) => e === "length" || e === "size" || e === "bg-size", Be = (e) => e === "length", Wr = (e) => e === "number", Ge = (e) => e === "family-name", Oe = (e) => e === "number" || e === "weight", Ve = (e) => e === "shadow", Pr = () => {
  const e = G("color"), o = G("font"), t = G("text"), r = G("font-weight"), n = G("tracking"), a = G("leading"), i = G("breakpoint"), m = G("container"), l = G("spacing"), f = G("radius"), w = G("shadow"), C = G("inset-shadow"), M = G("text-shadow"), j = G("drop-shadow"), E = G("blur"), S = G("perspective"), v = G("aspect"), O = G("ease"), U = G("animate"), D = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], W = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], A = () => [...W(), d, c], L = () => ["auto", "hidden", "clip", "visible", "scroll"], V = () => ["auto", "contain", "none"], u = () => [d, c, l], R = () => [J, "full", "auto", ...u()], h = () => [Z, "none", "subgrid", d, c], k = () => ["auto", {
    span: ["full", Z, d, c]
  }, Z, d, c], P = () => [Z, "auto", d, c], re = () => ["auto", "min", "max", "fr", d, c], Y = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], q = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], $ = () => ["auto", ...u()], b = () => [J, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...u()], I = () => [J, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...u()], B = () => [J, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...u()], g = () => [e, d, c], p = () => [...W(), Ce, ze, {
    position: [d, c]
  }], T = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], H = () => ["auto", "cover", "contain", Ir, Sr, {
    size: [d, c]
  }], X = () => [be, ne, te], _ = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    f,
    d,
    c
  ], K = () => ["", x, ne, te], se = () => ["solid", "dashed", "dotted", "double"], xe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [x, be, Ce, ze], ye = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    E,
    d,
    c
  ], ie = () => ["none", x, d, c], ae = () => ["none", x, d, c], ge = () => [x, d, c], le = () => [J, "full", ...u()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Q],
      breakpoint: [Q],
      color: [je],
      container: [Q],
      "drop-shadow": [Q],
      ease: ["in", "out", "in-out"],
      font: [Cr],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Q],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Q],
      shadow: [Q],
      spacing: ["px", x],
      text: [Q],
      "text-shadow": [Q],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", J, c, d, v]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [x, c, d, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": D()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": D()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: A()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: L()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": L()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": L()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: V()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": V()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": V()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: R()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": R()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": R()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": R(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: R()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": R(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: R()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": R()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": R()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: R()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: R()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: R()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: R()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Z, "auto", d, c]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [J, "full", "auto", m, ...u()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [x, J, "auto", "initial", "none", c]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", x, d, c]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", x, d, c]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Z, "first", "last", "none", d, c]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": h()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: k()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": P()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": P()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": h()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: k()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": P()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": P()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": re()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": re()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: u()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": u()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": u()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Y(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...q(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...q()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Y()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...q(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...q(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Y()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...q(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...q()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: u()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: u()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: u()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: u()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: u()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: u()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: u()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: u()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: u()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: u()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: u()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: $()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: $()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: $()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: $()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: $()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: $()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: $()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: $()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: $()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: $()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: $()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": u()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": u()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: b()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...I()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...I()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...I()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...B()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...B()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...B()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [m, "screen", ...b()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          m,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...b()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          m,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...b()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...b()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...b()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...b()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, ne, te]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, jr, Rr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", be, c]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Lr, Ar, o]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [c]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [n, d, c]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [x, "none", d, Ne]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...u()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", d, c]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", d, c]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: g()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: g()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...se(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [x, "from-font", "auto", d, te]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: g()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [x, "auto", d, c]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: u()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", d, c]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", d, c]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: p()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: T()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: H()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Z, d, c],
          radial: ["", d, c],
          conic: [Z, d, c]
        }, Er, Mr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: g()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: X()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: X()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: X()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: g()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: g()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: g()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: _()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": _()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": _()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": _()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": _()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": _()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": _()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": _()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": _()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": _()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": _()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": _()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": _()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": _()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": _()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: K()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": K()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": K()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": K()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": K()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": K()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": K()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": K()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": K()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": K()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": K()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": K()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": K()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...se(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...se(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: g()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": g()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": g()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": g()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": g()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": g()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": g()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": g()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": g()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": g()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": g()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: g()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...se(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [x, d, c]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", x, ne, te]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: g()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          w,
          de,
          ce
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: g()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", C, de, ce]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": g()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: K()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: g()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [x, te]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": g()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": K()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": g()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", M, de, ce]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": g()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [x, d, c]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...xe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": xe()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [x]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": F()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": g()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": g()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": F()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": g()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": g()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": F()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": g()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": g()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": F()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": g()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": g()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": F()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": g()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": g()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": F()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": g()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": g()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": F()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": g()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": g()
      }],
      "mask-image-radial": [{
        "mask-radial": [d, c]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": F()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": g()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": g()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": W()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [x]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": F()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": g()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": g()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: p()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: T()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: H()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", d, c]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          d,
          c
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ye()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [x, d, c]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [x, d, c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          j,
          de,
          ce
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": g()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", x, d, c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [x, d, c]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", x, d, c]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [x, d, c]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", x, d, c]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          d,
          c
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ye()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [x, d, c]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [x, d, c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", x, d, c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [x, d, c]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", x, d, c]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [x, d, c]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [x, d, c]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", x, d, c]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": u()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": u()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": u()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", d, c]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [x, "initial", d, c]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", O, d, c]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [x, d, c]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", U, d, c]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [S, d, c]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": A()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ie()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ie()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ie()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ie()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ae()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ae()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ae()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ae()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ge()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ge()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ge()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [d, c, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: A()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: le()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": le()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": le()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": le()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: g()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: g()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", d, c]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": u()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": u()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": u()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": u()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": u()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": u()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": u()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": u()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": u()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": u()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": u()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": u()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": u()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": u()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": u()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": u()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": u()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": u()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": u()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": u()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": u()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": u()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", d, c]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...g()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [x, ne, te, Ne]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...g()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, _e = /* @__PURE__ */ br(Pr);
function z(...e) {
  return _e(qe(e));
}
const Tr = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  secondary: "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  tertiary: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  "link-color": "bg-transparent text-brand hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  "link-gray": "bg-transparent text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400",
  "primary-destructive": "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
  "secondary-destructive": "bg-white text-red-700 ring-1 ring-red-300 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
  "tertiary-destructive": "bg-transparent text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
}, Br = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-sm [&_[data-icon]]:size-4",
  md: "h-10 gap-2 rounded-lg px-4 text-sm [&_[data-icon]]:size-5",
  lg: "h-11 gap-2 rounded-lg px-4.5 text-base [&_[data-icon]]:size-5",
  xl: "h-12 gap-2.5 rounded-xl px-5 text-base [&_[data-icon]]:size-6"
}, Gr = {
  sm: "min-w-8",
  md: "min-w-10",
  lg: "min-w-11",
  xl: "min-w-12"
};
function qr({
  variant: e = "primary",
  size: o = "sm",
  startIcon: t,
  endIcon: r,
  isLoading: n = !1,
  showTextWhileLoading: a = !1,
  isDisabled: i = !1,
  href: m,
  className: l,
  children: f,
  disabled: w,
  type: C = "button",
  ...M
}) {
  const j = i || w || n, E = "inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", S = /* @__PURE__ */ y(Ue, { children: [
    n && /* @__PURE__ */ s(
      "span",
      {
        className: "size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent",
        "aria-hidden": !0
      }
    ),
    !n && t && /* @__PURE__ */ s("span", { "data-icon": !0, className: "shrink-0", children: t }),
    (a || !n) && f != null && /* @__PURE__ */ s("span", { children: f }),
    !n && r && /* @__PURE__ */ s("span", { "data-icon": !0, className: "shrink-0", children: r })
  ] }), v = n || (f == null || f === "") && (!!t || !!r), O = z(
    E,
    Tr[e],
    Br[o],
    v && Gr[o],
    l
  );
  return m != null && !j ? /* @__PURE__ */ s(
    "a",
    {
      href: m,
      className: O,
      "aria-disabled": void 0,
      ...M,
      children: S
    }
  ) : /* @__PURE__ */ s(
    "button",
    {
      type: C,
      className: O,
      disabled: j,
      "aria-busy": n,
      ...M,
      children: S
    }
  );
}
const Or = {
  gray: "bg-gray-100 text-gray-700",
  brand: "bg-brand/10 text-brand",
  error: "bg-red-50 text-red-700",
  warning: "bg-amber-50 text-amber-700",
  success: "bg-green-50 text-green-700",
  "gray-blue": "bg-slate-100 text-slate-700",
  "blue-light": "bg-sky-50 text-sky-700",
  blue: "bg-blue-50 text-blue-700",
  indigo: "bg-indigo-50 text-indigo-700",
  purple: "bg-purple-50 text-purple-700",
  pink: "bg-pink-50 text-pink-700",
  orange: "bg-orange-50 text-orange-700"
}, Vr = {
  gray: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
  brand: "bg-brand/10 text-brand ring-1 ring-brand/20",
  error: "bg-red-50 text-red-700 ring-1 ring-red-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  success: "bg-green-50 text-green-700 ring-1 ring-green-200",
  "gray-blue": "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  "blue-light": "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  purple: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  pink: "bg-pink-50 text-pink-700 ring-1 ring-pink-200",
  orange: "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
}, _r = {
  gray: "bg-white text-gray-700 shadow-sm ring-1 ring-gray-300",
  brand: "bg-white text-brand shadow-sm ring-1 ring-gray-300",
  error: "bg-white text-red-700 shadow-sm ring-1 ring-gray-300",
  warning: "bg-white text-amber-700 shadow-sm ring-1 ring-gray-300",
  success: "bg-white text-green-700 shadow-sm ring-1 ring-gray-300",
  "gray-blue": "bg-white text-slate-700 shadow-sm ring-1 ring-gray-300",
  "blue-light": "bg-white text-sky-700 shadow-sm ring-1 ring-gray-300",
  blue: "bg-white text-blue-700 shadow-sm ring-1 ring-gray-300",
  indigo: "bg-white text-indigo-700 shadow-sm ring-1 ring-gray-300",
  purple: "bg-white text-purple-700 shadow-sm ring-1 ring-gray-300",
  pink: "bg-white text-pink-700 shadow-sm ring-1 ring-gray-300",
  orange: "bg-white text-orange-700 shadow-sm ring-1 ring-gray-300"
}, Fe = {
  "pill-color": Or,
  "badge-color": Vr,
  "badge-modern": _r
}, Fr = {
  gray: "bg-gray-500",
  brand: "bg-brand",
  error: "bg-red-500",
  warning: "bg-amber-500",
  success: "bg-green-500",
  "gray-blue": "bg-slate-500",
  "blue-light": "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500"
}, Dr = {
  sm: "h-5.5 gap-1 px-2 text-xs",
  md: "h-6 gap-1 px-2.5 text-xs",
  lg: "h-7 gap-1.5 px-3 text-sm"
}, $r = {
  sm: "size-5.5 p-0",
  md: "size-6 p-0",
  lg: "size-7 p-0"
}, De = {
  "pill-color": "rounded-full",
  "badge-color": "rounded-md",
  "badge-modern": "rounded-md"
};
function me({
  type: e = "pill-color",
  color: o = "gray",
  size: t = "md",
  className: r,
  children: n,
  ...a
}) {
  return /* @__PURE__ */ s(
    "span",
    {
      className: z(
        "inline-flex items-center justify-center font-medium whitespace-nowrap",
        De[e],
        Fe[e][o],
        Dr[t],
        r
      ),
      ...a,
      children: n
    }
  );
}
function Hr({
  type: e = "pill-color",
  color: o = "gray",
  size: t = "md",
  className: r,
  children: n,
  ...a
}) {
  return /* @__PURE__ */ y(
    me,
    {
      type: e,
      color: o,
      size: t,
      className: r,
      ...a,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: z("size-1.5 shrink-0 rounded-full", Fr[o]),
            "aria-hidden": !0
          }
        ),
        n
      ]
    }
  );
}
function Yr({
  type: e = "pill-color",
  color: o = "gray",
  size: t = "md",
  startIcon: r,
  endIcon: n,
  className: a,
  children: i,
  ...m
}) {
  return /* @__PURE__ */ y(
    me,
    {
      type: e,
      color: o,
      size: t,
      className: a,
      ...m,
      children: [
        r && /* @__PURE__ */ s("span", { className: "shrink-0 [&_svg]:size-3", "aria-hidden": !0, children: r }),
        i,
        n && /* @__PURE__ */ s("span", { className: "shrink-0 [&_svg]:size-3", "aria-hidden": !0, children: n })
      ]
    }
  );
}
function Qr({
  type: e = "pill-color",
  color: o = "gray",
  size: t = "md",
  icon: r,
  className: n,
  ...a
}) {
  return /* @__PURE__ */ s(
    "span",
    {
      className: z(
        "inline-flex items-center justify-center [&_svg]:size-3",
        De[e],
        Fe[e][o],
        $r[t],
        n
      ),
      ...a,
      children: r
    }
  );
}
function Xr({
  type: e = "pill-color",
  color: o = "gray",
  size: t = "md",
  onButtonClick: r,
  buttonLabel: n = "Remove",
  className: a,
  children: i,
  ...m
}) {
  return /* @__PURE__ */ y(
    me,
    {
      type: e,
      color: o,
      size: t,
      className: a,
      ...m,
      children: [
        i,
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: r,
            "aria-label": n,
            className: "shrink-0 rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current",
            children: /* @__PURE__ */ s(
              "svg",
              {
                className: "size-3",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ s(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M6 18 18 6M6 6l12 12"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
function Jr({
  type: e = "pill-color",
  color: o = "gray",
  size: t = "md",
  imgSrc: r,
  imgAlt: n = "",
  className: a,
  children: i,
  ...m
}) {
  return /* @__PURE__ */ y(
    me,
    {
      type: e,
      color: o,
      size: t,
      className: a,
      ...m,
      children: [
        /* @__PURE__ */ s(
          "img",
          {
            src: r,
            alt: n,
            className: z("shrink-0 rounded-full object-cover", t === "lg" ? "size-4" : "size-3.5")
          }
        ),
        i
      ]
    }
  );
}
const $e = {
  sm: "h-10 px-3 py-2 text-sm",
  md: "h-12 px-3.5 py-3 text-base"
}, Kr = {
  sm: "[&_svg]:size-5",
  md: "[&_svg]:size-5"
}, Zr = N.forwardRef(function({
  label: o,
  hint: t,
  isRequired: r = !1,
  isInvalid: n = !1,
  size: a = "sm",
  icon: i,
  shortcut: m,
  tooltip: l,
  disabled: f,
  className: w,
  id: C,
  ...M
}, j) {
  const E = N.useId(), S = C ?? E, v = t ? `${S}-hint` : void 0;
  return /* @__PURE__ */ y("div", { className: "flex flex-col gap-1.5", children: [
    o && /* @__PURE__ */ y("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ y(
        "label",
        {
          htmlFor: S,
          className: "text-sm font-medium text-gray-700",
          children: [
            o,
            r && /* @__PURE__ */ s("span", { className: "text-red-500", children: " *" })
          ]
        }
      ),
      l && /* @__PURE__ */ y("span", { className: "group relative", children: [
        /* @__PURE__ */ y(
          "svg",
          {
            className: "size-4 text-gray-400",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: [
              /* @__PURE__ */ s("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ s("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
              /* @__PURE__ */ s("path", { d: "M12 17h.01" })
            ]
          }
        ),
        /* @__PURE__ */ s("span", { className: "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100", children: l })
      ] })
    ] }),
    /* @__PURE__ */ y(
      "div",
      {
        className: z(
          "flex items-center gap-2 rounded-lg border bg-white shadow-xs transition-colors",
          n ? "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100" : "border-gray-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
          f && "pointer-events-none bg-gray-50 opacity-50",
          $e[a]
        ),
        children: [
          i && /* @__PURE__ */ s(
            "span",
            {
              className: z("shrink-0 text-gray-500", Kr[a]),
              "aria-hidden": !0,
              children: i
            }
          ),
          /* @__PURE__ */ s(
            "input",
            {
              ref: j,
              id: S,
              disabled: f,
              "aria-invalid": n || void 0,
              "aria-describedby": v,
              className: z(
                "w-full bg-transparent outline-none placeholder:text-gray-400",
                w
              ),
              ...M
            }
          ),
          n && /* @__PURE__ */ y(
            "svg",
            {
              className: "size-4 shrink-0 text-red-500",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 2,
              "aria-hidden": !0,
              children: [
                /* @__PURE__ */ s("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ s("path", { d: "M12 8v4m0 4h.01" })
              ]
            }
          ),
          m && /* @__PURE__ */ s("kbd", { className: "shrink-0 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-500", children: m === !0 ? "⌘K" : m })
        ]
      }
    ),
    t && /* @__PURE__ */ s(
      "p",
      {
        id: v,
        className: z(
          "text-sm",
          n ? "text-red-600" : "text-gray-500"
        ),
        children: t
      }
    )
  ] });
});
function et({
  label: e,
  hint: o,
  isRequired: t = !1,
  isInvalid: r = !1,
  size: n = "sm",
  disabled: a = !1,
  leadingAddon: i,
  trailingAddon: m,
  inputProps: l = {},
  className: f
}) {
  const w = N.useId(), C = o ? `${w}-hint` : void 0;
  return /* @__PURE__ */ y("div", { className: z("flex flex-col gap-1.5", f), children: [
    e && /* @__PURE__ */ y(
      "label",
      {
        htmlFor: w,
        className: "text-sm font-medium text-gray-700",
        children: [
          e,
          t && /* @__PURE__ */ s("span", { className: "text-red-500", children: " *" })
        ]
      }
    ),
    /* @__PURE__ */ y(
      "div",
      {
        className: z(
          "flex items-stretch rounded-lg border bg-white shadow-xs transition-colors",
          r ? "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100" : "border-gray-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
          a && "pointer-events-none bg-gray-50 opacity-50"
        ),
        children: [
          i && /* @__PURE__ */ s("div", { className: "flex items-center border-r border-gray-300 px-3 text-sm text-gray-500", children: i }),
          /* @__PURE__ */ s(
            "input",
            {
              id: w,
              disabled: a,
              "aria-invalid": r || void 0,
              "aria-describedby": C,
              className: z(
                "w-full bg-transparent outline-none placeholder:text-gray-400",
                $e[n],
                !i && "rounded-l-lg",
                !m && "rounded-r-lg"
              ),
              ...l
            }
          ),
          m && /* @__PURE__ */ s("div", { className: "flex items-center border-l border-gray-300 px-3 text-sm text-gray-500", children: m })
        ]
      }
    ),
    o && /* @__PURE__ */ s(
      "p",
      {
        id: C,
        className: z(
          "text-sm",
          r ? "text-red-600" : "text-gray-500"
        ),
        children: o
      }
    )
  ] });
}
const Ke = {
  sm: "h-10 px-3 py-2 text-sm",
  md: "h-12 px-3.5 py-3 text-base"
};
function rt({
  label: e,
  hint: o,
  isRequired: t = !1,
  isInvalid: r = !1,
  isDisabled: n = !1,
  size: a = "sm",
  placeholder: i = "Select an option",
  icon: m,
  options: l,
  value: f,
  defaultValue: w,
  onChange: C,
  className: M
}) {
  const j = N.useId(), E = o ? `${j}-hint` : void 0, S = `${j}-listbox`, [v, O] = N.useState(w ?? ""), U = f !== void 0, D = U ? f : v, [W, A] = N.useState(!1), [L, V] = N.useState(-1), u = N.useRef(null), R = N.useRef(null), h = l.find((b) => b.value === D);
  N.useEffect(() => {
    if (!W) return;
    function b(I) {
      var B, g;
      (B = u.current) != null && B.contains(I.target) || (g = R.current) != null && g.contains(I.target) || A(!1);
    }
    return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
  }, [W]), N.useEffect(() => {
    if (!W) return;
    function b(I) {
      var B;
      I.key === "Escape" && (A(!1), (B = u.current) == null || B.focus());
    }
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [W]), N.useEffect(() => {
    var I;
    if (!W || L < 0) return;
    const b = (I = R.current) == null ? void 0 : I.children[L];
    b == null || b.scrollIntoView({ block: "nearest" });
  }, [W, L]);
  function k(b) {
    var I;
    b.disabled || (U || O(b.value), C == null || C(b.value), A(!1), (I = u.current) == null || I.focus());
  }
  function P(b) {
    (b.key === "ArrowDown" || b.key === "Enter" || b.key === " ") && (b.preventDefault(), A(!0), V(0));
  }
  function re(b) {
    var I;
    switch (b.key) {
      case "ArrowDown":
        b.preventDefault(), V((B) => Math.min(B + 1, l.length - 1));
        break;
      case "ArrowUp":
        b.preventDefault(), V((B) => Math.max(B - 1, 0));
        break;
      case "Enter":
      case " ":
        b.preventDefault(), L >= 0 && l[L] && k(l[L]);
        break;
      case "Escape":
        A(!1), (I = u.current) == null || I.focus();
        break;
    }
  }
  function Y(b) {
    return b.avatar ? /* @__PURE__ */ s(
      "img",
      {
        src: b.avatar,
        alt: "",
        className: "size-6 shrink-0 rounded-full object-cover"
      }
    ) : b.icon ? /* @__PURE__ */ s("span", { className: "shrink-0 text-gray-500 [&_svg]:size-5", "aria-hidden": !0, children: b.icon }) : b.dot ? /* @__PURE__ */ s(
      "span",
      {
        className: z("size-2 shrink-0 rounded-full", b.dot),
        "aria-hidden": !0
      }
    ) : null;
  }
  const q = /* @__PURE__ */ s(
    "svg",
    {
      className: z(
        "size-5 shrink-0 text-gray-500 transition-transform",
        W && "rotate-180"
      ),
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      "aria-hidden": !0,
      children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m6 9 6 6 6-6" })
    }
  ), $ = /* @__PURE__ */ s(
    "svg",
    {
      className: "size-5 shrink-0 text-brand",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      "aria-hidden": !0,
      children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
    }
  );
  return /* @__PURE__ */ y("div", { className: z("relative flex flex-col gap-1.5", M), children: [
    e && /* @__PURE__ */ y(
      "label",
      {
        htmlFor: j,
        className: "text-sm font-medium text-gray-700",
        children: [
          e,
          t && /* @__PURE__ */ s("span", { className: "text-red-500", children: " *" })
        ]
      }
    ),
    /* @__PURE__ */ y(
      "button",
      {
        ref: u,
        id: j,
        type: "button",
        role: "combobox",
        "aria-expanded": W,
        "aria-haspopup": "listbox",
        "aria-controls": S,
        "aria-describedby": E,
        "aria-invalid": r || void 0,
        disabled: n,
        onClick: () => A((b) => !b),
        onKeyDown: P,
        className: z(
          "flex w-full items-center gap-2 rounded-lg border bg-white shadow-xs transition-colors text-left",
          r ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10",
          n && "pointer-events-none bg-gray-50 opacity-50",
          Ke[a]
        ),
        children: [
          m && /* @__PURE__ */ s("span", { className: "shrink-0 text-gray-500 [&_svg]:size-5", "aria-hidden": !0, children: m }),
          h ? /* @__PURE__ */ y("span", { className: "flex min-w-0 flex-1 items-center gap-2 truncate", children: [
            Y(h),
            /* @__PURE__ */ s("span", { className: "truncate text-gray-900", children: h.label })
          ] }) : /* @__PURE__ */ s("span", { className: "flex-1 truncate text-gray-400", children: i }),
          q
        ]
      }
    ),
    W && /* @__PURE__ */ s(
      "ul",
      {
        ref: R,
        id: S,
        role: "listbox",
        tabIndex: -1,
        onKeyDown: re,
        className: "absolute top-full z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none",
        children: l.map((b, I) => {
          const B = b.value === D, g = I === L;
          return /* @__PURE__ */ y(
            "li",
            {
              role: "option",
              "aria-selected": B,
              "aria-disabled": b.disabled || void 0,
              onMouseEnter: () => V(I),
              onClick: () => k(b),
              className: z(
                "flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                g && "bg-gray-50",
                B && "bg-gray-50",
                b.disabled && "pointer-events-none opacity-50"
              ),
              children: [
                Y(b),
                /* @__PURE__ */ y("span", { className: "flex min-w-0 flex-1 flex-col", children: [
                  /* @__PURE__ */ s("span", { className: "truncate text-gray-900", children: b.label }),
                  b.description && /* @__PURE__ */ s("span", { className: "truncate text-xs text-gray-500", children: b.description })
                ] }),
                B && $
              ]
            },
            b.value
          );
        })
      }
    ),
    o && /* @__PURE__ */ s(
      "p",
      {
        id: E,
        className: z(
          "text-sm",
          r ? "text-red-600" : "text-gray-500"
        ),
        children: o
      }
    )
  ] });
}
function tt({
  label: e,
  hint: o,
  isRequired: t = !1,
  isInvalid: r = !1,
  isDisabled: n = !1,
  size: a = "sm",
  placeholder: i = "Select an option",
  searchPlaceholder: m = "Search…",
  icon: l,
  options: f,
  value: w,
  defaultValue: C,
  onChange: M,
  className: j
}) {
  const E = N.useId(), S = o ? `${E}-hint` : void 0, v = `${E}-listbox`, [O, U] = N.useState(C ?? ""), D = w !== void 0, W = D ? w : O, [A, L] = N.useState(!1), [V, u] = N.useState(""), [R, h] = N.useState(-1), k = N.useRef(null), P = N.useRef(null), re = N.useRef(null), Y = f.find((p) => p.value === W), q = V ? f.filter(
    (p) => {
      var T;
      return p.label.toLowerCase().includes(V.toLowerCase()) || ((T = p.description) == null ? void 0 : T.toLowerCase().includes(V.toLowerCase()));
    }
  ) : f;
  N.useEffect(() => {
    A && (requestAnimationFrame(() => {
      var p;
      return (p = re.current) == null ? void 0 : p.focus();
    }), u(""), h(0));
  }, [A]), N.useEffect(() => {
    if (!A) return;
    function p(T) {
      var H, X, _;
      (H = k.current) != null && H.contains(T.target) || (_ = (X = P.current) == null ? void 0 : X.parentElement) != null && _.contains(T.target) || L(!1);
    }
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [A]), N.useEffect(() => {
    var T;
    if (!A || R < 0) return;
    const p = (T = P.current) == null ? void 0 : T.children[R];
    p == null || p.scrollIntoView({ block: "nearest" });
  }, [A, R]);
  function $(p) {
    var T;
    p.disabled || (D || U(p.value), M == null || M(p.value), L(!1), (T = k.current) == null || T.focus());
  }
  function b(p) {
    var T;
    switch (p.key) {
      case "ArrowDown":
        p.preventDefault(), h((H) => Math.min(H + 1, q.length - 1));
        break;
      case "ArrowUp":
        p.preventDefault(), h((H) => Math.max(H - 1, 0));
        break;
      case "Enter":
        p.preventDefault(), R >= 0 && q[R] && $(q[R]);
        break;
      case "Escape":
        L(!1), (T = k.current) == null || T.focus();
        break;
    }
  }
  function I(p) {
    return p.avatar ? /* @__PURE__ */ s(
      "img",
      {
        src: p.avatar,
        alt: "",
        className: "size-6 shrink-0 rounded-full object-cover"
      }
    ) : p.icon ? /* @__PURE__ */ s("span", { className: "shrink-0 text-gray-500 [&_svg]:size-5", "aria-hidden": !0, children: p.icon }) : p.dot ? /* @__PURE__ */ s(
      "span",
      {
        className: z("size-2 shrink-0 rounded-full", p.dot),
        "aria-hidden": !0
      }
    ) : null;
  }
  const B = /* @__PURE__ */ s(
    "svg",
    {
      className: z(
        "size-5 shrink-0 text-gray-500 transition-transform",
        A && "rotate-180"
      ),
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      "aria-hidden": !0,
      children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m6 9 6 6 6-6" })
    }
  ), g = /* @__PURE__ */ s(
    "svg",
    {
      className: "size-5 shrink-0 text-brand",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      "aria-hidden": !0,
      children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
    }
  );
  return /* @__PURE__ */ y("div", { className: z("relative flex flex-col gap-1.5", j), children: [
    e && /* @__PURE__ */ y("label", { htmlFor: E, className: "text-sm font-medium text-gray-700", children: [
      e,
      t && /* @__PURE__ */ s("span", { className: "text-red-500", children: " *" })
    ] }),
    /* @__PURE__ */ y(
      "button",
      {
        ref: k,
        id: E,
        type: "button",
        role: "combobox",
        "aria-expanded": A,
        "aria-haspopup": "listbox",
        "aria-controls": v,
        "aria-describedby": S,
        "aria-invalid": r || void 0,
        disabled: n,
        onClick: () => L((p) => !p),
        className: z(
          "flex w-full items-center gap-2 rounded-lg border bg-white shadow-xs transition-colors text-left",
          r ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10",
          n && "pointer-events-none bg-gray-50 opacity-50",
          Ke[a]
        ),
        children: [
          l && /* @__PURE__ */ s("span", { className: "shrink-0 text-gray-500 [&_svg]:size-5", "aria-hidden": !0, children: l }),
          Y ? /* @__PURE__ */ y("span", { className: "flex min-w-0 flex-1 items-center gap-2 truncate", children: [
            I(Y),
            /* @__PURE__ */ s("span", { className: "truncate text-gray-900", children: Y.label })
          ] }) : /* @__PURE__ */ s("span", { className: "flex-1 truncate text-gray-400", children: i }),
          B
        ]
      }
    ),
    A && /* @__PURE__ */ y("div", { className: "absolute top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg", children: [
      /* @__PURE__ */ s("div", { className: "border-b border-gray-200 px-3 py-2", children: /* @__PURE__ */ y("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ y(
          "svg",
          {
            className: "size-4 shrink-0 text-gray-400",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            "aria-hidden": !0,
            children: [
              /* @__PURE__ */ s("circle", { cx: "11", cy: "11", r: "8" }),
              /* @__PURE__ */ s("path", { d: "m21 21-4.3-4.3" })
            ]
          }
        ),
        /* @__PURE__ */ s(
          "input",
          {
            ref: re,
            type: "text",
            value: V,
            onChange: (p) => {
              u(p.target.value), h(0);
            },
            onKeyDown: b,
            placeholder: m,
            className: "w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          }
        )
      ] }) }),
      /* @__PURE__ */ y(
        "ul",
        {
          ref: P,
          id: v,
          role: "listbox",
          className: "max-h-56 overflow-auto py-1 focus:outline-none",
          children: [
            q.length === 0 && /* @__PURE__ */ s("li", { className: "px-3 py-4 text-center text-sm text-gray-500", children: "No results found" }),
            q.map((p, T) => {
              const H = p.value === W, X = T === R;
              return /* @__PURE__ */ y(
                "li",
                {
                  role: "option",
                  "aria-selected": H,
                  "aria-disabled": p.disabled || void 0,
                  onMouseEnter: () => h(T),
                  onClick: () => $(p),
                  className: z(
                    "flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                    X && "bg-gray-50",
                    H && "bg-gray-50",
                    p.disabled && "pointer-events-none opacity-50"
                  ),
                  children: [
                    I(p),
                    /* @__PURE__ */ y("span", { className: "flex min-w-0 flex-1 flex-col", children: [
                      /* @__PURE__ */ s("span", { className: "truncate text-gray-900", children: p.label }),
                      p.description && /* @__PURE__ */ s("span", { className: "truncate text-xs text-gray-500", children: p.description })
                    ] }),
                    H && g
                  ]
                },
                p.value
              );
            })
          ]
        }
      )
    ] }),
    o && /* @__PURE__ */ s(
      "p",
      {
        id: S,
        className: z(
          "text-sm",
          r ? "text-red-600" : "text-gray-500"
        ),
        children: o
      }
    )
  ] });
}
function ot({
  label: e,
  hint: o,
  isRequired: t = !1,
  isInvalid: r = !1,
  isDisabled: n = !1,
  placeholder: a = "Search…",
  options: i,
  value: m,
  defaultValue: l,
  onChange: f,
  className: w
}) {
  const C = N.useId(), M = o ? `${C}-hint` : void 0, [j, E] = N.useState(
    l ?? []
  ), S = m !== void 0, v = S ? m : j, [O, U] = N.useState(!1), [D, W] = N.useState(""), A = N.useRef(null), L = N.useRef(null), V = D ? i.filter(
    (h) => {
      var k;
      return h.label.toLowerCase().includes(D.toLowerCase()) || ((k = h.description) == null ? void 0 : k.toLowerCase().includes(D.toLowerCase()));
    }
  ) : i;
  N.useEffect(() => {
    if (!O) return;
    function h(k) {
      var P;
      (P = A.current) != null && P.contains(k.target) || U(!1);
    }
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [O]);
  function u(h) {
    const k = v.includes(h) ? v.filter((P) => P !== h) : [...v, h];
    S || E(k), f == null || f(k);
  }
  function R(h) {
    const k = v.filter((P) => P !== h);
    S || E(k), f == null || f(k);
  }
  return /* @__PURE__ */ y("div", { ref: A, className: z("relative flex flex-col gap-1.5", w), children: [
    e && /* @__PURE__ */ y("label", { htmlFor: C, className: "text-sm font-medium text-gray-700", children: [
      e,
      t && /* @__PURE__ */ s("span", { className: "text-red-500", children: " *" })
    ] }),
    /* @__PURE__ */ y(
      "div",
      {
        onClick: () => {
          n || (U(!0), requestAnimationFrame(() => {
            var h;
            return (h = L.current) == null ? void 0 : h.focus();
          }));
        },
        className: z(
          "flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border bg-white px-3 py-2 shadow-xs transition-colors",
          r ? "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100" : "border-gray-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
          n && "pointer-events-none bg-gray-50 opacity-50"
        ),
        children: [
          v.map((h) => {
            const k = i.find((P) => P.value === h);
            return k ? /* @__PURE__ */ y(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700",
                children: [
                  k.label,
                  /* @__PURE__ */ s(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Remove ${k.label}`,
                      onClick: (P) => {
                        P.stopPropagation(), R(h);
                      },
                      className: "shrink-0 opacity-60 hover:opacity-100",
                      children: /* @__PURE__ */ s(
                        "svg",
                        {
                          className: "size-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          strokeWidth: 2,
                          children: /* @__PURE__ */ s(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              d: "M6 18 18 6M6 6l12 12"
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              },
              h
            ) : null;
          }),
          /* @__PURE__ */ s(
            "input",
            {
              ref: L,
              id: C,
              type: "text",
              value: D,
              onChange: (h) => W(h.target.value),
              onFocus: () => U(!0),
              onKeyDown: (h) => {
                h.key === "Escape" && U(!1);
              },
              placeholder: v.length === 0 ? a : "",
              disabled: n,
              "aria-describedby": M,
              className: "min-w-16 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            }
          )
        ]
      }
    ),
    O && /* @__PURE__ */ y(
      "ul",
      {
        role: "listbox",
        "aria-multiselectable": "true",
        className: "absolute top-full z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg",
        children: [
          V.length === 0 && /* @__PURE__ */ s("li", { className: "px-3 py-4 text-center text-sm text-gray-500", children: "No results found" }),
          V.map((h) => {
            const k = v.includes(h.value);
            return /* @__PURE__ */ y(
              "li",
              {
                role: "option",
                "aria-selected": k,
                "aria-disabled": h.disabled || void 0,
                onClick: () => u(h.value),
                className: z(
                  "flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors hover:bg-gray-50",
                  k && "bg-gray-50",
                  h.disabled && "pointer-events-none opacity-50"
                ),
                children: [
                  /* @__PURE__ */ s(
                    "span",
                    {
                      className: z(
                        "flex size-4 shrink-0 items-center justify-center rounded border",
                        k ? "border-brand bg-brand text-white" : "border-gray-300"
                      ),
                      children: k && /* @__PURE__ */ s(
                        "svg",
                        {
                          className: "size-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          strokeWidth: 3,
                          children: /* @__PURE__ */ s(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              d: "M5 13l4 4L19 7"
                            }
                          )
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ y("span", { className: "flex min-w-0 flex-1 flex-col", children: [
                    /* @__PURE__ */ s("span", { className: "truncate text-gray-900", children: h.label }),
                    h.description && /* @__PURE__ */ s("span", { className: "truncate text-xs text-gray-500", children: h.description })
                  ] })
                ]
              },
              h.value
            );
          })
        ]
      }
    ),
    o && /* @__PURE__ */ s(
      "p",
      {
        id: M,
        className: z(
          "text-sm",
          r ? "text-red-600" : "text-gray-500"
        ),
        children: o
      }
    )
  ] });
}
function nt({
  tabs: e,
  activeTabId: o,
  onTabClick: t,
  className: r
}) {
  return /* @__PURE__ */ s(
    "aside",
    {
      className: _e(
        "w-56 shrink-0 border-r border-gray-200 bg-gray-50 p-4",
        r
      ),
      children: /* @__PURE__ */ s("nav", { className: "flex flex-col gap-1", "aria-label": "Sidebar navigation", children: e.map((n) => {
        const a = n.id === o;
        return /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => t(n.id),
            "aria-current": a ? "page" : void 0,
            className: `w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${a ? "bg-brand text-white" : "text-gray-200 hover:text-gray-800 hover:bg-gray-200"}`,
            children: n.label
          },
          n.id
        );
      }) })
    }
  );
}
export {
  me as Badge,
  Qr as BadgeIcon,
  Xr as BadgeWithButton,
  Hr as BadgeWithDot,
  Yr as BadgeWithIcon,
  Jr as BadgeWithImage,
  qr as Button,
  Zr as Input,
  et as InputGroup,
  rt as Select,
  tt as SelectWithSearch,
  ot as SelectWithTags,
  nt as Sidebar
};
//# sourceMappingURL=component-library.js.map
