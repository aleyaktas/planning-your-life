import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import {connect} from "react-redux"
import { setNewPassword } from '../../actions/auth'
import showNotice from '../../utils/showNotice'

const ForgotPassword = ({match, setNewPassword}) => {
  
  const history = useHistory()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onClickSave = async (e) => {
    if(password === confirmPassword) {
      const status = await setNewPassword(password,match.params.token)
      console.log(status)
      if(status==201) {
        showNotice('Password updated','success')
      }else {
        showNotice('Link is invalid','error')
      }
      history.push("/")
    }
  }
    
  const handleKeypress = e => {
    if (e.key === "Enter") {
      onClickSave();
      e.preventDefault();
    }
  };
  
  return (
    <section className="landing">
      <div className="overlay">
        <div className="landing-inner">
          <div class="padlock">
            <div class="padlock__hook">
              <div class="padlock__hook-body"></div>
              <div class="padlock__hook-body"></div>
            </div>
            <div class="padlock__body">
              <div class="padlock__face">
                <div class="padlock__eye padlock__eye--left"></div>
                <div class="padlock__eye padlock__eye--right"></div>
                <div class="padlock__mouth padlock__mouth--one"></div>
                <div class="padlock__mouth padlock__mouth--two"></div>
                <div class="padlock__mouth padlock__mouth--three"></div>
              </div>
            </div>
          </div>
          <h1 className="x-large">Set new Password </h1>
          <p>
            Create new password
          </p>
          <input type="password" className="password-input" onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
          <input onKeyDown={e => handleKeypress(e)} type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="password-input" placeholder="Confirm Password" />
          <button className="pass-save-button" onClick={(e) => onClickSave()}>Save</button>
          </div>
        </div>
      </section>
  )
}


export default connect (null, {setNewPassword}) (ForgotPassword)

