import React, { useState } from 'react'
import BFlag from '../img/uk_flag.png'
import TFlag from '../img/thai_flag.png'
import Icon from '../img/logo1.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../Redux/actions/userActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert"
import { ColorRing } from 'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Login = () => {
  const languages = [
    {
      languageName: 'English',
      languageIcon: BFlag,
    },
    {
      languageName: 'Thai',
      languageIcon: TFlag,
    }
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()

  const [isActive, setIsActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(languages[0])

  const [username, setUsername] = useState('username')
  const [password, setPassword] = useState('password')

  const userData = { userName: username, password }
  const sendData = () => {
    dispatch(loginUserAction(userData))
  }
  const { loading, user, isAuthenticated, error } = useSelector(state => state.loggedInUser)

  useEffect(() => {
    if(!loading)
      if (isAuthenticated) navigate('/')
  }, [isAuthenticated, loading])
  useEffect(() => {
    if (!loading)
      if (user && isAuthenticated) navigate('/')
      else if (error) {
        alert.error(error)
      }
  }, [loading, user, navigate, error, isAuthenticated, alert])

  return (
    <>
      {loading ? <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      /> :
        <div className='login_box'>
          <div className='login_language_section'>
            <div className="select_language">
              <img src={selectedOption.languageIcon} alt={selectedOption.languageName} />{selectedOption.languageName}
              <ArrowDropDownIcon onClick={() => setIsActive(!isActive)} />
            </div>
            <div className={isActive ? "languages_drop_down" : "d_none"}>
              {languages && languages.map((c, index) => {
                return (
                  <div className='language_card' onClick={() => {
                    setSelectedOption(c)
                    setIsActive(false)
                  }} key={index}>
                    <img src={c.languageIcon} alt={c.languageName} />
                    <p>
                      {c.languageName}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <hr />
          <div className='login_content_section'>
            <div className='logo_section'>
              <img src={Icon} alt='seamless api' />
            </div>
            <div className='form_section'>
              <div className='section_input'>
                <p className='input_label'>username</p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className='section_input'>
                <p className='input_label'>password</p>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='section_input'>
                <button type='submit'
                  onClick={() => sendData()}
                >Sign In</button>
              </div>
              <div className='login_footer'>
                <p>Contact your associate in case you <br />forgot the password or unable to sign in.</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Login