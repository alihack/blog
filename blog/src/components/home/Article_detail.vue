<template>
  <transition enter-active-class="animated zoomInDown">
    <el-container>
      <el-header height="300px"><Header> </Header></el-header>
      <el-container>   
      <el-main>
          <div id="article_detail">
            <article class="article">
              <div class="article-inner">
                <header class="article-header">          
                  <h1>
                    <div class="article-title" to="/article_detail">{{title}}</div>
                  </h1>  
                </header>    
                <div class="article-entry" v-html="content">      
                </div>
                <footer class="article-footer">
                   <a class="article-comment-link"><span class="dot">•</span>
            <el-tag size="mini" class="view-count">999+</el-tag>次浏览</a>     
                      <a>
                        <time  class="article-date" >{{time}}</time>
                      </a>     
                      <div class="article-tag-list"><div class="article-tag-list-item"><span class="article-tag-list-link">#{{tag}}</span></div></div>

                    </footer>
                  </div>

                </article>

              </div>
            </el-main>
          </el-container>
          <el-footer><Copyright></Copyright></el-footer>
        </el-container>
      </transition>
    </template>

    <script>
      import Copyright from './Copyright'
      import Header from './Header'
      import Aside from './Aside'
      export default {
        components: {
          Copyright,Header,Aside
        },
        data () {
          return {
            time:'',
            title:'',
            tag:'',
            content:'',
          }
        },
        mounted(){
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
          var that = this;
          this.$help.$on("get_detail",function(time,title,tag,content){
           that.time = time;
           that.title = title;
           that.tag = tag;
           that.content = content;
         })
        },
      }
    </script>

