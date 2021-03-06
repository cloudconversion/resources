if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
if ("undefined" == typeof moment) throw new Error("The ccjs datepicker plugin requires moment.js");
! function(e) {
    var t = '<div class="slds-dropdown slds-dropdown--left slds-datepicker" aria-hidden="false" data-selection="single"><div class="slds-datepicker__filter slds-grid"><div class="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4"><div class="slds-align-middle"><button id="ccjs-prevButton" class="slds-button slds-button--icon-container"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--small"><use xlink:href="{{assetsLocation}}/assets/icons/utility-sprite/svg/symbols.svg#left"></use><i class="fa fa-fw"></i></svg><span class="slds-assistive-text">Previous Month</span></button></div><h2 id="month" class="slds-align-middle" aria-live="assertive" aria-atomic="true"></h2><div class="slds-align-middle"><button id="ccjs-nextButton" class="slds-button slds-button--icon-container"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--small"><use xlink:href="{{assetsLocation}}/assets/icons/utility-sprite/svg/symbols.svg#right"></use></svg><span class="slds-assistive-text">Next Month</span></button></div></div><div class="slds-form-element"><div class="slds-form-element__control"><div class="slds-picklist datepicker__filter--year slds-shrink-none"></div></div></div></div>',
        a = '<table class="datepicker__month" role="grid" aria-labelledby="month"><thead><tr id="weekdays"><th id="Sunday"><abbr title="Sunday">S</abbr></th><th id="Monday"><abbr title="Monday">M</abbr></th><th id="Tuesday"><abbr title="Tuesday">T</abbr></th><th id="Wednesday"><abbr title="Wednesday">W</abbr></th><th id="Thursday"><abbr title="Thursday">T</abbr></th><th id="Friday"><abbr title="Friday">F</abbr></th><th id="Saturday"><abbr title="Saturday">S</abbr></th></tr></thead><tbody></tbody></table></div>',
        s = function(s, l) {
            this.$el = e(s);
            var i = moment(l.initDate) || moment(),
                n = l.endDateInputId;
            this.$datepickerEl = e(t.replace(/{{assetsLocation}}/g, l.assetsLocation) + a), this.settings = l, l.initDate && this.setSelectedFullDate(i), n && 1 === e("#" + n).length && (this.$elEndDate = e("#" + n), l.endDate && this.setEndFullDate(endDate)), this.initInteractivity()
        };
    s.prototype = {
        constructor: s,
        initInteractivity: function() {
            var t = this,
                a = this.$datepickerEl,
                s = this.$el,
                l = this.$elEndDate || [],
                i = function(i) {
                    if (i.stopPropagation(), e("[data-ccjs-datepicker-id]").not(this).each(function() {
                        e(this).data("datepicker").closeDatepicker()
                    }), i.target === s[0] && null !== s.val() && "" !== s.val() || i.target === l[0] && null !== l.val() && "" !== l.val()) t.$selectedInput = e(this).parent().find("input"), t.$selectedInput.on("keyup", t, t.processKeyup).on("blur", t, t.processBlur), t.closeDatepicker();
                    else {
                        var n = t.selectedFullDate || moment();
                        t.viewedMonth = n.month(), t.viewedYear = n.year(), t.fillMonth(), t.$selectedInput = e(this).parent().find("input"), t.$selectedInput.off("keyup").off("blur"), t.$selectedInput.closest(".slds-form-element").append(a), t.initYearDropdown(), e([s, a, l, s.prev("svg")]).each(function() {
                            e(this).on("click", t.blockClose)
                        }), a.on("click", t, t.processClick), t.$selectedInput.blur(), e("body").on("click", t, t.closeDatepicker)
                    }
                };
            e(s).on("focus", i), e(s.prev("svg")).on("click", i), s.prev("svg").css("cursor", "pointer"), l.length > 0 && (e(l).on("focus", i), e(l.prev("svg")).on("click", i), l.prev("svg").css("cursor", "pointer"))
        },
        fillMonth: function() {
            var t = this.settings.dayLabels,
                a = this.getMonthArray(),
                s = e("<tbody>"),
                l = this.$elEndDate && this.$elEndDate.length > 0;
            this.selectedFullDate, this.selectedEndDate;
            a.forEach(function(a) {
                var i = e("<tr>").appendTo(s);
                a.hasMultiRowSelection && i.addClass("slds-has-multi-row-selection"), a.data.forEach(function(a, s) {
                    var n = e('<td data-ccjs-date="' + a.dateValue + '">').appendTo(i);
                    n.prop({
                        headers: t[s].full,
                        role: "gridcell"
                    }), e('<span class="slds-day">' + a.value + "</span>").appendTo(n), a.isCurrentMonth || (n.addClass("slds-disabled-text"), n.prop("aria-disabled", "true")), a.isSelected || a.isSelectedEndDate || a.isSelectedMulti ? (n.prop("aria-selected", "true"), n.addClass(l ? "slds-is-selected-multi slds-is-selected" : "slds-is-selected")) : n.prop("aria-selected", "false"), a.isToday && n.addClass("slds-is-today")
                })
            }), this.$datepickerEl.find("tbody").replaceWith(s), this.$datepickerEl.find("#month").text(this.settings.monthLabels[this.viewedMonth].full), this.$datepickerEl.find("#ccjs-year").text(this.viewedYear)
        },
        initYearDropdown: function() {
            var t = this,
                a = this.$datepickerEl.find("select"),
                s = this.viewedYear;
            if (a.length > 0) a.val(this.viewedYear);
            else {
                var l = e("<label></label>");
                a = e('<select class="slds-select select picklist__label">').appendTo(l);
                for (var i = moment().year(), n = i - this.settings.numYearsBefore; n <= i + this.settings.numYearsAfter; n++) {
                    e('<option value="' + n + '">' + n + "</option>").appendTo(a)
                }
                a.val(s), this.$datepickerEl.find(".datepicker__filter--year").append(l)
            }
            a.on("change", function(a) {
                t.viewedYear = e(a.target).val(), t.fillMonth()
            })
        },
        getMMDDYYYY: function(e, t, a) {
            return (e > 9 ? e : "0" + e) + "/" + (t > 9 ? t : "0" + t) + "/" + a
        },
        getMonthArray: function() {
            for (var e = this.selectedFullDate, t = this.selectedEndDate, a = (e ? e.date() : null, e ? e.month() : null, e ? e.year() : null, this.viewedMonth), s = this.viewedYear, l = 0 === a ? 11 : a - 1, i = 11 === a ? 0 : a + 1, n = this.getNumDaysInMonth(s, a), d = this.getNumDaysInMonth(s, l), r = (this.getNumDaysInMonth(s, i), new Date(s, a, 1).getDay()), o = [], c = [], u = (this.dayLabels, d - (r - 1)); d >= u; u++) {
                var h = moment(new Date(11 === l ? s - 1 : s, l, u));
                o.push({
                    value: u,
                    dateValue: this.getMMDDYYYY(l + 1, u, s),
                    isCurrentMonth: !1,
                    isToday: h.isSame(moment(), "day")
                })
            }
            for (var u = 1; n >= u; u++) {
                var h = moment(new Date(s, a, u));
                o.push({
                    value: u,
                    dateValue: this.getMMDDYYYY(a + 1, u, s),
                    isCurrentMonth: !0,
                    isSelected: e && h.isSame(e, "day"),
                    isSelectedEndDate: t && h.isSame(t, "day"),
                    isSelectedMulti: e && t && (h.isBetween(e, t) || h.isSame(e, "day") || h.isSame(t, "day")),
                    isToday: h.isSame(moment(), "day")
                })
            }
            if (o.forEach(function(e, t, a) {
                if (t % 7 === 0) {
                    var s = t >= 7 && a[t - 1].isSelectedMulti && e.isSelectedMulti;
                    s && (c[c.length - 1].hasMultiRowSelection = !0), c.push({
                        data: [],
                        hasMultiRowSelection: s
                    })
                }
                c[c.length - 1].data.push(e)
            }), c[c.length - 1].data.length < 7)
                for (var h = moment(new Date(0 === i ? s + 1 : s, i, u)), f = 7 - c[c.length - 1].data.length, u = 1; f >= u; u++) c[c.length - 1].data.push({
                    value: u,
                    dateValue: this.getMMDDYYYY(i + 1, u, 0 === i ? s + 1 : s),
                    isCurrentMonth: !1,
                    isSelected: e && h.isSame(e, "day"),
                    isToday: h.isSame(moment(), "day")
                });
            return c
        },
        setSelectedFullDate: function(e) {
            var t = this.selectedFullDate;
            this.selectedFullDate = e, this.$el.val(e.format(this.settings.format)), t && t.isSame(e, "day") || this.settings.onChange(this)
        },
        setSelectedEndDate: function(e) {
            var t = this.selectedEndDate;
            this.selectedEndDate = e, this.$elEndDate.val(e.format(this.settings.format)), t && t.isSame(e, "day") || this.settings.onChange(this)
        },
        processClick: function(t) {
            t.preventDefault();
            var a = t.data,
                s = e(t.target);
            s.closest("#ccjs-prevButton").length > 0 && a.clickPrev(t), s.closest("#ccjs-nextButton").length > 0 && a.clickNext(t), s.closest("td[data-ccjs-date]").length > 0 && a.clickDate(t), s.closest("li[data-ccjs-year]").length > 0 && a.clickYear(t)
        },
        processKeyup: function(t) {
            13 === t.keyCode && e(this).blur()
        },
        processBlur: function(t) {
            if (t) {
                var a = t.data,
                    s = e(this).val(),
                    l = moment(s, a.settings.format);
                l.isValid() && (a.$elEndDate && a.$elEndDate.length > 0 && a.$elEndDate[0] === a.$selectedInput[0] ? a.setSelectedEndDate(l) : a.setSelectedFullDate(l), a.closeDatepicker(t), a.$selectedInput.off("keyup").off("blur"))
            }
        },
        clickPrev: function(e) {
            var t = e.data;
            0 === t.viewedMonth ? (t.viewedMonth = 11, t.viewedYear--) : t.viewedMonth--, t.fillMonth()
        },
        clickNext: function(e) {
            var t = e.data;
            11 === t.viewedMonth ? (t.viewedMonth = 0, t.viewedYear++) : t.viewedMonth++, t.fillMonth()
        },
        clickYear: function(t) {
            var a = t.data,
                s = e(t.target).closest("li[data-ccjs-year]");
            a.viewedYear = parseInt(s.data("ccjs-year")), a.fillMonth()
        },
        clickYearDropdown: function(e) {
            var t = e.data;
            t.$datepickerEl.find("#ccjs-yearDropdown").length > 0 ? t.hideYearDropdown() : t.showYearDropdown()
        },
        clickDate: function(t) {
            var a = t.data,
                s = e(t.target).closest("td[data-ccjs-date]");
            if (!s.hasClass("slds-disabled-text")) {
                var l = s.data("ccjs-date");
                a.$elEndDate && a.$elEndDate.length > 0 && a.$elEndDate[0] === a.$selectedInput[0] ? a.setSelectedEndDate(moment(l, "MM/DD/YYYY")) : a.setSelectedFullDate(moment(l, "MM/DD/YYYY")), a.closeDatepicker(t)
            }
        },
        closeDatepicker: function(t) {
            var a = this,
                s = e("body");
            t && (a = t.data, s = e(this));
            var l = a.$datepickerEl,
                i = a.$selectedInput;
            0 === s.closest(a.$el.parent()).length && i && (i.closest(".slds-form-element").find(".slds-datepicker").remove(), e("body").unbind("click", a.closeDatepicker), l.unbind("click", a.processClick))
        },
        blockClose: function(e) {
            e.stopPropagation()
        },
        isLeapYear: function(e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        },
        getNumDaysInMonth: function(e, t) {
            return [31, this.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        getDate: function(e) {
            return e ? this.selectedFullDate.format(e) : this.selectedFullDate
        },
        setDate: function(e) {
            this.setSelectedFullDate(moment(e))
        },
        getEndDate: function(e) {
            return this.$elEndDate && this.selectedEndDate ? e ? this.selectedEndDate.format(e) : this.selectedEndDate : void 0
        },
        setEndDate: function(e) {
            this.$elEndDate && this.setSelectedEndDate(moment(e))
        }
    }, e.fn.datepicker = function(t, a) {
        var l, i = e.extend({
            assetsLocation: e.ccjs.assetsLocation,
            numYearsBefore: 50,
            numYearsAfter: 10,
            format: "MM/DD/YYYY",
            endDateInputId: null,
            onChange: function(e) {},
            dayLabels: [{
                full: "Sunday",
                abbv: "S"
            }, {
                full: "Monday",
                abbv: "M"
            }, {
                full: "Tuesday",
                abbv: "T"
            }, {
                full: "Wednesday",
                abbv: "W"
            }, {
                full: "Thursday",
                abbv: "T"
            }, {
                full: "Friday",
                abbv: "F"
            }, {
                full: "Saturday",
                abbv: "S"
            }],
            monthLabels: [{
                full: "January",
                abbv: ""
            }, {
                full: "February",
                abbv: ""
            }, {
                full: "March",
                abbv: ""
            }, {
                full: "April",
                abbv: ""
            }, {
                full: "May",
                abbv: ""
            }, {
                full: "June",
                abbv: ""
            }, {
                full: "July",
                abbv: ""
            }, {
                full: "August",
                abbv: ""
            }, {
                full: "September",
                abbv: ""
            }, {
                full: "October",
                abbv: ""
            }, {
                full: "November",
                abbv: ""
            }, {
                full: "December",
                abbv: ""
            }]
        }, "object" == typeof t ? t : {});
        if (this.each(function() {
            var n = e(this),
                d = n.data("datepicker");
            if (!d) {
                var r = new s(this, i);
                n.data("datepicker", d = r), n.attr("data-ccjs-datepicker-id", n.attr("id"))
            }
            "string" == typeof t && (l = d[t](a))
        }), void 0 === l || l instanceof s) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        return l
    }
}(jQuery);