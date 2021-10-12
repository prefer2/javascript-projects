const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//unfollow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { 
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      res.status(403).send('언팔로우 불가능!');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 닉네임 수정
router.route('/edit')
  .patch(async(req, res, next)=>{
    try{
      const result = await User.update({
        nick: req.body.nick,
      }, {
        where: {id: req.user.id}
      });
      res.json(result);
    } catch(err){
      console.log(err);
      next(err);
    }
  })
module.exports = router;