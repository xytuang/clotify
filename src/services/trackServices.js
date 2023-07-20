import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1'


const getUsersTopTracks = async (token) => {
    
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/top/tracks?limit=6`, config)
    return response.data
}

const playTrack = async (token, uri) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const configURI = {
        uris: [uri]
    }
    const response = await axios.put(`${baseUrl}/me/player/play`, configURI, config)
    return response.data

}

export default { getUsersTopTracks, playTrack }