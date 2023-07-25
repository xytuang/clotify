import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'

import trackServices from '../../../../services/trackServices'

import './EpisodesOnly.css'

const EpisodesOnly = ({episodes, token, player}) => {
    const status = useSelector(state => state.status.status)
    console.log('rendering')

    const handlePlay = async (uri) => {
        console.log(uri)
        const is_current_episode = status.track_window.current_track.uri === uri
        if (!is_current_episode){
            trackServices.playTrack(token, [uri])
        }
        else{
            player.togglePlay()
        }
    }

    return (
        <div className='episodesOnlyContainer'>
            {episodes.map(episode => 
                <div key={episode.id} className='individualEpisode'>
                    {
                        status.track_window.current_track.uri === episode.uri ?
                            status.paused ? <FaCirclePlay className='playButton' onClick={() => handlePlay(episode.uri)}/> : <AiOutlinePauseCircle className='playButton' onClick={() => handlePlay(episode.uri)}/>
                            : <FaCirclePlay className='playButton' onClick={() => handlePlay(episode.uri)}/>
                    }
                    <img src={episode.images[0].url}/>
                    <div>{episode.name}</div>
                </div>
            )}
        </div>
    )
}


EpisodesOnly.propTypes = {
    episodes: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}
export default EpisodesOnly