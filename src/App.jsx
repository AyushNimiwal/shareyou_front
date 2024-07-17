import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import { useSelector } from 'react-redux';
import LayoutLandingPage from './Pages/LayoutLandingPage.jsx';
import Layout from './Pages/Layout.jsx';
import SearchedVideos from './Pages/SearchedVideos.jsx';
import Profile from './Pages/Profile.jsx';
import Subscriptions from './Pages/Subscriptions.jsx';
import Channel from './Pages/Channel.jsx';
import DashBoard from './Pages/DashBoard.jsx';

function App() {
  const  {accessToken}  = useSelector(state => state.auth)
  return (
    <Router>
      <Routes>
        {!accessToken?<Route path='/' element={<LayoutLandingPage/>}/>:
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/search/:search' element={<SearchedVideos/>}/>
          <Route path='/home/play/:videoId' element={<Home/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/subscriptions' element={<Subscriptions/>}/>
          <Route path='/channel/:id' element={<Channel/>}/>
          <Route path='/channel/:id/play/:videoId' element={<Channel/>}/>
          <Route path='/channel/:id/dashboard' element={<DashBoard/>}/>
        </Route>
        }
      </Routes>
    </Router>
  )
}

export default App