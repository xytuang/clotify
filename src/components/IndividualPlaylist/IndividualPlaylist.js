import PropTypes from 'prop-types'
import { useState, useEffect } from'react'
import { useParams } from 'react-router-dom'
import trackServices from '../../services/trackServices'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
// import { HiOutlineArrowDownCircle } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import './IndividualPlaylist.css'
import FormattedTime from '../Footer/components/FormattedTime'
// import LikeButton from '../Buttons/LikeButton/LikeButton'


const IndividualPlaylist = ({player, token}) => {
    const id = useParams().id
    const [current_playlist, setCurrentPlaylist] = useState(null)
    const status = useSelector(state => state.status.status)
    let i = 1

    useEffect(() => {
        trackServices.getPlaylist(token, id).then(data => setCurrentPlaylist(data))
    }, [])

    const handlePlay = async () => {
        console.log(current_playlist)
        const is_current_playlist = current_playlist.tracks.items.filter(item => item.track.uri === status.track_window.current_track.uri)
        if (is_current_playlist.length === 0){
            const playlist = await trackServices.getPlaylist(token, id)
            trackServices.playTrack(token, playlist.tracks.items.map(item => item.track.uri))
            setCurrentPlaylist(playlist)
        }
        else{
            player.togglePlay()
        }
    }

    const handlePlaySong = (uri) => {
        const is_current_track = uri === status.track_window.current_track.uri
        if (!is_current_track){
            trackServices.playTrack(token, [uri])
        }
        else{
            player.togglePlay()
        }
    }

    if (current_playlist === null){
        return (
            <></>
        )
    }

    return (
        <div className='IndividualPlaylistContainer'>
            <div className='individualPlaylistDetails'>
                <img src={current_playlist.images[0].url}/>
                <div>
                    <div>{current_playlist.album_type}</div>
                    <div>{current_playlist.name}</div>
                    <div> Playlists {current_playlist.followers.total} . {current_playlist.tracks.length} song</div>
                </div>
            </div>
            <div>
                {
                    current_playlist.tracks.items.filter(item => item.track.uri === status.track_window.current_track.uri).length !== 0 ?
                        status.paused ? <FaCirclePlay className='normalPlayButton' onClick={handlePlay}/> : <AiOutlinePauseCircle className='normalPlayButton' onClick={handlePlay}/>
                        : <FaCirclePlay className='normalPlayButton' onClick={handlePlay}/>
                }
                
            </div>
            <div>
                <div>
                    <div className='individualPlaylistTrackHeaders'><span>#</span> <span>Title</span> <span><IoTimeOutline/></span></div>
                    {current_playlist.tracks.items.map(item => 
                        <div key={item.track.uri} className='individualPlaylistTracks'>
                            <span className='default'>{i++}</span>
                            <span className='onHover'>
                                {
                                    item.track.uri === status.track_window.current_track.uri ? 
                                        status.paused ? <FaCirclePlay onClick={() => handlePlaySong(item.track.uri)}/> : <AiOutlinePauseCircle onClick={() => handlePlaySong(item.track.uri)}/>
                                        : <FaCirclePlay onClick={() => handlePlaySong(item.track.uri)}/>
                                }
                            </span>
                            <span>{item.track.name}</span>
                            <span><FormattedTime numSeconds={item.track.duration_ms/1000}/></span>
                        </div>)}
                </div>
                
            </div>
        </div>
        
    )
}



IndividualPlaylist.propTypes = {
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}

//<LikeButton token={token} uri={`spotify:playlist:${id}`}/> <HiOutlineArrowDownCircle/>
//<LikeButton token={token} uri={item.track.uri}
export default IndividualPlaylist