import express from "express";
import {addUser, createUser} from "../controllers/user.js";

const router = express.Router();

router.get('/add', addUser);
router.get('/create', createUser);

export default router;