var sql = require('./connect')
const NAME = 'root'
const PASSWORD = '19931117'
var dbInit = function () {
  sql.connect(function (err) {
    if (err) {
      console.log('数据库连接失败')
    }else {
      console.log('成功连接数据库,正在初始化数据库')
      sql.query('CREATE TABLE blog(blogId smallint(6) unsigned NOT NULL auto_increment,title varchar(255),tag varchar(255),content longtext,time varchar(255),star int(10),PRIMARY KEY (`blogId`) ) ENGINE=InnoDB DEFAULT CHARSET=gbk', function (err) {
        !err ? console.log('blog表创建成功') : console.log(err)
      })
      sql.query('CREATE TABLE leword(lwId smallint(6) unsigned NOT NULL auto_increment,name varchar(255),time varchar(255),text varchar(255),PRIMARY KEY(`lwId`)) ENGINE=InnoDB DEFAULT CHARSET=gbk', function (err) {
        !err ? console.log('leaveword表创建成功') : console.log(err)
      })
      sql.end()
    }
  })
}
dbInit()
