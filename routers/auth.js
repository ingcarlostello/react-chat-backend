// controllers
const { check }                             = require('express-validator');
const { createNewUser,  login, renewToken}  = require('../controllers/auth');
const { fieldsValidator }                   = require('../middlewares/fieldsValidator');
const {Router}                              = require('express');
const { validateJWT }                       = require('../middlewares/validateToken');
const router                                = Router();

// create new users
router.post('/new', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').isEmail(), // midleware that validate automatocaly
    check('password', 'Password is mandatory').not().isEmpty(),
    fieldsValidator 
], createNewUser)

// Login
router.post('/', [
    check('email', 'Email is mandatory').isEmail(), // midleware that validate automatocaly
    check('password', 'Password is mandatory').not().isEmpty(),
    fieldsValidator 
], login)

// renew token
router.get('/renew', validateJWT, renewToken)


module.exports = router;