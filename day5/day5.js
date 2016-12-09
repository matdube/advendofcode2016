var crypto = require('crypto');


function md5(data) {
    return crypto.createHash("md5").update(data).digest("hex");
}

var input = 'wtnhxymk';

var password = ['', '', '', '', '', '' ,'', ''];
var i = 0;


for(var j=0; j < 8; j++) {
    
    var found = false;

    while (!found) {
        i++;
        var x = md5(input + i)
        if (x.substring(0,5) === '00000') {
            var position = x[5];
            if (position.match(/^[0-7]$/)) {
                if (password[position] === '') {
                    found = true;
                    password[position] = x[6];
                    console.log(input+i + " -> " + x);
                }
            }
        }
    }

}

console.log(password);