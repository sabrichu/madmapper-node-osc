const surfaceConstants = require('./surfaces');
const madmapper = require('./madmapper');

const clearPattern = (intervalId, cleanupTasks = () => null) => {
    clearInterval(intervalId);
    cleanupTasks();
};

const applyEffectsToRandomSurfaces = (effects = [], {effectOptions = {}, surfaceOptions = {}}) => {
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
        applyEffectsToRandomSurfaces([madmapper.setRandomVisibility], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.setRandomVisibility], options);
        }, speed);

        return intervalId;
    },
    randomShow: (options = {}) => {
        let {speed} = options;
        applyEffectsToRandomSurfaces([madmapper.show], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.show], options);
        }, speed);

        return intervalId;
    },
    randomVisibilityAndColor: (options = {}) => {
        let {speed} = options;
        applyEffectsToRandomSurfaces([madmapper.setRandomVisibility, madmapper.setRandomColor], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.setRandomVisibility, madmapper.setRandomColor], options);
        }, speed);

        return intervalId;
    },
    randomOpacity: (options = {}) => {
        let {speed} = options;
        applyEffectsToRandomSurfaces([madmapper.setRandomOpacity], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.setRandomOpacity], options);
        }, speed);

        return intervalId;
    },
    randomOpacityAndColor: (options = {}) => {
        let {speed} = options;
        applyEffectsToRandomSurfaces([madmapper.setRandomOpacity, madmapper.setRandomColor], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.setRandomOpacity, madmapper.setRandomColor], options);
        }, speed);

        return intervalId;
    },
    randomColor: (options = {}) => {
        let {speed} = options;
        applyEffectsToRandomSurfaces([madmapper.setRandomColor], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.setRandomColor], options);
        }, speed);

        return intervalId;
    }
};

module.exports = patterns;
module.exports.clearPattern = clearPattern;
