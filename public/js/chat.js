const socket = io();

socket.on('message', (msg) => {
    console.log(msg);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    const newMessage = e.target.elements.message.value || 'Default';
    e.target.elements.message.value = '';  
    socket.emit('sendMessage', newMessage);
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Browser is not supported for this location');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { coords: {latitude, longitude}} = position;
        
        socket.emit('sendLocation', {latitude, longitude}, () => {
            console.log('Location shared!');
        });
    })
})