/*
by Sam LeBlanc 
https://github.com/scleblanc/
https://saml.codes/
This is podcastware. Check out the latest episode of Under One Thousand and leave an honest review. Or not.
Be a lot cooler if you did, though: 
https://open.spotify.com/show/3sEBxLmQvXrF2FOtGJnroY
*/

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
}, 5000); // change the time to fine-tune performance vs delay
