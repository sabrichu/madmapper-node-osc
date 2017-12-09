const madmapper = require('../madmapper');
const keypress = require('keypress');
const tty = require('tty');

let sourceY = -1.9;
let sourceYLimit = 1.9;
let yUnit = 0.02;

let patternsByKey = {
    '9': {
        patternFunction: () => {
            console.log('--- FIRE SHRUM ---')
            madmapper.fadeOut(['candyMountain', 'candySky']);
            madmapper.fadeIn(['redStorm', 'blueStorm', 'greenStorm', 'fireStorm']);
        }
    },
    '0': {
        patternFunction: () => {
            console.log('--- CANDY MOUNTAIN ---')
            madmapper.fadeOut(['redStorm', 'blueStorm', 'greenStorm', 'fireStorm']);
            madmapper.fadeIn(['candyMountain', 'candySky']);
        }
    },
    'up': {
        patternFunction: () => {
            console.log('Storm triangle up');
            sourceY += yUnit;
            if (sourceY >= sourceYLimit) {
                sourceY = sourceYLimit - yUnit;
            }
            madmapper.moveSourceY('fireStorm', sourceY);
        }
    },
    'down': {
        patternFunction: () => {
            console.log('Storm triangle down');
            sourceY -= yUnit;
            if (sourceY <= -sourceYLimit) {
                sourceY = -sourceYLimit + yUnit;
            }
            madmapper.moveSourceY('fireStorm', sourceY);
        }
    },
    'right': {
        patternFunction: () => {
            console.log('Storm forward');
            // Cloods backward is forward
            madmapper.playBackward('Cloodslooped.mov');
        }
    },
    'left': {
        patternFunction: () => {
            console.log('Storm backward');
            madmapper.playForward('Cloodslooped.mov');
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
            console.log('red down')
            madmapper.fadeOut(['redStorm']);
        }
    },
    'w': {
        patternFunction: () => {
            console.log('red up')
            madmapper.fadeIn(['redStorm']);
        }
    },
    'a': {
        patternFunction: () => {
            console.log('green down')
            madmapper.fadeOut(['greenStorm']);
        }
    },
    's': {
        patternFunction: () => {
            console.log('green up')
            madmapper.fadeIn(['greenStorm']);
        }
    },
    'z': {
        patternFunction: () => {
            console.log('blue down')
            madmapper.fadeOut(['blueStorm']);
        }
    },
    'x': {
        patternFunction: () => {
            console.log('blue up')
            madmapper.fadeIn(['blueStorm']);
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
