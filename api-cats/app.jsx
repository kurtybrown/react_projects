import { useState, useEffect } from 'react'

const ENDPOINT_CAT_FACTS = 'https://catfact.ninja/fact'
const PREFIX_ENDPOINT_CAT_IMG = `https://cataas.com`


export function App () {

  const [fact, setFact] = useState()
  const [imgUrl, setImgUrl] = useState()

  useEffect(() =>
  {
    fetch(ENDPOINT_CAT_FACTS)
    .then(res => res.json())
    .then(data => setFact(data.fact))
  }, [])

  useEffect(() => {
    if(!fact) return
   const words = fact.split(' ', 3).join(' ')
   console.log(words);
   fetch(`https://cataas.com/cat/says/${words}?size=50&color=red&json=true`)
   .then(res => res.json())
   .then(response => {
    const { _id } = response
    const url = `/cat/${_id}/says/${words}`
      setImgUrl(url) 
    })
  }, [fact])

  return (
    <main>
      <h1>App de Gatitos</h1>
      {fact && <p>{fact}</p>}
      <section>
      {imgUrl && <img src={`${PREFIX_ENDPOINT_CAT_IMG}${imgUrl}`} alt="" />}
      </section>
    </main>
  )
}
