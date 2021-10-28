let iframe;

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'interactive') {
        iframe = document.getElementById('frame');
        iframe.onload = function () {
            console.log(iframe.contentDocument);
        };
    }
});

window.addEventListener('message', function (message) {
    iframe.contentWindow.postMessage(message.data, '*');
});
