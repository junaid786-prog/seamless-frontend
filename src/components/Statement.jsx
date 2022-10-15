import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTransactionsAction } from '../Redux/actions/adminActions'

const Statement = () => {
    const dispatch = useDispatch()
    const [transaction, setTransaction] = useState(null)
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        dispatch(getMyTransactionsAction)
    }, [dispatch])
    const { loading, myTransactions, error } = useSelector(state => state.myTransactions)
    if (!loading && !error) {
        //console.log(myTransactions)
    }
    return (
        <>
            {
                loading ?
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    /> :
                    <div className='my_transactions_tab selected_tab'>
                        <div className={display ? 'popup_container' : 'd_none'}>
                            <div className='transaction_detail'>
                                <div className='transaction_detail_combo'>
                                    <p>Action: </p>
                                    <span>{transaction && transaction.transactionType}</span>
                                </div>
                                <div className='transaction_detail_combo'>
                                    <p>Date: </p>
                                    <span>{transaction && transaction.time}</span>
                                </div>
                                <div className='transaction_detail_combo'>
                                    <p>Amount </p>
                                    <span>{transaction && transaction.creditAmount}</span>
                                </div>
                            </div>
                            <div className='popup_btns'>
                                <button className='b_red' onClick={() => setDisplay(false)}>Back</button>
                            </div>
                        </div>
                        <h2>My Transactions</h2>
                        <div className='search_results overflow_n'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Login Name</th>
                                        <th>Currency</th>
                                        <th>Bet Type</th>
                                        <th>Action</th>
                                        <th>Detail</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && <td>loading</td>}
                                    {!loading && !myTransactions && <td>Not Found</td>}
                                    {!loading && myTransactions && myTransactions.map((transaction, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{transaction && transaction.to.userName}</td>
                                                <td>{transaction && transaction.currency}</td>
                                                <td>{transaction && transaction.to.betType ? transaction.to.betType : '-'}</td>
                                                <td>{transaction && transaction.transactionType}</td>
                                                <td><button onClick={() => {
                                                    setDisplay(true);
                                                    setTransaction(transaction)
                                                }}>detail</button></td>
                                                <td>{transaction && transaction.creditAmount}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default Statement