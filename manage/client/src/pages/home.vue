<template>
  <el-container id="main">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="201px">
        <Aside />
      </el-aside>
      <el-container>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/header';
import Aside from '../components/aside';
import Main from '../components/main';
export default {
  components: {
    Header,
    Aside,
    Main
  },
  data(){
    return{

    }
  }
};
</script>

<style>
#main{
  height: 100%;
}
.el-header{
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  overflow: inherit;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>