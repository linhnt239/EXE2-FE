/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const settings = {
    env: {},
    devIndicators: {
        autoPrerender: false,
    },
};

module.exports = settings;
