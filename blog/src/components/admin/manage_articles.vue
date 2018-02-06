<template>
	<transition enter-active-class="animated bounceInUp">
		<section class="manage-articles">
			<el-title-header :title="$route.meta.title"></el-title-header>
			<el-confirm-cancel :show.sync="show" @confirm="del">真的真的要删除吗?</el-confirm-cancel>

			<!-- 管理文章表格 begin -->
			<div class="table">
				<div class="common head">
					<span>编号</span>
					<span>日期</span>
					<span>用户名</span>
					<span>标题</span>
					<span>分类</span>
					<span>操作</span>
				</div>

				<div class="common list" v-for="item in data">
					<span>{{item.blogId}}</span>
					<span>{{item.time}}</span>
					<span>Admin</span>
					<span class="link">
						<a href="#" target="_blank">{{item.title}}</a>
					</span>
					<span>{{item.tag}}</span>
					<span class="operation">
						<i class="edit" @click="edit(item.blogId)" >编辑</i>
						<i class="del" @click="readyDelete(item.blogId)">删除</i>
					</span>
				</div>
			</div>
			<!-- 管理文章表格 end -->
		</section>
	</transition>
</template>


<script>
export default {
	name: 'manageArticles',
	data () {
		return {
			data:'',
			content:'',
			title:'1',
			tag:'',
			nowblogId:'',
			show: false,
		}
	},
	mounted(){
        var that = this;
        this.getList();
    },
	methods: {
		getList(){
            var that = this;
            this.$axios.post('http://121.42.32.13:3000/get_list', this.$qs.stringify({
              
            })).then(res=>{
                    var  res = that.$qs.parse(res).data;
                    if(res.code!=0){
                        that.data = res.data;
                    }else{                       
                    }
                })
        },
        readyDelete(blogId){
        	this.nowblogId = blogId;
            this.show = true;            
        },
		del () {
			var that = this;
            this.$axios.post('http://121.42.32.13:3000/del_list', this.$qs.stringify({
              blogId : that.nowblogId
            })).then(res=>{
                    if(res.code!=0){
                    	//this.show = true;
                        that.$message.success("删除成功");
                      setTimeout(function(){
                          that.$router.push("/admin")
                      },500)
                        }
                        else{
                       	that.$message({
                            message: '删除失败',
                            type: 'fail'
                        })                    
                	}
                })
		},
		edit (blogId) {
			this.nowblogId = blogId;
			this.$router.push({name:'releaseArticle'});
			var that = this;			
            this.$axios.post('http://121.42.32.13:3000/edit_blog', this.$qs.stringify({
              blogId : that.nowblogId
            })).then(res=>{           	
            	var  res = that.$qs.parse(res).data
            	this.$help.$emit('edit_blog',res.data.blogId,res.data.title,res.data.tag,res.data.content)                                                 
                })
            
            
                      
		},
}
}
</script>










