const osc = require('node-osc');
const oscClient = new osc.Client('127.0.0.1', 8010);

let surfaceLengths = {
    1: 7,
    2: 12,
    3: 10,
    4: 7,
    5: 5,
    6: 3
};

let surfaceListBySlice = {
    1: ['1-1', '2-1', '3-1', '4-1', '5-1', '6-1'],
    2: ['1-7', '2-6', '2-11', '3-2', '4-7', '5-3'],
    3: ['1-3', '2-7', '3-7', '4-6'],
    4: ['1-2', '2-3', '2-12', '3-6', '3-9', '4-5'],
    5: ['1-4', '2-5', '2-9', '3-5', '3-10', '4-4', '5-4'],
    6: ['1-6', '2-2', '2-10', '3-4', '3-8', '4-3', '5-5', '6-3'],
    7: ['1-5', '2-4', '2-8', '3-3', '4-2', '5-2', '6-2']
};

let numberLevels = 6;

let surfaces = {};
let surfaceListByLevel = {};

for (level in surfaceLengths) {
    let length = surfaceLengths[level];
    surfaceListByLevel[level] = [];

    for (let i = 1; i <= length; i++) {
        let surfaceName = `${level}-${i}`;
        surfaceListByLevel[level].push(surfaceName);
        surfaces[surfaceName] = false;
    }
}

let surfaceList = Object.keys(surfaces);

const getRandomIntInclusive = (max) => (
    Math.floor(Math.random() * (Math.floor(max) + 1)) + 1
);

const getRandomSurface = (level) => {
    if (level) {
        return `${level}-${getRandomIntInclusive(surfaceLengths[level])}`
    }

    let randomLevel = getRandomIntInclusive(numberLevels);

    return `${randomLevel}-${getRandomIntInclusive(surfaceLengths[randomLevel])}`
}

const toggleVisibility = (surfaceNames) => {
    surfaceNames.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, surfaces[surfaceName] ? 1 : 0, function () {
            // console.log(Date.now());
        });

        surfaces[surfaceName] = !surfaces[surfaceName];
    });

};

const resetOpacity = () => {
    surfaceList.forEach((surfaceName) => {
        oscClient.send(`/surfaces/${surfaceName}/opacity`, 1, function () {
            // console.log(Date.now());
        });
    });
};

const resetColor = () => {
    surfaceList.forEach((surfaceName) => {
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

const patterns = {
    random: function() {
        // toggleVisibility('3-1');

        for (level in surfaceLengths) {
            let length = surfaceLengths[level];

            setRandomOpacity([getRandomSurface()]);
            // setRandomRed([getRandomSurface(3), getRandomSurface(3)]);
            // setRandomGreen(surfaceListBySlice[2]);
            // setRandomRed(surfaceListBySlice[3]);
            // setRandomGreen(surfaceListBySlice[4]);
            // setRandomGreen(surfaceListBySlice[6]);
            // toggleVisibility(surfaceListByLevel[level]);
            // setRandomOpacity(surfaceListByLevel[level]);
        }
    }
};

let intervalId = setInterval(patterns.random, 200);
setTimeout(function() {
    clearInterval(intervalId);
    resetColor();
    resetOpacity();
}, 2000);

//Connect to server, Our device
