import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'

import trackServices from '../../../../services/trackServices'

import './PodcastsOnly.css'

const PodcastsOnly = ({podcasts, token, player}) => {
    const status = useSelector(state => state.status.status)
    

    const handlePlay = async (uri) => {
        console.log(uri)
        const is_current_podcast = status.track_window.current_track.uri === uri
        if (!is_current_podcast){
            trackServices.playTrack(token, [uri])
        }
        else{
            player.togglePlay()
        }
    }

    return (
        <div className='podcastsOnlyContainer'>
            {podcasts.map(podcast => 
                <div key={podcast.id} className='individualPodcast'>
                    {
                        status.track_window.current_track.uri === podcast.uri ?
                            status.paused ? <FaCirclePlay className='playButton' onClick={() => handlePlay(podcast.uri)}/> : <AiOutlinePauseCircle className='playButton' onClick={() => handlePlay(podcast.uri)}/>
                            : <FaCirclePlay className='playButton' onClick={() => handlePlay(podcast.uri)}/>
                    }
                    <img src={podcast.images[0].url}/>
                    <div>{podcast.name}</div>
                </div>
            )}
        </div>
    )
}


PodcastsOnly.propTypes = {
    podcasts: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}
export default PodcastsOnly