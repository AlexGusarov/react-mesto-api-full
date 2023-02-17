const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCreatingCard, validateCardId } = require('../middlewares/validators');

router.get('/cards', getCards);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.post('/cards', validateCreatingCard, createCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
