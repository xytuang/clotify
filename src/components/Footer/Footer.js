
import PropTypes from 'prop-types'
import { AiOutlinePauseCircle, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai'
import { FaCirclePlay } from 'react-icons/fa6'


import './footer.css'
import { useState } from 'react'
import SongSlider from './SongSlider'
import SongDetails from './SongDetails'
import { useSelector } from 'react-redux'


const Footer = ({player, token}) => {
    const [volume, setVolume] = useState(1)
    const track = useSelector(state => state.status)
    return (
        <div className='footer'>
            
            <SongDetails current_track={track.status.track_window.current_track} token={token}/>

            <div className='footer-center'>
                <div>
                    <AiFillStepBackward  onClick={() => { player.previousTrack() }}/>
                    {track.status.paused ? <FaCirclePlay onClick={() => { player.togglePlay() }}/> : <AiOutlinePauseCircle onClick={() => { player.togglePlay() }}/>}
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
    player: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
}

export default Footer