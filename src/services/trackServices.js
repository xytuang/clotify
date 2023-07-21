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

const findTrack = async (token, query) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }

    const response = await axios.get(`${baseUrl}/search?q=${query}&type=track&limit=10`, config)
    return response.data
}

const adjustVolume = async (token, volume) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.put(`${baseUrl}/me/player/volume?volume_percent=${volume}`, config)
    return response.data
}

const getCurrentlyPlayingTrack = async (token) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/player/currently-playing`, config)
    
    return response.data
}

const seekToPosition = (token, position_ms) => {
    axios({ url: `${baseUrl}/me/player/seek?position_ms=${position_ms}`, method: 'put', headers: { Authorization: `Bearer ${token}`} })
}

export default { getUsersTopTracks, playTrack, findTrack, adjustVolume, getCurrentlyPlayingTrack, seekToPosition }