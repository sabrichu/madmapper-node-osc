const madmapper = require('../madmapper');
const patterns = require('./patterns');
const keypress = require('keypress');
const tty = require('tty');

let currentPattern = null;

let patternsByKey = {
    'right': () => {
        madmapper.fadeInAll();
    },
    'left': () => {
        madmapper.fadeOutAll();
    },
    'q': () => {
        return patterns.pulseFromCenter({
            speed: 100
        });
    },
    'w': () => {
        // madmapper.hideAll();
        return patterns.aroundTheWorld({
            speed: 100
        });
    },
    'e': () => {
        madmapper.hideAll();

        return patterns.randomShow({
            speed: 100
        });
    }
};

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);
    if (key && key.ctrl && key.name == 'c') {
        process.exit();
    }
    if (patternsByKey[key.name]) {
        patterns.clearPattern(currentPattern)
        currentPattern = patternsByKey[key.name]();
    }
});

if (typeof process.stdin.setRawMode == 'function') {
    process.stdin.setRawMode(true);
} else {
    tty.setRawMode(true);
}
process.stdin.resume();


function partial(func) {
    let args = Array.prototype.slice.call(arguments, 1);

    return function() {
        let allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

let patternSchedule = [
    // {
    //     patternFunction: partial(patterns.pulseFromCenter, {
    //         speed: 100
    //     }),
    //     duration: 5000
    // },
    // {
    //     patternFunction: partial(patterns.aroundTheWorld, {
    //         speed: 100
    //     }),
    //     duration: 4000
    // },
    // {
    //     patternFunction: partial(patterns.randomShow, {
    //         speed: 6000
    //     }),
    //     duration: 4000
    // },
    {
        patternSetup: () => {
            madmapper.hideAll();
        },
        patternFunction: partial(patterns.randomShow, {
            speed: 2000
        }),
        duration: 20000
    },
    {
        patternFunction: partial(patterns.randomShow, {
            speed: 1000
        }),
        duration: 10000
    },
    {
        patternFunction: partial(patterns.randomShow, {
            speed: 100
        }),
        duration: 5000
    },
    {
        patternFunction: partial(patterns.randomVisibilityAndColor, {
            speed: 100
        }),
        duration: 5000
    },
    {
        patternFunction: partial(patterns.randomOpacity, {
            speed: 100,
            surfaceOptions: {
                sliceLimit: 3
            }
        }),
        duration: 1000
    },
    {
        patternFunction: partial(patterns.randomOpacity, {
            speed: 100,
            surfaceOptions: {
                levelLimit: 2
            }
        }),
        duration: 1000
    },
    {
        patternFunction: partial(patterns.randomOpacity, {
            speed: 100,
            surfaceOptions: {
                levelLimit: 1
            }
        }),
        duration: 1000
    }
];

// let currentPattern = null;
let patternIndex = 0;

// XXX: Loop whole thing

const setPatterns = (pattern) => {
    if (pattern) {
        setTimeout(() => {
            console.log('change pattern');

            patterns.clearPattern(currentPattern, pattern.patternSetup);
            currentPattern = pattern.patternFunction();

            patternIndex++;
            // Surprised this doesn't throw an indexing error. Node thing?
            setPatterns(patternSchedule[patternIndex]);
        // Look at the duration set on previous pattern to set timeout (confusing but makes the scheduler easier to understand)
        }, patternIndex === 0 ? 0 : patternSchedule[patternIndex - 1].duration);
    }
};

// setPatterns(patternSchedule[patternIndex]);
