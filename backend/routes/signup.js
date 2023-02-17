const router = require('express').Router();

const { createUser } = require('../controllers/users');

const { validateUserAuth } = require('../middlewares/validators');

router.post('/signup', validateUserAuth, createUser);

module.exports = router;
