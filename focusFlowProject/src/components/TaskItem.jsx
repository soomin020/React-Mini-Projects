function TaskItem({task, onToggle, deleteTask, updateTask, setModal, setSelectedTask}) {

  return (
    <>
        <div className="task-item">
            <input type="checkbox" checked={task.status === 'completed'} onChange={() => onToggle(task.id)}/>
            <div className="task-content">
               <h3>{task.title}</h3>
               <p>{task.category}</p>
            </div>
            <div className="task-status">
                <p>{task.status}</p>
            </div>
            <button type="button" className="del-task-btn" onClick={()=>deleteTask(task.id)}> X </button>
            <button type="button" className="upt-task-btn" onClick={()=> {setSelectedTask(task), setModal(true)} }> Edit </button>
        </div>
    </>
  )
}

export default TaskItem
