import PropTypes from 'prop-types'
import { AiOutlinePauseCircle, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai'
import { FaCirclePlay } from 'react-icons/fa6'


import './footer.css'
import { useState } from 'react'
import SongSlider from './SongSlider'


const Footer = ({current_track, player, is_paused, token}) => {
    const [volume, setVolume] = useState(1)

    return (
        <div className='footer'>
            <SongSlider token={token}/>
            <div className='footer-left'>
                <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                <div>
                    <div className="now-playing__name">{ current_track.name }</div>
                    <div className="now-playing__artist">{ current_track.artists[0].name }</div>
                </div>
                
            </div>
            <div className='footer-center'>
                <AiFillStepBackward  onClick={() => { player.previousTrack() }}/>
                {is_paused ? <FaCirclePlay onClick={() => { player.togglePlay() }}/> : <AiOutlinePauseCircle onClick={() => { player.togglePlay() }}/>}
                <AiFillStepForward onClick={() => { player.nextTrack() }}/>
            </div>

            <div className='footer-right'>
                <input type='range' min={0} max={1} step={0.02} value={volume} onChange={event => setVolume(event.target.valueAsNumber)}/>
            </div>
        </div>
    )
}

Footer.propTypes = {
    current_track: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    is_paused: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired
}

export default Footer