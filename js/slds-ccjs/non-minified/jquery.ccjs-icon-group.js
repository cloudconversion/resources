if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the CCJS initializer file");
! function(t) {
    t.fn.iconGroup = function(e) {
        function s(t) {
            t.removeClass(a).addClass(i).trigger("selected.ccjs.button")
        }

        function n(t) {
            t.removeClass(i).addClass(a).trigger("deselected.ccjs.button")
        }
        var o = {},
            i = "slds-is-selected",
            a = "slds-not-selected";
        if (o.settings = t.extend({
            type: "sort",
            defaultButtonId: "",
            onChange: function(t) {
                console.log(t)
            },
            assetsLocation: t.ccjs.assetsLocation
        }, e), "string" != typeof e) return o.buttons = t(".slds-button", this), o.defaultIcon = "" === o.settings.defaultButtonId ? o.buttons.eq(0) : "#" + o.settings.defaultButtonId, "sort" === o.settings.type && s(t(o.defaultIcon)), o.buttons.click(function() {
            o.target = t(this), o.targetId = o.target.attr("id"), !o.target.hasClass(i) || "toggle" !== o.settings.type && "switch" !== o.settings.type ? o.target.hasClass(a) && "toggle" === o.settings.type ? (s(o.target), o.settings.onChange()) : !o.target.hasClass(a) || "switch" !== o.settings.type && "sort" !== o.settings.type || (o.buttons.each(function() {
                t(this) !== o.target && t(this).hasClass(i) && n(t(this))
            }), s(o.target), o.settings.onChange(o)) : (n(o.target), o.settings.onChange())
        }), this;
        if ("string" == typeof e) return this.each(function() {
            switch (e) {
                case "select":
                    s(t(this));
                    break;
                case "deselect":
                    n(t(this));
                    break;
                default:
                    console.error("The method you entered does not exist")
            }
        });
        throw new Error("This plugin can only be run with a selector, or with a command")
    }
}(jQuery);