const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCardId } = require('../middlewares/validators');

// validateCreatingCard

router.get('/', getCards);
router.delete('/:cardId', validateCardId, deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
