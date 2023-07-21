
import PropTypes from 'prop-types'
import { AiOutlinePauseCircle, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai'
import { FaCirclePlay } from 'react-icons/fa6'


import './footer.css'
import { useState } from 'react'
import SongSlider from './SongSlider'
import SongDetails from './SongDetails'


const Footer = ({current_track, player, is_paused, token}) => {
    const [volume, setVolume] = useState(1)

    return (
        <div className='footer'>
            
            <SongDetails current_track={current_track}/>

            <div className='footer-center'>
                <div>
                    <AiFillStepBackward  onClick={() => { player.previousTrack() }}/>
                    {is_paused ? <FaCirclePlay onClick={() => { player.togglePlay() }}/> : <AiOutlinePauseCircle onClick={() => { player.togglePlay() }}/>}
                    <AiFillStepForward onClick={() => { player.nextTrack() }}/>
                </div>
                <div>
                    <SongSlider token={token}/>
                </div>
                
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