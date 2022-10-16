import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { editSubAdminAction, getMySubAdminsAction } from '../Redux/actions/adminActions'
const EditSubAdmin = ({ changeDisplay, subAdmin }) => {
    const [userName, setUserName] = useState('')
    const [name, setName] = useState(subAdmin.name)
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState(subAdmin.phone)
    // permissions
    const [account, setAccount] = useState('off')
    const [management, setManagement] = useState('off')
    const [report, setReport] = useState('off')
    const [payment, setPayment] = useState('off')
    const [ready, setReady] = useState(false)

    const dispatch = useDispatch()
    const alert = useAlert()

    const Permissions = [
        { name: 'account', value: account },
        { name: 'management', value: management },
        { name: 'report', value: report },
        { name: 'payment', value: payment },
    ]

    const SubAccountData = {
        userName, name, password, phone: phone ? phone : undefined, permissions: Permissions
    }

    const { isEditted, error, loading } = useSelector(state => state.edittedSubAdmin)

    useEffect(() => {
        if (ready) {
            if (!loading) {
                if (isEditted) {
                    alert.show('sub admin is successfully updated')
                    changeDisplay(true)
                    setTimeout(() => {
                        dispatch(getMySubAdminsAction)
                    }, 2000);
                }
                else {
                    if (typeof error === "string") alert.error(error)
                    else {
                        for (let err in error) {
                            alert.error(error[err])
                        }
                    }
                }
            }
        }

    }, [ready, loading, isEditted, error])
    const submitData = () => {
        dispatch(editSubAdminAction(SubAccountData, subAdmin._id))
        setReady(true)
    }

    return (
        <div className='selected_tab add_sub_account'>
            <h2>Edit Sub Admin Info</h2>
            <div className='sub_account_card'>
                <div className='sub_account_parent_div'>
                    <h3>Basic Information</h3>
                    <div className='sub_account_div'>
                        <div className='sub_account_div_part'>
                            <div className='profile_info_combo'>
                                <p>User name <span className='r_color'>*</span> </p>
                                <input type='text' placeholder='Username' value={subAdmin && subAdmin.userName} readOnly />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Password <span className='r_color'>*</span></p>
                                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='sub_account_div_part'>
                            <div className='profile_info_combo'>
                                <p>Name <span className='r_color'>*</span></p>
                                <input type='text' placeholder={subAdmin.name} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Phone</p>
                                <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sub_account_parent_div'>
                    <h3>Permissions</h3>
                    <div className='sub_account_div sub_acc_permission'>
                        <div className='sub_account_div_part sub_account_perm_div'>
                            <div className='permission_combo'>
                                <p>Account</p>
                                <div><input type='radio' value='off' id='off' name='account' onChange={(e) => { setAccount(e.target.value) }} /> <label htmlFor='off'>Off</label></div>
                                <div><input type='radio' value='view' id='view' name='account' onChange={(e) => { setAccount(e.target.value) }} /><label htmlFor='view'> View</label></div>
                                <div><input type='radio' value='edit' id='edit' name='account' onChange={(e) => { setAccount(e.target.value) }} /> <label htmlFor='edit'> Edit</label></div>
                            </div>
                            <div className='permission_combo'>
                                <p>Member <br></br> Management</p>
                                <div><input type='radio' value='off' id='off' name='management' onChange={(e) => { setManagement(e.target.value) }} /> <label htmlFor='off'>Off</label></div>
                                <div><input type='radio' value='view' id='view' name='management' onChange={(e) => { setManagement(e.target.value) }} /><label htmlFor='view'> View</label></div>
                                <div><input type='radio' value='edit' id='edit' name='management' onChange={(e) => { setManagement(e.target.value) }} /> <label htmlFor='edit'> Edit</label></div>
                            </div>
                            <div className='permission_combo' >
                                <p>Report</p>
                                <div><input type='radio' value='off' id='off' name='report' onChange={(e) => { setReport(e.target.value) }} /> <label htmlFor='off'>Off</label></div>
                                <div><input type='radio' value='view' id='view' name='report' onChange={(e) => { setReport(e.target.value) }} /><label htmlFor='view'> View</label></div>
                                <div><input type='radio' value='edit' id='edit' name='report' onChange={(e) => { setReport(e.target.value) }} /> <label htmlFor='edit'> Edit</label></div>
                            </div>
                            <div className='permission_combo' >
                                <p>Payment</p>
                                <div><input type='radio' value='off' id='off' name='Payment' onChange={(e) => { setPayment(e.target.value) }} /> <label htmlFor='off'>Off</label></div>
                                <div><input type='radio' value='view' id='view' name='Payment' onChange={(e) => { setPayment(e.target.value) }} /><label htmlFor='view'> View</label></div>
                                <div><input type='radio' value='edit' id='edit' name='Payment' onChange={(e) => { setPayment(e.target.value) }} /> <label htmlFor='edit'> Edit</label></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section_input'>
                    <button type='submit' onClick={submitData}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default EditSubAdmin
