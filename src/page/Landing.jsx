import React,{useState,useEffect} from 'react'
import './landing.scss'
import localStorageUtil from '../util/localStorage'
function Landing({start}) {
    const [pause, setPause] = useState(localStorageUtil.getItem("pause"));

    // Sync state with localStorage when it changes
    useEffect(() => {
      setPause(localStorageUtil.getItem("pause"));
    }, []);
  return (
    <div className="wrap">
        <div className="container">
        <div className='title'>MEME</div>
        <button onClick={()=>{start(true)}}>{pause?"Continue":"New Game"}</button>
         {pause&&<button onClick={()=>{
            localStorageUtil.clearStorage()
            start(true)
         }}>{"New Game"}</button>}
         <div className='title'>MEMO</div>
        </div>
        
    </div>
   
  )
}

export default Landing