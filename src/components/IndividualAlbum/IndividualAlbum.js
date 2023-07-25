import PropTypes from 'prop-types'
import { useState, useEffect } from'react'
import { useParams } from 'react-router-dom'
import trackServices from '../../services/trackServices'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { HiOutlineArrowDownCircle } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import './IndividualAlbum.css'
import FormattedTime from '../Footer/components/FormattedTime'
import LikeButton from '../Buttons/LikeButton/LikeButton'


const IndividualAlbum = ({player, token}) => {
    const id = useParams().id
    const [album, setAlbum] = useState(null)
    const status = useSelector(state => state.status.status)
    

    useEffect(() => {
        trackServices.getAlbum(token, id).then(data => setAlbum(data))
    }, [])

    const handlePlay = async () => {
        const current_album = id === status.track_window.current_track.album.uri.substring(14)
        if (!current_album){
            const album = await trackServices.getAlbum(token, id)
            const uris = album.tracks.items.map(item => item.uri)
            trackServices.playTrack(token, uris)
        }
        else{
            player.togglePlay()
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
            <div>
                {
                    id === status.track_window.current_track.album.uri.substring(14) ?
                        status.paused ? <FaCirclePlay className='normalPlayButton' onClick={handlePlay}/> : <AiOutlinePauseCircle className='normalPlayButton' onClick={handlePlay}/>
                        : <FaCirclePlay className='normalPlayButton' onClick={handlePlay}/>
                }
                <LikeButton token={token} uri={album.uri}/> <HiOutlineArrowDownCircle/>
            </div>
            <div>
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