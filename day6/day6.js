fs = require('fs');

var letterCount = [];

function registerCode(code) {
    for (var i = 0; i < code.length; i++) {
        var letter = code[i];

        if (!(i in letterCount))
            letterCount[i] = {};

        if (letter in letterCount[i]) {
            letterCount[i][letter].count++;

        } else {
            letterCount[i][letter] = { count: 1 }
        }
    }
}

function findMaxCount(hash) {
    var max = 0;
    var letter = '';
    for(var key in hash) {
        if (hash[key].count > max) {
            max =hash[key].count;
            letter = key; 
        }
    }
    return letter;
}

fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);
    
    //data = 'eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar';
    //data = 'eedadn\needadx';

    var codes = data.split('\n');
    for (var i = 0; i < codes.length; i++) {        
        if (typeof codes[i] !== 'undefined') {
            registerCode(codes[i]);
        }
    }

    for(var i = 0; i < 8; i++) {
        console.log(i + ": " + findMaxCount(letterCount[i]));
    }

    console.log(letterCount);
});
