const surfaces = require('./surfaces');
const madmapper = require('./madmapper');

const clearPattern = (intervalId) => {
    clearInterval(intervalId);
    madmapper.resetColor();
    madmapper.resetOpacity();
};

const patterns = {
    random: (numberSurfaces, speed) => {
        let intervalId = setInterval(() => {
            for (let i = 0; i < numberSurfaces; i++) {
                madmapper.setRandomOpacity([surfaces.getRandomSurface()]);
            }
        }, speed);

        return intervalId;
    }
};

module.exports = patterns;
module.exports.clearPattern = clearPattern;
