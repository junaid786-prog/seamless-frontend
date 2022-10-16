import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import banner1 from '../img/banner-1.jpg'
import { getMyAgentsAction } from '../Redux/actions/adminActions'
import MyProducts from './MyProducts'
const Dashboard = ({ user }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyAgentsAction)
    }, [dispatch])
    const {loading, myAgents} = useSelector(state=>state.myAgents)
    
    return (
        <div className='dashboard'>
            <div className='dashboard_tab'>
                <div className='dashboard_banners'>
                    <img src={banner1} alt='seamless' />
                </div>
                <div className='credit_info info_box'>
                    <div className='info_box_top'>
                        <h4>Your Credit</h4>
                    </div>
                    <div className='info_box_bottom'>
                        <p>Total Credit</p>
                        <p>{user && user.credit}</p>
                    </div>
                </div>
                <div className='balance_info info_box'>
                    <div className='info_box_top'>
                        <h4>Your Credit</h4>
                    </div>
                    <div className='info_box_bottom'>
                        <p>Balance Info</p>
                        <p>{user && user.credit}</p>
                    </div>
                </div>
                <div className='downline_info info_box'>
                    <div className='info_box_top downline_top'>
                        <h4>Your Credit</h4>
                    </div>
                    <div className='info_box_bottom downline_bottom'>
                        <div className='downline_combo'>
                            <p>Reseller</p>
                            <p>{loading ? 'loading': !loading && myAgents && myAgents.filter(agent=>agent.positionType === 'Reseller').length}</p>
                        </div>
                        <div className='downline_combo'>
                            <p>Agent</p>
                            <p>{loading ? 'loading': !loading && myAgents && myAgents.filter(agent=>agent.positionType === 'Agent').length}</p>
                        </div>
                        <div className='downline_combo'>
                            <p>Reseller</p>
                            <p>{loading ? 'loading': !loading && myAgents && myAgents.filter(agent=>agent.positionType === 'Reseller').length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='products_tab'>
                <h3>Your Products</h3>
                <MyProducts user = {user}/>
            </div>
        </div>
    )
}

export default Dashboard