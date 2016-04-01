if ("undefined" == typeof jQuery.ccjs) throw new Error("Please include the ccjs initializer file");
! function(e) {
    e.fn.pill = function(i) {
        e.extend({
            assetsLocation: e.ccjs.assetsLocation
        }, i);
        if (1 === this.length) return this.on("click", '[data-ccjs-dismiss="pill"]', function(i) {
            var n = e(this).closest(".slds-pill");
            n.length > 0 && (n.trigger("dismissed.ccjs.pill"), n.remove())
        });
        throw new Error("This plugin can only be run with a selector targeting one container (e.g., 'body')")
    }
}(jQuery);