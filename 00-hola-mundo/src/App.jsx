import { TwitterFollowCard } from "./TwitterFollowCard";
import React from "react";
import { useState } from "react";

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    userName: 'Kurtybrown',
    name: 'Carlos Ocaña',
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]

export function App() {
  // A mi manera
  // function formatUserName(userName) {
  //   return `@${userName}`;
  // }
  // <TwitterFollowCard isFollowing formatUserName = {formatUserName('KurtyBrown')} userName = 'Kurtybrown' name='Carlos Ocaña' />

  // const format = (userName) => `@${userName}`
  // formatUserName={format} en propiedades de TwitterFollowCard

  // const [name, setName] = useState('kurtybrown') //renderiza a los hijos, aunque la propiedad de uno de ellos no cambie, sin embargo el DOM lo deja como está

  return (
    //Es lo mismo que React.Fragment <> </>
    <article className="App"> 
    {
      users.map(({userName, name, isFollowing}) => (
        <TwitterFollowCard key = {userName} initialIsFollowing = {isFollowing} userName = {userName}>
          {name}
        {/* <button onClick={() => setName('pedromichel')}>Cambio Nombre</button>*/ }
        </TwitterFollowCard> 
      ))
    }
    </article>
  )
}