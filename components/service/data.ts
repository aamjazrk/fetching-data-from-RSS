const baseUrl = 'http://localhost:3000'

export const getData = async() => {
    const res = await fetch(`${baseUrl}/api/rss`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }, 
        next: { revalidate: 36000 }, // one hour
        
    })
    const response = await res.json();
    return response

}