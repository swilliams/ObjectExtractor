var E = function() {

    var proto = {
        val: null,
        $elem: null,
        update: function(val) {
            var that = this;
            if (that.$elem === null) {
                // error
                return;
            }
            that.val = val;
            if (that.$elem.is('[data-value]')) {
                that.$elem.attr('data-value', val);
            } else {
                that.$elem.text(val);
            }
        },
        beget: function(val, $elem) {
            var obj = Object.create(this);
            obj.val = val;
            obj.$elem = $elem;
            return obj;
        }
    };

    function extractSubElements($elem, obj, name) {
        var objects = $elem.extractObjects();
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
    }

    return {
        createSetter: function($elem, obj, name) {
            // The value is the data-value property or the text of the element.
            // The data-value takes precedence because it would have been explicitly set.
            var val = $elem.is('[data-value]') ? $elem.attr('data-value') : $elem.text(),
                hiddenField = name + '_',
                target = proto.beget(val, $elem);
            
            obj[hiddenField] = target;
            obj[name] = function() {
                if (arguments.length > 0) {
                    obj[hiddenField].update(arguments[0]);
                }
                return obj[hiddenField].val;
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
                    extractSubElements($elem, obj, name);
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

