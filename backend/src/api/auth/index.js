import express from 'express';
import * as authCtrl from './auth.ctrl.js';

const auth = express.Router();

auth.get('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/verify', authCtrl.verify);
auth.post('/logout', authCtrl.logout);

export default auth;
