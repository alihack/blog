<template>
  <transition enter-active-class="animated bounceInUp">
    <article class="article">
        <div class="article-inner">
        <header class="board-header">          
          留言板 
        </header>   
        <div class="article-entry">
        <el-carousel trigger="click" height="300px">
      <el-carousel-item v-for="img in list" :key="img">
        <img v-bind:src="img.src">
      </el-carousel-item>
    </el-carousel>        
        <div class="le-board">
        <div class="eidt">
        <span>昵称：</span><el-input prefix-icon="el-icon-edit" placeholder="请输入昵称" v-model="name" class="nameput"></el-input><br>
       <el-input type="textarea" :rows="3" placeholder="请输入留言"v-model="text" class="lewordput"></el-input>
        <el-button type="primary" plain @click="public" class="public">畅言一下</el-button>
        </div>
        <div class="mes-board" v-for="item in data">
        <img class="guest-head" src="/static/images/guestHead.jpg"/><li><h4>{{item.name}}</h4><small>{{item.time}}</small><p>{{item.text}}</p></li>
        </div>       
        </div>
          </div>
          </div>
          
        </article>
      </transition>
    </template>

    <script>
      export default {
        data () {
          return {
            data:'',
            name:'',
            text:'',
            list : [
            {src: 'http://ww2.sinaimg.cn/large/005zWjpnly1fnu2n6f1wpj30nz08c0th.jpg'},
            {src: 'http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mo1w0rj30nz083jtr.jpg'},
            {src: 'http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mjl8wmj30nz08cdgz.jpg'},
            {src: 'http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mf6jwvj30nz08cwez.jpg'},

          ]
          }
        },
        mounted(){
          var that = this
          this.$axios.post('http://121.42.32.13:3000/get_message').then(res=>{
              var  res = that.$qs.parse(res).data;
              if(res.code!=0){
                that.data = res.data;
              }
            })
        },
        methods:{
          public(){
            var that = this;
            if(this.text!=''){
              this.$axios.post('http://121.42.32.13:3000/add_message',this.$qs.stringify({
                    name : that.name,
                    text : that.text,                   
                })).then(res=>{
                    if(res.data.code==1){
                      that.$message.success("发布成功");
                      setTimeout(function(){
                          that.$router.go(0)
                      },500)
                    }else{
                      that.$message.error("发布失败！")
                    }
                })
            }else{
              this.$message.error('不能为空');
            }
          }
        }
      }
    </script>


    <style scoped>
    .public{
     margin: 20px 0;
    }
    .nameput{
      width:25%;
    }
    .lewordput{
      margin:20px 0px;
      width:60%
    }
    .eidt{
      border-bottom: 2px dashed #add7fb;
      padding-bottom:20px;
    }
    .hoster-head{
      border-radius: 10px;
      float: left;
      width: 200px;
    }
    .guest-head{
      border-radius: 10px;
      float: left;
      width: 50px;
    }
    .le-board{
      margin-top:20px; 
    
      padding: 20px;
      background: #fff;
  -webkit-box-shadow: 1px 2px 3px #ddd;
  box-shadow: 1px 2px 3px #ddd;
  border-radius: 3px;
     
    }
      .article-entry {
      margin:0;
      padding:0px 30px 20px 30px;
      }
      .article-inner {
        background-color:#add7fb;
      }
.mes-board li + li { border-top: 1px dashed #fff; }  
.mes-board h4 {  
    display: inline;  
    margin-right: 4px;  
    font-weight: 400;  
    color: #66f;  
}  
.mes-board small { color: #999; }  
.mes-board p {  
    padding: 0;  
}
.mes-board li{
    padding:5px 20px;
    width:80%;
    position: relative;
    left: 70px;
    background-color: #e2eff9;
    border-radius: 20px;
    margin-top: 10px;
    word-wrap: break-word;
}

.hoster li:after,.mes-board li:after{
    content: "\00a0";
    display: block;
    position:absolute;
    top:15px;
    left: -20px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 20px 10px 0px;
    border-color: transparent #e2eff9 transparent transparent;
}  
  </style>