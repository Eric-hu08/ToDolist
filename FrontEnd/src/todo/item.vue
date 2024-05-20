<template>

  <div :class="['todo-item', todo.completed ? 'completed' : '']">

    <div class="todo-content">
      <input type="checkbox" class="toggle" v-model="todo.completed">
      <div class="todo-text" @click="itemClick">
        <label for="">{{ todo.content }}</label>
        <span>{{ genDateString(todo.date)
          }}</span>
      </div>
    </div>
    <button class="destory" @click="deleteTodo"></button>
  </div>


</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { updateTask } from '@/communication/communicator';
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState([
      'displayMode',
      'detailShow',
      'detailData',
    ]),

  },
  watch: {
    todo: {
      handler(completed) {
        console.log("completed", completed);
        updateTask(this.todo);
      },
      deep: true,
    },
  },
  mounted: function () {

  },
  methods: {
    deleteTodo() {
      console.log("delete!!!!")
      this.$emit('del', this.todo.id);
    },
    genDateString(date) {
      if (date == null) {
        return null
      }
      // date = new Date(date)
      console.log("date", date, typeof date)
      return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
    },
    itemClick() {
      var f_show = this.detailShow;
      var id = this.todo.id
      if (f_show == id) {
        this.$store.commit('setDetailShow', -1)
        var div_width = parseFloat(d3.select("body").select(".item-container").style("width"))
        d3.select("body").select(".item-container").style("width", div_width * 2 + "px")

      } else {
        if (f_show == -1) {
          var div_width = parseFloat(d3.select("body").select(".item-container").style("width"))
          // console.log("div witdh", div_width, div_width / 2, d3.select("body").select(".todo-item"))
          d3.select("body").select(".item-container").style("width", div_width / 2 + "px")
        }

        // console.log("div witdh", d3.select("body").select(".todo-item").style("width"), d3.select("body").select(".todo-item"))
        this.$store.commit('setDetailData', this.todo)
        this.$store.commit('setDetailShow', id)

      }
    }
  }
}
</script>

<style lang="less">
.todo-item {
  position: relative;

  background-color: #fff;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:hover {
    .destory:after {
      content: 'x';
    }
  }

  label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 15px;


    line-height: 1.2;
    transition: color 0.4s;
  }

  span {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 15px;
    // text-align: center;
    font-size: 15px;
    line-height: 1.2;
    transition: color 0.4s;
    position: absolute;
    left: 50%;
    // right: 20%
  }

  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }

    span {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }

  .todo-content {
    display: flex;
    align-items: center;
    //   width: 300px;
    height: 60px;

    .todo-text {
      position: relative;
      top: 0;
      bottom: 0;
      left: 8%;
      right: 0%;
      width: 60%;
      text-align: left;
    }

  }
}


.button {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 95%;
  right: 0%;
}

.toggle {

  text-align: right;
  width: 50px;
  height: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0%;
  right: 80%;

  margin: auto 0;
  border: none;
  appearance: none;
  outline: none;

  &:after {
    content: url('../assets/images/unChecked.svg');
  }

  &:checked:after {
    content: url('../assets/images/checked.svg');
  }
}

.destory {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color: transparent;
  appearance: none;
  border-width: 0;
  cursor: pointer;
  outline: none;
}
</style>
