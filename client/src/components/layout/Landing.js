import React from 'react'
import { Link } from 'react-router-dom'

const Landing = props => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome To-Do Website </h1>
          <p className="lead">
            Create a user and use to-do website for yourself
          </p>
          
        </div>
      </div>
    </section>
  )
}



export default Landing
