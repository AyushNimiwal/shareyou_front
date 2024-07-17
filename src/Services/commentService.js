const API_URL = import.meta.env.VITE_API_URL;

const getComments = async(videoId)=>{
    const res= await fetch(`${API_URL}/comments/${videoId}`,
    {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
}

const addComment = async(comment,videoId)=>{
    const res= await fetch(`${API_URL}/comments/${videoId}`,
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
        body:JSON.stringify({text:comment}),
    });
    const result= await res.json();
    return result.data;
}

const updateComment = async(comment,commentId)=>{
    const res= await fetch(`${API_URL}/comments/c/${commentId}`,
    {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
        body:JSON.stringify({text:comment}),
    });
    const result= await res.json();
    return result.data;
}

const deleteComment = async(commentId)=>{
    const res= await fetch(`${API_URL}/comments/c/${commentId}`,
    {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
}
export default {getComments, addComment, updateComment, deleteComment};