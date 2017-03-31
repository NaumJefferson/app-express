var socketIO = require('socket.io');
var io = null;

module.exports = function(server){
    io = socketIO(server);

    io.on('connection', function (socket) {
        socket.on('disconnect', function () {
            
            
        });
    });
}

