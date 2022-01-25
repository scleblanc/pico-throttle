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
