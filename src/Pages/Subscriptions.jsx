import React from 'react'
import subscriptionService from '../Services/subscriptionService.js'

function Subscriptions() {
  const [subscriptions, setSubscriptions] = React.useState([])

  const getSubscriptions = async () => {
    const res=await subscriptionService.getSubscribedChannels();
    console.log(res.subscriptions);
    setSubscriptions(res.subscriptions);
  }

  React.useEffect(() => {
    getSubscriptions();
  }, [])

  const toggleSubscription = async (id) => {
    const res=await subscriptionService.toggleSubscription(id);
    window.location.reload();
  }
  return (
    <div className='w-screen h-screen bg-black/90 flex items-center justify-center text-white'>
        <div className='w-3/4 h-full mt-44 bg-white/5 rounded-xl border border-white/20 p-4 flex flex-col gap-3'>
            {
              subscriptions&&subscriptions.map(channel=>(
                <div className='w-full h-44 flex justify-between border border-white/10 shadow-2xl shadow-white/5 items-center px-5 cursor-pointer hover:scale-95 transition-all bg-black/20 rounded-xl'>
                    <div className='w-3/4 h-full flex items-center gap-5'>
                      <img src={channel.avatar} className='w-28 h-28 rounded-full' />
                      <div className='w-2/4 h-full flex flex-col justify-center items-start'>
                        <h1 className='text-2xl'>{channel.username}</h1>
                        <h2 className='text-xl'>Subscribers: {channel.subscriberCount}</h2>
                      </div>
                    </div>
                    <button onClick={()=>(toggleSubscription(channel._id))} className='w-fit h-10 px-3 py-1 text-lg md:text-2xl border border-white/20 rounded-xl hover:scale-110 transition-all hover:bg-white/5 hover:ring-2 hover:ring-red-400 hover:text-red-400'>Unsubscribe</button>
                </div>
              ))}
        </div>
    </div>
  )
}

export default Subscriptions