import {validationResult} from 'express-validator';
import {User} from "../models/user.js";
import bcrypt from "bcrypt";

export const addUser = (req, res, next) => {
    let hashedPass;

    bcrypt.hash(req.query.password || "nopass", 12)
        .then((hashedValue) => {
            hashedPass = hashedValue;
            User.create({
                name: "whatever " + Math.random(),
                password: hashedPass,
                email: "email " + Math.random()
            });
        })
        .then(result => {
            // console.log(result);
            res.send("user created " + result);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
};

export const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    if (!req.body) {
        const error = new Error('No body in request.');
        error.statusCode = 422;
        error.data = errors.array();

        return next(error);
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        });
        const result = await user.save();
        res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};