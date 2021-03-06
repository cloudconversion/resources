if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(s) {
    var e = '<div class="slds-pill__container slds-hide"></div>',
        t = '<span class="slds-pill"><a href="javascript:void(0)" class="slds-pill__label"><svg aria-hidden="true" class="{{objectIconClass}} slds-icon slds-pill__icon{{hasIcon}}"><use xlink:href="{{objectIconUrl}}"></use></svg><span class="slds-pill__label">{{selectedResultLabel}}</span><button class="slds-button slds-button--icon-bare slds-pill__remove"><svg aria-hidden="true" class="slds-button__icon"><use xlink:href="{{assetsLocation}}/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg><span class="slds-assistive-text">Remove</span></button></a></span>',
        l = '<span class="slds-pill"><a href="javascript:void(0)" class="slds-pill__label"><img class="{{objectIconClass}} slds-icon slds-pill__icon{{hasIcon}}" src="{{objectIconUrl}}"/><span class="slds-pill__label">{{selectedResultLabel}}</span><button class="slds-button slds-button--icon-bare slds-pill__remove"><svg aria-hidden="true" class="slds-button__icon"><use xlink:href="{{assetsLocation}}/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg><span class="slds-assistive-text">Remove</span></button></a></span>',
        i = '<div class="slds-lookup__menu" role="listbox"><ul class="slds-lookup__list" role="presentation"></ul></div>',
        n = '<div class="slds-lookup__item"><button class="slds-button"><svg aria-hidden="true" class="slds-icon-text-default slds-icon slds-icon--small{{hasIcon}}"><use xlink:href="{{assetsLocation}}/assets/icons/utility-sprite/svg/symbols.svg#search"></use></svg>&quot;{{searchTerm}}&quot; in {{objectPluralLabel}}</button></div>',
        a = '<div class="slds-lookup__item"><button class="slds-button"><svg aria-hidden="true" class="slds-icon-text-default slds-icon slds-icon--small{{hasIcon}}"><use xlink:href="{{assetsLocation}}/assets/icons/utility-sprite/svg/symbols.svg#add"></use></svg>Add {{objectLabel}}</button></div>',
        o = '<li class="slds-lookup__item"><a id="{{resultId}}" href="javascript:void(0)" role="option"><svg aria-hidden="true" class="{{objectIconClass}} slds-icon slds-icon--small{{hasIcon}}"><use xlink:href="{{objectIconUrl}}"></use></svg>{{resultLabel}}</a></li>',
        c = '<li class="slds-lookup__item"><a id="{{resultId}}" href="javascript:void(0)" role="option"><img class="{{objectIconClass}} slds-icon slds-icon--small{{hasIcon}}" src="{{objectIconUrl}}"/>{{resultLabel}}</a></li>',
        r = function(t, l) {
            this.$el = s(t), this.$lookupContainer = this.$el.closest(".slds-lookup"), this.isSingle = "single" === this.$lookupContainer.data("select"), this.settings = l, this.isSingle ? this.$singleSelect = s(e).insertBefore(this.$el) : (this.$multiSelect = s(e).appendTo(this.$lookupContainer.find(".slds-form-element")), this.selectedResults = []), this.isStringEmpty(l.searchTerm) ? l.initialSelection && this.setSelection(l.initialSelection) : (this.$el.val(l.searchTerm), this.setSingleSelect()), this.initLookup()
        };
    r.prototype = {
        constructor: r,
        isStringEmpty: function(s) {
            return null === s || "undefined" == typeof s || "" === s.trim()
        },
        initLookup: function() {
            var e = this;
            this.$el.on("focus", this, this.runSearch).on("keyup", this, this.runSearch).on("blur", this, this.handleBlur), this.$lookupContainer.on("keyup", function(t) {
                t.stopPropagation();
                var l = s(this).find("a:focus");
                27 === t.keyCode && e.$el.blur(), 40 === t.keyCode && (l.length > 0 ? l.parent().next().find("a").focus() : s(this).find(".slds-lookup__list").find("a:first").focus()), 38 === t.keyCode && (l.length > 0 ? l.parent().prev().find("a").focus() : s(this).find(".slds-lookup__list").find("a:last").focus())
            })
        },
        runSearch: function(s) {
            var e = s.data,
                t = e.$el.val();
            e.isStringEmpty(t) ? e.getDefaultResults() : e.getSearchTermResults(t)
        },
        setMultiSelect: function(e) {
            var i = this,
                n = this.$multiSelect.html(""),
                a = this.$lookupContainer,
                o = i.settings.useImgTag ? l : t;
            e.length > 0 ? (e.forEach(function(e) {
                var t = s(o.replace("{{objectIconUrl}}", i.settings.objectIconUrl).replace("{{objectIconClass}}", i.settings.objectIconClass).replace("{{hasIcon}}", "" !== i.settings.objectIconUrl ? "" : " slds-hide").replace("{{assetsLocation}}", i.settings.assetsLocation).replace("{{selectedResultLabel}}", e.label));
                t.removeClass("slds-pill--bare").attr("id", e.id).on("click", "a, button", i, i.clearMultiSelectResult), n.append(t)
            }), n.addClass("slds-show").removeClass("slds-hide"), a.addClass("slds-has-selection")) : (n.html(""), n.addClass("slds-hide").removeClass("slds-show"), a.removeClass("slds-has-selection"))
        },
        setSingleSelect: function(s) {
            var e = this,
                i = s || "",
                n = e.settings.useImgTag ? l : t;
            this.$singleSelect.html(n.replace("{{objectIconUrl}}", this.settings.objectIconUrl).replace("{{objectIconClass}}", e.settings.objectIconClass).replace("{{hasIcon}}", "" !== e.settings.objectIconUrl ? "" : " slds-hide").replace("{{assetsLocation}}", this.settings.assetsLocation).replace("{{selectedResultLabel}}", i)), s ? (this.$singleSelect.addClass("slds-show").removeClass("slds-hide"), this.$el.addClass("slds-hide"), this.$lookupContainer.addClass("slds-has-selection"), this.$singleSelect.one("click", "button", this, this.clearSingleSelect)) : (this.$singleSelect.addClass("slds-hide").removeClass("slds-show"), this.$el.val("").removeClass("slds-hide"), this.$lookupContainer.removeClass("slds-has-selection"), window.setTimeout(function() {
                e.$el.focus()
            }, 100))
        },
        getSearchTermResults: function(s) {
            var e = this;
            if (this.settings.items.length > 0) this.searchResults = this.settings.items.filter(function(e) {
                return null !== e.label.toLowerCase().match(s.toLowerCase())
            }), this.renderSearchResults();
            else {
                var t = function(s) {
                    e.searchResults = s, e.renderSearchResults()
                };
                this.settings.filledSearchTermQuery(s, t)
            }
        },
        getDefaultResults: function() {
            var s = this;
            if (this.settings.items.length > 0) this.searchResults = this.settings.items, this.renderSearchResults();
            else {
                var e = function(e) {
                    s.searchResults = e, s.renderSearchResults()
                };
                this.settings.emptySearchTermQuery(e)
            }
        },
        renderSearchResults: function() {
            this.closeSearchDropdown();
            var e = s(i),
                t = e.find("ul.slds-lookup__list"),
                l = this.$el.val(),
                r = this;
            if (!this.isStringEmpty(l) && l.length > 1 && this.settings.showSearch === !0 && t.before(n.replace("{{searchTerm}}", l).replace("{{objectPluralLabel}}", this.settings.objectPluralLabel).replace("{{assetsLocation}}", s.ccjs.assetsLocation)), this.searchResults.forEach(function(e) {
                var l, i = r.settings.useImgTag ? c : o;
                if (r.isSingle) l = t.append(i.replace("{{resultLabel}}", e.label).replace("{{hasIcon}}", "" !== r.settings.objectIconUrl ? "" : " slds-hide").replace("{{resultId}}", e.id).replace("{{objectIconUrl}}", r.settings.objectIconUrl).replace("{{objectIconClass}}", r.settings.objectIconClass));
                else if (r.selectedResults) {
                    var n = r.selectedResults.map(function(s) {
                        return s.id
                    });
                    (0 === n.length || -1 === n.indexOf(e.id)) && (l = t.append(i.replace("{{resultLabel}}", e.label).replace("{{hasIcon}}", "" !== r.settings.objectIconUrl ? "" : " slds-hide").replace("{{resultId}}", e.id).replace("{{objectIconUrl}}", r.settings.objectIconUrl).replace("{{objectIconClass}}", r.settings.objectIconClass)))
                }
                l && l.find("a").on("focus", function() {
                    r.$el.attr("aria-activedescendant", s(this).attr("id"))
                }).on("blur", r, r.handleBlur)
            }), this.settings.clickAddFunction) {
                t.after(a.replace("{{hasIcon}}", " slds-icon").replace("{{objectLabel}}", this.settings.objectLabel).replace("{{assetsLocation}}", s.ccjs.assetsLocation))
            }
            t.one("click", "a", this, this.clickResult), this.$lookupSearchContainer = e, e.appendTo(this.$lookupContainer), this.$el.attr("aria-expanded", "true")
        },
        closeSearchDropdown: function() {
            this.$lookupSearchContainer && (this.$lookupSearchContainer.remove(), this.$lookupSearchContainer = null), this.$el.attr("aria-expanded", "false"), this.$el.attr("aria-activedescendant", null)
        },
        handleBlur: function(e) {
            var t = e.data;
            window.setTimeout(function() {
                0 === s(e.relatedTarget).closest(".slds-lookup__menu").length && t.$lookupSearchContainer && t.closeSearchDropdown()
            }, 250)
        },
        clickResult: function(e) {
            var t = e.data,
                l = s(this).attr("id");
            t.selectResult(l)
        },
        selectResult: function(s) {
            var e = this.searchResults.filter(function(e) {
                return e.id == s
            });
            this.closeSearchDropdown(), this.isSingle ? (this.selectedResult = e.length > 0 ? e[0] : null, this.setSingleSelect(this.selectedResult.label)) : e.length > 0 && (this.selectedResults.push(e[0]), this.setMultiSelect(this.selectedResults), this.$el.val("")), this.isSingle ? this.settings.onChange(this.selectedResult, !0) : this.settings.onChange(this.selectedResults, !0)
        },
        clearSingleSelect: function(s) {
            var e = s.data;
            e.selectedResult = null, e.setSingleSelect(), e.settings.onChange(selectResult, !1)
        },
        clearMultiSelectResult: function(e) {
            var t, l = e.data,
                i = s(this).closest("span.slds-pill"),
                n = i.attr("id");
            l.selectedResults.forEach(function(s, e) {
                s.id == n && (t = e)
            }), "undefined" != typeof t && null !== t && (l.selectedResults.splice(t, 1), l.setMultiSelect(l.selectedResults), l.settings.onChange(l.selectedResults, !1))
        },
        getSelection: function() {
            return this.isSingle ? this.selectedResult || null : this.selectedResults || null
        },
        setSelection: function(s) {
            var e = this;
            if (!s || "object" != typeof s) throw new Error("setSelection must be called with either a valid result object or an array of result objects.");
            s instanceof Array ? (this.searchResults = s, this.selectedResults = [], s.forEach(function(s) {
                e.selectResult(s.id)
            })) : (this.selectedResult = null, this.searchResults = [s], e.selectResult(s.id))
        }
    }, s.fn.lookup = function(e) {
        var t, l = arguments,
            i = s.extend({
                assetsLocation: s.ccjs.assetsLocation,
                objectPluralLabel: "Objects",
                objectLabel: "Object",
                useImgTag: !1,
                objectIconUrl: "/assets/icons/standard-sprite/svg/symbols.svg#account",
                objectIconClass: "slds-icon-standard-account",
                searchTerm: "",
                items: [],
                emptySearchTermQuery: function(s) {
                    s([])
                },
                filledSearchTermQuery: function(s, e) {
                    e([])
                },
                clickAddFunction: null,
                onChange: function() {},
                initialSelection: null,
                showSearch: !1
            }, "object" == typeof e ? e : {});
        if (this.each(function() {
            var n = s(this),
                a = n.data("ccjs-lookup");
            if (!a) {
                var o = new r(this, i);
                n.data("ccjs-lookup", a = o)
            }
            "string" == typeof e && (t = a[e](l[1], l[2]))
        }), void 0 === t || t instanceof r) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        return t
    }
}(jQuery);