fs = require('fs');

var numpad = [
    [' ', ' ', '5', ' ', ' '],
    [' ', '2', '6', 'A', ' '],
    ['1', '3', '7', 'B', 'D'],
    [' ', '4', '8', 'C', ' '],
    [' ', ' ', '9', ' ', ' ']
];

var currentPos = { x: 0, y: 2 };

var code = [];

function impossible(pos) {
    return numpad[pos.x][pos.y] === ' ';
}

function applyInstruction(instruction) {
    var pos = { x: currentPos.x, y: currentPos.y };
    switch (instruction) {
        case 'U': if (pos.y > 0) pos.y--; break;
        case 'D': if (pos.y < 4) pos.y++; break;
        case 'L': if (pos.x > 0) pos.x--; break;
        case 'R': if (pos.x < 4) pos.x++; break;    
        default:
            break;
    }

    if (!impossible(pos))
        currentPos = pos;

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
            console.log("-");
            code.push(numpad[currentPos.x][currentPos.y])
        }
    }

    console.log(code);
});