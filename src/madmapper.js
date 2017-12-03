const osc = require('node-osc');
const oscClient = new osc.Client('127.0.0.1', 8010);

const mathUtils = require('./utils');

const fadeIn = (surfaceNames) => {
    let start = 0;
    let fade = setInterval(() => {
        if (start < 1) {
            surfaceNames.forEach((surfaceName) => {
                oscClient.send(`/surfaces/${surfaceName}/opacity`, start);
            });
            start += 0.001;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeOut = (surfaceNames) => {
    let start = 1;
    let fade = setInterval(() => {
        if (start >= 0) {
            surfaceNames.forEach((surfaceName) => {
                oscClient.send(`/surfaces/${surfaceName}/opacity`, start);
            });
            start -= 0.001;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeInAll = () => {
    let start = 0;
    let fade = setInterval(() => {
        if (start < 1) {
            oscClient.send('master/fadeToBlack', start);
            start += 0.001;
        } else {
            clearInterval(fade);
        }
    }, 0);
};

const fadeOutAll = () => {
    let start = 1;
    let fade = setInterval(() => {
        if (start >= 0) {
            oscClient.send('master/fadeToBlack', start);
            start -= 0.001;
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

const showAll = () => {
    oscClient.send('master/fadeToBlack', 1);
};

const hideAll = () => {
    oscClient.send('master/fadeToBlack', 0);
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

module.exports.fadeInAll = fadeInAll;
module.exports.fadeOutAll = fadeOutAll;
module.exports.fadeIn = fadeIn;
module.exports.fadeOut = fadeOut;
module.exports.showAll = showAll;
module.exports.hideAll = hideAll;
module.exports.show = show;
module.exports.hide = hide;
module.exports.resetColorAll = resetColorAll;

module.exports.setRandomOpacity = setRandomOpacity;
module.exports.setRandomVisibility = setRandomVisibility;

module.exports.setRandomColor = setRandomColor;
module.exports.setRandomRed = setRandomRed;
module.exports.setRandomGreen = setRandomGreen;
module.exports.setRandomBlue = setRandomBlue;