const API_URL = import.meta.env.VITE_API_URL;

const toggleSubscription = async (id) => {
    const res = await fetch(`${API_URL}/subscriptions/c/subscription/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const result= await res.json();
    return result.data;
}

const getSubscribedChannels = async () => {
    const res = await fetch(`${API_URL}/subscriptions/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const result= await res.json();
    return result.data;
}

const isChannelSubscribed = async (id) => {
    const res = await fetch(`${API_URL}/subscriptions/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const result= await res.json();
    const response = result.data.subscriptions;
    for(let i=0;i<response.length;i++){
        if(response[i]._id==id){
            return true;
        }else{
            return false;
        }
    }
}

export default {
    toggleSubscription,
    getSubscribedChannels,
    isChannelSubscribed
};

