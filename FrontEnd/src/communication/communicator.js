// 
import axios from 'axios'
import { descriptionProps } from 'element-plus'
// import { id } from 'element-plus/es/locale'
// let server_address = 'http://127.0.0.1:14449'
let server_address = 'http://10.62.43.245:8080'
// let server_address = ''

// export function getTabularDataset(tabularDataList, getTabularDataCallback) {
//     let formData = {"tabularData": tabularDataList}
//     axios({
//         methods: 'get',
//         url: server_address + '/tabulardata',
//         params: formData,
//         timeout: 5000
//     })
//     .then((res) => {
//         let tabularDatasetList = res['data']['data']
//         console.log('tabularDatasetList', tabularDatasetList)
//         getTabularDataCallback(tabularDatasetList)
//     })
// }

export function getTabularDataset(tabularDataList, getTabularDataCallback) {
    let formData = {"tabularData": tabularDataList}
    axios({
        method: 'POST',
        url: server_address + '/tabulardata',
        data: {
            id: 1,
            name: "zhangsan"
        },
        timeout: 5000
    })
    .then((res) => {
        console.log('res.data', res.data)
    })
}
export function sendCreatedTask(task, sendTaskDataCallback) {
    // let formData = {"tabularData": tabularDataList}
    axios({
        method: 'POST',
        url: server_address + '/api/task',
        data: {
            createdAt: task.createdAt,
            targetTime: task.date,
            title:task.content,
            description:task.description,
            isCompleted:false
        },
        timeout: 5000
    })
    .then((res) => {
        // console.log('res.data', res.data)
        sendTaskDataCallback(res.data)
    })
}
export function updateTask(task, sendTaskDataCallback) {
    // let formData = {"tabularData": tabularDataList}
    axios({
        method: 'PUT',
        url: server_address + '/api/task',
        data: {
            id:task.id,
            createdAt: task.createdAt,
            targetTime: task.date,
            title:task.content,
            description:task.description,
            isCompleted:task.completed,
        },
        timeout: 5000
    })
    .then((res) => {
        console.log('res.data', res.data)
    })
}
export function deleteTask(task_id, sendTaskDataCallback) {
    // let formData = {"tabularData": tabularDataList}
    axios({
        method: 'DELETE',
        url: server_address + '/api/task/'+task_id,
        
        timeout: 5000
    })
    .then((res) => {
        console.log('res.data', res.data)
    })
}
export function getAllTask( getAllTaskDataCallback) {
    // let formData = {"tabularData": tabularDataList}
    axios({
        method: 'GET',
        url: server_address + '/api/task',
        
        timeout: 5000
    })
    .then((res) => {
        console.log('res.data', res.data)
        getAllTaskDataCallback(res.data)
    })
}
export function getTaskById(task_id, getTaskDataCallback) {
    // let formData = {"tabularData": tabularDataList}
    axios({
        method: 'GET',
        url: server_address + '/api/task/'+task_id,
        
        timeout: 5000
    })
    .then((res) => {
        console.log('res.data', res.data)
        getTaskDataCallback(res.data)
    })
}