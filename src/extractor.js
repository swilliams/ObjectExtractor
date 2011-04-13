var E = {
    extract: function($target) {
        var obj = {};
        $target.children('[data-property]').each(function(i, n) {
            var $elem = $(n),
                val = $elem.is('[data-value]') ? $elem.attr('data-value') : $elem.text();

            obj[$(n).attr('data-property')] = val;
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

