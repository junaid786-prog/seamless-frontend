import React from 'react'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SidebarOption from './SidebarOption';
import Icon from '../img/logo1.png'
//import SiteIcon from '../img/'

const SideBar = ({ sidebarOption, changeSidebarOPtion, subSidebarIndex, changeSubSidebarIndex, user }) => {
    const getValue = (type)=>{
        if(user && user.permissions){
            let pers = user.permissions
            for(let i = 0; i < pers.length; i++){
                if(pers[i].name === type) return pers[i].value
            }
        }
    }
    const Managementpermissions = ()=>{
        const value = getValue('management')
        switch (value) {
            case 'view':
                return ['Members & Agent','Sub Account']
            case 'edit': 
                return [ 'Add Agent','Add Sub Account']
            case 'off':
                return []
            default:
                break;
        }
    }
    const AccountPermissions = ()=>{

        const value = getValue('account')
        switch (value) {
            case 'view':
                return ['Profile']
            case 'edit': 
                return [ 'Password']
            case 'off':
                return []
            default:
                break;
        }
    }

    const PaymentPermissions = ()=>{
        const value = getValue('payment')
        switch (value) {
            case 'view':
                return ['Statement']

            case 'edit': 
                return ['Deposit / Withdrawal']

            case 'off':
                return []
            default:
                break;
        }
    }
    const sidebarOptions = [
        {
            title: 'Dashboard',
            icon: DashboardCustomizeOutlinedIcon,
            hasChild: false
        },
        {
            title: 'Account',
            icon: PersonOutlineIcon,
            hasChild: true,
            childs: user && (user.userType === 'Admin' || user.userType === 'Agent') ? ['Profile', 'Password']
            : AccountPermissions()
        },
        {
            title: 'Management',
            icon: PersonOutlineIcon,
            hasChild: true,
            childs: user && user.userType === 'Admin' ? ['Add Agent', 'Members & Agent', 'Add Sub Account', 'Sub Account']
             : user && user.userType === 'Agent' ? ['Add Agent', 'Members & Agent', 'Add Sub Account', 'Sub Account'] 
             : Managementpermissions()
        },
        {
            title: 'Report',
            icon: DescriptionOutlinedIcon,
            hasChild: true,
            childs: ['W/L Report']
        },
        {
            title: 'Money',
            icon: AttachMoneyOutlinedIcon,
            hasChild: true,
            childs: user && (user.userType === 'Admin' || user.userType === 'Agent') ? ['Deposit / Withdrawal', 'Statement']
            : PaymentPermissions()
        },
        {
            title: 'Product Demo',
            icon: LaptopMacOutlinedIcon,
            hasChild: false
        },
        {
            title: 'API Document',
            icon: StarBorderOutlinedIcon,
            hasChild: false
        },
    ]
    return (
        <div className='side_bar'>
            <div className='sidebar_top'>
                <img src={Icon} alt='site icon' />
            </div>
            <div className='sidebar_options'>
                {
                    sidebarOptions.map((option, index) => {
                        return <div key={index}>
                            <SidebarOption option={option} sidebarOption={sidebarOption} changeSidebarOption={changeSidebarOPtion} index={index} subSidebarIndex changeSubSidebarIndex={changeSubSidebarIndex} />
                            <hr className='h_row' />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default SideBar