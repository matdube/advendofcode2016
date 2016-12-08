fs = require('fs');

var firstSecondVisit;
var visitedPlaces = [];

function turnLeft(originalStatus) {    
    
    return {
        position: originalStatus.position,
        direction: (originalStatus.direction === 0) ? 3 : (originalStatus.direction - 1)
    }
}

function turnRight(originalStatus) {    
    return {
        position: originalStatus.position,
        direction: (originalStatus.direction === 3) ? 0 : (originalStatus.direction + 1)
    }
}

function move(originalStatus, length) {
    var s = originalStatus;
    for (var i = 0; i < length; i++) {
        s = moveOne(s);
        registerVisit(s.position);
    }
    return s;
}

function moveOne(originalStatus) {
    var x = 0; 
    var y = 0; 
    switch (originalStatus.direction) {
        case 0: y--; break;
        case 1: x++; break;
        case 2: y++; break;
        case 3: x--; break;    
        default:
            break;
    }    
    return {
        position: { x: originalStatus.position.x + x, y: originalStatus.position.y + y}, 
        direction: originalStatus.direction
    }    
}


function applyInstruction(originalStatus, instruction) {
    var s = originalStatus;
    s = (instruction[0] === 'R') ? turnRight(s) : turnLeft(s);
    s = move(s, instruction.substring(1));    
    return s;    
}

function alreadyVisitedPlace(visitedPlaces, position) {
    for (var i = 0; i < visitedPlaces.length; i++) {
        if (visitedPlaces[i].x === position.x && visitedPlaces[i].y === position.y) {
            return true;
        }
    }
    return false;
}

function registerVisit(position) {
    if (alreadyVisitedPlace(visitedPlaces, position)) {
        if (typeof firstSecondVisit === 'undefined') {
            firstSecondVisit = position;
        }
    } else {
        visitedPlaces.push(position);
    }
}

fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);

    var instructions = data.split(', ');

    var status = { 
        position: { x: 0, y: 0 },
        direction: 0 //North
    };

    for (var i = 0; i < instructions.length; i++) {
        status = applyInstruction(status,  instructions[i]);
    }

    var distanceFromOrigin = Math.abs(status.position.x) + Math.abs(status.position.y);
    console.log("Final Distance = " + distanceFromOrigin);

    console.log("First Visited Twice = " + firstSecondVisit.x + ", " + firstSecondVisit.y);
    console.log("    Distance = " + (Math.abs(firstSecondVisit.x) + Math.abs(firstSecondVisit.y)));
});


/*
    Directions 0=N, 1=E, 2=S, 3=W
    Position origin={x:0, y:0}
*/