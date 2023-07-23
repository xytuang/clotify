
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import PropTypes from 'prop-types'
import FormattedTime from './components/FormattedTime'

const SongSlider = ({token}) => {
    
    const [pulledData, setPulledData] = useState(null)


    useEffect(() => {
        setTimeout(() => {
            trackServices.getCurrentlyPlayingTrack(token).then(data => {setPulledData(data)})
        }, 1000)
    }, [pulledData])

    useEffect(() => {

    }, )

    // const handleChange = (event) => {
    //     if (pulledData === null){
    //         return
    //     }
    //     const newPosition = Math.floor((event.target.value / 100) * pulledData.item.duration_ms)

    //     trackServices.seekToPosition(token, newPosition)
    // }
    while (pulledData === null){
        return (
            <div></div>
        )
    }
    return (
        <div>
            <FormattedTime numSeconds={pulledData.progress_ms/1000}/>
            <span>-------------------------------------</span>
            {/* <input className='progress-bar' type='range' value={pulledData.progress_ms/pulledData.item.duration_ms * 100} onChange={handleChange} /> */}
            <FormattedTime numSeconds={pulledData.item.duration_ms/1000}/>
        </div>
            
    )
}

SongSlider.propTypes = {
    token: PropTypes.string.isRequired
}


export default SongSlider