fs = require('fs');

var numpad = [
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 6, 9]
];

var currentPos = { x: 1, y: 1 };

var code = [];

function applyInstruction(instruction) {
    switch (instruction) {
        case 'U': if (currentPos.y > 0) currentPos.y--; break;
        case 'D': if (currentPos.y < 2) currentPos.y++; break;
        case 'L': if (currentPos.x > 0) currentPos.x--; break;
        case 'R': if (currentPos.x < 2) currentPos.x++; break;    
        default:
            break;
    }
    console.log(currentPos.x + ", " + currentPos.y + " (" + numpad[currentPos.x][currentPos.y] + ")");
}

fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);

    //data = "ULL\nRRDDD\nLURDL\nUUUUD"
    
    var instructions = data.split('\n');
    
    for (var i = 0; i < instructions.length; i++) {
        if (instructions[i].length !== 0) {
            for (var j = 0; j < instructions[i].length; j++) {            
                applyInstruction(instructions[i][j]);
            }
            code.push(numpad[currentPos.x][currentPos.y])
        }
    }

    console.log(code);
});


/*
    not 529811 ??
*/