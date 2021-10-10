exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('Login Required');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/error=${message}`);
    }
};

// 로그인 안한 상태에서는 프로필 보기 불가
// 로그인 한 상태에서는 회원가입 불가