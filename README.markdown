ObjectExtractor is a jQuery plugin analyzes a piece of Html and creates an object based on certain data attributes in the markup.

== Quick Example ==

    <div id="person" class="person">
        <h1 data-property="name">Scott Williams</h1>
        <h2 data-property="email">scott@example.com</h2>
        <span data-property="age" data-value="30"></span>
    </div>

    var people = $('#person').extractObjects();
    people.name(); // Scott Williams
    people.name('Dave'); // name is now 'Dave'

ObjectExtractor will look for the `data-property` attribute on elements and turn them into getter and setter methods on the object.

