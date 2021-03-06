if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(t) {
    var e = 15,
        o = 15,
        l = function(e) {
            var o = t(e.target).closest('[data-ccjs="tooltip"]');
            o.attr("data-ccjs-title") || (o.attr("data-ccjs-title", o.attr("title")), o.attr("title", ""));
            var l = o.parent().hasClass("slds-button") ? ' style="line-height: normal;"' : "",
                a = o.attr("data-ccjs-id") || "ccjs-" + (new Date).valueOf(),
                r = o.attr("data-ccjs-title"),
                f = o.attr("data-ccjs-placement") || "top",
                d = {
                    top: "bottom",
                    bottom: "top",
                    left: "right",
                    right: "left"
                },
                h = "overflow: visible; display: inline-block; position: absolute; z-index:9999;",
                p = '<div id="' + a + '" aria-describedby="' + a + '" class="slds-tooltip slds-nubbin--' + (d[f] || "top") + '" role="tooltip" style="' + h + '"><div class="slds-tooltip__content"><div class="slds-tooltip__body"' + l + ">" + r + "</div></div></div>";
            if (0 === o.next(".slds-tooltip").length) {
                var c = t(p).appendTo(".slds"),
                    u = c[0].offsetWidth,
                    g = c[0].offsetHeight,
                    v = n(o),
                    b = s(f, v, u, g);
                i(b, f, u, g, c)
            }
        },
        i = function(t, e, o, l, i) {
            var s = a(e, t, o, l);
            s.left ? t.left += s.left : t.top += s.top, i.offset(t)
        },
        s = function(t, l, i, s) {
            var n = {};
            switch (t) {
                case "bottom":
                    n = {
                        top: l.top + l.height + e,
                        left: l.left + l.width / 2 - i / 2
                    };
                    break;
                case "top":
                    n = {
                        top: l.top - s - e,
                        left: l.left + l.width / 2 - i / 2
                    };
                    break;
                case "left":
                    n = {
                        top: l.top + l.height / 2 - s / 2,
                        left: l.left - i - o
                    };
                    break;
                default:
                    n = {
                        top: l.top + l.height / 2 - s / 2,
                        left: l.left + l.width + o
                    }
            }
            return n
        },
        n = function(e) {
            e = e || this.$element;
            var o = e[0],
                l = "BODY" == o.tagName,
                i = o.getBoundingClientRect();
            null == i.width && (i = t.extend({}, i, {
                width: i.right - i.left,
                height: i.bottom - i.top
            }));
            var s = l ? {
                    top: 0,
                    left: 0
                } : e.offset(),
                n = {
                    scroll: l ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
                },
                a = l ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
            return t.extend({}, i, n, a, s)
        },
        a = function(e, o, l, i) {
            var s = {
                    top: 0,
                    left: 0
                },
                a = n(t(".slds"));
            if (/right|left/.test(e)) {
                var r = o.top - a.scroll,
                    f = o.top - a.scroll + i;
                r < a.top ? s.top = a.top - r : f > a.top + a.height && (s.top = a.top + a.height - f)
            } else {
                var d = o.left,
                    h = o.left + l;
                d < a.left ? s.left = a.left - d : h > a.right && (s.left = a.left + a.width - h)
            }
            return s
        },
        r = function(e) {
            var o = t("body").find(".slds-tooltip");
            o.length > 0 && o.remove()
        };
    t.fn.tooltip = function(e) {
        var o = t.extend({
            assetsLocation: t.ccjs.assetsLocation
        }, e);
        return o.selector && 1 === this.length ? this.on("mouseenter", o.selector, l).on("focusin", o.selector, l).on("mouseleave", o.selector, r).on("blur", o.selector, r).on("touchstart", o.selector, function(e) {
            e.stopPropagation(), 0 == t(".slds-tooltip").length ? l() : r()
        }) : this.each(function() {
            t(this).on("mouseenter", l).on("focusin", l).on("mouseleave", r).on("blur", r).on("touchstart", function(e) {
                e.stopPropagation(), 0 == t(".slds-tooltip").length ? l() : r()
            })
        })
    }
}(jQuery);