import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { IoTimeOutline } from 'react-icons/io5'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import trackServices from '../../../services/trackServices'
import FormattedTime from '../../Footer/components/FormattedTime'
import './RecommendationsDisplay.css'

const RecommendationsDisplay = ({player, token}) => {
    const playlist = useSelector(state => state.mix.mix)
    const status = useSelector(state => state.status.status)
    let i = 1
    const handlePlaySong = (uri) => {
        const is_current_track = uri === status.track_window.current_track.uri
        if (!is_current_track){
            trackServices.playTrack(token, [uri])
        }
        else{
            player.togglePlay()
        }
    }
    return (
        <div className='RecommendationDisplayContainer'>
            <div className='RecommendationDisplayHeaders'><span>#</span> <span>Title</span> <span><IoTimeOutline/></span></div>
            {playlist.map(track => 
                <div key={track.uri} className='RecommendationDisplayTracks'>
                    <span className='default'>{i++}</span>
                    <span className='onHover'>
                        {
                            track.uri === status.track_window.current_track.uri ? 
                                status.paused ? <FaCirclePlay onClick={() => handlePlaySong(track.uri)}/> : <AiOutlinePauseCircle onClick={() => handlePlaySong(track.uri)}/>
                                : <FaCirclePlay onClick={() => handlePlaySong(track.uri)}/>
                        }
                    </span>
                    <span>{track.name}</span>
                    <span><FormattedTime numSeconds={track.duration_ms/1000}/></span>
                </div>)}
        </div>
    )
}

RecommendationsDisplay.propTypes = {
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}


export default RecommendationsDisplay