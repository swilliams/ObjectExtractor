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

It will recursively process child elements, and create an array if appropriate.

## Todos ##
 - Needs more testing.
 - Bind the property on the object so that when it changes, the markup associated with it changes too.


