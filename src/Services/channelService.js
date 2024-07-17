const API_URL = import.meta.env.VITE_API_URL;
const getChannelStats = async () => {
    const res = await fetch(`${API_URL}/dashboard/stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });
    const result= await res.json();
    return result;
}
const getChannelVideos = async () => {
    const res = await fetch(`${API_URL}/dashboard/videos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });
    const result= await res.json();
    return result;
}
export default {
    getChannelStats,getChannelVideos
}