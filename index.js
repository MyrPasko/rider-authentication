// Main starter point of our application

const express = require('express');
const bodyParser = require('body-parser');                // all requests parsed into JSON
const morgan = require('morgan');                         // for logging
const router = require('./router');

const app = express();

// DB setup
// mongoose.connect('mongodb://localhost:3090', {useNewUrlParser: true});

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

// Server setup

const port = 3090;

mongoConnect(() => {
  app.listen(port);
});

console.log('Server listen on 3090, bitch )))');
