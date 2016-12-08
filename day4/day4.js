fs = require('fs');

function extractParts(str){
    var expr = /([-a-z]+)-([0-9]+)\[([a-z]{5})\]/g;
    var arr = expr.exec(str);
    return {
        name: arr[1],
        id: arr[2],
        checksum: arr[3]
    }
}

function calculateChecksum(room)

fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);

    data = 'aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]';

    var rooms = data.split('\n');

    var realRooms = [];

    for (var i = 0; i < rooms.length; i++) {        
        if (typeof rooms[i] !== 'undefined') {
            var room = extractParts(rooms[i]);
            console.log(room);
        }
    }
    
});
