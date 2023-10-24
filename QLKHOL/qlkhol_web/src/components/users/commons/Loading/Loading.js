import React from 'react'
import LoadingGIF from "../../../../assets/loading.gif"
import "./Loading.css"


const Loading = (props) => {
  return (
    props.isLoading 
    ? 
    <div className='Loading'>
        <img src={LoadingGIF}/>
    </div>
    : <></>
  )
}

export default Loading