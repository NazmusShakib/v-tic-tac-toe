const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto')
require('dotenv').config();

const app = express();
const { PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET, PUSHER_APP_CLUSTER } = process.env;
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // A cookie associated with a cross-site resource
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  // Pass to next layer of middleware
  next()
})

/*
 * Initialise Pusher
 */
const Pusher = require('pusher');
const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  forceTLS: true
});


/*
 * Define post route for creating new reviews
 */
app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/test', (req, res) => {
    res.json({"message": "Welcome to tic-tac-toe application."});
});

app.post('/review', (req, res) => {
  pusher.trigger('test-channel', 'test-event', req.body);
  res.status(200).send();
});

app.post('/pusher/auth', (req, res) => {
  let socketId = req.body.socket_id
  let channel = req.body.channel_name
  let presenceData = {
    user_id: crypto.randomBytes(16).toString('hex'),
    icon: req.body.icon
  }
  // console.log(req.body);
  let auth = pusher.authenticate(socketId, channel, presenceData)
  res.send(auth)
})

/*
 * Run app
 */
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});