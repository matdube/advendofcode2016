fs = require('fs');

function makeCandidate(s){
    return s.trim().split(/\s+/).map(x=>parseInt(x));
}

function isTriangle(arr) {
    var sorted = arr.sort((a, b) => a - b); 
    return (sorted[0] + sorted[1] > sorted[2]);
}

fs.readFile('input2.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);

    var lines = data.split('\n');

    var possibleTriangles = 0;

    for (var i = 0; i < lines.length; i++) {        
        if (typeof lines[i] !== 'undefined') {
            var candidate = makeCandidate(lines[i]);
            if (isTriangle(candidate)) {
                possibleTriangles++;
            }
        }
    }
    console.log("Total count: " + lines.length);
    console.log(possibleTriangles);
});
