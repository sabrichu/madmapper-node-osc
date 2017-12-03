const osc = require('node-osc');
const oscClient = new osc.Client('127.0.0.1', 8917);

const mathUtils = require('./utils');

const fadeIn = (surfaceNames, speedDenominator = 1000) => {
    let start = 0;
    let fade = setInterval(() => {
        if (start < 1) {
            surfaceNames.forEach((surfaceName) => {
                oscClient.send(`/surfaces/${surfaceName}/opacity`, start);
            });
            start += 1 / speedDenominator;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeOut = (surfaceNames, speedDenominator = 1000) => {
    let start = 1;
    let fade = setInterval(() => {
        if (start >= 0) {
            surfaceNames.forEach((surfaceName) => {
                oscClient.send(`/surfaces/${surfaceName}/opacity`, start);
            });
            start -= 1 / speedDenominator;
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

const resetColorAll = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, 1);
        oscClient.send(`/surfaces/${surfaceName}/green`, 1);
        oscClient.send(`/surfaces/${surfaceName}/blue`, 1);
    });
};

const setRandomColor = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, mathUtils.getRandomFloat());
        oscClient.send(`/surfaces/${surfaceName}/green`, mathUtils.getRandomFloat());
        oscClient.send(`/surfaces/${surfaceName}/blue`, mathUtils.getRandomFloat());
    });
};

const setRandomVisibility = (surfaceNames) => {
    let random = Math.round(Math.random());

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, random);
    });
};

const setRandomOpacity = (surfaceNames) => {
    let random = Math.random();

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

module.exports.fadeInMaster = fadeInMaster;
module.exports.fadeOutMaster = fadeOutMaster;
module.exports.fadeIn = fadeIn;
module.exports.fadeOut = fadeOut;
module.exports.show = show;
module.exports.hide = hide;
module.exports.resetColorAll = resetColorAll;

module.exports.setRandomOpacity = setRandomOpacity;
module.exports.setRandomVisibility = setRandomVisibility;

module.exports.setRandomColor = setRandomColor;
module.exports.setRandomRed = setRandomRed;
module.exports.setRandomGreen = setRandomGreen;
module.exports.setRandomBlue = setRandomBlue;