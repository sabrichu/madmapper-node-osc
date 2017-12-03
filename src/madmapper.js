const osc = require('node-osc');
const oscClient = new osc.Client('127.0.0.1', 8917);
const oscServer = new osc.Server(8918, '127.0.0.1');

// oscServer.on('message', function(msg, rinfo) {
//     console.log("TUIO message:");
//     console.log(msg);
// });

const mathUtils = require('./utils');

const fadeIn = (surfaceNames, maxOpacity = 1) => {
    let start = 0;
    let fade = setInterval(() => {
        if (start < maxOpacity) {
            surfaceNames.forEach((surfaceName) => {
                oscClient.send(`/surfaces/${surfaceName}/opacity`, start);
            });
            start += maxOpacity / 1000;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeOut = (surfaceNames, maxOpacity = 1) => {
    let start = maxOpacity;
    let fade = setInterval(() => {
        if (start >= 0) {
            surfaceNames.forEach((surfaceName) => {
                oscClient.send(`/surfaces/${surfaceName}/opacity`, start);
            });
            start -= maxOpacity / 1000;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeInMaster = (speedDenominator = 1000) => {
    let start = 0;
    let fade = setInterval(() => {
        if (start < 1) {
            oscClient.send('master/fade_to_black', start);
            start += 1 / speedDenominator;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeOutMaster = (speedDenominator = 1000) => {
    let start = 1;
    let fade = setInterval(() => {
        if (start >= 0) {
            oscClient.send('master/fade_to_black', start);
            start -= 1 / speedDenominator;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const show = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, 1);
    });
};

const hide = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, 0);
    });
};

const resetColor = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        // oscClient.send(`/getValues?url=/surfaces/${surfaceName}/red&normalized=1`);
        oscClient.send(`/surfaces/${surfaceName}/red`, 1);
        oscClient.send(`/surfaces/${surfaceName}/green`, 1);
        oscClient.send(`/surfaces/${surfaceName}/blue`, 1);
    });
};

const setRed = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, 1);
        oscClient.send(`/surfaces/${surfaceName}/green`, 0);
        oscClient.send(`/surfaces/${surfaceName}/blue`, 0);
    });
};

const setBlue = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, 0);
        oscClient.send(`/surfaces/${surfaceName}/green`, 0);
        oscClient.send(`/surfaces/${surfaceName}/blue`, 1);
    });
};

const setGreen = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, 0);
        oscClient.send(`/surfaces/${surfaceName}/green`, 1);
        oscClient.send(`/surfaces/${surfaceName}/blue`, 0);
    });
};

const setRandomColor = (surfaceNames) => {
    let red = mathUtils.getRandomFloat();
    let green = mathUtils.getRandomFloat();
    let blue = mathUtils.getRandomFloat();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, red);
        oscClient.send(`/surfaces/${surfaceName}/green`, green);
        oscClient.send(`/surfaces/${surfaceName}/blue`, blue);
    });
};

const setRandomVisibility = (surfaceNames) => {
    let random = Math.round(Math.random());

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, random);
    });
};

const setRandomOpacity = (surfaceNames, minimum = 0) => {
    let random = mathUtils.getRandomFloat(minimum);

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, random);
    });
};

const setRandomRed = (surfaceNames) => {
    let random = Math.random();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, random);
    });
};

const setRandomGreen = (surfaceNames) => {
    let random = Math.random();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/green`, random);
    });
};

const setRandomBlue = (surfaceNames) => {
    let random = Math.random();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/blue`, random);
    });
};

const playForward = (mediaName) => {
    oscClient.send(`/medias/${mediaName}/play_forward`, 1);
    oscClient.send(`/medias/${mediaName}/play_backward`, 0);
};

const playBackward = (mediaName) => {
    oscClient.send(`/medias/${mediaName}/play_backward`, 1);
    oscClient.send(`/medias/${mediaName}/play_forward`, 0);
};

module.exports.fadeInMaster = fadeInMaster;
module.exports.fadeOutMaster = fadeOutMaster;
module.exports.fadeIn = fadeIn;
module.exports.fadeOut = fadeOut;
module.exports.show = show;
module.exports.hide = hide;

module.exports.resetColor = resetColor;
module.exports.setRed = setRed;
module.exports.setGreen = setGreen;
module.exports.setBlue = setBlue;
module.exports.setRandomColor = setRandomColor;
module.exports.setRandomRed = setRandomRed;
module.exports.setRandomGreen = setRandomGreen;
module.exports.setRandomBlue = setRandomBlue;

module.exports.setRandomOpacity = setRandomOpacity;
module.exports.setRandomVisibility = setRandomVisibility;

module.exports.playForward = playForward;
module.exports.playBackward = playBackward;
