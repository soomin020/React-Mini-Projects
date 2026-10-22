import TaskItem from './TaskItem.jsx'

function TaskList({tasks, onToggle, deleteTask, updateTask, setModal, setSelectedTask }) {

  return (
    <>
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} deleteTask={deleteTask} updateTask={updateTask} setModal={setModal} setSelectedTask={setSelectedTask}/>
            ))}
        </div>
    </>
  )
}

export default TaskList
