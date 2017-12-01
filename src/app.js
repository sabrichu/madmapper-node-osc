const patterns = require('./patterns');

// let currentPattern = patterns.randomOpacity({
//     speed: 100,
//     surfaceOptions: {
//         sliceLimit: 1
//     }
// });

let rrentPattern = patterns.randomVisibilityAndColor({
    speed: 100
});

// let anotherPattern = patterns.randomOpacity({
//     speed: 100,
//     surfaceOptions: {
//         levelLimit: 1
//     }
// });

setTimeout(() => {
    // patterns.clearPattern(currentPattern);

    // currentPattern = patterns.randomToggle(1000);
}, 5000);
