var express = require('express');
var app = express();
var mysql =  require('mysql');
var bodyParser = require('body-parser');
require('date-utils');

var connection = mysql.createConnection({
  host:'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'trello'
})
connection.connect();

app.listen(3000, function(){
  console.log("Connected, 3000 port!!");
})

// 정적파일을 해당위치에서 자동으로 불러올수 있도록 한다.
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/board', function(req, res){
  res.sendFile(__dirname+"/public/src/html/board.html")
})

app.get('/board/load_board', function(req, res){
  var sql = 'SELECT * FROM BOARD';
  connection.query(sql, function(err, rows){
    if(err) throw err;
    res.send(rows);
  })
})

app.get('/board/get_boardTit', function(req, res){
  var sql = 'SELECT TITLE FROM BOARD WHERE ID='+req.query.id;
  connection.query(sql, function(err, rows){
    if(err) throw err;
    res.send(rows[0]);
  })
})

app.get('/board/get_board', function(req, res){
  var sql = 'SELECT ID, TITLE FROM BOARD'
  connection.query(sql, function(err, rows){
    if(err) throw err;
    res.send(rows);
  })
})


// board.html이 로드 될때 아래 url로 데이터를 요청한다.
app.get('/board/load_card', function(req, res){
  //var responseData = {};
  var arr = [];
  var cardSql = 'SELECT * FROM CARD WHERE BOARDID='+req.query.id;
  var todoSql = 'SELECT * FROM TODO';
  connection.query(cardSql, function(err,rows){
    if(err) throw err;
    arr.push(rows);
    connection.query(todoSql, function(err,rows){
      if(err) throw err;
      arr.push(rows);
      res.json(arr);
    });
  })
})

app.get('/board/load_modal', function(req, res){
  var arr = [];
  var todoSql = 'SELECT * FROM TODO WHERE ID='+req.query.id;
  var commentSql = 'SELECT * FROM COMMENT WHERE TODOID='+req.query.id;
  connection.query(todoSql, function(err, rows){
    if(err) throw err;
    arr.push(rows[0]);
    connection.query(commentSql, function(err, rows){
      if(err) throw err;
      arr.push(rows);
      res.json(arr);
    })
  })
})

app.post('/board/make_board', function(req, res){
  var title = req.body.title;
  var sql = 'INSERT INTO BOARD(TITLE) VALUES(?)';
  var params = [title];
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
    res.json(rows.insertId);
  })
})

app.post('/board/make_card', function(req, res){
  var title = req.body.title;
  var position = req.body.position;
  var boardId = req.body.cardWrapId;

  var sql = 'INSERT INTO CARD(TITLE, POSITION, BOARDID) VALUES(?, ?, ?)';
  var params = [title, position, boardId];
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
    res.json(rows.insertId);
  })
})

app.post('/board/make_todo', function(req, res){
  var title = req.body.title;
  var cardId = req.body.cardId;
  var sql = 'INSERT INTO TODO(TITLE, CARDID) VALUES(?, ?)';
  var params = [title, cardId];
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
    res.json(rows.insertId);
  })
})

app.post('/board/update_card', function(req, res){
  var title = req.body.title;
  var cardId = req.body.cardId;
  var sql = 'UPDATE CARD SET TITLE =  ? WHERE ID=?'
  var params = [title, cardId]
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
  })
})

app.post('/board/make_commt', function(req, res){
  var date = new Date();
  var content = req.body.content;
  var todoId = req.body.todoId;
  var nowDate = date.toFormat('YYYY-MM-DD HH24:MI:SS');
  var params = [content, todoId, nowDate];
  var sql = 'INSERT INTO COMMENT(CONTENT, TODOID, DATE) VALUES(?, ?, ?)';
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
    var obj = {"commentId" : rows.insertId, "date" : nowDate};
    res.json(obj);
  })
})

app.post('/board/update_todo', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var todoId = req.body.todoId;
  var sql = 'UPDATE TODO SET TITLE =  ?, DESCRIPTION = ? WHERE ID=?'
  var params = [title, description, todoId]
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
  })
})

app.post('/board/del_card', function(req, res){
  var cardId = req.body.cardId;
  var sql = 'DELETE FROM CARD WHERE ID = ?';
  var params = [cardId];
  connection.query(sql, params, function(err, rows){
    if(err) throw err;
  })
})
