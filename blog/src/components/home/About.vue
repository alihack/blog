<template>
  <transition enter-active-class="animated bounceInUp">
    <article class="article">
      <div class="article-inner">
        <header class="board-header">          
          关于 
        </header>    
        <div class="article-entry">      
          <h1><i class="el-icon-message"></i>联系</h1><ul><li>github:<a href="https://github.com/alihack" target="_blank">@alihack</a></li><li>WeChat:<a @click="open_wechat">@LOVE523776309</a></li></ul>
          <h1><i class="el-icon-tickets"></i>经历</h1><ul><li>2016年3月，在深圳高新区信息网有限公司实习，毕业后在该公司从事网络维护。在双十一半价买了阿里云最低配服务器，闲暇之余，利用Bootstrap+Django+Nginx框架搭建了<a @click="open_blog">阿立藏书阁</a></li><li>2017年2月，在莆田信息中心从事系统维护。期间不断学习，将博客前后端进行重构。</li></ul>
          <h1><i class="el-icon-edit-outline"></i>博客</h1><ul><li>技术栈：vue+webpack+express+mysql+nginx+ element-ui </li><li>历经一个月完成，将不断完善，优化代码。</li></ul>        
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
          }
        },
        methods: {
          open_wechat() {
            const h = this.$createElement;
            this.$notify({
              title: 'WeChat',
              duration: 0,
              dangerouslyUseHTMLString: true,
              message: '<img src="http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mzqz8jj30iq0owdh3.jpg" width=280px></img>'
            });
          },
          open_blog() {
            const h = this.$createElement;
            this.$notify({
              title: 'WeChat',
              duration: 0,
              dangerouslyUseHTMLString: true,
              message: '<img src="http://ww2.sinaimg.cn/large/005zWjpnly1fnu2mtwrbrj30kc0m8t9t.jpg" width=280px></img>'
            });
          },
        }
      }
    </script>


    <style scoped>
      i{
        padding-right: 5px;
      }
      a{
        color: red;
        
      }
      a:hover{
        text-decoration:underline;
      }
      .article-header {
        font-size: 2rem;
        font-weight: bold;
      }
      .article-entry li {list-style-type:disc}
      .article-entry {
        padding:0px 20px 10px;
      }
  </style>