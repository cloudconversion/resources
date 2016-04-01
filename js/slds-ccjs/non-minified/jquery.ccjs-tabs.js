if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(t) {
    var s = function(s, a) {
        this.$el = t(s), this.settings = a, this.initTabs()
    };
    s.prototype = {
        constructor: s,
        initTabs: function() {
            var s = this,
                a = this.$el.find("a[data-ccjs-show]"),
                e = t(".slds-tabs--default__item, .slds-tabs--scoped__item", this.$el),
                i = {
                    self: s,
                    children: e
                };
            a.on("click", function(a) {
                return a.stopPropagation(), s.selectTab(t(a.target).data("ccjs-show")), t(this).trigger("selected.ccjs.tab"), !1
            }), "" === this.settings.defaultTabId || 0 === t("#" + this.settings.defaultTabId).length ? this.selectTab(a.first().data("ccjs-show")) : this.selectTab(this.settings.defaultTabId), e.keyup(i, this.processKeypress)
        },
        selectTab: function(t) {
            this.$el.find(".slds-tabs--default__item, .slds-tabs--scoped__item").removeClass("slds-active").find(".slds-tabs--default__link, .slds-tabs--scoped__link").attr("tabindex", "-1").attr("aria-selected", "false"), this.$el.find(".slds-tabs--default__content, .slds-tabs--scoped__content").hide(), this.$el.find('[data-ccjs-show="' + t + '"]').closest("li").addClass("slds-active").find(".slds-tabs--default__link, .slds-tabs--scoped__link").attr("tabindex", "0").attr("aria-selected", "true").focus(), this.$el.find("#" + t).show().trigger("shown.ccjs.tabcontent"), this.id = t, this.settings.onChange(this)
        },
        processKeypress: function(s) {
            var a, e = s.data.children,
                i = t(e).length - 1,
                n = t(".slds-active", t(e).parent()).index();
            37 == s.which ? (a = 0 == n ? t(e).eq(i).find("[data-ccjs-show]").data("ccjs-show") : t(e).eq(n - 1).find("[data-ccjs-show]").data("ccjs-show"), s.data.self.selectTab(a)) : 39 == s.which && (a = n == i ? t(e).eq(0).find("[data-ccjs-show]").data("ccjs-show") : t(e).eq(n + 1).find("[data-ccjs-show]").data("ccjs-show"), s.data.self.selectTab(a))
        }
    }, t.fn.tabs = function(a) {
        var e, i = arguments,
            n = t.extend({
                defaultTabId: "",
                onChange: function(t) {},
                assetsLocation: t.ccjs.assetsLocation
            }, "object" == typeof a ? a : {});
        if (this.each(function() {
            var l = t(this),
                d = l.data("ccjs-tabs");
            if (!d) {
                var o = new s(this, n);
                l.data("ccjs-tabs", d = o)
            }
            "string" == typeof a && (e = d[a](i[1], i[2]))
        }), void 0 === e || e instanceof s) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        return e
    }
}(jQuery);