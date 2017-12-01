const patterns = require('./patterns');
const madmapper = require('./madmapper');

function partial(func) {
    let args = Array.prototype.slice.call(arguments, 1);

    return function() {
        let allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

let patternSchedule = [
    {
        patternSetup: () => {
            madmapper.hideAll();
        },
        patternFunction: partial(patterns.randomVisibilityAndColor, {
            speed: 100
        }),
        previousPatternDuration: 0
    },
    {
        patternFunction: partial(patterns.randomOpacity, {
            speed: 100,
            surfaceOptions: {
                sliceLimit: 3
            }
        }),
        previousPatternDuration: 5000
    },
    {
        patternFunction: partial(patterns.randomOpacity, {
            speed: 100,
            surfaceOptions: {
                levelLimit: 2
            }
        }),
        previousPatternDuration: 1000
    },
    {
        patternFunction: partial(patterns.randomOpacity, {
            speed: 100,
            surfaceOptions: {
                levelLimit: 1
            }
        }),
        previousPatternDuration: 1000
    }
];

let currentPattern = null;
let patternIndex = 0;

const setPatterns = (pattern) => {
    if (pattern) {
        setTimeout(() => {
            console.log(pattern);

            patterns.clearPattern(currentPattern, pattern.patternSetup);
            currentPattern = pattern.patternFunction();

            // Surprised this doesn't throw an indexing error. Node thing?
            setPatterns(patternSchedule[patternIndex++]);
        }, pattern.previousPatternDuration);
    }
};

setPatterns(patternSchedule[patternIndex]);
