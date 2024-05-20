<template>

  <div class="login-wrapper">

    <el-form label-width="80px">

      <el-form-item label="用户名">

        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>

      </el-form-item>

      <el-form-item label="密码">

        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>

      </el-form-item>

      <el-form-item>

        <el-button type="primary" @click="login">登录</el-button>

      </el-form-item>

    </el-form>

  </div>

</template>



<script>

export default {

  data() {

    return {

      form: {

        username: '',

        password: ''

      }

    }

  },

  methods: {

    login() {

      // 在这里处理登录逻辑

    }

  }

}

</script>



<style scoped>
.login-wrapper {

  width: 400px;

  margin: 0 auto;

  padding: 40px;

  background-color: #f2f2f2;

}
</style>