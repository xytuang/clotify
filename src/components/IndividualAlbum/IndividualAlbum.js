import PropTypes from 'prop-types'
import { useState, useEffect } from'react'
import { useParams } from 'react-router-dom'
import trackServices from '../../services/trackServices'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { HiOutlineArrowDownCircle } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'

import './IndividualAlbum.css'
import FormattedTime from '../Footer/components/FormattedTime'
import LikeButton from '../Buttons/LikeButton/LikeButton'


const IndividualAlbum = ({player, token}) => {
    const id = useParams().id
    const [album, setAlbum] = useState(null)
    const [albumTracks, setAlbumTracks] = useState([])
    const [current_track_uri, setCurrentTrackURI] = useState('')
    const [is_paused, setPaused] = useState(true)
    

    useEffect(() => {
        trackServices.getAlbum(token, id).then(data => {setAlbum(data); setAlbumTracks(data.tracks.items.map(item => item.uri))})
        player.getCurrentState().then(state => setCurrentTrackURI(state.track_window.current_track.uri))
    }, [])

    const handlePlay = () => {
        const found = album.tracks.items.filter(item => item.uri === current_track_uri)
        if (found.length === 0){
            trackServices.playTrack(token, albumTracks)
            setPaused(false)
        }
        else{
            player.togglePlay()
            setPaused(!is_paused)
        }
    }

    if (album === null){
        return (
            <></>
        )
    }

    return (
        <div>
            <div className='individualAlbumDetails'>
                <img src={album.images[2].url}/>
                <div>
                    <div>{album.album_type}</div>
                    <div>{album.name}</div>
                    <div>{album.artists.map(artist => <span key={artist.id}>{artist.name} . </span>)} {album.release_date} . {album.total_tracks} song</div>
                </div>
            </div>
            <div>{!is_paused ? <FaCirclePlay onClick={handlePlay}/> : <AiOutlinePauseCircle onClick={handlePlay}/>} <LikeButton token={token} uri={album.uri}/> <HiOutlineArrowDownCircle/></div>
            <div className='IndividualAlbumTracks'>
                <div>
                    <div className='individualAlbumTrackHeaders'><span>#</span> <span>Title</span> <span><IoTimeOutline/></span></div>
                    {album.tracks.items.map(item => <div key={item.id} className='individualAlbumTrackHeaders'><span>{item.track_number}</span> <span>{item.name}</span> <span><LikeButton token={token} uri={item.uri}/><FormattedTime numSeconds={item.duration_ms/1000}/></span></div>)}
                </div>
                
            </div>
        </div>
        
    )
}



IndividualAlbum.propTypes = {
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}
export default IndividualAlbum