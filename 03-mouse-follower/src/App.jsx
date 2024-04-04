import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log(clientX, clientY);
      setPosition({x:clientX, y:clientY})
    }
    if(enable) {
      window.addEventListener('pointermove', handleMove)
    }
    // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo
    return () => {
      console.log('cleanup!')
      window.removeEventListener('pointermove', handleMove)
    }
  },[enable])

  return (
    <main>
      <div style = {{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      ></div>
      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Activate' : 'Deactivate'} pointer follower
      </button>
    </main>
    
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
