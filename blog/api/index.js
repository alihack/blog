var express = require('express')
var app = express()
var sql = require('./connect')
var bodyParser = require('body-parser')
var fs = require('fs')
//var path = require('path')
sql.connect()

app.use(bodyParser.urlencoded({ 'limit': '10000kb' }))
app.post('/', function (req, res) {})
// 配置允许跨域请求；
app.all('*', function (req, res, next) {
 res.header('Access-Control-Allow-Origin', '*')
 res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
 res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
 res.header('X-Powered-By', ' 3.2.1')
 next()
})

//获取时间
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}        

app.post('/add_article', function (req, res) {
  sql.query('insert into blog set ?', {title: req.body.title,tag: req.body.tag,content: req.body.content,time: new Date().format("yyyy-MM-dd")}, function (err, rows) {
    err ? res.send({code: 0}) : res.send({code: 1})
  })
})
app.post('/add_message', function (req, res) {
  sql.query('insert into leword set ?', {name: req.body.name,time: new Date().format("yyyy-MM-dd hh:mm"),text:req.body.text}, function (err, rows) {
    err ? res.send({code: 0}) : res.send({code: 1})
  })
})
app.post('/update_article', function (req, res) {
  sql.query('update blog set title= ?,tag=?,content=? where blogId=?', [req.body.title, req.body.tag,req.body.content,req.body.blogId], function (err, rows) {
    err ? res.send({code: 0}) : res.send({code: 1})
  })
})

app.post('/get_list', function (req, res) {
  sql.query('select * from blog order by blogId desc', function (err, rows) {
    if (err) {
      console.log(err)
      res.send({code: 0})
    }else {
      var data = {}
      var recentData = {}
      for (var i = 0; i < rows.length; i++) {
        data[i] = {
          blogId:rows[i].blogId,
          content:rows[i].content,
          title: rows[i].title,
          time: rows[i].time,
          tag: rows[i].tag,
          star: rows[i].star,
        }      
      }
      for (var i = 0; i < 5; i++) {
        recentData[i] = {
          blogId:rows[i].blogId,
          content:rows[i].content,         
          title: rows[i].title,
          time: rows[i].time,
          tag: rows[i].tag,
        }      
      }
      res.send({code: 1,data:data,recentData: recentData})
    }
  })
})

app.post('/del_list', function (req, res) {
  sql.query('delete from blog where blogId="' + req.body.blogId + '"', function (err, rows) {    
    if (err) {
      //console.log(err)
      res.send({code: 0})
    }else {
      console.log(req.body.blogId)
      res.send({code: 1})
    }
  })
})
app.post('/get_message', function (req, res) {
  sql.query('select * from leword order by lwId desc', function (err, rows) {    
    if (err) {
      res.send({code: 0})
    }else {
      var data = {}
      for (var i = 0; i < rows.length; i++) {
        data[i] = {
          name:rows[i].name,
          text:rows[i].text,
          time: rows[i].time,
        }      
      }  
      res.send({code: 1,data:data})
    }
  })
})
app.post('/getblog_count', function (req, res) {
  sql.query('select blogId from blog', function (err, rows) {    
    if (err) {
      res.send({code: 0})
    }else {
      var blog_count=rows.length  
      res.send({code: 1,data:blog_count})
    }
  })
})
app.post('/gettag_count', function (req, res) {
  sql.query('select distinct tag from blog', function (err, rows) {    
    if (err) {
      res.send({code: 0})
    }else {
      var blog_tag=rows.length
      res.send({code: 1,data:blog_tag})
    }
  })
})
app.post('/gettag_cloud', function (req, res) {
  sql.query('select distinct tag from blog', function (err, rows) {    
    if (err) {
      res.send({code: 0})
    }else {
      var tag_cloud=rows
      res.send({code: 1,data:tag_cloud})
    }
  })
})

app.post('/get_detail', function (req, res) {
  sql.query('select * from blog where blogId="' + req.body.blogId + '"', function (err, rows) {    
    if (err) {
      //console.log(err)
      res.send({code: 0})
    }else {
      var blog=rows[0]      
      res.send({code: 1,data:blog})
    }
  })
})
app.post('/get_time', function (req, res) {
  sql.query('select * from blog where time="' + req.body.blogtime + '"', function (err, rows) {    
    if (err) {
      //console.log(err)
      res.send({code: 0})
    }else {
      var time=rows      
      res.send({code: 1,timeData:time})
    }
  })
})
app.post('/tag_detail', function (req, res) {
  sql.query('select * from blog where tag="'+req.body.tag+'"order by blogId desc', function (err, rows) {    
    if (err) {
      res.send({code: 0})
    }else {
      var tag=rows 
      res.send({code: 1,data:tag})
    }
  })
})
app.post('/edit_blog', function (req, res) {
  sql.query('select * from blog where blogId="' + req.body.blogId + '"', function (err, rows) {    
    if (err) {
      console.log(err)
      res.send({code: 0})
    }else {
      var blog=rows[0]      
      res.send({code: 1,data:blog})
    }
  })
})

app.post('/get_file', function (req, res) {
  sql.query('select time,count(*) sl from blog group by time order by blogId desc', function (err, rows) {    
    if (err) {
      console.log(err)
      res.send({code: 0})
    }else {
      var sl=rows     
      res.send({code: 1,sl:sl})
    }
  })
})

var server = app.listen(3000, function () {
  var port = server.address().port
  console.log('访问地址为 http://localhost:', port)
})
