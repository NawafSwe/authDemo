/* importing packages */
const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
app.get('/', (req, res) => { 
    res.render('home');
});

const port = 3000;
app.listen(port, () => {
    console.log('server started');
});


app.get('/', (req, res) => {
    res.render('home');
});
 
app.get('/secret', (req, res) => {
  res.render('secret');
});