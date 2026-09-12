const express = require('express');
const Router = express.Router();
const authmiddleware = require('../authentication/auth');
const {register,login,dashboard} = require('../controller/control')

Router.route('/dashboard').get(authmiddleware ,dashboard);
Router.route('/login').post(login);
Router.route('/register').post(register);

module.exports = Router;