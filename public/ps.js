!(function () {
  var a,
    l = window.location,
    o = window.document,
    e = o.currentScript,
    r =
      e.getAttribute('data-api') ||
      new URL(e.src).origin + '/api/event',
    s = e.getAttribute('data-domain');
  function c(e, t, n) {
    t && console.warn('Ignoring Event: ' + t),
      n && n.callback && n.callback(),
      'pageview' === e && (a = !0);
  }
  var u,
    d,
    p = l.href,
    w = {},
    f = -1,
    h = !1,
    t = !1;
  function n() {
    var e = o.body || {},
      t = o.documentElement || {};
    return Math.max(
      e.scrollHeight || 0,
      e.offsetHeight || 0,
      e.clientHeight || 0,
      t.scrollHeight || 0,
      t.offsetHeight || 0,
      t.clientHeight || 0
    );
  }
  function i() {
    var e = o.body || {},
      t = o.documentElement || {},
      n = window.innerHeight || t.clientHeight || 0,
      t = window.scrollY || t.scrollTop || e.scrollTop || 0;
    return v <= n ? v : t + n;
  }
  var v = n(),
    g = i();
  function m() {
    var e = u ? d + (Date.now() - u) : d;
    t ||
      a ||
      !(f < g || 3e3 <= e) ||
      ((f = g),
      setTimeout(function () {
        t = !1;
      }, 300),
      (e = {
        n: 'engagement',
        sd: Math.round((g / v) * 100),
        d: s,
        u: p,
        p: w,
        e: e,
      }),
      (u = null),
      (d = 0),
      y(r, e));
  }
  function b(e, t) {
    var n = 'pageview' === e;
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(
        l.hostname
      ) ||
      'file:' === l.protocol
    )
      return c(e, 'localhost', t);
    if (
      (window._phantom ||
        window.__nightmare ||
        window.navigator.webdriver ||
        window.Cypress) &&
      !window.__plausible
    )
      return c(e, null, t);
    try {
      if ('true' === window.localStorage.plausible_ignore)
        return c(e, 'localStorage flag', t);
    } catch (e) {}
    var i = {};
    (i.n = e),
      (i.u = l.href),
      (i.d = s),
      (i.r = o.referrer || null),
      t && t.meta && (i.m = JSON.stringify(t.meta)),
      t && t.props && (i.p = t.props),
      n &&
        ((a = !1),
        (p = i.u),
        (w = i.p),
        (f = -1),
        (d = 0),
        (u = Date.now()),
        h ||
          (o.addEventListener('visibilitychange', function () {
            'hidden' === o.visibilityState
              ? ((d += Date.now() - u), (u = null), m())
              : (u = Date.now());
          }),
          (h = !0))),
      y(r, i, t);
  }
  function y(e, t, n) {
    window.fetch &&
      fetch(e, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        keepalive: !0,
        body: JSON.stringify(t),
      }).then(function (e) {
        n && n.callback && n.callback({ status: e.status });
      });
  }
  window.addEventListener('load', function () {
    v = n();
    var e = 0,
      t = setInterval(function () {
        (v = n()), 15 == ++e && clearInterval(t);
      }, 200);
  }),
    o.addEventListener('scroll', function () {
      v = n();
      var e = i();
      g < e && (g = e);
    });
  var k = (window.plausible && window.plausible.q) || [];
  window.plausible = b;
  for (var S, E = 0; E < k.length; E++) b.apply(this, k[E]);
  function L(e) {
    (e && S === l.pathname) ||
      (e && h && (m(), (v = n()), (g = i())),
      (S = l.pathname),
      b('pageview'));
  }
  function H() {
    L(!0);
  }
  var _,
    e = window.history;
  e.pushState &&
    ((_ = e.pushState),
    (e.pushState = function () {
      _.apply(this, arguments), H();
    }),
    window.addEventListener('popstate', H)),
    'prerender' === o.visibilityState
      ? o.addEventListener('visibilitychange', function () {
          S || 'visible' !== o.visibilityState || L();
        })
      : L(),
    window.addEventListener('pageshow', function (e) {
      e.persisted && L();
    });
  var N = 1;
  function T(e) {
    var t, n, i, a, o;
    function r() {
      a || ((a = !0), (window.location = n.href));
    }
    ('auxclick' === e.type && e.button !== N) ||
      ((t = ((e) => {
        for (
          ;
          e &&
          (void 0 === e.tagName ||
            !(t = e) ||
            !t.tagName ||
            'a' !== t.tagName.toLowerCase() ||
            !e.href);

        )
          e = e.parentNode;
        var t;
        return e;
      })(e.target)) &&
        t.href &&
        t.href.split('?')[0],
      (o = t) &&
        o.href &&
        o.host &&
        o.host !== l.host &&
        ((o = e),
        (e = {
          name: 'Outbound Link: Click',
          props: { url: (n = t).href },
        }),
        (a = !1),
        ((e, t) =>
          !e.defaultPrevented &&
          ((t = !t.target || t.target.match(/^_(self|parent|top)$/i)),
          (e =
            !(e.ctrlKey || e.metaKey || e.shiftKey) &&
            'click' === e.type),
          t) &&
          e)(o, n)
          ? ((i = { props: e.props, callback: r }),
            plausible(e.name, i),
            setTimeout(r, 5e3),
            o.preventDefault())
          : ((i = { props: e.props }), plausible(e.name, i))));
  }
  o.addEventListener('click', T), o.addEventListener('auxclick', T);
})();
