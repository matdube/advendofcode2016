fs = require('fs');
var cypher = require('./cypher');

function extractParts(str){
    var expr = /([-a-z]+)-([0-9]+)\[([a-z]{5})\]/g;
    var arr = expr.exec(str);
    return {
        name: arr[1],
        id: arr[2],
        checksum: arr[3]
    }
}

function decypher(name, id) {

}

function calculateChecksum(room) {
    var letterCount = {}
    for (var i = 0; i < room.length; i++) {
        var character = room[i];
        if (character !== '-') {
            letterCount[character] = (letterCount[character] || 0) + 1;
        }
    }

    var sortable = [];
    for (var item in letterCount)
        sortable.push([item, letterCount[item]]);

    sortable.sort(function(a, b) {
        if (b[1] === a[1]) {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        }
        return b[1] - a[1] 
    });

    var checksum = [];
    for (var i = 0; i < 5; i++) {
        checksum.push(sortable[i][0]);        
    }
    return checksum.join('');
}



fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);
    
    //data = 'aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]';
    //data = 'aczupnetwp-mfyyj-opalcexpye-977[peyac]\nqzchnzbshud-cxd-trdq-sdrshmf-105[jqexn]\nmolgbzqfib-bdd-mrozexpfkd-289[bdfmo]';
    //data = 'hqcfqwydw-uww-iuhlysui-894[dcqnf]\nmvydjvxodqz-xviyt-rjmfncjk-421[jvdmx]\nfroruixo-hjj-vhuylfhv-569[hfjor]\nfroruixo-hjj-ghyhorsphqw-855[horjf]';

    var rooms = data.split('\n');

    var sumOfIds = 0;

    for (var i = 0; i < rooms.length; i++) {        
        if (typeof rooms[i] !== 'undefined') {
            var room = extractParts(rooms[i]);
            var checksum = calculateChecksum(room.name);
            if (room.checksum == calculateChecksum(room.name)) {
                sumOfIds = sumOfIds + parseInt(room.id);
            }
        }
    }

    console.log(sumOfIds);
    
});
