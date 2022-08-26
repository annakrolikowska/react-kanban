import React,{useState} from 'react';
import './App.css';
import Board from './components/Board.js'
import Form from './components/Form';

import {TaskContext, ColumnContext} from './context'

function App() {

    const columns = ([
        { id: 1, title: 'To do', limit: 4, className: 'column col_first'},
        { id: 2, title: 'In progress', limit: 2, className: 'column col_second'},
        { id: 3, title: 'Review', limit: 3, className: 'column col_third'},
        { id: 4, title: 'Done', limit: 4, className: 'column col_fourth'}
    ])

    const tasksInMemory = JSON.parse(localStorage.getItem('task')) || [];
    const [tasks, setTasks] = useState(tasksInMemory)

    const setItem = (tasks) => {
        localStorage.setItem('task', JSON.stringify([...tasks]))
        setTasks(JSON.parse(localStorage.getItem('task')) || [])
    }

    const moveTask = task => {
        if(task.columnId === 4) {return}
        let taskList = [...tasks]; 
        const nextCol = task.columnId+1
        const taskQty = taskList.filter((task) => task.columnId === nextCol).length

        if(taskQty <  columns[nextCol-1].limit) {
            taskList.forEach((oldElement) => {
                if(oldElement.id === task.id) {
                    oldElement.columnId++
                }    
            })
            setItem(taskList)
        } else {
            alert('The task limit in the column cannot be exceeded')
        }
    }

    const moveBackTask = task => {
        if(task.columnId === 1) {return}
        let taskList = [...tasks]; 
        const prevCol = task.columnId-1
        const taskQty = taskList.filter((task) => task.columnId === prevCol).length

        if(taskQty <  columns[prevCol-1].limit) {
            taskList.forEach((oldElement) => {
                if(oldElement.id === task.id) {
                    oldElement.columnId--
                }    
            })
            setItem(taskList)
        } else {
            alert('The task limit in the column cannot be exceeded')
        }
    }

    const getNewTask = (newTask) => { 
        const toDoTasks = [...tasks].filter((task) => task.columnId === 1).length

        if(toDoTasks < columns[0].limit) {
            localStorage.setItem('task', JSON.stringify([...tasks, newTask]))
            setTasks(JSON.parse(localStorage.getItem('task')) || [])
        } else {
            alert('Task limit (4) cannot be exceeded')
        }
    }

    const removeTask = (task) => {
        if (window.confirm("Are you sure you want to delete the task?") == true) {
            const tasksList =  JSON.parse(localStorage.getItem('task'))
            const updateTasks = tasksList.filter(item => item.id !== task.id)
            
            setItem(updateTasks)
        } else {
            window.alert("Deletion has been cancelled")
        }
    }

    const {Provider: TaskProvider} = TaskContext;
    const {Provider: ColumnProvider} = ColumnContext;

    return (
        <>
            <Form getNewTask={getNewTask}/>
            <ColumnProvider value={{columns}}>
                <TaskProvider value={{tasks,moveTask, moveBackTask, removeTask}}> 
                    <Board/>
                </TaskProvider> 
            </ColumnProvider>
        </>
    );
}

export default App;
