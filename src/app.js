const patterns = require('./patterns');

// let currentPattern = patterns.randomOpacity({
//     speed: 100,
//     surfaceOptions: {
//         sliceLimit: 1
//     }
// });
function partial(func) {
    let args = Array.prototype.slice.call(arguments, 1);

    return function() {
        let allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}
let currentPattern = null;
let pattern1 = partial(patterns.randomVisibilityAndColor, {
    speed: 100
});
let pattern2 = partial(patterns.randomOpacity, {
    speed: 100,
    surfaceOptions: {
        levelLimit: 3
    }
});
let pattern3 = partial(patterns.randomOpacity, {
    speed: 100,
    surfaceOptions: {
        levelLimit: 2
    }
});
let pattern4 = partial(patterns.randomOpacity, {
    speed: 100,
    surfaceOptions: {
        levelLimit: 1
    }
});

const setNewPattern = (pattern, time, nextPattern) => {
    setTimeout(() => {
        patterns.clearPattern(currentPattern);
        currentPattern = pattern();

        if (typeof nextPattern === 'function') {
            nextPattern();
        }
    }, time);
};

currentPattern = pattern1();

setNewPattern(
    pattern2,
    1000,
    () => {
        setNewPattern(
            pattern3,
            1000,
            () => {
                setNewPattern(
                    pattern4,
                    1000
                );
            }
        )
    }
);

// setTimeout(() => {
//     patterns.clearPattern(currentPattern);

//     currentPattern = patterns.randomOpacity({
//         speed: 100,
//         surfaceOptions: {
//             levelLimit: 1
//         }
//     });


//     setTimeout(() => {
//         patterns.clearPattern(currentPattern);

//     }, 5000);
// }, 5000);
