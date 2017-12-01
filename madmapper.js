const osc = require('node-osc');
const oscClient = new osc.Client('127.0.0.1', 8010);

const surfaces = require('./surfaces');

const toggleVisibility = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, surfaces.surfaces[surfaceName] ? 1 : 0, function () {
            // console.log(Date.now());
        });

        surfaces.surfaces[surfaceName] = !surfaces.surfaces[surfaceName];
    });

};

const resetOpacity = () => {
    surfaces.surfaceList.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, 1, function () {
            // console.log(Date.now());
        });
    });
};

const resetColor = () => {
    surfaces.surfaceList.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, 1, function () {
            // console.log(Date.now());
        });
        oscClient.send(`/surfaces/${surfaceName}/green`, 1, function () {
            // console.log(Date.now());
        });
        oscClient.send(`/surfaces/${surfaceName}/blue`, 1, function () {
            // console.log(Date.now());
        });
    });
};

const setRandomOpacity = (surfaceNames) => {
    let random = Math.random();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, random, function () {
            // console.log(Date.now());
        });
    });
};

const setRandomRed = (surfaceNames) => {
    let random = Math.random();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/red`, random, function () {
            // console.log(Date.now());
        });
    });
};

const setRandomGreen = (surfaceNames) => {
    let random = Math.random();

    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/green`, random, function () {
            // console.log(Date.now());
        });
    });
};

module.exports.toggleVisibility = toggleVisibility;
module.exports.resetOpacity = resetOpacity;
module.exports.resetColor = resetColor;
module.exports.setRandomOpacity = setRandomOpacity;
module.exports.setRandomRed = setRandomRed;
module.exports.setRandomGreen = setRandomGreen;