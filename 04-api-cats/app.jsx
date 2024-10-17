
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import './style.css'

export function App () {

  const {fact, refreshFact} = useCatFact()
  const { imageUrl } = useCatImage({fact})

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de Gatitos</h1>
      <button onClick={handleClick}>Click Me!</button>
      {fact && <p>{fact}</p>}
      
      {imageUrl && <img src={`${imageUrl}`} alt="" />}
     
    </main>
  )
}
