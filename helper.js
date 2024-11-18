
const { URL } = require('url');

const stringIsAValidUrl = (s, protocols) => {
    try {
        const url = new URL(s);
        return protocols
            ? url.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(url.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
};

module.exports = {
    stringIsAValidUrl
}
