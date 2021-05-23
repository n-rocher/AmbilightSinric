require('dotenv').config();

const { SinricPro, SinricProActions, raiseEvent, eventNames } = require("sinricpro");

const appKey = process.env.SINRIC_KEY
const secretKey = process.env.SINRIC_SECRET
const device1 = process.env.SINRIC_DEVICE

const deviceId = [device1]

const AMBILIGHT_IP = process.env.HYPER_IP
const AMBILIGHT_PORT = process.env.HYPER_PORT

var WebSocketClient = require('websocket').client
var client = new WebSocketClient()

client.connect(`ws://${AMBILIGHT_IP}:${AMBILIGHT_PORT}/`);

let HYPERHDR_SOCKET = null

client.on("connect", connection => {
    HYPERHDR_SOCKET = connection
    connection.send(JSON.stringify({ "command": "authorize", "tan": 1, "subcommand": "adminRequired" }))
})

function sendToHyperHDR(data) {
    if (!HYPERHDR_SOCKET.connected) {
        client.connect(`ws://${AMBILIGHT_IP}:${AMBILIGHT_PORT}/`);
    }

    HYPERHDR_SOCKET.send(JSON.stringify(data))
}

function setPowerState(deviceid, data) {
    console.log("setPowerState", data)
    const status = data === "On"

    if (status) start()
    else stop()

    sendToHyperHDR({ "command": "clear", "tan": 1, "priority": 1 })
    return true
}

function setBrightness(deviceId, data) {
    console.log("setBrightness", data)
    start()
    if (data) {
        sendToHyperHDR({ "command": "adjustment", "tan": 1, "adjustment": { "brightness": data } })
    } else {
        sendToHyperHDR({ "command": "clear", "tan": 1, "priority": 1 })
        sendToHyperHDR({ "command": "sourceselect", "tan": 1, "priority": 1 })
    }
    return true
}

function setColor(deviceId, data) {
    console.log("setColor", data)
    start()
    if (data) {
        if (data.r === data.g && data.g === data.b && data.b === 128) {
            sendToHyperHDR({ "command": "clear", "tan": 1, "priority": 1 })
            sendToHyperHDR({ "command": "sourceselect", "tan": 1, "priority": 1 })
        } else {
            sendToHyperHDR({ "command": "sourceselect", "tan": 1, "priority": 1 })
            sendToHyperHDR({
                "command": "color",
                "tan": 1,
                "color": [data.r, data.g, data.b],
                "priority": 1,
                "duration": 0,
                "origin": "Web Configuration"
            })
        }
    } else {
        sendToHyperHDR({
            "command": "sourceselect",
            "tan": 1,
            "priority": 240
        })
    }
    return true
}

function setColorTemperature(deviceId, data) {
    console.log("setColorTemperature", data)
    start()
    data = colorTemperatureToRGB(data)
    sendToHyperHDR({
        "command": "color",
        "tan": 1,
        "color": [data.r, data.g, data.b],
        "priority": 1,
        "duration": 0,
        "origin": "Web Configuration"
    })
    return true
}


function start() {
    sendToHyperHDR({
        "command": "componentstate",
        "componentstate": {
            "component": "V4L",
            "state": true
        }
    })

    sendToHyperHDR({
        "command": "componentstate",
        "componentstate": {
            "component": "LEDDEVICE",
            "state": true
        }
    })
}

function stop() {
    sendToHyperHDR({
        "command": "componentstate",
        "componentstate": {
            "component": "LEDDEVICE",
            "state": false
        }
    })
}

function colorTemperatureToRGB(kelvin) {
    var temp = kelvin / 100;
    var red, green, blue;
    if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
        blue = 255;
    }

    return {
        r: clamp(red, 0, 255),
        g: clamp(green, 0, 255),
        b: clamp(blue, 0, 255)
    }
}

function clamp(x, min, max) {
    if (x < min) { return min; }
    if (x > max) { return max; }

    return Math.round(x);
}

function initiate() {
    let sinricpro = new SinricPro(appKey, deviceId, secretKey, false);

    SinricProActions(sinricpro, {
        setPowerState,
        setBrightness,
        setColor,
        setColorTemperature
    })

    sinricpro.on("error", _ => {})

    sinricpro.on("close", _ => {
        console.info("[INFO] Close event")
        sinricpro = null
        setTimeout(initiate, 2000)
    })

    sinricpro.on("open", _ => {
        console.info("[INFO] Open event")

        setTimeout(_ => {
            raiseEvent(sinricpro, eventNames.powerState, device1, { state: "On" });
        }, 1000)

    })

}

initiate()