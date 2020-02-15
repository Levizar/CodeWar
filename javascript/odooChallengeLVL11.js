$(document).ready(function() {
    $('#submit').on('click', function(e) {
        // select le submit
        e.preventDefault(); // Stop les évènements
        if (window.location.search.indexOf('challenge') != -1) {
            debugger;
        }
        pwd = $('#pwd').val(); // prend la valeur de password
        ts = $('#pwd').data('ts') + ''; // prend la valeur des data('ts') sur l'élément password
        stmnt = getBiskuit('X-Odoo'); // "!Odoo - All your applications in one single solution"
        multi = true; // value = 1
        $(ts.substr(0, 5).split('')).each(function(i, j) {
            // ts = "660389164730481475537170" : [6,6,0,3,8]
            multi *= stmnt[parseInt(j) + 1].charCodeAt(0); // multi = 482142375
        });
        if (
            parseInt(pwd.slice(-(--[, , , undefined].join().length))[0]) * parseInt(pwd.slice(0 - -(-1) - -(-(-(-1))) - -(-(-0)))[1]) * stmnt.split('All').length ==
            ts.slice(eval('' + '' + '' + ƒ(1 < 0) + '' + '-' + '' + '' + ƒ(0 < 1) + '-' + ƒ(1 > 0)))
            // -(--([,,,undefined].join()).length) = -2
            // 0 - -(-1) - -(-(-(-1))) - -(-(-0)) = -2
            // pwd.slice(-(--[, , , undefined].join().length))[0]) * parseInt(pwd.slice(0 - -(-1) - -(-(-(-1))) - -(-(-0)))[1] ===> 35
            // pwd.slice(-2) == 57 our 75
            // stmnt.split('All').length = 2
            // eval = -2 ==> ts.slice(-2) == 70
        ) {
            // At this point pwd = ........70
            $.ajax('./70/' + pwd, {
                success: function(o) {
                    // 1,4 == 8214 avec substr ou 821 avec substring
                    // stmnt == Odoo avec substring(2,6)
                    // lastIndexOf === 0 donc commence par 8214
                    // 8214Odoo75
                    0 === pwd.lastIndexOf(multi.toString().substr(1, 4) + stmnt.substring(2, 6), 0) &&
                        $.post('submit', { pwd: o, csrf_token: 'a9fd10d0d2974ca227f5d8718c2ab10afd820ef3o1581785454' }).always(function() {
                            window.location.href = '/jobs/challenge/next';
                        });
                },
                error: function(o) {
                    console.error('To be or not to be... ');
                }
            });
        }
    });
});
