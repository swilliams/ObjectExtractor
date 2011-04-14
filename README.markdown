ObjectExtractor is a jQuery plugin that analyzes a piece of Html and creates an object based on certain data attributes in the markup.

# Quick Example #

    <div id="person" class="person">
        <h1 data-property="name">Scott Williams</h1>
        <h2 data-property="email">scott@example.com</h2>
        <span data-property="age" data-value="30"></span>
    </div>

    var people = $('#person').extractObjects();
    people[0].name(); // Scott Williams
    people[0].name('Dave'); // name is now 'Dave'

ObjectExtractor will look for the `data-property` attribute on elements and turn them into getter and setter methods on the object. The value of the property will be the text of the element unless a `data-value` attribute is specified (the reason being is that this is more explicity).

## Recursive Parsing ##

If an element has child elements that also have the `data-property` element, ObjectExtractor will recursively parse those elements and add them as properties on the parent. For example:

### Example ###

    <div id="person" class="person">
        <div class="address" data-property="address">
            <span data-property="street">12345 E Fake st</span>
            <span data-property="city">Fakesville</span>
            <span data-property="state">AZ</span>
            <span id="zip" data-property="zip">12345</span>
        </div>
    </div>

The resulting object will look like this:

    var person = {
        address { 
            street: "12345 E Fake st",
            city: "Fakesville",
            state: "AZ",
            zip: "12345"
        }
    }

    person.address.state; // "AZ"

## Arrays ##
ObjectExtractor will recursively process child elements, and create an array if appropriate. An array is determined similarly to the nested elements, but if two or more sibling elements have the same `data-property` value, an array will be created for them.

### Example ###
    
    <div id="person" class="person">
        <h1 data-property="name">Scott Williams</h1>
        <div id="addresses" data-property="addresses">
            <div class="address" data-property="address">
                <!-- snip -->
            </div>
            <div class="address" data-property="address">
                <!-- snip -->
            </div>
        </div>
    </div>

    var person = {
        name: "Scott Williams",
        addresses: {
            address: [
                { street: "12345..." }, { street: "other street..." }
            ]
        }
    }

    person.addresses.address[0].street; // "12345..."

The syntax might be a little confusing, but it does allow for other properties to be on the `addresses` parent object.

## Setter ##

When the setter is called, the appropriate DOM element is called. Again, if the element as a `data-value` attribute, that will be set, otherwise the element text will be updated.

## Todos ##
 - Needs more testing.


