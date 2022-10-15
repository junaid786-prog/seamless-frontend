import { Edit, Delete } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubAdminAction, getMySubAdminsAction } from '../Redux/actions/adminActions'
import EditSubAdmin from './EditSubAdmin'
const SubAccounts = () => {
    const [ready, setReady] = useState(false)
    const [display, setDisplay] = useState(true)
    const [subAdmin, setSubAdmin] = useState(null)
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        dispatch(getMySubAdminsAction)
    }, [dispatch])
    const { loading, mySubAdmins } = useSelector(state => state.mySubAdmins)
    const { load, deleted, error } = useSelector(state => state.deletedSubAdmin)
    useEffect(() => {
        if (ready) {
            if (!load) {
                if (deleted) {
                    alert.show('sub admin is successfully deleted')
                }
                else if (error) alert.error('error occured while deleting subAdmin')
            }
        }

    }, [ready, load, error, deleted, alert])
    const setDisplayFun = (cond) => setDisplay(cond)
    const deleteUser = (id) => {
        dispatch(deleteSubAdminAction(id))
        setReady(true)

        setTimeout(() => {
            dispatch(getMySubAdminsAction)
        }, 2000);
    }
    return (
        <>
            {
                display ? (<div className='selected_tab member_search_tab'>
                    <h2>Sub Account</h2>
                    <div className='search_results'>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Position</th>
                                    <th>Login Name</th>
                                    <th>Name</th>
                                    <th>Credit</th>
                                    <th>Level</th>
                                    <th>Bet Type</th>
                                    <th>Person In Charge</th>
                                    <th>Create Date</th>
                                    <th>Last Login Date</th>
                                    <th>Last Login IP</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && <td>loading</td>}
                                {!mySubAdmins && <td>Not Found</td>}
                                {mySubAdmins && mySubAdmins.map((sub, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{sub && sub.positionType}</td>
                                            <td>{sub && sub.userName}</td>
                                            <td>{sub && sub.name}</td>
                                            <td>{sub && sub.credit}</td>
                                            <td>{sub && sub.level}</td>
                                            <td>{sub && sub.betType ? sub.betType : 'null'}</td>
                                            <td>{sub && sub.personInCharge ? sub.personInCharge : 'null'}</td>
                                            <td>{sub && sub.creationDate ? sub.creationDate : 'null'}</td>
                                            <td>{sub && sub.lastLoginDate ? sub.lastLoginDate : 'null'}</td>
                                            <td>{sub && sub.loginIp ? sub.loginIp : 'null'}</td>
                                            <td>{sub && sub.status}</td>
                                            <td><Edit onClick = {()=>{
                                                setSubAdmin(sub)
                                                setDisplay(false)
                                            }}/></td>
                                            <td><Delete onClick={() => deleteUser(sub._id)} /></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>) :
                    <EditSubAdmin subAdmin = {subAdmin} changeDisplay = {setDisplayFun}/>
            }
        </>
    )
}

export default SubAccounts