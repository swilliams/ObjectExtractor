(function($){
    $.fn.extractObject = function() {
  
        var objects = [];
        // create the object from every object in the thing
        this.each(function() {
            var $this = $(this),
                obj = {};
            $this.children('[data-property]').each(function(i, n) {
                var $elem = $(n),
                    val = $elem.is('[data-value]') ? $elem.attr('data-value') : $elem.text();

                obj[$(n).attr('data-property')] = val;
            });
            
            objects.push(obj);
        });
        return objects;
    };
})(jQuery);

