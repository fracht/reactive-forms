let iframe;

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'interactive') {
        iframe = document.getElementById('frame');
    }
});

window.addEventListener('message', function (message) {
    iframe.contentWindow.postMessage(message.data, '*');
});
