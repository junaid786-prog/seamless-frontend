import React, { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import Account from "../components/Account"
import Dashboard from "../components/Dashboard"
import FloatingLine from "../components/FloatingLine"
import Management from "../components/Management"
import Navbar from "../components/Navbar"
import Payment from "../components/Payment"
import Report from "../components/Report"
// import Result from "../components/Result"
import SideBar from "../components/SideBar"
import "../css/main.css"
import { userProfileAction } from "../Redux/actions/userActions"
const MainPage = () => {
  const [sidebarOption, setSidebarOPtion] = useState(1)
  const [subSidebarOption, setSubSidebarOption] = useState(1)
  // const [crumbs, setCrumbs] = useState(["dashboard"])
  const setSidebarFun = (index) => setSidebarOPtion(index)
  const setSubSidebarFun = (index) => setSubSidebarOption(index)
  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.userProfile)

  useEffect(() => {
    dispatch(userProfileAction)
  }, [dispatch])

  return (
    <div>
      {loading ? (
         <ColorRing
         visible={true}
         height="50"
         width="50"
         ariaLabel="blocks-loading"
         wrapperStyle={{width : '20vw', height: '20vh'}}
         wrapperClass="blocks-wrapper"
         colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
       />
      ) : (
        <div className="main_page">
          <div className="sidebar_part">
            <SideBar
              sidebarOption={sidebarOption}
              changeSidebarOPtion={setSidebarFun}
              subSidebarIndex={subSidebarOption}
              changeSubSidebarIndex={setSubSidebarFun}
              user={user}
            />
          </div>
          <div className="right_part">
            <Navbar user={user} />
            <FloatingLine />
            <div className="tabs_part">
              <div className="folder_tree"></div>
              <div className="selected_tab_part">
                {sidebarOption === 1 && <Dashboard user={user} />}
                {sidebarOption === 2 && (
                  <Account subIndex={subSidebarOption} user={user} changeSubSidebarIndex = {setSubSidebarFun}/>
                )}
                {sidebarOption === 3 && (
                  <Management changeSubSidebarIndex = {setSubSidebarFun} subIndex={subSidebarOption} user={user} />
                )}
                {sidebarOption === 4 && (
                  <Report subIndex={subSidebarOption} user={user} />
                )}
                {sidebarOption === 5 && (
                  <Payment subIndex={subSidebarOption} user={user} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage
