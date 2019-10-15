const express = require('express');
const router = express.Router();
const {project} = require('../../controllers');
const passport = require('passport');


router.get('/', passport.authenticate('jwt', {session: false}), project.get);
router.post('/', passport.authenticate('jwt', {session: false}), project.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), project.remove);
router.get('/:id', passport.authenticate('jwt', {session: false}), project.id);
router.patch('/:id', passport.authenticate('jwt', {session: false}), project.update);


module.exports = router;
