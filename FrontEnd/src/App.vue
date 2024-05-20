<template>
  <div id="app" v-if="!loadingData">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#676767" text-color="#fff"
      :default-active="activeIndex" active-text-color="#ffd04b">
      <el-menu-item class='labelIcon' id="title">
        <router-link to="/">{{ appName }}</router-link>
      </el-menu-item>
      <!-- <el-tooltip class='labelIcon' v-for="operation in filter(operationArray)" :key="operation" :content="operation"
        effect="light">
        <el-menu-item :index="operation">
          {{ operation }}
        </el-menu-item>
      </el-tooltip> -->
      <el-menu-item>

        <router-link to="/login">登录</router-link>

      </el-menu-item>

      <el-menu-item>

        <router-link to="/register">注册</router-link>

      </el-menu-item>
      <el-menu-item>

        <router-link to="/user">账号</router-link>

      </el-menu-item>
    </el-menu>

    <div class="content-container">

      <router-view></router-view>

      <!-- <todo></todo> -->
    </div>
  </div>
</template>

<script>
import VisTemplate from './components/VisTemplate.vue'
import { getTabularDataset, getAllTask } from '@/communication/communicator.js'
import { Dataset } from '@/dataset/dataset.js'
// import Header from './todo/header.vue'
import todo from './todo/todo.vue'
import router from './router';

export default {
  name: 'app',
  components: {
    VisTemplate,
    // Header,
    // Footer,
    todo,
  },
  watch: {
    displayMode: function () {
      console.log('displayMode')
    }
  },
  computed: {
    // todoLink() {
    //   return { name: 'home', params: { todos: this.todoList } }
    // },
  },
  data() {
    return {
      appName: "Todo",
      operationArray: ['#operation1', '#operation2'],
      activeIndex: '',
      loadingData: true,

    }
  },
  beforeMount: function () {
    let self = this
    window.sysDatasetObj = new Dataset()
    // let tabularDataDeferObj = $.Deferred()
    let todoDataDeferObj = $.Deferred()
    $.when(todoDataDeferObj).then(function () {
      self.loadingData = false
    })
    let tabularDataList = ['*']
    // initialize the tabular dataset
    // getTabularDataset(tabularDataList, function (processed_tabular_datalist_str) {
    //   let processed_tabular_datalist = JSON.parse(processed_tabular_datalist_str)
    //   console.log('processed_tabular_datalist', processed_tabular_datalist)
    //   sysDatasetObj.updateTabularDatasetList(processed_tabular_datalist)
    //   tabularDataDeferObj.resolve()
    // })
    getAllTask(function (processed_task_list_str) {
      // let processed_task_list = JSON.parse(processed_task_list_str)
      var todolist = []
      for (var i = 0; i < processed_task_list_str.length; i++) {

        var task = processed_task_list_str[i]
        var todo = {
          id: task.id,
          content: task.title,
          completed: task.isCompleted,
          createdAt: new Date(task.createdAt),
          description: task.description,
          date: new Date(task.targetTime)
        }
        todolist.push(todo)
      }
      // if(todolist.)
      sysDatasetObj.updateTodoList(todolist)
      // this.todoList = processed_task_list_str
      todoDataDeferObj.resolve()
    })

  },
  mounted: function () {

  },
  methods: {
    iconClass(operation) {
      return 'icon-' + operation
    },
    filter(list) {
      return list
    }
  }
}
</script>

<style lang="less" scoped></style>

<style lang="less">
html {
  font-size: 100%;
}

@menu-height: 2.5rem;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;

  .el-menu.el-menu--horizontal {
    .el-menu-item {
      height: @menu-height;
      line-height: @menu-height;
    }

    .el-menu-item {
      border-bottom-color: rgb(84, 92, 100) !important;
      font-weight: bolder;
      font-size: 1rem;
      color: #dadada !important;
      padding: 0 10px;

      .icon {
        color: #dadada !important;
      }
    }
  }

  .labelIcon {
    font-size: 1rem;
  }

  .content-container {
    position: absolute;
    top: @menu-height;
    left: 0%;
    bottom: 0%;
    right: 0%;
  }
}
</style>
