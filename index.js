/* importing packages */
const app                 = require('express')(),
    mongoose              = require('mongoose'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    localStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User                  = require('./models/user');
    

/* db configuration */
const uri = 'mongodb://localhost/auth_app';
 connection = mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    if (err) console.log('the error is', err);
    else console.log('successfully connected to auth db');
  }
);
/* setting up the app configuration*/
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



/* server connection*/
const port = 3000;
app.listen(port, () => {
    console.log('server started');
});


/* app routes */
app.get('/', (req, res) => {
    res.render('home');
});
 
app.get('/secret', (req, res) => {
  res.render('secret');
});