'use strict'
module.exports = {
    devServer: {
        proxy: process.env.VUE_APP_API_ENDPOINT,
    }
}