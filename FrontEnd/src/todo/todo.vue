<template>
    <div class="app-div">
        <section class="real-app">

            <div class="date-picker-container">
                <input type="text" ref="add_input" class="add-input" autofocus="autofocus" placeholder="接下来做什么"
                    @keyup.enter="addTodo">
                <el-date-picker v-model="input_date" type="datetime" placeholder="Select date and time"
                    :shortcuts="shortcuts" ref="datePicker" />
                <el-button @click="addTodo">添加</el-button>
                <el-popover placement="bottom-end" :width="600" trigger="click">
                    <template #reference>
                        <el-button style="margin-right: 16px">Click to activate</el-button>
                    </template>
                    <el-calendar>
                        <template #date-cell="{ data }">
                            <p :class="data.isSelected ? 'is-selected' : ''">
                                {{ data.day.split('-').slice(1).join('-') }}
                                {{ data.isSelected ? '✔️' : '' }}
                            </p>
                        </template>
                    </el-calendar>
                </el-popover>
            </div>
            <div class="item-main-container">
                <div class="item-container">
                    <Item v-for="todo in filterTodos" :todo="todo" :key="todo.id" @del="deleteTodo" />
                </div>
                <div class="todo-detail" v-if=ifdetailShow(detailShow)>
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <el-icon>
                                    <Aim />
                                </el-icon>
                                <span class="header_text">任务：
                                    <span class="header_text" @input="onContentChange" contenteditable="true"
                                        @blur="updateTodoContent(detailData.id, detailData.content)">{{
                                            detailData.content }}</span>
                                </span>

                            </div>
                        </template>
                        <div class="card-line1">
                            <el-icon>
                                <AlarmClock />
                            </el-icon>
                            <span>到期日：{{ detailData.date.toISOString().slice(0, 19).replace('T', ' ') }}</span>
                        </div>
                        <el-input v-model="todo_descript" :rows="5" type="textarea" pleaceholder="任务描述"
                            @change="updateTodoDescript"></el-input>
                        <template #footer>Footer</template>
                    </el-card>
                </div>
            </div>
            <div class="tabs-container">
                <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAll="clearAllCompletedTodo" />
            </div>
        </section>
    </div>
</template>

<script>
import { ElDescriptionsItem } from 'element-plus';
import Item from './item.vue';
import Tabs from './tabs.vue';
import { ref } from 'vue'
import { mapState, mapMutations } from 'vuex';
import { getTabularDataset, sendCreatedTask, updateTask, deleteTask } from '@/communication/communicator';


const defaultTime = new Date()


// import { constants } from 'crypto';

let id = 0;

export default {

    data() {
        return {
            todos: [],
            filter: 'all',
            input_date: null,
            shortcuts: [
                {
                    text: 'Today',
                    value: new Date(),
                },
                {
                    text: 'Yesterday',
                    value: () => {
                        const date = new Date()
                        date.setDate(date.getDate() - 1)
                        return date
                    },
                },
                {
                    text: 'A week ago',
                    value: () => {
                        const date = new Date()
                        date.setDate(date.getDate() - 7)
                        return date
                    },
                },
            ],

            todo_descript: null,
            edit_content: null,

        }
    },
    components: {
        Item,
        Tabs
    },
    watch: {
        detailShow: function () {
            this.todo_descript = this.detailData.description
        },
    },
    computed: {
        filterTodos() {
            var todos;
            if (this.filter === 'all') {
                todos = this.todos
            }
            else {
                const filterCompleted = this.filter === 'completed';
                todos = this.todos.filter(todo => todo.completed === filterCompleted)
            }
            // console.log("filter date", todos, todos[0].date, typeof todos[0].date)
            var todo_array = todos.sort((a, b) => { return a.date - b.date })
            console.log("todos", todo_array)
            // this.$forceUpdate()
            return todo_array
        },
        ...mapState([
            'displayMode',
            'detailShow',
            'detailData',
        ])
    },
    beforeMount: function () {
        console.log("todos in todo", this.todos)
        this.todos = window.sysDatasetObj.todoList
        console.log("todos", this.todos)
    },
    mounted: function () {

    },
    methods: {
        onContentChange(event) {
            this.edit_content = event.target.innerText
            console.log("change content ", this.edit_content)
        },
        updateTodoContent(t_id, t_content) {
            // console.log("change content ", this.detailData, t_id, t_content, this.edit_content)
            for (var i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id == t_id) {
                    this.todos[i].content = this.edit_content
                    console.log("change content!,", this.todos[i], this.todos)


                    updateTask(this.todos[i])
                }
            }



        },
        ifdetailShow(show_value) {
            console.log("show value", show_value)
            if (show_value == -1) {
                return false
            }
            return true

        },

        updateTodoDescript() {
            var id = this.detailData.id
            console.log("update descript", id, this.todos)
            for (var i = 0; i < this.todos.length; i++) {
                console.log("todos id", this.todos[i], this.todos[i].id)
                if (this.todos[i].id == id) {
                    this.todos[i].description = this.todo_descript
                    // TODO send to server
                    console.log("update descript", this.todos[i])
                    updateTask(this.todos[i])
                }
            }

        },
        addTodo(e) {
            var input_target = this.$refs.add_input;
            if (input_target.value == '') {
                return
            }
            var date = this.input_date
            console.log("input date ", date)
            if (date == null) {
                date = new Date()
            }
            console.log("input date ", date)
            var todo = {
                id: id++,
                createdAt: new Date(),
                content: input_target.value,
                date: date,
                completed: false,
                description: null,
            }

            console.log("create task!")
            sendCreatedTask(todo, (res) => {
                console.log("sendCreatedtask res", res)
                // let json_v = JSON.parse(res)
                // console.log("json_v", json_v)
                todo.id = res.id

            })
            this.todos.unshift(todo);
            input_target.value = '';
            this.input_date = null
        },
        deleteTodo(id) {
            console.log("delete!!", id)
            deleteTask(id)
            this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1);
        },
        toggleFilter(state) {
            console.log(state);
            this.filter = state;
        },
        clearAllCompletedTodo() {
            this.todos = this.todos.filter(todo => todo.completed === false);
        }
    }
}
</script>

<style lang="less">
.app-div {
    position: absolute;
    left: 20%;
    right: 20%;
    top: 0%;
    bottom: 0%;
}

.real-app {
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    //   margin: 0 auto;
    box-shadow: 0 0 5px #666;
}

.date-picker-container {
    position: absolute;
    top: 0%;
    bottom: 91%;
    left: 0%;
    right: 0%;
}

.item-main-container {
    position: absolute;
    top: 9%;
    bottom: 20%;
    left: 0%;
    right: 0%;

    .todo-detail {
        position: absolute;
        left: 50%;
        top: 0%;
        right: 0%;
        bottom: 0%;
        text-align: left;

        .header_text {
            font-size: 20px;
            font-weight: bold;
        }

        .card-line1 {
            border-bottom: 1px solid #ccc;
            width: 100%;
            margin-bottom: 10px;
        }
    }
}

.tabs-container {
    position: absolute;
    top: 95%;
    bottom: 0%;
    left: 0%;
    right: 0%;
}

.date-picker-container {
    position: absolute;
    top: 0%;
    bottom: 90%;
    left: 0%;
    right: 0%;

    display: flex;
    align-items: center;
}

.add-input {
    position: relative;
    margin: 0;
    width: 50%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: none;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 36px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
