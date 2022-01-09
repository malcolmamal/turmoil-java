import express from "express";
import {something} from "../other.js";
import {User} from "../models/user.js";

import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid";

const apiKey = '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';

const transporter = nodemailer.createTransport(sendgridTransport({
    apiKey: apiKey
}));


import sgMail from '@sendgrid/mail'
sgMail.setApiKey(apiKey)

// apparently mailtrap is suggested for testing purposes
// https://mailtrap.io/


export const administrationApp = new express();

administrationApp.get('/add-user', (req, res, next) => {
    User.create({
        name: "whatever " + Math.random(),
        email: "email " + Math.random()
    }).then(result => {
       // console.log(result);
        res.send("user created " + result);
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
});

administrationApp.get('/update-user/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => {
            if (!user) {
                return null;
            }
            user.email = 'new email ' + Math.random()
            return user.save();
        })
        .then(result => {
            if (!result) {
                let message = 'no user found for id ' + req.params.userId;
                console.log(message);
                return res.send(message);
            }

            console.log('saved user: ' + result.id);
            res.send("done for user: " + result.id)
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});


administrationApp.get('/add-user-session/key/:key/value/:value', (req, res, next) => {
    req.session[req.params.key] = req.params.value;
    console.log(req.params.value);
    res.send(`${req.params.key}: ${req.params.value}`)
});

administrationApp.get('/check-session', (req, res, next) => {
    const sessionVariables = {};
    for (const property in req.session) {
        sessionVariables[property] = req.session[property];
    }
    console.log("token", req.csrfToken());
    res.send(sessionVariables);
});

administrationApp.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.send('destroyed');
    });
});

administrationApp.get('/login', (req, res, next) => {
    // do some code to login and save something in session

    req.session.user = 'some object or whatever';

    // when you do redirect, and you are saving something bigger into session perhaps
    req.session.save(err => {
        console.log(err);
        res.send('saved');

        // or do redirect
    });
});

administrationApp.get('/send-mail/:subject', (req, res, next) => {
    const msg = {
        to: 'fox.nemhauser@gmail.com', // Change to your recipient
        from: 'malcolm.mal.reynolds+sendgrid@gmail.com', // Change to your verified sender
        subject: `Sending with SendGrid is Fun ${req.params.subject}`,
        text: 'and easy to do anywhere, even with Node.js :-) ',
        html: '<strong>and easy to do anywhere, even with Node.js :-)</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.send("sent with message " + req.params.subject);
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
});

administrationApp.get('/send-mail-old-style/:subject', (req, res, next) => {
    const msg = {
        to: 'fox.nemhauser@gmail.com', // Change to your recipient
        from: 'malcolm.mal.reynolds+sendgrid@gmail.com', // Change to your verified sender
        subject: `!!! Sending with SendGrid is Fun ${req.params.subject}`,
        text: 'and easy to do anywhere, even with Node.js :-) ',
        html: '<strong>and easy to do anywhere, even with Node.js :-)</strong>',
    }

    transporter.sendMail(msg)
        .then(() => {
        console.log('Email sent');
        res.send("sent old way with message " + req.params.subject);
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
});