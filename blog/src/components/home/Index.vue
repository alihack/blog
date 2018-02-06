<template>
<transition enter-active-class="animated zoomInDown">

<div id="app">
 <el-container>
  <el-header height="300px"><Header> </Header></el-header>
  <el-container>   
    <el-aside><Aside></Aside></el-aside>
      <el-main><router-view></router-view></el-main>      
  </el-container>
  <el-footer><Copyright></Copyright></el-footer>
</el-container>
</div>
</transition>
</template>

<script>
import Article from './Article'
import Copyright from './Copyright'
import Header from './Header'
import Aside from './Aside'
export default {
  name: 'app',
  components: {
    Article,Copyright,Header,Aside
  },
  mounted(){
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
}
</script>

<style>
  .el-header  {
    background-color: #21282e;
    color: #333;
    border-bottom: 1px solid #ddd;
    width: 100%
  }
  .el-aside {
    color: #333;
    text-shadow: 0 1px #fff;
    background: #E9EEF3;
    line-height: 200px;
    padding: 20px 0px 20px 20px;
    width: 30%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    width: 70%;
  }
  .el-footer{
    background-color:#21282e ;
    color: #333;
    text-align: center;
  }

  
  #header-title {
    text-align: center;
    height: 400px;
    margin-top: 80px;
}

#logo{
    font-size: 40px;
    line-height: 40px;
    letter-spacing: 2px;
    background: #e32d40;
    padding: 5px 10px;
    border-radius: 5px;
}
#subtitle {
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 1px;
    color: #687e91;
    text-decoration: none;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
#subtitle-wrap{
    margin-top:12px; 
}
#logo {
    text-decoration: none;
    color: #fff;
    font-weight: 300;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
</style>