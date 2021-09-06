import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import  PropTypes  from 'prop-types'
import {useHistory} from 'react-router'
import { getTodoList } from '../../actions/todolist'

const Landing = ({isAuthenticated, getTodoList}) => {
  let history = useHistory();
  const fetchId = async () => {
     var myDayId = await getTodoList()
     if(isAuthenticated) history.push(`/todolist/${myDayId}`)
  }

  useEffect(() => {
   fetchId()
  }, [fetchId])

  return (
    <section className="landing">
      <div className="overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome To-Do Website </h1>
          <p>
            Create a user and use to-do website for yourself
          </p>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getTodoList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getTodoList}) (Landing)
