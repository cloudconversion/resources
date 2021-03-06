if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(s) {
    var e = function(e, o) {
        this.$el = s(e), this.settings = o, this.obj = {}, this.bindTrigger(), this.bindChoices()
    };
    e.prototype = {
        constructor: e,
        bindTrigger: function() {
            var e = this,
                o = this.$el;
            this.obj.$trigger = s(".slds-button", o), this.obj.$dropdown = s(".slds-dropdown", o), this.obj.$choices = s(".slds-dropdown__item a", o), this.obj.$trigger.unbind().click(function(o) {
                return o.stopPropagation(), e.obj.id = s(this).attr("id"), e.obj.$dropdown.hasClass("slds-hide") ? (s('[data-ccjs="picklist"]').not(e.$el).picklist("close"), e.obj.$dropdown.removeClass("slds-hide").addClass("slds-show"), null === e.obj.valueId || "undefined" == typeof e.obj.valueId ? e.focusedIndex = null : e.focusedIndex = e.obj.$dropdown.find("li").index(e.obj.$dropdown.find("#" + e.obj.valueId)), e.focusOnElement(), e.obj.$dropdown.on("keyup", e, e.processKeypress)) : (e.obj.$dropdown.removeClass("slds-show").addClass("slds-hide"), e.obj.$dropdown.unbind("keyup", e.processKeypress)), !1
            }), s("body").click(function() {
                e.obj.$dropdown.removeClass("slds-show").addClass("slds-hide"), e.obj.$dropdown.unbind("keyup", e.processKeypress)
            }).keyup(function(e) {
                27 === e.keyCode && s('[data-ccjs="picklist"]').picklist("close")
            })
        },
        processKeypress: function(s) {
            var e = s.data,
                o = e.obj.$choices.length;
            switch (s.keyCode) {
                case 40:
                    e.focusedIndex = e.focusedIndex === o - 1 ? 0 : e.focusedIndex + 1, e.focusOnElement();
                    break;
                case 38:
                    e.focusedIndex = 0 === e.focusedIndex ? o - 1 : e.focusedIndex - 1, e.focusOnElement();
                    break;
                case 27:
                    e.$el.picklist("close")
            }
            return !1
        },
        focusOnElement: function() {
            null !== this.focusedIndex && this.obj.$choices.eq(this.focusedIndex).focus()
        },
        bindChoices: function() {
            var e = this;
            this.obj.$valueContainer = s("> span", this.obj.$trigger), this.obj.$choices.unbind().click(function(o) {
                o.stopPropagation();
                var i = s(this).closest("li").attr("id");
                e.setValueAndUpdateDom(i), e.settings.onChange(e.obj)
            })
        },
        setValueAndUpdateDom: function(s) {
            var e = this.$el.find("#" + s);
            this.obj.value = e.find("a").text(), this.obj.valueId = s, this.obj.$dropdown.removeClass("slds-show").addClass("slds-hide"), this.obj.$dropdown.unbind("keyup", this.processKeypress), this.obj.$trigger.trigger("change.ccjs.picklist").focus(), this.obj.$valueContainer.text(this.obj.value), this.obj.$choices.parent().removeClass("slds-is-selected"), e.addClass("slds-is-selected")
        },
        setValue: function(s, e) {
            this.setValueAndUpdateDom(s), e && this.settings.onChange(this.obj)
        },
        getValueId: function() {
            return this.obj.valueId
        },
        getValue: function() {
            return this.obj
        },
        close: function() {
            this.obj.$dropdown.removeClass("slds-show").addClass("slds-hide"), this.obj.$dropdown.unbind("keyup", this.processKeypress)
        }
    }, s.fn.picklist = function(o) {
        var i, t = arguments,
            n = s.extend({
                assetsLocation: s.ccjs.assetsLocation,
                onChange: function(s) {}
            }, "object" == typeof o ? o : {});
        if (this.each(function() {
            var d = s(this),
                l = d.data("ccjs-picklist");
            d.find(".slds-dropdown").addClass("slds-hide");
            if (!l) {
                var a = new e(this, n);
                d.data("ccjs-picklist", l = a)
            }
            "string" == typeof o && (i = l[o](t[1], t[2]))
        }), void 0 === i || i instanceof e) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        return i
    }
}(jQuery);