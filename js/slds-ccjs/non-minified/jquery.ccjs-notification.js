if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(i) {
    i.fn.notification = function(s) {
        i.extend({
            assetsLocation: i.ccjs.assetsLocation
        }, s);
        if (1 === this.length && "string" != typeof s) return this.on("click", '[data-ccjs-dismiss="notification"]', function(s) {
            var t = i(this).closest(".slds-notify");
            t.length > 0 && (t.trigger("dismissed.ccjs.notification"), t.addClass("slds-hide"))
        });
        if ("string" == typeof s) return this.each(function() {
            var t = i(this);
            if (!t.hasClass("slds-notify")) throw new Error("This method can only be run on a notification with the slds-notify class on it");
            "show" === s || "toggle" === s && t.hasClass("slds-hide") ? (t.removeClass("slds-hide"), $notification.trigger("dismissed.ccjs.notification")) : ("dismiss" === s || "toggle" === s && !t.hasClass("slds-hide")) && (t.addClass("slds-hide"), $notification.trigger("shown.ccjs.notification"))
        });
        throw new Error("This plugin can only be run with a selector, or with a command")
    }
}(jQuery);