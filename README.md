# pico-throttle
Script for throttling Pico initialization, to improve performance and PSI scores.

```
var controller = new AbortController();
// wait for user input before loading Pico
var picoDetector = setInterval(function(){
    if (window.pico != undefined) {
        console.log('pico loaded!');
        ["mousedown", "mousemove", "touchstart", "keydown", "scroll"].forEach(function(e) {
            window.addEventListener(e, function(){
                window.pico('visit', pageInfo);
                console.log('firing visit.');
                controller.abort();
            }, { signal: controller.signal });
        });
        clearInterval(picoDetector);
    } else { console.log('waiting for pico...') }
}, 5000);
```

Per pico docs, it's necessary to manually create the data structures for `pageInfo` -- here's an example in twig:

```
<script defer>
var pageInfo = {
	article: {{ post.type == 'post' ? "true" : "false" }},
	post_id: "{{ post.type }}-{{ post.id }}",
	post_type: "{{ post.type }}",
	taxonomies: { categories: [
        {% for term in post.terms %}
            "{{ term.slug }}"{% if not(loop.last) %},{% endif %}
        {% endfor %}
    ]},
	url: window.location.href
};

var controller = new AbortController();
// wait for user input before loading Pico
var picoDetector = setInterval(function(){
    if (window.pico != undefined) {
        console.log('pico loaded!');
        ["mousedown", "mousemove", "touchstart", "keydown", "scroll"].forEach(function(e) {
            window.addEventListener(e, function(){
                window.pico('visit', pageInfo);
                console.log('firing visit.');
                controller.abort();
            }, { signal: controller.signal });
        });
        clearInterval(picoDetector);
    } else { console.log('waiting for pico...') }
}, 5000);

</script>
```

This does cause a slight delay in Pico initialization when a user is looking at the page, but hey, nothing's perfect. The PSI improvements should be worth it.

## License

This is podcastware. It'd be cool if you checked out the [latest episode of Under One Thousand](https://open.spotify.com/episode/1QbZEu5H4QGFkvualpYGM8) and left an honest review, but you don't have to. Just don't use it for evil.
