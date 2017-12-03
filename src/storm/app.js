const madmapper = require('../madmapper');
const keypress = require('keypress');
const tty = require('tty');

let patternsByKey = {
    'right': {
        patternFunction: () => {
            madmapper.playForward('Cloodslooped.mov');
        }
    },
    'left': {
        patternFunction: () => {
            madmapper.playBackward('Cloodslooped.mov');
        }
    },
    '1': {
        patternFunction: () => {
            madmapper.fadeOut(['fireStorm']);
        }
    },
    '2': {
        patternFunction: () => {
            madmapper.fadeIn(['fireStorm']);
        }
    },
    'q': {
        patternFunction: () => {
            madmapper.fadeOut(['redStorm'], 0.7);
        }
    },
    'w': {
        patternFunction: () => {
            madmapper.fadeIn(['redStorm'], 0.7);
        }
    },
    'a': {
        patternFunction: () => {
            madmapper.fadeOut(['greenStorm'], 0.7);
        }
    },
    's': {
        patternFunction: () => {
            madmapper.fadeIn(['greenStorm'], 0.7);
        }
    },
    'z': {
        patternFunction: () => {
            madmapper.fadeOut(['blueStorm'], 0.7);
        }
    },
    'x': {
        patternFunction: () => {
            madmapper.fadeIn(['blueStorm'], 0.7);
        }
    }
};

// Make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.exit();
    }
    let input = ch || key;
    let inputName = typeof input === 'string' ? input : input.name;
    console.log(inputName);
    if (patternsByKey[inputName]) {
        patternsByKey[inputName].patternFunction();
    }
});

if (typeof process.stdin.setRawMode == 'function') {
    process.stdin.setRawMode(true);
} else {
    tty.setRawMode(true);
}
process.stdin.resume();
