<template>
<div v-show="isShow">
	<transition enter-active-class="animated zoomInDown">
		<section class="home">
			<el-header></el-header>
			<el-sidebar></el-sidebar>
			<!-- 右侧 begin -->
			<div class="route-right" :class="{active: !open}">
				<router-view></router-view>
				<el-footer></el-footer>
			</div>
			<!-- 右侧 end -->
		</section>
	</transition>
</div>
</template>
<script>

import { mapState } from 'vuex'
import elHeader from './header'
import elFooter from './footer'
export default {
	components: {
		elHeader,
		elFooter,
	},	
	data(){
		return{
			isShow:false
		}
	},
	mounted(){		
      this.isShow = this.$route.params.isShow
      if (!this.isShow) {
      	this.$message({
					message: '对不起，您无权访问',
					type: 'error'
				});
      }
	},
	computed: {
		...mapState(['open'])
	}
}
</script>






