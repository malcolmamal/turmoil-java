import {Server} from "./server.js";
import express from "express";
import {whatever, something} from "./other.js";

import {templateApp} from "./templating.js";
import {administrationApp} from "./controllers/administration.js";

import path from "path";

import {pool, sequelize} from './database.js';
import Sequelize from "sequelize";
import {User} from './models/user.js';
import session from 'express-session';
import MySQLSessionStore from "express-mysql-session";

import bcrypt from "bcryptjs";

import csrf from "csurf";

import flash from "connect-flash";
import {randomApp} from "./controllers/randomstuff.js";

const csfrProtection = csrf();


// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

bcrypt.hash("nopass", 12, (error, hash) => {
    console.log("hashed password", error, hash);

    bcrypt.compare("nopass", hash)
        .then(result => {
            console.log("compare result for nopass", result)
        })
        .catch(err => { console.log(err)});

    bcrypt.compare("kopytko", hash)
        .then(result => {
            console.log("compare result for kopytko", result)
        })
        .catch(err => { console.log(err)});
})

bcrypt.hash("nopass", 12)
    .then(hash => {
       console.log('hashed again', hash);

        bcrypt.compare("nopass", hash)
            .then(result => {
                console.log("compare result for nopass", result)
            })
            .catch(err => { console.log(err)});

        bcrypt.compare("kopytko", hash)
            .then(result => {
                console.log("compare result for kopytko", result)
            })
            .catch(err => { console.log(err)});
    })
    .catch(err => {
        console.log('something went wrong', err);
    });


const db = pool.promise();

const sessionStore = new MySQLSessionStore({}, db);

db.execute('SELECT * FROM sometable')
    .then(([rows, fieldData]) => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err);
    }
);

db.execute(
    'INSERT INTO sometable (name) VALUES (?)',
    [Math.random()]
);

const app = express();

app.set("view engine", "pug");
app.set('views', 'views');
app.use(
    session({
        secret: 'this-is-my-secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })
);
console.log('after session');
app.use(csfrProtection);
console.log('after csfrProtection');
// hidden name="_csrf" value=req.crsfToken()

// after session
app.use(flash());

// req.flash('key', 'something');
// req.flash('key');

app.use((req, res, next) => {
    // visible in views
   res.locals.something = 'lalla';
   res.locals.csrftoken = req.csrfToken();
   next();
});

User.findByPk(1)
    .then(result => {
    console.log("found user", result); //
    }).catch(err => {
        console.log(err);
});

User.findAll()
    .then(result => {
      //  console.log("found users", result); //
    }).catch(err => {
    console.log(err);
});

User.findAll({where: {email: "email 0.7359191271421537"}})
    .then(result => {
      //  console.log("found specific users", result[0]); //
    }).catch(err => {
    console.log(err);
});

User.findAll({
        where: {
            email: {[Sequelize.Op.like]: '%19%'}
        }
    })
    .then(result => {
       // console.log("found specific users with like", result); //
    }).catch(err => {
    console.log(err);
});

app.use(templateApp);
app.use(administrationApp);
app.use(randomApp);

console.log("some", whatever());

//app.use(express.json());
//app.use(express.urlencoded());

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/initializeStash', (req, res, next) => {
    let server = new Server(req, res);

    console.log("Will initialize stash");
    server.initializeStashExpress()
        .then(r => {
            res.send(r);
            console.log("Output sent");
            whatever();
            console.log('additional something', something);
        });
});

sequelize.sync()
    .then(result => {
        //console.log(result);

        app.listen(3030);
    })
    .catch(err => {
        console.log(err);
    });

console.log("Server started");