import { Edit } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMyAgentsAction } from '../Redux/actions/adminActions'
import EditAgent from './EditAgent'

const MemberSearch = () => {
    const [searchName, setSearchName] = useState('')
    const [display, setDisplay] = useState(true)
    const [victim, setVictim] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyAgentsAction)
    }, [dispatch])
    const { loading, myAgents } = useSelector(state => state.myAgents)
    const { user } = useSelector(state => state.userProfile)
    const setDisplayFun = (cond)=>setDisplay(cond)
    return (
        <>
            {
                display ? <div className={'selected_tab member_search_tab'} >
                    <h2>Members & Agents</h2>
                    <div className='member_search_bar'>
                        <p>Login Name: </p>
                        <input type='text' value={searchName} placeholder='Enter username to search' onChange={(e) => setSearchName(e.target.value)} />
                        <button>Search</button>
                    </div>
                    <div className='account_name'>
                        <p>{user && user.userName}</p>
                    </div>
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
                                </tr>
                            </thead>
                            <tbody>
                                {loading && <td>loading</td>}
                                {!myAgents && <td>Not Found</td>}
                                {myAgents && myAgents.filter(a => a.userName.includes(searchName)).map((sub, index) => {
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
                                            <td>{sub && sub.createDate? sub.createDate : 'null'}</td>
                                            <td>{sub && sub.lastLoginDate ? sub.lastLoginDate : 'null'}</td>
                                            <td>{sub && sub.loginIp ? sub.loginIp : 'null'}</td>
                                            <td>{sub && sub.status}</td>
                                            <td><Edit onClick = {()=>{
                                                setVictim(sub)
                                                setDisplay(false)
                                            }}/></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div >
                    : <EditAgent victim = {victim} changeDisplay = {setDisplayFun}/>
            }
        </>
    )
}

export default MemberSearch