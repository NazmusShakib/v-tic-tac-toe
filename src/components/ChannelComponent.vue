<script>
  import Pusher from 'pusher-js'
  const pusher = new Pusher('0c9a84e4b8eec1fa3344', {
    cluster: 'ap2',
    encrypted: true,
    authEndpoint: 'http://192.168.0.105:5000/pusher/auth',
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
