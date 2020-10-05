module.exports = function flatPagesConfig(config, initialValue = {}, initialCounter = 0) {
    let counter = initialCounter;
    return config.children.reduce((acc, value) => {
        if (value.href) {
            acc[value.href] = value;
            acc[value.href].index = counter++;
        }
        if (value.children) {
            acc = flatPagesConfig(value, acc, counter);
        }
        return acc;
    }, initialValue);
};
