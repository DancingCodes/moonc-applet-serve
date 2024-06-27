const config = {
    port: 3001,
    host: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1' : "https://appletapi.moonc.love",
};

module.exports = config;