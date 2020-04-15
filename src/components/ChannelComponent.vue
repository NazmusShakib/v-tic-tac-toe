<script>
  import Pusher from 'pusher-js'
  const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
    encrypted: true,
    authEndpoint: process.env.VUE_APP_API_ENDPOINT + '/pusher/auth',
    auth: {
      params: { icon: 'foo-bar' },
    }
  })

  export default ({
    getPresenceID () {
      let getQueryString = (field, url) => {
        let href = url ? url : window.location.href
        let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
        let string = reg.exec(href)
        return string ? string[1] : null
      }
      let id = getQueryString('id')
      id = 'presence-' + id
      return id
    },
    subscribeToPusher () {
      let presenceid = this.getPresenceID()
      let channel = pusher.subscribe(presenceid)
      return channel
    }
  })
</script>
