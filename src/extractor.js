var E = {
    createSetter: function($elem, obj, name) {
        var val = $elem.is('[data-value]') ? $elem.attr('data-value') : $elem.text(),
            hiddenField = name + '_';
        obj[hiddenField] = val;
        obj[name] = function() {
            if (arguments.length > 0) {
                obj[hiddenField] = arguments[0];
            }
            return obj[hiddenField];
        }
    },

    extract: function($target) {
        var obj = {},
            that = this;
        $target.children('[data-property]').each(function(i, n) {
            var $elem = $(n);
            that.createSetter($elem, obj, $(n).attr('data-property'));
        });
        return obj;
    }
};

(function($){
    $.fn.extractObject = function() {
  
        var objects = [];
        // create the object from every object in the thing
        this.each(function() {
            var obj = E.extract($(this));
            objects.push(obj);
        });
        return objects;
    };
})(jQuery);

