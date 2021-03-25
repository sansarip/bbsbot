var synthUtterance = new SpeechSynthesisUtterance();
synthUtterance.voice = window.speechSynthesis.getVoices()[4];

function connect() {
    const socket = new WebSocket('ws://localhost:3000/wyr');
    socket.addEventListener('open', event => {
        socket.send("👋");
    })
    socket.addEventListener('message', event => {
        data = event.data;
        document.getElementById("wyr_text").textContent = data;
        synthUtterance.text = data;
        window.speechSynthesis.speak(synthUtterance);
    })
    let reconnect = () => {
        setTimeout(
            function () {
                connect();
            }, 1000);
    }
    socket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        reconnect();
    };
    socket.onerror = function (err) {
        console.error('Socket encountered error. Reconnect will be attempted in 1 second.', err.message);
        socket.close();
        reconnect();
    };
}

connect()