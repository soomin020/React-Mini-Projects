import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Modal } from './Modal.jsx'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const initialData = [
    {id:'c1', title:'todo', cards:[{id:'k1', text:'workout'}]},
    {id:'c2', title:'in progress', cards:[]},
    {id:'c3', title:'done', cards:[]},
]


function App() {
    const [containers, setContainers] = useState(initialData)
    const [modal, setModal] = useState(null)

    function handleDragEnd(result) {
      const {source, destination} = result

      if(!destination) return

      const newContainers = containers.map((c) => ({...c, cards:[...c.cards]}))

      const sourceContainer = newContainers.find((c) => c.id === source.droppableId)
      const [movedCard] =  sourceContainer.cards.splice(source.index, 1)
      const destContainer = newContainers.find((c) => c.id === destination.droppableId)
      destContainer.cards.splice(destination.index, 0, movedCard)
      setContainers(newContainers)

    }

    function addContainer(title){
        const newContainer = {id:crypto.randomUUID(), title, cards:[]}
        setContainers([...containers, newContainer])
    }

    function addCard(containerId, text){
        const newCard = {id:crypto.randomUUID(), text}
        setContainers(
            containers.map((c) =>
                c.id === containerId
                    ? { ...c, cards:[...c.cards, newCard]}
                    : c
            )
        )
    }

    function deleteContainer(id){
        setContainers(containers.filter((c) => c.id !== id))
    }


    return (



      <div className="app">
        <header className="header">
          <h1 className="title">DragTrack</h1>
          <button
            type="button"
            className="add-container-btn"
            onClick={() => setModal({ type: 'container' })}
          >
            Add Container
          </button>
        </header>


        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="containers">
            {containers.map((container) => (
              <div className="container" key={container.id}>
                <div className="container-header">
                  <h2 className="container-title">{container.title}</h2>
                  <Button className="delete-container-btn" onClick={() => deleteContainer(container.id)} variant="outlined" color="error" size="small" > x </Button>
                </div>

                <Droppable droppableId={container.id}>
                  {(provided) => (
                    <div
                      className="card-list"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {container.cards.map((card, index) => (
                        <Draggable draggableId={card.id} index={index} key={card.id}>
                          {(provided) => (
                            <div
                              className="card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {card.text}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <button
                  type="button"
                  className="add-card-btn"
                  onClick={() => setModal({ type: 'card', containerId: container.id })}
                >
                  Add Card
                </button>
                </div>
            ))}
          </div>
        </DragDropContext>


        {modal?.type === 'container' && (
          <Modal
            title="Add Container"
            placeholder="Container Name"
            onClose={() => setModal(null)}
            onSubmit={addContainer}
          />
        )}

        {modal?.type === 'card' && (
          <Modal
            title="Add Card"
            placeholder="Card Name"
            onClose={() => setModal(null)}
            onSubmit={(text) => addCard(modal.containerId, text)}
          />
        )}
      </div>
    )
}

export default App
