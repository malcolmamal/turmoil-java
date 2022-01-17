import express from "express";
import {something} from "./other.js";

export const templateApp = new express();

templateApp.get('/show-me', (req, res, next) => {
    //res.send("this is something: " + something);
    res.render("something", {myValue: something, anotherOne: "ah yes"});
});