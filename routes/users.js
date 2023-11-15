const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//UPDATE USER
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if(req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch(err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch(err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
 });
//DELETE USER
//GET USER
//FOLLOW USER
//UNFOLLOW USER

router.get('/', (req, res) => {
  res.send('Hey its user route');
});

module.exports = router;
