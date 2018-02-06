<template>
<div id="banner">
	<nav>
		<ul>
			<li><router-link to="/home">主页</router-link></li>
			<li><router-link to="/article_file">文章归档</router-link></li>
			<li><router-link to="/about">关于</router-link></li>
            <li><router-link to="/message">留言</router-link></li>
		</ul>
	</nav>
	<div id="header-title">
	<h1 id="logo-wrap">
        <a href="/" id="logo">陈立前端博客</a>
    </h1>
      
    <h2 id="subtitle-wrap">
        <a href="/" id="subtitle">我所荒废的今日,正是昨日殒身之人所祈求的明日</a>
    </h2>
    </div>
</div>
</template>

<script>
	export default {
		data () {
			return {
				msg: '这里放文章'
			}
		}
	}
</script>


<style scoped>
ul {
    overflow: hidden;
}

li {
    float: left;
    font-size: 1rem;
}
li a {
    display: block;
    color:#909399;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}
li a:hover {
    color:white ;
}
#header-title {
    text-align: center;
    height: 400px;
    margin-top: 80px;
}
#logo{
    font-size: 2.5rem;
    line-height:2rem;
    letter-spacing: 2px;
    background: #e32d40;
    padding: 5px 10px;
    border-radius: 5px;
}
#subtitle {
    font-size:1rem;
    line-height:2rem;
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