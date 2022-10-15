import React, { useEffect, useState } from 'react'
import '../css/result.css'
import { useDispatch, useSelector } from 'react-redux'
import { creditAgentAction, getMyAgentsAction, getMyTransactionsAction, withdrawAgentAction } from '../Redux/actions/adminActions'
import { userProfileAction } from '../Redux/actions/userActions'
import { useAlert } from 'react-alert'
const DepositW = ({ }) => {
    const [searchName, setSearchName] = useState('')
    const [balance, setBalance] = useState(0)
    const [display, setDisplay] = useState(false)
    const [deposit, setDeposit] = useState(false)
    const [victimId, setVictimId] = useState('')
    const [ready, setReady] = useState(false)
    const [ready1, setReady1] = useState(false)


    const { user } = useSelector(state => state.userProfile)

    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        dispatch(getMyAgentsAction)
    }, [dispatch])
    // useEffect(() => {
    //     dispatch(getMyTransactionsAction)
    // }, [dispatch])

    // const { myTransactions, loading } = useSelector(state => state.myTransactions)
    const { load, isCreditted, error } = useSelector(state => state.creditAgent)
    const {Wloading, isWithdrawn, WError} = useSelector(state => state.withdrawAgent)
    const { loading, myAgents } = useSelector(state => state.myAgents)

    useEffect(() => {
        if (ready) {
            if (!load) {
                if (isCreditted) {
                    alert.show('balance is successfully creditted')
                }
                else {
                    console.log(error)
                    alert.error(error)}
            }
        }

    }, [ready, load, error, isCreditted, alert])

    // useEffect(() => {
    //     console.log(766)
    //     if (ready1) {
    //         console.log(5444)
    //         console.log(Wloading)
    //         if (Wloading) {
    //             console.log('not loading')
    //             if (isWithdrawn) {
    //                 console.log('final')
    //                 alert.show('balance is successfully withdrawn')
    //             }
    //             else {
    //                 console.log(WError)
    //                 console.log('baddd')
    //                 alert.error(WError)
    //             }
    //         }
    //     }

    // }, [ready1, Wloading, isWithdrawn, alert, WError])

    const depositBalance = (victimId) => {
        setDisplay(true)
        setDeposit(true)
        setVictimId(victimId)
    }
    const withdrawBalance = (victimId) => {
        setDisplay(true)
        setDeposit(false)
        setVictimId(victimId)
    }
    const submitData = {
        creditToTransfer: balance
    }
    const submitAction = () => {
        if (deposit === true) {
            dispatch(creditAgentAction(submitData, victimId))
            setReady1(false)
            setReady(true)
        } else {
            dispatch(withdrawAgentAction(submitData, victimId))
            //setReady(false)
            setReady1(true)
        }
        setTimeout(() => {
            dispatch(userProfileAction)
            dispatch(getMyAgentsAction)
        }, 2000);
        // clearTimeout(timeSet)
        setDisplay(false)
    }
    return (
        <div className='deposit_tab selected_tab'>
            <div className={display ? 'popup_container' : 'd_none'}>
                <p>Enter Balance: </p>
                <input type='number' value={balance} onChange={(e) => setBalance(e.target.value)} />
                <div className='popup_btns'>
                    <button onClick={submitAction}>Submit</button>
                    <button className='b_red' onClick={() => setDisplay(false)}>Cancel</button>
                </div>
            </div>
            <h2>Deposit / Withdrawal</h2>
            <div className='member_search_bar'>
                <p>Login Name: </p>
                <input type='text' value={searchName} placeholder='Enter username to search' onChange={(e) => setSearchName(e.target.value)} />
                <button>Search</button>
            </div>
            <div className='account_credit'>
                <h3>Credit: </h3>
                <p>{user && user.credit}</p>
            </div>
            <div className='search_results overflow_n'>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Login Name</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Currency</th>
                            <th>Credit</th>
                            <th>Deposit</th>
                            <th>Withdrawal</th>
                            <th>Detail</th>
                            <th>Last Login Date</th>
                            <th>Last Login IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <td>loading</td>}
                        {!myAgents && <td>Not Found</td>}
                        {!loading && myAgents && myAgents.filter(a => a.userName.includes(searchName)).map((sub, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{sub && sub.userName}</td>
                                    <td>{sub && sub.name}</td>
                                    <td>{sub && sub.level}</td>
                                    <td>{sub && sub.currency}</td>
                                    <td>{sub && sub.credit}</td>
                                    <td><button onClick={() => depositBalance(sub && sub._id)}>+</button></td>
                                    <td><button onClick={() => withdrawBalance(sub && sub._id)}>-</button></td>
                                    <td><button>Detail</button></td>
                                    <td>{sub && sub.lastLoginDate ? sub.lastLoginDate : 'null'}</td>
                                    <td>{sub && sub.loginIp ? sub.loginIp : 'null'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DepositW