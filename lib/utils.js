export let isLoop = true;

export function callDraw() {

    window.requestAnimationFrame(() => {
        if (isLoop) {
            draw()

        } 
        callDraw()
    })
}

export function loop() {
    isLoop = true;
}

export function noLoop() {
    isLoop = false;
}

export function getRadiansFromDegrees(angle) {
    return angle * Math.PI / 180;
}

export function getRadians(angle) {
    if (window.ANGLE_MODE === window.RADIANS) {
        return angle;
    } else {
        return getRadiansFromDegrees(angle);
    }
}

export function canvasSetup(canvas) {
    window.width = canvas.width;
    window.height = canvas.height;
    window.context.fillStyle = "white";
}

export function getColor(...color) {
    if (color.length === 4 || color.length === 3) {
        return `rgba(${color.join(", ")})`;
    }
    if (color.length === 1 || color.length === 2) {
        const [color1, alpha] = color;
        if (typeof color1 === "string") {
            if(color1.startsWith("#") && alpha != undefined) {
                return color1 + Number(alpha * 255).toString(16);
            }
            return color1;
        }
        const finalColor = [color1, color1, color1]
        if (alpha !== undefined) {
            finalColor.push(alpha);
        }
        return `rgba(${finalColor.join(", ")})`
    }
}