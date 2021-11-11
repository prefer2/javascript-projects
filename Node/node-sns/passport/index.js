const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => { //serializeUser: 로그인 시 실행. 세션에 어떤 데이터를 저장할지 정한다. 
    done(null, user.id); //error, 저장하고 싶은 데이터
  });

  passport.deserializeUser((id, done) => { //deserializeUser: 매 요청 시 실행. id === user.id
    User.findOne({ 
        where: { id },
        include: [{
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followers',
        }, {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followings'
        }]
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};

//serializeUser: 사용자 정보 객체를 세션에 아이디로 저장
//deserializeUser: 세션에 저장한 아이드를 통해 사용자 정보 객체를 불러옴

