<template>
  <aside id="sidebar">
   <div class="widget-wrap">
    <div class="widget info">
      <img class="avatar" src="http://ww2.sinaimg.cn/large/005zWjpnly1fnu2m723y8j30ku0ku0t1.jpg"/>
      <h3 class="nick-name">陈立</h3>
      <p class="desc">以梦为马 不负韶华</p>
      <div class="post-info">
        <div class="info-inner">
          <div class="info-num">{{blog_count}}</div>
          <div class="info-name">文章</div>
        </div>

        <div class="info-inner">
          <div class="info-num">{{tag_count}}</div>
          <div class="info-name">标签</div>
        </div>
      </div>
      <div class="info-links">
        <a class="info-link">
          <i class="iconfont icon-github"></i>
          <a href="https://github.com/alihack" target="_blank">GitHub</a>
        </a>
        <a class="info-link" @click="open_wechat">
          <i class="iconfont icon-denglu"></i>
          Wechat</a>
        </div>
      </div>
    </div>

    <div class="widget-wrap">
      <div class="widget">
        <h3 class="widget-title">最近文章</h3>
        <ul v-for="item in data">      
          <li class="item-li">
          <i class="el-icon-document"></i>  
            <a @click="blog_detail(item.blogId)"><router-link to="/article_detail">{{item.title}}</router-link></a>
          </li>
        </ul>
      </div>
      <div class="widget">
        <h3 class="widget-title">标签云</h3>
        <div class="tag-li"> 
          <span v-for="item in tag_cloud">                 
          <a @click="tag_detail(item.tag)">
          <router-link to="/tag_detail">
          <el-button v-bind:type="color" size="small">{{item.tag}}</el-button>
          </router-link>
          </a>
          </span>
        </div>
      </div>
      <div class="widget">
        <h3 class="widget-title">联系站长</h3>
      <img src="http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mzqz8jj30iq0owdh3.jpg" width="100%"></img> 
      </div>
      <div class="widget">
        <h3 class="widget-title">友情链接</h3>
        <ul>
          <li class="item-li">
            <i class="iconfont icon-fenxiang"></i><a href="">&nbsp;暂无友情链接</a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    data () {
      return {
        blog_count:'',
        tag_count:'',
        data:'',
        tag_cloud:'',
        tag_data:'',
        color:'',
        colorData:['info','success','warning','primary','danger'],
      }
    },
  mounted(){
    this.get_list()
    this.getblog_count()
    this.gettag_count()
    this.gettag_cloud()
    this.color=this.colorData[Math.round(Math.random()*(this.colorData.length-1))]
  },
  methods:{ 
    get_list(){
      var that = this;
      this.$axios.post('http://121.42.32.13:3000/get_list').then(res=>{
        var  res = that.$qs.parse(res).data;
        if(res.code!=0){
          that.data = res.recentData;
        }
      })
    },
    getblog_count(){
      var that = this;
      this.$axios.post('http://121.42.32.13:3000/getblog_count').then(res=>{
        var  res = that.$qs.parse(res).data;
        if(res.code!=0){
          that.blog_count = res.data;
        }
      })
    },
    gettag_count(){
      var that = this;
      this.$axios.post('http://121.42.32.13:3000/gettag_count').then(res=>{
        var  res = that.$qs.parse(res).data;
        if(res.code!=0){
          that.tag_count = res.data;
        }
      })
    },
    gettag_cloud(){
      var that = this;
      this.$axios.post('http://121.42.32.13:3000/gettag_cloud').then(res=>{
        var  res = that.$qs.parse(res).data;
        if(res.code!=0){
          that.tag_cloud = res.data;
        }
      })
    },
    blog_detail(blogId){
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
   tag_detail(tag){

    var that = this;

    this.$axios.post('http://121.42.32.13:3000/tag_detail', this.$qs.stringify({
     tag:tag,
   })).then(res=>{
      var  res = that.$qs.parse(res).data;
      if(res.code!=0){
        that.tag_data = res.data;
        this.$help.$emit("tag_detail",that.tag_data) 
      }
    })

 },
 open_wechat() {
  const h = this.$createElement;
  this.$notify({
    title: 'WeChat',
    duration: 0,
    dangerouslyUseHTMLString: true,
    message: '<img src="http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mzqz8jj30iq0owdh3.jpg" width=280px></img>'
  });
},
}
}

</script>

<style scoped>
  h3{
    font-size:1.2rem;
    letter-spacing:2px;
  }
  .info{
    text-align: center;
  }
  .desc {
    font-size:1rem;
  }
  .nick-name {
    color: #333;
    margin:1rem 0;
    text-align: center;
  }
  .info-num {
    font-weight: bold;
    font-size:1.2rem;
    color: #333;
    margin: 2px
  }
  .archive-list-count {
    padding-left: 5px;
    color: #999;
    font-size: 1rem;
  }

  .widget-title{
    color: #979797 !important;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px dotted #ccc;
  }
  .tag-li span{
    padding-right:10px;
  
  }
  .item-li,.tag-li{
    font-size:1rem;
    line-height: 200%;
  }
  a:hover{
    color: red;
    cursor:pointer;
  }

  .info .avatar {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    display: block;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 10px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.5);
    box-shadow: 0 2px 10px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.5);
  }

  .widget {
    line-height: 1rem;
    word-wrap: break-word;
    font-size:0.8rem;
    color: #777;
    text-shadow: 0 1px #fff;
    background: #fff;
    -webkit-box-shadow: 0 0 2px rgba(0,0,0,0.2);
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    padding: 15px;
    padding-bottom: 8px;
    border-radius: 3px;
    margin-bottom: 20px;
  }
  .info .info-inner {
    margin: 20px;
    margin-right: 0;
    padding-right: 20px;
    display: inline-block;
    border-right: 1px solid #eee;
  }
  .info .info-link {
    margin-right: 10px;
  }

</style>