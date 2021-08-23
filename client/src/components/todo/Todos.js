import React from 'react'
import { connect } from 'react-redux';
import Todo from '../todo/Todo';
import  PropTypes  from 'prop-types'

const Todos = ({match, isDropDownBtn}) => {
  const id = match.params.id;
  return (
    <div className={`todos-section ${isDropDownBtn? "d-none": null}`}>
      <Todo id={id}/>
    </div>
  )
}


Todos.propTypes = {
  isDropDownBtn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isDropDownBtn: state.todolist.isDropDownBtn
})

export default connect(mapStateToProps) (Todos)
