import { useState } from 'react'
import './Modal.css'

export function Modal({ title, placeholder, onClose, onSubmit }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >


        <h3>Add {title}</h3>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter the content"
        />
        <br/>
        <button type="submit"> +  </button>
      </form>
    </div>
  )
}