import React from 'react'
import { threeDotsSvg, checklistSvg } from '../assets/'
import './css/CardLists.css'
import { arrowLeftSvg, arrowRightSvg, editSvg, deleteSvg } from '../assets/'

export default function CardLists(props) {

  const { item } = props

  if (item.length === 0) {
    return (
      <div className="card m-3">
        <div>
          No task Available
        </div>
      </div>
    )
  }

  return (
    <div className="card my-2">
      <div style={{fontSize: "14px"}} className="mx-2">
        {item.name}
      </div>
      <div className="row">
        <div className="col-5">
          <progress style={{width: "60px"}} value={item.progress_percentage} max={100}/>
        </div>
        <div style={{fontSize: "12px"}} className="col-4">
          {
            item.progress_percentage === 100 ? <img src={checklistSvg} alt="checklist" /> :
            item.progress_percentage + ' %'
          }
        </div>
        <div className="col-1">
          <div className="dropdown">
            <img className="dropbtn" src={threeDotsSvg} alt="threeDots" />
            <div className="dropdown-content">
              <a><img src={arrowLeftSvg} alt="arrowLeft" />  Move Left</a>
              <a><img src={arrowRightSvg} alt="arrowRight" />  Move Right</a>
              <a><img src={editSvg} alt="edit" />  Edit</a>
              <a><img src={deleteSvg} alt="delete" />  Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
