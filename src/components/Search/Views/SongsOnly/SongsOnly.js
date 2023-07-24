import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import FormattedTime from '../../../Footer/components/FormattedTime'
import LikeButton from '../../../Buttons/LikeButton/LikeButton'

import './SongsOnly.css'
import trackServices from '../../../../services/trackServices'

const SongsOnly = ({songs, token, player}) => {
    let indexInSearch = 1
    const [current_track_uri, setCurrentTrackURI] = useState('')
    const [paused, setPaused] = useState(true)

    useEffect(() => {
        player.getCurrentState().then(state => {setCurrentTrackURI(state.track_window.current_track.uri); setPaused(state.paused)})
        
    }, [current_track_uri])
    player.getCurrentState().then(state => setCurrentTrackURI(state.track_window.current_track.uri))

    const handlePlay = (uri) => {
        const is_current_track = uri === current_track_uri
        if (!is_current_track){
            trackServices.playTrack(token, [uri])
            setPaused(false)
        }
        else{
            player.togglePlay()
            setPaused(!paused)
        }
    }

    return (
        <div>
            <div className='songOnlyHeaders'><span>#</span> <span>Title</span><span>Album</span><span><IoTimeOutline/></span></div>
            {songs.map(song => 
                <div key={song.id} className='songOnlyTracks'>
                    <span className='default'>
                        {indexInSearch++}
                    </span>
                    <span className='onHover'>
                        {
                            song.uri === current_track_uri ? 
                                paused ? <FaCirclePlay onClick={() => handlePlay(song.uri)}/> : <AiOutlinePauseCircle onClick={() => handlePlay(song.uri)}/>
                                : <FaCirclePlay onClick={() => handlePlay(song.uri)}/>
                        }
                        
                    </span>
                    <span className='songOnlyTitle'>
                        <img src={song.album.images[0].url}/>
                        <div>
                            {song.name}
                            <div>
                                {song.artists.map(artist => <span key={artist.id}> {artist.name}</span>)}
                            </div>
                        </div>
                        
                    </span>
                    <span>{song.album.name}</span> 
                    <span><LikeButton token={token} uri={song.uri}/><FormattedTime numSeconds={song.duration_ms/1000}/></span>
                </div>
            )}
        </div>
    )
}


SongsOnly.propTypes = {
    songs: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}
export default SongsOnly