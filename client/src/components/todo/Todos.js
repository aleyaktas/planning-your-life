import React from 'react'
import Todo from '../todo/Todo'

const Todos = ({match}) => {
  const id = match.params.id;
  return (
    <div className="todos-section">
      <Todo id={id}/>
    </div>
  )
}

export default Todos
