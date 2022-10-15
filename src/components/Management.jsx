import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import AddAgent from './AddAgent'
import AddSubAccount from './AddSubAccount'
import MemberSearch from './MemberSearch'
import SubAccounts from './SubAccounts'

const Management = ({ subIndex, changeSubSidebarIndex, user }) => {
  const alert = useAlert()
  const { isCreated, error, loading } = useSelector(state => state.createdAgent)
  useEffect(() => {
    if (!loading) {
      if (isCreated) {
        setTimeout(() => {
          alert.show('agent is successfully created')
          changeSubSidebarIndex(2)
        }, 2000);
      } else if (error) {
        if (typeof error === "string") alert.error(error)
        else {
          for (let err in error) {
            alert.error(error[err])
          }
        }
      }
    }
  }, [loading, isCreated, error, alert]);
  return (
    <div>
      {subIndex === 1 && <AddAgent changeSubSidebarIndex={changeSubSidebarIndex} />}
      {subIndex === 2 && <MemberSearch />}
      {subIndex === 3 && <AddSubAccount changeSubSidebarIndex={changeSubSidebarIndex} main_user={user} />}
      {subIndex === 4 && <SubAccounts />}

    </div>
  )
}

export default Management