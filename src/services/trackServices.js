import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1'


const getUsersTopTracks = async (token) => {
    
    const config = {
        headers : { Authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${baseUrl}/me/top/artists`, config)
    return response.data
}

export default { getUsersTopTracks }