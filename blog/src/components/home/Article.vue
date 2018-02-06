<template>
<transition enter-active-class="animated bounceInUp">
  <div id="article">
    <article v-for="(item,index) in data" :key="index">
      <div class="article-inner">
        <header class="article-header">          
          <h1>
            <i @click="detail(item.blogId)"><router-link class="article-title" to="/article_detail" >{{item.title}}</router-link></i>
          </h1>  
        </header>    
        <div class="article-entry">
          <div class="article-content" v-html="item.content">      
          </div>        
          <p class="article-more-link" @click="detail(item.blogId)">
            <router-link to="/article_detail">阅读全文</router-link>
          </p>      
        </div>
        <footer class="article-footer">
          <a class="article-comment-link"><span class="dot">•</span>
            <el-tag size="mini" class="view-count">999+</el-tag>次浏览</a>    
              <a >
                <time  class="article-date" >{{item.time}}</time>
              </a>     
              <div class="article-tag-list"><div class="article-tag-list-item">#{{item.tag}}
              </div>
              </div>

            </footer>
          </div>
          
        </article>

      </div>
      </transition>
    </template>

    <script>
      
      export default {
        data () {
          return {
            data:'',
            blogId:'',
          }
        },
        mounted(){
          this.getList();
        },
        methods: {
          getList(){
            var that = this;
            this.$axios.post('http://121.42.32.13:3000/get_list').then(res=>{
              var  res = that.$qs.parse(res).data;
              if(res.code!=0){
                that.data = res.recentData;
              }
            })
          },
          detail(blogId){
            var that = this;
            this.$axios.post('http://121.42.32.13:3000/get_detail', this.$qs.stringify({
             blogId:blogId,
           })).then(res=>{
              var  res = that.$qs.parse(res).data;
              if(res.code!=0){
                that.data = res.data;
                this.$help.$emit("get_detail",res.data.time,res.data.title,res.data.tag,res.data.content);
              }else{
               
              }
            })
           
         },
       }
     }
   </script>



<style scoped>
.view-count{
  font-size: 0.85em;
}
.article-content{
  height: 185px;
  }    
</style>