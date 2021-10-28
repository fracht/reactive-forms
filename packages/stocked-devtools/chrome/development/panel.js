chrome.devtools.panels.create('Stocked dev tools', '', './development/index.html', function (panel) {
    panel.onShown.addListener((panelWindow) => {
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (sender.id === chrome.runtime.id) {
                panelWindow.postMessage(message);
            }
        });
    });
    // do nothing
});
