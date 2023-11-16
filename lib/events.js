import { callDraw } from "./utils";


window.addEventListener("load", () => {
    window.preload && preload();
    setup()
    callDraw()
})