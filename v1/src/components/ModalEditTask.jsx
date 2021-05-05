import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setEditList } from '../store/actions/taskAction'
import './css/ModalNewTask.css'

export default function ModalEditTask(props) {

  const { data, todoId } = props

  const [editTask, setEditTask] = useState({
    id: data.id,
    name: data.name,
    progress_percentage: Number(data.progress_percentage)
  })
  const dispatch = useDispatch()
  
  if (!props.show) {
    return null
  }

  function onChange (e) {
    let { name, value } = e.target
    if (name === 'progress_percentage') {
      value = Number(value)
    }
    const newInputTask = { ...editTask, [name]: value }
    setEditTask(newInputTask)
  }


  function submitEditTask (e) {
    e.preventDefault()
    dispatch(setEditList({ task: editTask, id: todoId }))
    props.onClose()
  }

  return (
    <div>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}  >
          <div className="modal-header">
            <h4 className="modal-title">Edit Task</h4>
          </div>
          <div className="modal-body">
            <form className="form" onSubmit={e => submitEditTask(e)}>
              <label className="form-label">Task Name</label>
              <input type="text" value={editTask.name} onChange={onChange} name="name" className="form-control" placeholder="example: Build rocket to Mars."></input>
              <label className="form-label">Progress</label>
              <input type="number" value={editTask.progress_percentage} onChange={onChange} name="progress_percentage" className="form-control" max={100} placeholder="0%" style={{width: "100px"}}></input>
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
