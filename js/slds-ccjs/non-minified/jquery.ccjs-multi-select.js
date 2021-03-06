if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(e) {
    var t = '<li draggable="true" id="{{optionId}}" class="slds-picklist__item slds-has-icon slds-has-icon--left" aria-selected="false" tabindex="0" role="option"><span class="slds-truncate"><span>{{optionLabel}}</span></span></li>',
        s = function(t, s) {
            this.$el = e(t), this.$selectedContainer = this.$el.find('[data-ccjs-multi-select="selected"]').find("ul"), this.$unselectedContainer = this.$el.find('[data-ccjs-multi-select="unselected"]').find("ul"), this.selectedItems = s.selectedItems, this.unselectedItems = s.unselectedItems, this.settings = s, this.init()
        };
    s.prototype = {
        constructor: s,
        init: function() {
            this.renderPicklists(), this.$el.find('[data-ccjs-multi-select="unselect"]').on("click", this, this.unselectOption), this.$el.find('[data-ccjs-multi-select="select"]').on("click", this, this.selectOption), this.$el.find('[data-ccjs-multi-select="move-up"]').on("click", this, this.moveOptionUp), this.$el.find('[data-ccjs-multi-select="move-down"]').on("click", this, this.moveOptionDown)
        },
        renderPicklists: function() {
            var t = this;
            this.unselectedItems.forEach(function(e) {
                t.$unselectedContainer.append(t.createPicklistDomItem(e))
            }), this.$unselectedContainer.on("click", "li", function(s) {
                e(this).addClass("slds-is-selected").attr("aria-selected", "true").siblings().removeClass("slds-is-selected").attr("aria-selected", "false"), t.itemToSelect = e(this).data("ccjs-picklist-obj")
            }).on("dragstart", "li", function(s) {
                t.itemToSelect = e(this).data("ccjs-picklist-obj")
            }).on("dragover", function(e) {
                e.preventDefault(), e.stopPropagation()
            }).on("dragenter", function(e) {
                e.preventDefault(), e.stopPropagation()
            }).on("drop", function(e) {
                e.preventDefault(), e.stopPropagation(), t.$el.find('[data-ccjs-multi-select="unselect"]').click()
            }), this.selectedItems.forEach(function(e) {
                t.$selectedContainer.append(t.createPicklistDomItem(e))
            }), this.$selectedContainer.on("click", "li", function(s) {
                e(this).addClass("slds-is-selected").attr("aria-selected", "true").siblings().removeClass("slds-is-selected").attr("aria-selected", "false"), t.itemToUnselect = e(this).data("ccjs-picklist-obj")
            }).on("dragstart", "li", function(s) {
                t.itemToUnselect = e(this).data("ccjs-picklist-obj")
            }).on("dragover", function(e) {
                e.preventDefault(), e.stopPropagation()
            }).on("dragenter", function(e) {
                e.preventDefault(), e.stopPropagation()
            }).on("drop", function(e) {
                e.preventDefault(), e.stopPropagation(), t.$el.find('[data-ccjs-multi-select="select"]').click()
            })
        },
        selectOption: function(e) {
            var t = e.data;
            t.itemToSelect && (t.$unselectedContainer.find("#" + t.itemToSelect.id).removeClass("slds-is-selected").attr("aria-selected", "false").appendTo(t.$selectedContainer), t.unselectedItems.splice(t.unselectedItems.indexOf(t.itemToSelect), 1), t.selectedItems.push(t.itemToSelect), t.itemToSelect = null)
        },
        unselectOption: function(e) {
            var t = e.data;
            t.itemToUnselect && (t.$selectedContainer.find("#" + t.itemToUnselect.id).removeClass("slds-is-selected").attr("aria-selected", "false").appendTo(t.$unselectedContainer), t.selectedItems.splice(t.selectedItems.indexOf(t.itemToUnselect), 1), t.unselectedItems.push(t.itemToUnselect), t.itemToUnselect = null)
        },
        moveOptionUp: function(e) {
            var t = e.data;
            if (t.itemToUnselect) {
                var s = t.selectedItems.indexOf(t.itemToUnselect);
                if (s > 0) {
                    t.selectedItems.splice(s, 1), t.selectedItems.splice(s - 1, 0, t.itemToUnselect);
                    var i = t.$selectedContainer.find("#" + t.itemToUnselect.id);
                    i.removeClass("slds-is-selected").attr("aria-selected", "false").insertBefore(i.prev("li")), t.itemToUnselect = null
                }
            }
        },
        moveOptionDown: function(e) {
            var t = e.data;
            if (t.itemToUnselect) {
                var s = t.selectedItems.indexOf(t.itemToUnselect);
                if (s < t.selectedItems.length - 1) {
                    t.selectedItems.splice(s, 1), t.selectedItems.splice(s + 1, 0, t.itemToUnselect);
                    var i = t.$selectedContainer.find("#" + t.itemToUnselect.id);
                    i.removeClass("slds-is-selected").attr("aria-selected", "false").insertAfter(i.next("li")), t.itemToUnselect = null
                }
            }
        },
        createPicklistDomItem: function(s) {
            return e(t.replace("{{optionId}}", s.id).replace("{{optionLabel}}", s.label)).data("ccjs-picklist-obj", s)
        },
        setSelectedItems: function(e) {
            var t = this;
            if (e && e.length > 0) {
                var s = this.unselectedItems.filter(function(t) {
                    return -1 !== e.indexOf(t.id)
                });
                s.forEach(function(e) {
                    t.itemToSelect = e, t.$el.find('[data-ccjs-multi-select="select"]').click()
                })
            }
        },
        setUnselectedItems: function(e) {
            var t = this;
            if (e && e.length > 0) {
                var s = this.selectedItems.filter(function(t) {
                    return -1 !== e.indexOf(t.id)
                });
                s.forEach(function(e) {
                    t.itemToUnselect = e, t.$el.find('[data-ccjs-multi-select="unselect"]').click()
                })
            }
        },
        getSelectedItems: function() {
            return this.selectedItems
        },
        getUnselectedItems: function() {
            return this.unselectedItems
        }
    }, e.fn.multiSelect = function(t) {
        var i, l = arguments,
            n = e.extend({
                selectedItems: [],
                unselectedItems: [],
                assetsLocation: e.ccjs.assetsLocation
            }, "object" == typeof t ? t : {});
        if (this.each(function() {
            var c = e(this),
                a = c.data("ccjs-multi-select");
            if (!a) {
                var o = new s(this, n);
                c.data("ccjs-multi-select", a = o)
            }
            "string" == typeof t && (i = a[t](l[1], l[2]))
        }), void 0 === i || i instanceof s) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        return i
    }
}(jQuery);