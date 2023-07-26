
import PropTypes from 'prop-types'
import { AiOutlinePauseCircle, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai'
import { FaCirclePlay } from 'react-icons/fa6'
import { PiShuffleBold } from 'react-icons/pi'
import { BsRepeat, BsRepeat1 } from 'react-icons/bs'

import './footer.css'
import { useState } from 'react'
import SongSlider from './SongSlider'
import SongDetails from './SongDetails'
import { useSelector } from 'react-redux'
import trackServices from '../../services/trackServices'


const Footer = ({player, token}) => {
    const [volume, setVolume] = useState(1)
    const status = useSelector(state => state.status.status)


    const handleRepeat = (state) => {
        trackServices.repeatSetter(token, state)
    }

    const handleShuffle = (state) => {
        trackServices.togglePlaybackShuffle(token, state)
    }
    return (
        <div className='footer'>
            
            <SongDetails current_track={status.track_window.current_track} token={token}/>

            <div className='footer-center'>
                <div>
                    {status.shuffle ? <PiShuffleBold className='repeat-button' onClick={() => handleShuffle(false)}/> : <PiShuffleBold onClick={() => handleShuffle(true)}/>}
                    <AiFillStepBackward  onClick={() => { player.previousTrack() }}/>
                    {status.paused ? <FaCirclePlay onClick={() => { player.togglePlay() }}/> : <AiOutlinePauseCircle onClick={() => { player.togglePlay() }}/>}
                    <AiFillStepForward onClick={() => { player.nextTrack() }}/>
                    {status.repeat_mode === 0 ? <BsRepeat onClick={() => handleRepeat('context')}/> : status.repeat_mode === 1 ? <BsRepeat className='repeat-button' onClick={() => handleRepeat('track')}/> : <BsRepeat1 className='repeat-button' onClick={() => handleRepeat('off')}/>}
                
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