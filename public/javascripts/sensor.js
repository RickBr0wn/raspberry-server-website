let socket = io();
var g = new JustGage({
    id: "bigfella",
    value: 50,
    min: 0,
    max: 50,
    customSectors: {
        length: true,
        ranges: [{
            color: "#ff3b30",
            lo: 0,
            hi: 19
        },
        {
            color: "#f4ff30",
            lo: 20,
            hi: 22
        },
        {
            color: "#27e212",
            lo: 23,
            hi: 26
        },
        {
            color: "#f4ff30",
            lo: 27,
            hi: 29
        },
        {
            color: "#f4ff30",
            lo: 30,
            hi: 50
        }]
    }
});

// When data is 'recieved' do something
socket.on('data', function (val) {
    console.log(val);
    g.refresh(val);
});