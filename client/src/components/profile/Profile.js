import React from 'react'
import { connect } from 'react-redux'
import  PropTypes  from 'prop-types'
import iconUser from '../../img/user-icon.png'

const Profile = ({user}) => {
  
  return (
    <section>
      <div className="profile" style={{height:"93vh"}}>
        <div className="profile-inner">
          <div style={{borderRadius:10}}>
          <div class="card-container">
            <img class="round" src={iconUser} alt="user" />
            <h3 style={{marginBottom:9}}>{user?.firstname} {user?.lastname}</h3>
            <h6 style={{marginBottom:9, marginTop:7}}>{user?.email}</h6>
            <button style={{color: "black", marginTop:13}} className="btn btn-warning">
              Change password
            </button>
          </div>
          </div>
       </div>
      </div>
    </section>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps) (Profile)
