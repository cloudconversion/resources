if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(e) {
    var s = function(e) {
            e.removeAttr("style").trigger("dismissed.ccjs.popover").unwrap().remove()
        },
        o = function(o) {
            var t = e(o.target),
                i = e("#" + t.data("ccjs-show")),
                n = o.data.options,
                r = o.type,
                a = n.wrapperDisplay;
            if (i.length > 0 && "focus" !== r) s(i);
            else if (0 === i.length) {
                var p = e(".slds-popover").not(o.data.popoverElement),
                    l = o.data.popoverElement,
                    c = 15,
                    d = 15,
                    u = t.attr("data-ccjs-placement") || "top";
                n.useClick && n.dismissOthers && p.each(function() {
                    e(this).hasClass("slds-hide") || s(e(this))
                }), n.useClick && n.backgroundDismiss && o.stopPropagation(), t.after(l), i = t.parent().find(o.data.popoverElement), i.css("width", i.innerWidth() + "px"), i.css("position", "absolute"), "top" === u || "bottom" === u ? (i.css("left", t.innerWidth() / 2 - i.innerWidth() / 2 + "px"), i.css(u, "-" + (i.innerHeight() + c) + "px")) : ("left" === u || "right" === u) && (i.css("top", t.outerHeight() / 2 - i.outerHeight() / 2 + "px"), i.css(u, "-" + (i.innerWidth() + d) + "px")), t.wrap('<span style="position: relative; display: ' + a + ';"></span>'), i.on("click", n.dismissSelector, function(e) {
                    s(i)
                }), i.trigger("shown.ccjs.popover").appendTo(t.parent()), n.useClick || "focus" == r && (t.focus(), t.one("blur", function() {
                    s(i)
                }))
            }
        };
    e.fn.popover = function(t) {
        var i = e.extend({
            assetsLocation: e.ccjs.assetsLocation,
            useClick: !1,
            dismissOthers: !0,
            backgroundDismiss: !1,
            wrapperDisplay: "inline-block",
            dismissSelector: '[data-ccjs-dismiss="popover"]'
        }, t);
        return i.useClick && i.backgroundDismiss && e("body").click(function() {
            e(".slds-popover").each(function() {
                s(e(this))
            })
        }), this.each(function() {
            var s = e(this),
                t = e("#" + s.data("ccjs-show")).remove().removeClass("slds-hide");
            i.useClick ? s.on("click", {
                popoverElement: t,
                options: i
            }, o) : (s.on("mouseenter", {
                popoverElement: t,
                options: i
            }, o), s.on("mouseleave", {
                popoverElement: t,
                options: i
            }, o), s.on("focus", {
                popoverElement: t,
                options: i
            }, o))
        })
    }
}(jQuery);