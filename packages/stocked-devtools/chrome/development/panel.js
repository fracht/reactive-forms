let isLoaded = false;
let devPanel;

const notifyGlobalHoook = () => {
    if (isLoaded) {
        chrome.devtools.inspectedWindow.eval('window.__STOCKED_DEVTOOLS_HOOK.onLoad();');
        if (devPanel) {
            devPanel.postMessage({ event: 'refresh' });
        }
    }
};

chrome.devtools.panels.create('Stocked dev tools', '', './development/index.html', function (panel) {
    panel.onShown.addListener((panelWindow) => {
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (sender.id === chrome.runtime.id && message?.type !== 'internal') {
                panelWindow.postMessage(message);
            }
        });

        isLoaded = true;
        notifyGlobalHoook();
        devPanel = panelWindow;

        chrome.runtime.sendMessage(chrome.runtime.id, 'loaded');
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.id === chrome.runtime.id && message?.type === 'internal' && message?.event === 'load') {
        notifyGlobalHoook();
    }
});
