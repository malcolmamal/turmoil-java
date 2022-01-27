import express from "express";
import crypto from "crypto";

export const randomApp = new express();

randomApp.get('/crypto-value', (req, res, next) => {
    return crypto.pseudoRandomBytes(32, (err, buf) => {
        if (err) {
            console.log(err);
            res.send(err);
        }

        req.flash('crypto', 'we just used crypto')

        console.log('buffer', buf.toString('hex'));

        res.send(req.flash('crypto'));
    });
});