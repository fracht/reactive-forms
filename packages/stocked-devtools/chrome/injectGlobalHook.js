/// <reference types="chrome" />

const extensionId = chrome.runtime.id;

const bridgeScript = `window.__STOCKED_DEVTOOLS_HOOK = {
    raiseEvent: function (e, data) {
        window.postMessage({
            event: e,
            data,
            extensionId: "${extensionId}"
        });
    }
};`;

function injectScript(code) {
    const script = document.createElement('script');
    script.textContent = code;

    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
}

window.addEventListener('message', function ({ source, data }) {
    if (source !== window || !data) {
        return;
    }

    if (data.extensionId !== extensionId) {
        return;
    }

    console.log('message sent');

    chrome.runtime.sendMessage(extensionId, data);
});

injectScript(bridgeScript);
