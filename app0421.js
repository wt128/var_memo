const express = require('express');
const app = express();
const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');
const mustacheExpress = require('mustache-express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

app.use(cookieParser());

// 暗号化につかうキー
const APP_KEY = 'YOUR-SECRET-KEY';

app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');
// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
  secret: 'YOUR-SECRET-STRING',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/*  ここに閲覧制限をかけたいときに使うミドルウェア。
const adminAuthMiddleware = (req, res, next) => {
  if(req.isAuthenticated() && req.user.role === 'user') {
    next();
  } else {
    res.redirect(302, '/login');
  }
}; */

app.listen(8080, () => {
  console.log('Running at Port 8080...');
});

const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) { // ログインしてるかチェック
    next();
  } else if(req.cookie.remember_me){

    const [rememberToken, hash] = req.cookies.remeber_me.split('|');
    User.findAll({
      where: {
        rememberToken: rememberToken
      }
    }).then(user => {
      for(let i in users){
        const user = users[i];
        const verifyingHash = crypto.createHmac('sha256', APP_KEY)
          .update(user.id + '-' + rememberToken)
          .digest('hex');

        if(hash === verifyingHash) {
          return req.login(user, () =>{
            next();
          });
        }

      }
    })
    res.redirect(302, '/login');
  } else {
    res.redirect(302, '/login');
  }
};

app.get('/new', (req,res) => {
  const errorMessage = req.flash('failed').join('<br>');
  res.render('new/form', {
      errorMessage: req.flash('failed')
  });
})

app.post('/new', (req,res) => {

    console.log(req.body)

    if(req.body["password"] !== req.body["password_confirmation"]){
      req.flash('failed', 'ログイン失敗、ユーザー名またはパスワードが誤りです。');
      res.redirect(302,'/new');
      }
    else {
      let pps = bcrypt.hashSync(req.body["password"],10);
      res.send("SUCCUess");
      User.create
    }
  })

app.get('/login', (req,res) =>{
    const errorMessage = req.flash('error').join('<br>');
    res.render('login/form', {
        errorMessage: errorMessage
    });
});

// ログイン実行
app.post('/login',
  passport.authenticate('local', {
   
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。'
  }),
  (req, res, next) => {
    if(!req.body.remember){
      // 省略しない場合。
      res.clearCookie('remember_me');
      return next();
    }
    const user = req.user;
    const rememberToken = crypto.randomBytes(20).toString('hex');
    const hash = crypto.createHmac('sha256', APP_KEY)
      .update(user.id + '-' + rememberToken)
      .digest('hex')
    user.rememberToken = rememberToken;
    user.save();

    res.cookie('remember_me', rememberToken+ '|' + hash, {
      path: '/',
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000 // 5年
    });

    return next();

  },
  (req, res) => {
    res.redirect('/user');
  }
);

// ログイン成功後のページ
app.get('/user', authMiddleware, (req, res) => {
  const user = req.user;
  res.send('ログイン完了！');
});

// ログアウト機能
app.get('/logout', (req,res) =>{
  req.logout();
  res.redirect('/login');
})

//const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
