<template>
 	<transition enter-active-class="animated bounceInDown">
		<section class="release-article">
			<el-title-header :title="$route.meta.title"></el-title-header>

			<div id="input_">
      <span>标题：</span><input  v-model="title" ></input>
      <span>标签：</span><input  v-model="tag" ></input>
      </div>
			<markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>

			<div class="release-btn" @click='public'>发布文章</div>
		</section>
 	</transition>

 </template>

 <script>
 import markdownEditor from 'vue-simplemde/src/markdown-editor'; // 导入markdownEditor组件
    export default {
        data: function(){
            return {
                update:false,
                content:'',
                title:'',
                tag:'',
                blogId:'',
                configs: {              // markdown编辑器配置参数
                    status: false,          // 禁用底部状态栏
                    initialValue: ' ',      // 设置初始值
                    renderingConfig: {
                        codeSyntaxHighlighting: true,   // 开启代码高亮
                        highlightingTheme: 'atom-one-light' // 自定义代码高亮主题
                    }
                }
            }
        },
        components: {
            markdownEditor,   // 声明组件markdownEditor             
        },
        computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
        mounted(){          
          var that = this;
          this.$help.$on("edit_blog",function(blogId,title,tag,content){
           that.blogId = blogId;
           that.title = title;
           that.tag = tag;
           that.content = content;
           that.update = true;
          })

        },
        methods:{
        public(){
         var that = this;
         if(this.content!=''){
          if (!this.update){
              this.$axios.post('http://121.42.32.13:3000/add_article',this.$qs.stringify({
                    blogId : that.blogId,
                    title : that.title,
                    tag : that.tag,
                    content :that.getHtml(),
                })).then(res=>{
                    if(res.data.code==1){
                      that.$message.success("发布成功");
                      setTimeout(function(){
                          that.$router.push("/admin")
                      },500)
                    }else{
                      that.$message.error("发布失败！")
                    }
                })
         }
         else{      
          this.$axios.post('http://121.42.32.13:3000/update_article',this.$qs.stringify({
                    blogId :that.blogId,
                    title : that.title,
                    tag : that.tag,
                    content :that.getHtml(),
                })).then(res=>{
                    if(res.data.code==1){
                      that.$message.success("修改成功");
                      setTimeout(function(){
                          that.$router.push("/admin")
                      },500)
                    }else{
                      that.$message.error("修改失败！")
                    }
                })

         }
         } 
         else{
           this.$message.error('不能为空');
         }
      },
      getHtml(){
                let $html = '';
                $html = this.simplemde.markdown(this.content);
                return $html;
            },
    }
}

</script>
<style>
#input_{
    border-radius: 4px;
    padding:10px;
    color: #409eff;
    box-sizing: border-box;
    color: #fff;
    font-size: 16px;
}

#input_ input{
  padding:5px;
  width: 300px;
  height: 20px;
  margin: 0 20px 20px 0;
  border-radius: 4px;

}
</style>
















