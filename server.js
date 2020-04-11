/*
 * Initialise Express
 */
const express = require('express');
const path = require('path');
const app = express();
const crypto = require('crypto')
const bodyParser = require('body-parser');

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
  // Pass to next layer of middleware
  next()
})

/*
 * Initialise Pusher
 */
const Pusher = require('pusher');
const pusher = new Pusher({
  appId:'735665',
  key:'0c9a84e4b8eec1fa3344',
  secret:'501aa388d3a6851f4882',
  cluster:'ap2'
});

/*
 * Define post route for creating new reviews
 */
app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/test', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.post('/review', (req, res) => {
  pusher.trigger('reviews', 'review_added', req.body);
  res.status(200).send();
});

app.post('/pusher/auth', (req, res) => {
  let socketId = req.body.socket_id
  let channel = req.body.channel_name
  let presenceData = {
    user_id: crypto.randomBytes(16).toString('hex'),
    icon: req.body.icon
  }
  console.log(req.body);
  let auth = pusher.authenticate(socketId, channel, presenceData)
  res.send(auth)
})

/*
 * Run app
 */
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});