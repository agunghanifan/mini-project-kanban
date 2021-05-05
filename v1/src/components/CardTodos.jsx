import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CardLists, ModalNewTask } from '../components/'
import { plus } from '../assets/'

export default function CardTodos(props) {
  const { todo } = props
  const [items, setItems] = useState([])
  const [show, setShow] = useState(false)
  const error = useSelector(state => state.taskReducer.error)
  const loading = useSelector(state => state.taskReducer.loading)
  const herokuAPI = 'https://todos-project-api.herokuapp.com'
  let token = localStorage.getItem('auth_token') || null
  let bearer = 'BEARER ' + token

  useEffect(() => {
    function fetchListItems (payload) {
      fetch(herokuAPI + `/todos/${payload}/items`, {
        method: 'GET',
        withCredentials: true,
        // credentials: 'include',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setItems(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    fetchListItems(todo.id)
  }, [bearer, todo.id])


  return (
    <div className="col">
      <div className="card">
        <div className="mx-3 my-2">
          <div style={{fontSize: "12px"}} className="card">
            {todo.title}
          </div>
          <div className="mb-3" style={{fontSize: "12px"}}>
            {todo.description}
          </div>
          {
            loading ? <p>Please wait ...</p> :
            error ? <p>{JSON.stringify(error)}</p> :
            items.length === 0 ? 
              <div className="card" style={{fontSize: "12px"}}>
                <div>
                  No task Available
                </div>
              </div> :
            items.map(item => {
              return <CardLists item={item} key={item.id} />
            })
          }
          <div onClick={() => setShow(true)} className="mt-3">
            <p style={{fontSize: "12px", margin: "0px"}}><img style={{width: "12px", height: "12px"}} src={plus} alt="plus" /> New Task</p>
          </div>
        </div>
      </div>
      <ModalNewTask onClose={() => setShow(false)} show={show} id={todo.id} />
    </div>
  )
}
