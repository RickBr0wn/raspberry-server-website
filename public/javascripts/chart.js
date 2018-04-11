// let url = 'mongodb://localhost:27017/homedb';
let url = 'mongodb://RiCK_BROWN:Harry123@ds251988.mlab.com:51988/ds18b20-data';

$(document).ready(function(){
    $.getJSON(url, function(response){
        console.log(response);
    });
});

// When data is 'recieved' do something
socket.on('data', function (val) {
    document.getElementById('chart').innerHTML = val;
});