import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import trackServices from '../../../../services/trackServices'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import './PlaylistsOnly.css'

const PlaylistsOnly = ({playlists, token, player}) => {

    const [is_paused, setPaused] = useState(true)
    const [current_track_uri, setCurrentTrackURI] = useState('')

    useEffect(() => {
        player.getCurrentState().then(state => setCurrentTrackURI(state.track_window.current_track.uri))
    }, [])

    const handlePlay = async (playlist) => {
        const playlistItems = await trackServices.getPlaylistItems(token, playlist.id)
        const found = playlistItems.items.filter(item => item.uri === current_track_uri)
        console.log(playlistItems.items.map(item => item.track.uri))
        if (found.length === 0){
            trackServices.playTrack(token, playlistItems.items.map(item => item.track.uri))
            setPaused(false)
        }
        else{
            player.togglePlay()
            setPaused(!is_paused)
        }
    }

    return (
        <div className='playlistsOnlyContainer'>
            {playlists.map(playlist => 
                <div key={playlist.id} className='individualPlaylist'>
                    {!is_paused ? <FaCirclePlay className='playButton' onClick={() => handlePlay(playlist)}/> : <AiOutlinePauseCircle className='playButton' onClick={() => handlePlay(playlist)}/>}

                    <img src={playlist.images[0].url}/>
                    <div>{playlist.name}</div>
                </div>
            )}
        </div>
    )
}

PlaylistsOnly.propTypes = {
    playlists: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}

{/* <FaCirclePlay className='playButton'/> */}

export default PlaylistsOnly