let socket = io();
var g = new JustGage({
    id: "bigfella",
    value: 50,
    min: 0,
    max: 40,
    title: "Visitors"
});

// When data is 'recieved' do something
socket.on('data', function (val) {
    console.log(val);
    g.refresh(val);
});