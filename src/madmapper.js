const osc = require('node-osc');
const oscClient = new osc.Client('127.0.0.1', 8010);

const surfaceConstants = require('./surfaces');

const resetOpacity = (opacity = 1) => {
    surfaceConstants.surfaceList.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, opacity);
    });
};

const resetColor = () => {
    surfaceConstants.surfaceList.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, 1);
        oscClient.send(`/surfaces/${surfaceName}/green`, 1);
        oscClient.send(`/surfaces/${surfaceName}/blue`, 1);
    });
};

const getRandomColorValue = () => (
    Math.random() * 0.5 + 0.5
);

const setRandomColor = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, getRandomColorValue());
        oscClient.send(`/surfaces/${surfaceName}/green`, getRandomColorValue());
        oscClient.send(`/surfaces/${surfaceName}/blue`, getRandomColorValue());
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

module.exports.resetOpacity = resetOpacity;
module.exports.resetColor = resetColor;
module.exports.setRandomOpacity = setRandomOpacity;
module.exports.setRandomVisibility = setRandomVisibility;
module.exports.setRandomColor = setRandomColor;
module.exports.setRandomRed = setRandomRed;
module.exports.setRandomGreen = setRandomGreen;
module.exports.setRandomBlue = setRandomBlue;