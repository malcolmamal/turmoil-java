import express from "express";

export const validationApp = new express();

validationApp.get('/validate', (req, res, next) => {

    res.send('validated');
});