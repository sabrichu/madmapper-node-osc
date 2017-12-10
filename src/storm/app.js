const madmapper = require('../madmapper');
const keypress = require('keypress');
const tty = require('tty');

let sourceY = -1.9;
let sourceYLimit = 1.9;
let yUnit = 0.25;

let mode = 'inkSink';

let surfaces = {
    'candyMountain': ['candyMountain', 'candySky', 'candyRain1', 'candyRain2'],
    'fireShrum': ['redStorm', 'blueStorm', 'greenStorm', 'fireStorm'],
    'inkSink': ['redSink', 'yellowSink', 'tealSink', 'inkSink']
};

let patternsByKey = {
    '7': {
        patternFunction: () => {
            console.log('--- INK SINK ---')
            mode = 'inkSink';
            madmapper.hide(surfaces.candyMountain);
            madmapper.hide(surfaces.fireShrum);
            madmapper.show(surfaces.inkSink);
        }
    },
    '8': {
        patternFunction: () => {
            console.log('--- FIRE SHRUM ---')
            mode = 'fireShrum';
            madmapper.hide(surfaces.candyMountain);
            madmapper.hide(surfaces.inkSink);
            madmapper.show(surfaces.fireShrum);
        }
    },
    '9': {
        patternFunction: () => {
            console.log('--- CANDY MOUNTAIN ---')
            mode = 'candyMountain';
            madmapper.hide(surfaces.fireShrum);
            madmapper.hide(surfaces.inkSink);
            madmapper.show(surfaces.candyMountain);
        }
    },
    '0': {
        patternFunction: () => {
            console.log('--- ALL OFF ---')
            if (mode === 'fireShrum') {
                madmapper.fadeOut(surfaces.fireShrum);
            } else if (mode === 'inkSink') {
                madmapper.fadeOut(surfaces.inkSink);
            } else if (mode === 'candyMountain') {
                madmapper.fadeOut(surfaces.candyMountain);
            }
        }
    },
    'up': {
        patternFunction: () => {
            console.log('Bleed up');
            sourceY += yUnit;
            if (sourceY >= sourceYLimit) {
                sourceY = sourceYLimit - yUnit;
            }
            madmapper.moveSourceY('fireStorm', sourceY);
            madmapper.moveSourceY('inkSink', sourceY);
            madmapper.moveSourceY('redSink', sourceY);
            madmapper.moveSourceY('yellowSink', sourceY);
            madmapper.moveSourceY('tealSink', sourceY);
        }
    },
    'down': {
        patternFunction: () => {
            console.log('Bleed down');
            sourceY -= yUnit;
            if (sourceY <= -sourceYLimit) {
                sourceY = -sourceYLimit + yUnit;
            }
            madmapper.moveSourceY('fireStorm', sourceY);
            madmapper.moveSourceY('inkSink', sourceY);
            madmapper.moveSourceY('redSink', sourceY);
            madmapper.moveSourceY('yellowSink', sourceY);
            madmapper.moveSourceY('tealSink', sourceY);
        }
    },
    'right': {
        patternFunction: () => {
            console.log('Movie forward');
            // Cloods backward is forward
            madmapper.playBackward('Cloodslooped.mov');
            madmapper.playForward('inklooped-prism-cropped.mov');
        }
    },
    'left': {
        patternFunction: () => {
            console.log('Movie backward');
            madmapper.playForward('Cloodslooped.mov');
            madmapper.playBackward('inklooped-prism-cropped.mov');
        }
    },
    '1': {
        patternFunction: () => {
            if (mode === 'fireShrum') {
                madmapper.fadeOut(['fireStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeOut(['inkSink']);
            }
        }
    },
    '2': {
        patternFunction: () => {
            if (mode === 'fireShrum') {
                madmapper.fadeIn(['fireStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeIn(['inkSink']);
            }
        }
    },
    'q': {
        patternFunction: () => {
            console.log('red down')
            if (mode === 'fireShrum') {
                madmapper.fadeOut(['redStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeOut(['redSink']);
            } else if (mode === 'candyMountain') {
                madmapper.fadeOut(['candyMountain']);
            }
        }
    },
    'w': {
        patternFunction: () => {
            console.log('red up')
            if (mode === 'fireShrum') {
                madmapper.fadeIn(['redStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeIn(['redSink']);
            } else if (mode === 'candyMountain') {
                madmapper.fadeIn(['candyMountain']);
            }
        }
    },
    'a': {
        patternFunction: () => {
            console.log('green down')
            if (mode === 'fireShrum') {
                madmapper.fadeOut(['greenStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeOut(['yellowSink']);
            } else if (mode === 'candyMountain') {
                madmapper.fadeOut(['candyRain1']);
                madmapper.fadeOut(['candyRain2']);
            }
        }
    },
    's': {
        patternFunction: () => {
            console.log('green up')
            if (mode === 'fireShrum') {
                madmapper.fadeIn(['greenStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeIn(['yellowSink']);
            } else if (mode === 'candyMountain') {
                madmapper.fadeIn(['candyRain1']);
                madmapper.fadeIn(['candyRain2']);
            }
        }
    },
    'z': {
        patternFunction: () => {
            console.log('blue down')
            if (mode === 'fireShrum') {
                madmapper.fadeOut(['blueStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeOut(['tealSink']);
            }
        }
    },
    'x': {
        patternFunction: () => {
            console.log('blue up')
            if (mode === 'fireShrum') {
                madmapper.fadeIn(['blueStorm']);
            } else if (mode === 'inkSink') {
                madmapper.fadeIn(['tealSink']);
            }
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
