const getRandomFloat = (min = 0, max = 1) => (
    Math.random() * (max - min) + min
);

const getRandomIntInclusive = (max) => (
    Math.floor(Math.random() * (Math.floor(max) + 1)) + 1
);

module.exports.getRandomFloat = getRandomFloat;
module.exports.getRandomIntInclusive = getRandomIntInclusive;
