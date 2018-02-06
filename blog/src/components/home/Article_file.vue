<template>
  <transition enter-active-class="animated bounceInUp">
      <div>
        <header class="board-header">          
          归档 
        </header>    

     <div class="float">
      <div  v-for="item in sl" >  
        <el-badge :value="item.sl" class="item">
          <el-button @click="detail_time(item.time)" size="big">{{item.time}}
          </el-button>
        </el-badge>
      </div>
    </div>


    <div class="float">
    <transition-group name="el-zoom-in-center">
     <div v-show="show" class="transition-box" v-for="item in timeData" :key="item">
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
        </div>
        </transition-group>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        data:'',
        timeData:'',
        sl:'',
        show:true,
      }
    },
    mounted(){
      var that = this
      this.$axios.post('http://121.42.32.13:3000/get_file').then(res=>{
        var  res = that.$qs.parse(res).data;
        if(res.code!=0){
          that.sl = res.sl;
          that.detail_time(that.sl[0].time)
        }
      })
    },
    methods:{
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
     detail_time(blogtime){
      this.show=true;
      var that = this;
      this.$axios.post('http://121.42.32.13:3000/get_time', this.$qs.stringify({
       blogtime:blogtime,
     })).then(res=>{
        var  res = that.$qs.parse(res).data;
        if(res.code!=0){
          that.timeData = res.timeData;

        }else{

        }
      })

   },

 },
}
</script>


<style scoped>
.float{
    float: left;
    margin-left: 10px;
}
 .article-inner {
  width:500px;
}
.article-content{
  height: 60px;
}
</style>