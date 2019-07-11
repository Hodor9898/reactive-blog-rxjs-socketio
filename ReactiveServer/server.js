const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/node_modules', require('express').static(__dirname + '/node_modules'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    io.emit('user-connected');

    socket.on('new-post', (p) => {
        console.log('new pst', p)
        io.emit('new-post', p)
    })

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
