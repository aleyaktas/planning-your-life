import React from 'react'

const Todos = ({match}) => {
  const id = match.params.id;
  return (
    <div className="todo-section">
      {id == "myday" ? "My day" : id == "important" ? "important" : id}
    </div>
  )
}



export default Todos
