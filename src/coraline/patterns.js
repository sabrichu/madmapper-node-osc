const madmapper = require('../madmapper');
const surfaceConstants = require('./surfaces');

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

const applyEffectsToLevel = (effects = [], level) => {
    effects.forEach((effect) => {
        effect(surfaceConstants.surfaceListByLevel[level]);
    });
};

const applyEffectsToSlice = (effects = [], slice) => {
    effects.forEach((effect) => {
        effect(surfaceConstants.surfaceListBySlice[slice]);
    });
};

const patterns = {
    aroundTheWorld: (options = {}) => {
        let {speed} = options;
        let slice = 1;

        // madmapper.hide(surfaceConstants.surfaceList);
        applyEffectsToSlice([madmapper.setRandomOpacity, madmapper.setRandomColor], slice);

        let intervalId = setInterval(() => {
            // madmapper.hide(surfaceConstants.surfaceList);
            slice++;
            if (slice > surfaceConstants.numberSlices) {
                slice = 1;
            }
            applyEffectsToSlice([madmapper.setRandomOpacity, madmapper.setRandomColor], slice);

        }, speed);

        return intervalId;
    },
    pulseFromCenter: (options = {}) => {
        let {speed} = options;
        let level = 1;

        madmapper.hide(surfaceConstants.surfaceList);
        applyEffectsToLevel([madmapper.show], level);

        let intervalId = setInterval(() => {
            madmapper.hide(surfaceConstants.surfaceList);
            applyEffectsToLevel([madmapper.show], level++);

            if (level > surfaceConstants.numberLevels) {
                level = 1;
            }
        }, speed);

        return intervalId;
    },

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
        applyEffectsToRandomSurfaces([madmapper.fadeIn], options);
        let intervalId = setInterval(() => {
            applyEffectsToRandomSurfaces([madmapper.fadeIn], options);
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
