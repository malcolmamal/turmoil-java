import {User} from "../models/user.js";

export const addUser = (req, res, next) => {
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
};