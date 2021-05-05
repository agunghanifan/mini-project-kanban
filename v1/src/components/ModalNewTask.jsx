import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAddList } from '../store/actions/taskAction'
import './css/ModalNewTask.css'

export default function ModalNewTask(props) {

  const [newTask, setNewTask] = useState({
    name: '',
    progress_percentage: 0
  })
  const dispatch = useDispatch()
  
  if (!props.show) {
    return null
  }

  function onChange (e) {
    let { name, value } = e.target
    if (name === 'progress_percentage') {
      console.log("masuk sini")
      value = Number(value)
    }
    const newInputTask = { ...newTask, [name]: value }
    setNewTask(newInputTask)
  }


  function addTask (e) {
    e.preventDefault()
    dispatch(setAddList({ task: newTask, id: props.id }))
    props.onClose()
  }

  return (
    <div>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}  >
          <div className="modal-header">
            <h4 className="modal-title">Create Task</h4>
          </div>
          <div className="modal-body">
            <form className="form" onSubmit={e => addTask(e)}>
              <label className="form-label">Task Name</label>
              <input type="text" value={newTask.name} onChange={onChange} name="name" className="form-control" placeholder="example: Build rocket to Mars."></input>
              <label className="form-label">Progress</label>
              <input type="number" value={newTask.progress_percentage} onChange={onChange} name="progress_percentage" className="form-control" max={100} placeholder="0%" style={{width: "100px"}}></input>
          <div className="modal-footer">
            <button onClick={props.onClose} className="btn btn-light">Cancel</button>
            <button className="btn btn-success">Save Task</button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
