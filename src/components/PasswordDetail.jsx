import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { ColorRing } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { changeMyPasswordAction } from '../Redux/actions/userActions'

const PasswordDetail = ({ changeSubSidebarIndex }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [send, setSend] = useState(false)

    const dispatch = useDispatch()
    const alert = useAlert()

    const PasswordData = {
        oldPassword,
        newPassword,
        confirmPassword
    }
    const { user } = useSelector(state => state.userProfile)
    const sendData = () => {
        if (newPassword !== confirmPassword) alert.error('password and confirm password does not match')
        else {
            dispatch(changeMyPasswordAction(PasswordData))
            setSend(true)
        }
    }

    const { loading, message, success } = useSelector(state => state.changedPassword)
    useEffect(() => {
        if (send) {
            if (!loading) {
                if (success) {
                    console.log(message);
                    alert.success(message)
                    changeSubSidebarIndex(1)
                } else {
                    console.log(message);
                    alert.error(message)
                }
            }
        }
    }, [message, success, loading, send, alert])

    return (
        <>
            {loading ? <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperStyle={{ width: '20vw', height: '20vh' }}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            /> :
                <div className='selected_tab password_tab'>
                    <h2>Change Password</h2>
                    <div className='password_change_card'>
                        <div className='profile_info_combo'>
                            <p>User name</p>
                            <input type='text' value={user && user.userName} readOnly />
                        </div>
                        <div className='profile_info_combo editable_input'>
                            <p>Old Password <span className='r_color'>*</span></p>
                            <div>
                                <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='profile_info_combo editable_input'>
                            <p>New Password <span className='r_color'>*</span></p>
                            <div className='error_input'>
                                <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <div className='error information'><p>Enter only number (0-9) or letter (A-Z, a-z, ก-ฮ).</p></div>
                            </div>
                        </div>
                        <div className='profile_info_combo editable_input'>
                            <p>Confirm Password <span className='r_color'>*</span></p>
                            <div className='error_input'>
                                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <div className='error information'><p>Enter only number (0-9) or letter (A-Z, a-z, ก-ฮ).</p></div>
                            </div>
                        </div>
                        <div className='section_input'>
                            <button onClick={sendData}>Change Password</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PasswordDetail