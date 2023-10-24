import React from 'react'
import "./TotalCard.css"


const TotalCard = () => {
  return (
    <div className='TotalCard'>
        <div className='total-card-container'>
            <div className='icon'></div>
            <div className='content'>
                <div className='name'>Total user</div>
                <div className='value'>100</div>
            </div>
            <div className='statistics'>
                <span className='num'>+55</span>
                <span className='text'>Người dùng</span>
            </div>
        </div>
    </div>
  )
}

export default TotalCard