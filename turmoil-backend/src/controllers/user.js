import {validationResult} from 'express-validator';
import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        res.status(201).json({ message: 'User created!!', userId: result.id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findAll({ where: {email: email} });
        if (!user || !user.length) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            return next(error);
        }
        loadedUser = user[0];
        console.log("user", loadedUser.email, loadedUser.password)
        const isEqual = await bcrypt.compare(password, loadedUser.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            return next(error);
        }

        const token = await jwt.sign({email: loadedUser.email, name: loadedUser.name, id: loadedUser.id}, 'turmoil-secret-key', {expiresIn: '1h'});

        //const token = 'some-token';
        // const token = jwt.sign(
        //     {
        //         email: loadedUser.email,
        //         userId: loadedUser.id.toString()
        //     },
        //     'somesupersecretsecret',
        //     { expiresIn: '1h' }
        // );
        res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};