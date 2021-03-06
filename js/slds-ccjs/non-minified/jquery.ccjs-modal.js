if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(s) {
    function e() {
        t = s.ccjs.scoped ? ".slds" : d, s(".slds-backdrop").remove(), s(t).append('<div class="ccjs-modal-container"></div>');
        var e = s(".ccjs-modal-container");
        i.appendTo(e).append('<div class="slds-backdrop"></div>').attr("aria-hidden", "true").addClass("slds-hide")
    }

    function a(e, a) {
        var o = e.data("ccjs-show"),
            t = s("#" + o);
        void 0 === o ? console.error('No "data-ccjs-show" attribute has been set') : (t.modal("show", a), e.blur(), l = e)
    }
    var o, t, d = "body",
        i = s(".slds-modal"),
        l = null;
    s.fn.modal = function(n, r) {
        function c(s) {
            27 == s.keyCode && i.is(":visible") && u()
        }

        function u() {
            m.self.modal("dismiss", h).unbind("click"), s(d).unbind("keyup", c), i.unbind("click"), b.unbind("click")
        }

        function f(e) {
            a(s(this), n)
        }
        var m = {};
        if (m.self = this, m.tabTarget = s('[href], [contenteditable="true"], button, a, input, textarea, select', t), m.modalTabTarget = s('[href], [contenteditable="true"], button, a, input, textarea, select', m.self), m.hasSelector = n && n.hasOwnProperty("selector") ? !0 : !1, null !== n && "string" == typeof n) {
            var h = s.extend({
                    selector: null,
                    dismissSelector: '[data-ccjs-dismiss="modal"]',
                    backdropDismiss: !1,
                    onShow: function(s) {},
                    onShown: function(s) {},
                    onDismiss: function(s) {},
                    onDismissed: function(s) {}
                }, r),
                b = s(h.dismissSelector),
                p = s(".slds-modal__header, .slds-modal__content, .slds-modal__footer");
            switch (n) {
                case "show":
                    o = !0, m.id = this.attr("id"), s(".slds-modal").removeClass("slds-fade-in-open").attr("aria-hidden", "false"), s(".slds-backdrop").remove(), s(".ccjs-modal-container").append('<div class="slds-backdrop"></div>'), s(d).keyup(c), m.self.addClass("slds-show"), b.click(function(s) {
                        s.preventDefault(), u()
                    }), h.backdropDismiss && (i.click(u), p.click(function(s) {
                        s.stopPropagation()
                    })), m.tabTarget.attr("tabindex", "-1"), m.modalTabTarget.attr("tabindex", "1"), setTimeout(function() {
                        s(".slds-backdrop").addClass("slds-backdrop--open"), m.self.addClass("slds-fade-in-open").trigger("show.ccjs.modal"), h.onShow(m), setTimeout(function() {
                            m.self.trigger("shown.ccjs.modal"), h.onShown(m), o = !1
                        }, 400)
                    }, 25);
                    break;
                case "dismiss":
                    o || s(".slds-backdrop").removeClass("slds-backdrop--open"), h.onDismiss(m), m.tabTarget.removeAttr("tabindex"), m.self.removeClass("slds-fade-in-open").attr("aria-hidden", "true"), null !== l && l.focus(), m.self.trigger("dismiss.ccjs.modal"), setTimeout(function() {
                        o || s(".slds-backdrop").remove(), l = null, m.self.addClass("slds-hide").trigger("dismissed.ccjs.modal"), h.onDismissed(m)
                    }, 200);
                    break;
                case "trigger":
                    var k = m.self.data("ccjs-show"),
                        v = s("#" + k);
                    v.modal("show", h);
                    break;
                default:
                    console.error("The method you entered does not exist")
            }
        } else m.hasSelector && 1 === this.length ? (e(), this.on("click", n.selector, f)) : (e(), m.self.click(function() {
            a(s(this), n)
        }));
        return this
    }
}(jQuery);