import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1'


const getUsersTopItems = async (token, type) => {
    
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/top/${type}?limit=20`, config)
    return response.data
}

const playTrack = async (token, uri) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }

    const response = await axios.put(`${baseUrl}/me/player/play`, {uris: uri}, config)
    return response.data

}

const find = async (token, query) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }

    const response = await axios.get(`${baseUrl}/search?q=${query}&type=album%2Cplaylist%2Cartist%2Ctrack%2Cepisode%2Cshow&limit=20`, config)
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

const getAlbum = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/albums/${id}`, config)
    return response.data
}

const getSavedTracks = async (token) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/tracks`, config)
    return response.data
}

const getSavedAlbums = async (token) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/albums?limit=50`, config)
    return response.data
}

const getSavedPlaylists = async (token) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/playlists?limit=50`, config)
    return response.data
}



const saveAlbum = (token, id) => {
    axios({ url: `${baseUrl}/me/albums/?ids=${id}`, method: 'put', headers: { Authorization: `Bearer ${token}`} })
}

const saveTrack = (token, id) => {
    axios({ url: `${baseUrl}/me/tracks/?ids=${id}`, method: 'put', headers: { Authorization: `Bearer ${token}`} })
}

const deleteAlbum = (token, id) => {
    axios({ url: `${baseUrl}/me/albums/?ids=${id}`, method: 'delete', headers: { Authorization: `Bearer ${token}`} })
}

const deleteTrack = (token, id) => {
    axios({ url: `${baseUrl}/me/tracks/?ids=${id}`, method: 'delete', headers: { Authorization: `Bearer ${token}`} })
}

const checkSavedTracks = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/tracks/contains?ids=${id}`, config)
    return response.data
}

const checkSavedAlbums = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/me/albums/contains?ids=${id}`, config)
    return response.data
}

const getPlaylistItems = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/playlists/${id}/tracks`, config)
    return response.data
}

const getPlaylist = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/playlists/${id}`, config)
    return response.data
}


const getArtistTopTracks = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/artists/${id}/top-tracks?market=SG`, config)
    return response.data
}

const getArtistAlbums = async (token, id) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/artists/${id}/albums`, config)
    return response.data
}


const repeatSetter = (token, state) => {
    axios({ url: `${baseUrl}/me/player/repeat?state=${state}`, method: 'put', headers: { Authorization: `Bearer ${token}`} })
}

const togglePlaybackShuffle = (token, state) => {
    axios({ url: `${baseUrl}/me/player/shuffle?state=${state}`, method: 'put', headers: { Authorization: `Bearer ${token}`} })
}

const getAvailableGenreSeeds = async (token) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/recommendations/available-genre-seeds`, config)
    return response.data
}

const getRecommendations = async (token, type, items) => {
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${baseUrl}/recommendations?limit=100&${type}=${items}`, config)
    return response.data
}




export default 
{ 
    getUsersTopItems, 
    playTrack, 
    find,
    adjustVolume, 
    getCurrentlyPlayingTrack, 
    seekToPosition, 
    getAlbum, 
    getSavedTracks, 
    getSavedAlbums,
    getSavedPlaylists,
    saveAlbum,
    saveTrack,
    deleteAlbum,
    deleteTrack,
    checkSavedTracks,
    checkSavedAlbums,
    getPlaylist,
    getPlaylistItems,
    getArtistTopTracks,
    getArtistAlbums,
    repeatSetter,
    togglePlaybackShuffle,
    getAvailableGenreSeeds,
    getRecommendations
}