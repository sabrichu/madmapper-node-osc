const patterns = require('./patterns');

let intervalId = patterns.random(5, 200);

setTimeout(() => {
    patterns.clearPattern(intervalId);
}, 5000);
