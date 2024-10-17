const ENDPOINT_CAT_FACTS = 'https://catfact.ninja/fact'

export const getRandomFact = () => {
  return fetch(ENDPOINT_CAT_FACTS)
  .then(res => res.json())
  .then(data => {
    return data.fact
  })
}

