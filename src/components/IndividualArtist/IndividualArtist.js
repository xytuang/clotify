import PropTypes from 'prop-types'
import { useState, useEffect } from'react'
import { useParams } from 'react-router-dom'
import trackServices from '../../services/trackServices'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
// import { HiOutlineArrowDownCircle } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import './IndividualArtist.css'
import FormattedTime from '../Footer/components/FormattedTime'
import LikeButton from '../Buttons/LikeButton/LikeButton'


const IndividualArtist = ({player, token}) => {
    const id = useParams().id
    const [artistTracks, setArtistTracks] = useState(null)
    const status = useSelector(state => state.status.status)
    let i = 1
    

    useEffect(() => {
        trackServices.getArtistTopTracks(token, id).then(data => setArtistTracks(data))
    }, [])

    const handlePlay = async () => {
        const is_current_artist = status.track_window.current_track.artists.filter(artist => artist.uri.substring(15) === id)
        if (is_current_artist.length === 0){
            const uris = artistTracks.tracks.map(item => item.uri)
            trackServices.playTrack(token, uris)
        }
        else{
            player.togglePlay()
        }
    }

    if (artistTracks === null){
        return (
            <></>
        )
    }

    return (
        <div>
            <div className='individualArtistDetails'>
                <div>
                    <div>{artistTracks.tracks[0].artists[0].name}</div>
                </div>
            </div>
            <div>
                {
                    status.track_window.current_track.artists.filter(artist => artist.uri.substring(15) === id).length !== 0 ?
                        status.paused ? <FaCirclePlay className='normalPlayButton' onClick={handlePlay}/> : <AiOutlinePauseCircle className='normalPlayButton' onClick={handlePlay}/>
                        : <FaCirclePlay className='normalPlayButton' onClick={handlePlay}/>
                }
            </div>
            <div>
                <div className='individualArtistTrackHeaders'><span>#</span> <span>Title</span> <span><IoTimeOutline/></span></div>
                {artistTracks.tracks.map(item => <div key={item.id} className='individualArtistTrackHeaders'><span>{i++}</span> <span>{item.name}</span> <span><LikeButton token={token} uri={item.uri}/><FormattedTime numSeconds={item.duration_ms/1000}/></span></div>)}
            </div>
                
        </div>
        
    )
}



IndividualArtist.propTypes = {
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}

//<img src={artistTracks.tracks[0].artists[0].images[2].url}/>
export default IndividualArtist