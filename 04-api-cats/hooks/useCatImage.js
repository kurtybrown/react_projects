import { useState, useEffect } from "react"

const PREFIX_ENDPOINT_CAT_IMG = `https://cataas.com`

export function useCatImage({fact}) {
  
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if(!fact) return
   const words = fact.split(' ', 3).join(' ')
   console.log(words);
   fetch(`https://cataas.com/cat/says/${words}?size=50&color=red&json=true`)
   .then(res => res.json())
   .then(response => {
      const { _id } = response
      console.log(_id);
      const url = `/cat/${_id}/says/${words}`
      console.log(url, 'url');
      
      setImageUrl(url) 
    })
  }, [fact])
  return { imageUrl: `${PREFIX_ENDPOINT_CAT_IMG}${imageUrl}` }
}