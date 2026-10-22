import { useState } from 'react'

function TaskForm({onSubmit, onClose, task, updateTask}) {

    const [title, setTitle] = useState(task?.title ?? '')
    const [category, setCategory] = useState(task?.category ?? '')

    function handleSubmit(e) {
        e.preventDefault()
        if(!title.trim() || !category.trim()) return

        if(task){
            updateTask(task.id, title, category)
        } else{
            onSubmit(title, category)
        }

        onClose()
    }

    return (
        <>
            <div className="modal-enterForm" onClick={onClose}>
                <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                    <h3>{task ? 'Edit' : 'Add'} Task</h3>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="enter the title"


                    />
                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="enter the category"
                    />
                    <br/>
                    <button type="submit">
                        {task ? 'Save Changes' : '+'}
                     </button>
                </form>
            </div>
        </>
    )
}

export default TaskForm
