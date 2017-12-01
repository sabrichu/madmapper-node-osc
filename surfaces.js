let numberSurfacesByLevel = {
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

// Not sure this is needed...
let surfaces = {};
let surfaceListByLevel = {};

for (level in numberSurfacesByLevel) {
    surfaceListByLevel[level] = [];

    for (let i = 1; i <= numberSurfacesByLevel[level]; i++) {
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
        return `${level}-${getRandomIntInclusive(numberSurfacesByLevel[level])}`
    }

    let randomLevel = getRandomIntInclusive(numberLevels);

    return `${randomLevel}-${getRandomIntInclusive(numberSurfacesByLevel[randomLevel])}`
};

module.exports.surfaces = surfaces;
module.exports.numberSurfacesByLevel = numberSurfacesByLevel;
module.exports.surfaceList = surfaceList;
module.exports.surfaceListByLevel = surfaceListByLevel;
module.exports.surfaceListBySlice = surfaceListBySlice;
module.exports.numberLevels = numberLevels;
module.exports.getRandomSurface = getRandomSurface;
