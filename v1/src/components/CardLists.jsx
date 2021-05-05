import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { moveToAnotherTodo, setDeleteList } from '../store/actions/taskAction'
import ModalEditTask from './ModalEditTask'
import { threeDotsSvg, checklistSvg } from '../assets/'
import { arrowLeftSvg, arrowRightSvg, editSvg, deleteSvg } from '../assets/'
import './css/CardLists.css'

export default function CardLists(props) {

  const { item, listOfTodo, todoId } = props
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  if (item.length === 0) {
    return (
      <div className="card m-3">
        <div>
          No task Available
        </div>
      </div>
    )
  }

  function filter (operator) {
    let filterId
    if (operator === 'smaller') {
      filterId = listOfTodo.filter(todo => todo.id < todoId)
      return filterId[filterId.length - 1]
    } else {
      filterId = listOfTodo.filter(todo => todo.id > todoId)
      return filterId[0]
    }
  }

  function moveLeftTodo (e, item) {
    e.preventDefault()
    const nextTodo = filter('smaller')
    dispatch(moveToAnotherTodo({ idTodo: nextTodo.id, item }))
  }

  function moveRightTodo (e, item) {
    e.preventDefault()
    const nextTodo = filter()
    // console.log(nextTodo, todoId, "ini dari moveright")
    dispatch(moveToAnotherTodo({ idTodo: nextTodo.id, item }))
  }

  function deleteList (e, itemId) {
    e.preventDefault()
    dispatch(setDeleteList({todoId, itemId}))
  }

  return (
    <div className="card my-2">
      <div style={{fontSize: "14px"}} className="mx-2">
        {item.name}
      </div>
      <div className="row mx-1">
        <div className="col-4">
          {
            item.progress_percentage === 100 ? <progress style={{width: "60px"}} value={item.progress_percentage} max={100}/> :
            <progress style={{width: "60px"}} value={item.progress_percentage} max={100}/>
          }
        </div>
        <div style={{fontSize: "12px"}} className="col-4">
          {
            item.progress_percentage === 100 ? <img src={checklistSvg} alt="checklist" /> :
            item.progress_percentage + ' %'
          }
        </div>
        <div className="col-4">
          <div className="dropdown">
            <img className="dropbtn" src={threeDotsSvg} alt="threeDots" />
            <div className="dropdown-content">
              {
                filter('smaller') === undefined ? null :
                <a onClick={e => moveLeftTodo(e, item)}><img src={arrowLeftSvg} alt="arrowLeft" />  Move Left</a>
              }
              {
                filter() === undefined ? null :
                <a onClick={e => moveRightTodo(e, item)}><img src={arrowRightSvg} alt="arrowRight" />  Move Right</a>
              }
              <a onClick={() => setShow(true)}><img src={editSvg} alt="edit" />  Edit</a>
              <ModalEditTask onClose={() => setShow(false)} todoId={todoId} show={show} data={{id: item.id ,name: item.name, progress_percentage: item.progress_percentage}} />
              <a onClick={e => deleteList(e, item.id)}><img src={deleteSvg} alt="delete" />  Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
