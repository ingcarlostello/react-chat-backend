const { validateJWT }   = require('../middlewares/validateToken');
const {Router}          = require('express');
const { getChat }       = require('../controllers/messages');

const router = Router();

router.get('/:from', validateJWT, getChat)

module.exports = router;