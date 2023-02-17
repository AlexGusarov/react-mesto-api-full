const router = require('express').Router();

const { login } = require('../controllers/users');

const { validateUserLogin } = require('../middlewares/validators');

router.post('/signin', validateUserLogin, login);

module.exports = router;
