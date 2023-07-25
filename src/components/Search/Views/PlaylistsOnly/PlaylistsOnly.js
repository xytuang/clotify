import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import trackServices from '../../../../services/trackServices'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './PlaylistsOnly.css'

const PlaylistsOnly = ({playlists, token, player}) => {
    const status = useSelector(state => state.status.status)
    const [current_playlist, setCurrentPlaylist] = useState(null)

    const handlePlay = async (playlist) => {
        const is_current_playlist = playlist.uri === current_playlist
        if (!is_current_playlist){
            const playlistItems = await trackServices.getPlaylistItems(token, playlist.id)
            trackServices.playTrack(token, playlistItems.items.map(item => item.track.uri))
            setCurrentPlaylist(playlist.uri)
        }
        else{
            player.togglePlay()
        }
    }

    return (
        <div className='playlistsOnlyContainer'>
            {playlists.map(playlist => 
                <Link to={`../../playlist/${playlist.id}`} key={playlist.id} className='individualPlaylist'>
                    {
                        current_playlist === playlist.uri ? 
                            status.paused ? <FaCirclePlay className='playButton' onClick={() => handlePlay(playlist)}/> : <AiOutlinePauseCircle className='playButton' onClick={() => handlePlay(playlist)}/>
                            : <FaCirclePlay className='playButton' onClick={() => handlePlay(playlist)}/> 
                    }
                    <img src={playlist.images[0].url}/>
                    <div>{playlist.name}</div>
                </Link>
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