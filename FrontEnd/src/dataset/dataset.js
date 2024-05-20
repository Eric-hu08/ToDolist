export function Dataset () {
    this.tabularDatasetList = []
    this.todoList = []
}

Dataset.prototype = {
    init: function() {
    },
    updateTabularDatasetList: function(processed_tabular_datalist) {
        this.tabularDatasetList = processed_tabular_datalist
    },
    updateTodoList: function(processed_todo_list) {
        this.todoList = processed_todo_list
    }
}