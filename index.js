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

/* 
secret is used to encode and decode and can be anything
*/
app.use(
  require('express-session')({
    secret: 'ARBT',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

/* passport serialize and deserialize are response of reading the data 
from session decoded and encoded */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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
 
app.get('/secret', isLoggedIn ,(req, res) => {
  res.render('secret');
});


/* auth routes*/

/* register route is to show the form  */
app.get('/register', (req, res) => { 
    res.render('register');
});

/* this route for registering new user */
app.post('/register', (req, res) => { 
    /* 
    User.register(arg1,arg2,arg3);
    arg1: creating a User object with a username and trying to save it if the username is not exist and there is no error. 
    arg2: it will take the password and hash it then save it to the database
    arg3:callback function.
    */
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) { 
            console.log('err', err);
            res.render('register');
        } else {
            console.log(user);
            //if no error
            passport.authenticate('local')(req, res, () => { 
                // the passport will handel everything 'local' refers to the strategy it can be any like twitter of facebook ect..
                //then redirect the user to what you want
                res.redirect('/secret');
            });
        }
     });
});

/*  log in routes get for showing the form and 
    post for posting the data to the db to authenticate the user */
app.get('/login', (req, res) => {
    res.render('login');
 });

 // in this route the passport is considered as a middleware that runs before the route runs the callback function
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login' 
}) ,(req, res) => { 

});

app.get('/logout', (req, res) => { 
    // deleting the session 
    req.logout();
    res.redirect('/');
});

/* isLoggedIn function is considered to be a middleware that we need in the secret route where we need to check 
if the user is logged in or not */
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) { 
        // return next() means go next where it is the callback function in the route
        return next();
    }
    res.redirect('/login');
}
