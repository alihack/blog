<template>
<div id="copyright">
  <h1>{{msg}}<a href="http://www.miitbeian.gov.cn">|粤ICP备16117146号</a></h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Copyright © 2018 陈立前端博客 '
    }
  }
}
</script>


<style scoped>
#copyright{
	padding:12px;
}
h1{
  font-size:1rem;
  color: #909399
}
a{
  color: #909399
}
a:hover{
	color:red ;
}

</style>