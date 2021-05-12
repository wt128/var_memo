const { response } = require('express');
const express = require('express')
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000

const app = express()
// 読み込んだbody-parserをミドルウェアとして設定
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');



const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kfs985A&',
    database: 'express_db' // 追加
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
    
  });


app.get('/',(req,res) =>{ 
    const sql = "select * from users"

    con.query(sql, (err,result,fields) =>{
      if(err) throw err;
      res.render('index',{users :result});
    })
    //res.sendFile(path.join(__dirname, 'PostForm.html'))
    
    
  });

app.post('/',(req,res) =>{ 
  const sql ="INSERT INTO users SET ?"
  console.log(req.body);

  con.query(sql,req.body,(err,result, fields) =>{
    if(err) throw err;
    console.log(result);

    res.send('登録できたよ～');
  })
})

 app.get('/delete/:id',(req,res) => {
   const sql = "DELETE FROM users WHERE id = ?";
   con.query(sql,[req.params.id],(err, result, fields) => {
     if(err) throw err;
     console.log(result)
     res.redirect('/')
   })
  })
  
  app.get('/edit/:id',(req,res) =>{
    const sql = "SELECT * FROM users WHERE id=?"
    con.query(sql,[req.params.id],(err,result,fields) => {
      if(err) throw err;
      console.log(result);
      res.render('edit',{user : result});
    })

  })

  app.post('/update/:id',(req,res) =>{
    const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
    con.query(sql,req.body, (err,result,fields) =>{
      if(err) throw err
      console.log(result)
      res.redirect('/')
    })
  })
   
 
  
app.listen(port, () => console.log(`Example app listening on port ${port}`))

