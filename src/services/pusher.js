import Vue from 'vue'

import Pusher from 'pusher-js'; 
Vue.use(require('vue-pusher'), {
    api_key: '0c9a84e4b8eec1fa3344',
    options: {
        cluster: 'ap2',
        encrypted: true,
    }
});

export default {
    bind: function () {
        var channel = this.$pusher.subscribe('reviews');
        channel.bind('review_added', (log) => {
            console.log(log);
        });
    }
};