import React,{ useContext } from 'react'

import  AppContext from '../contexts/AppContext'

const  Lists = () => {

  const {works} = useContext(AppContext)
  console.log(works)
  return (
    <>
    俺だ
    </>
  )

}

export default Lists