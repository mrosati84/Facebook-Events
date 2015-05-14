(function() {
    var searchEventsForm = document.getElementById('search-events-form'),
        events = document.getElementById('events'),
        tplEventsSource = document.getElementById('tpl-events').innerHTML,
        tplEvents = Handlebars.compile(tplEventsSource);

    searchEventsForm.addEventListener('submit', function(ev) {
        ev.preventDefault();

        var searchEventsName = document.getElementById('s').value;

        FB.api('/search/?q=' + searchEventsName + '&type=event', function(response) {
            console.log(response);
            events.innerHTML = tplEvents(response);
        });

        console.log(searchEventsName.value);
    });
}());
