const surfaceConstants = require('./surfaces');
const madmapper = require('./madmapper');

const clearPattern = (intervalId) => {
    clearInterval(intervalId);
    madmapper.resetColor();
    madmapper.resetOpacity();
};

const applyEffectsToSurfaces = (effects = [], {effectOptions = {}, surfaceOptions = {}}) => {
    let {levelLimit, sliceLimit, numberSurfaces = 1} = surfaceOptions;
    let surfaces = [];

    for (let i = 0; i < numberSurfaces; i++) {
        surfaces.push(
            surfaceConstants.getRandomSurface({
                level: levelLimit,
                slice: sliceLimit
            })
        );
    }

    effects.forEach((effect) => {
        effect(surfaces);
    });
};

const patterns = {
    randomVisibility: (options = {}) => {
        let {speed} = options;
        let intervalId = setInterval(() => {
            applyEffectsToSurfaces([madmapper.setRandomVisibility], options);
        }, speed);

        return intervalId;
    },
    randomVisibilityAndColor: (options = {}) => {
        let {speed} = options;

        let intervalId = setInterval(() => {
            applyEffectsToSurfaces([
                madmapper.setRandomVisibility,
                madmapper.setRandomColor
            ], options);
        }, speed);

        return intervalId;
    },
    randomOpacity: (options = {}) => {
        let {speed} = options;
        let intervalId = setInterval(() => {
            applyEffectsToSurfaces([madmapper.setRandomOpacity], options);
        }, speed);

        return intervalId;
    },
    randomOpacityAndColor: (options = {}) => {
        let {speed} = options;
        let intervalId = setInterval(() => {
            applyEffectsToSurfaces([
                madmapper.setRandomOpacity,
                madmapper.setRandomColor
            ], options);
        }, speed);

        return intervalId;
    },
    randomColor: (options = {}) => {
        let {speed} = options;
        let intervalId = setInterval(() => {
            applyEffectsToSurfaces([madmapper.setRandomColor], options);
        }, speed);

        return intervalId;
    }
};

module.exports = patterns;
module.exports.clearPattern = clearPattern;
