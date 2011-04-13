var E = function() {

    return {
        createSetter: function($elem, obj, name) {
            // The value is the data-value property or the text of the element.
            // The data-value takes precedence because it would have been explicitly set.
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
            // if there are no data-properties just return null
            if ($target.children('[data-property]').length === 0) {
                return null;
            }
            $target.children('[data-property]').each(function(i, n) {
                var $elem = $(n),
                    name = $elem.attr('data-property');
                // If the element is a node, recursively extract it.
                if ($elem.children('[data-property]').length > 0) {
                    objects = $elem.extractObjects();
                    if (obj[name] === undefined) {
                        obj[name] = objects.length === 1 ? objects[0] : objects;
                    } else {
                        if (obj[name] instanceof Array) {
                            obj[name].push(objects[0]);
                        } else {
                            var tmp = obj[name]
                            obj[name] = [tmp, objects[0]];
                        }
                    }
                } else {
                
                    that.createSetter($elem, obj, name);
                }
            });
            return obj;
        }
    };
}();

(function($){
    $.fn.extractObjects = function() {
  
        var objects = [];
        // create the object from every object in the thing
        this.each(function() {
            var obj = E.extract($(this));
            objects.push(obj);
        });
        return objects;
    };
})(jQuery);

