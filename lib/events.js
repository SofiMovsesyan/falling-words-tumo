import { callDraw } from "./utils";


window.addEventListener("load", () => {
    window.preload && preload();
    setup();
    window.START_TIME = Date.now();
    callDraw();
})

// if (typeof keyTyped !== "undefined") {
    window.addEventListener("keypress", (event) => {
        window.key = event.key;
        keyTyped();
    })
// }

    window.addEventListener("click", (event) => {

        mousePressed();
    })
