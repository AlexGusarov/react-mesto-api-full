const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');

router.use('/', require('./signin'));
router.use('/', require('./signup'));
router.use('/', auth, require('./cards'));
router.use('/', auth, require('./users'));

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
