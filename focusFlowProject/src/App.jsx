import { useState } from 'react'
import './App.css'
import TaskStats from './components/TaskStats.jsx'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'

const initialData = [
    {id:'task1', title:'React 개념 복습', category:'study', status:'completed'},
    {id:'task2', title:'FocusFlow 구현', category:'project', status:'uncompleted'},
    {id:'task3', title:'CSS 디자인 정리', category:'design', status:'uncompleted'},
    {id:'task4', title:'FocusFlow GitHub README 작성', category:'project', status:'uncompleted'},
]


function App() {
    const [tasks, setTasks] = useState(initialData)

    const today = new Date();
    const date = String(today.getDate()).padStart(2, '0')
    const month = today.toLocaleString('en-US', { month: 'long' })
    const day = today.getDay()
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const dayString = week[day]

    const [ modal, setModal ]  = useState(false)

    function addTask(title, category){
        const newTask = {id:crypto.randomUUID(), title, category, status:'uncompleted'}
        setTasks([...tasks, newTask])
    }

    const [ selectedTask, setSelectedTask ] = useState(null)

    function updateTask( id, title, category){
         setTasks(tasks.map((task) => {
            if(task.id === id){
                return {
                    ...task, title, category
                }
            } return task
         }))
    }

    function deleteTask(id){
        setTasks(tasks.filter((t)=> t.id !== id))
    }

    function toggleTask(id){
        setTasks(tasks.map((task) => {
            if(task.id === id){
                const newStatus = ((task.status) === 'completed')
                    ? 'uncompleted'
                    : 'completed'

                return {
                            ...task, status:newStatus
                        }
            }
            return task
        }))
    }

    return (
        <>
            <div className="main-header">
                <p className="header-date">
                    {dayString}, {month} {date}
                </p>
                <h2 className="header-title">Today's Focus</h2>
                <p className="header-subtitle">작은 일부터 하나씩 완료해 보세요.</p>
            </div>

            <TaskStats tasks={tasks}/>


            <div className="task-part">
                <h1>My Tasks</h1>
                <button type="button" className="add-task-btn" onClick={()=> setModal(true)}>Add Task</button>
                <TaskList tasks={tasks} onToggle={toggleTask} deleteTask={deleteTask} updateTask={updateTask} setModal={setModal} setSelectedTask={setSelectedTask}/>
            </div>

            {modal && (
                <TaskForm
                    task ={selectedTask}
                    onClose={() => setModal(false)}
                    onSubmit={addTask}
                    updateTask={updateTask}
                />
            )}
        </>
    )
}

export default App
