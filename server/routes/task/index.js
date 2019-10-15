const {Router} = require('express');
const router = Router();
const {task} = require('../../controllers');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), task.getAll);
router.post('/', passport.authenticate('jwt', {session: false}), task.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), task.remove);
router.get('/:id', passport.authenticate('jwt', {session: false}), task.id);
router.patch('/:id', passport.authenticate('jwt', {session: false}), task.update);

module.exports = router;
