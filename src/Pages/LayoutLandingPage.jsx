import React,{useState} from 'react'
import Landing from './Landing'
import Header from './Header'

function LayoutLandingPage() {
    const [toggle, setToggle] = useState(false)
  return (
    <div className='w-screen h-screen relative '>
      <Landing toggle={toggle} setToggle={setToggle}/>
      <div className='w-full h-fit absolute z-20 top-0 left-0'><Header toggle={toggle} setToggle={setToggle}/></div>
    </div>
  )
}

export default LayoutLandingPage