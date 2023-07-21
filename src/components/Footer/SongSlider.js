
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import PropTypes from 'prop-types'
import FormattedTime from './components/FormattedTime'

const SongSlider = ({token}) => {
    
    const [pulledData, setPulledData] = useState({})


    useEffect(() => {
        setTimeout(() => {
            trackServices.getCurrentlyPlayingTrack(token).then(data => {setPulledData(data)})
        }, 1000)
    }, [pulledData])
    if (pulledData === {}){
        return (
            <div></div>
        )
    }else{
        return (
            <div>
                <FormattedTime numSeconds={pulledData.progress_ms/1000}/>
                <FormattedTime numSeconds={pulledData.item.duration_ms/1000}/>
            </div>
            
        )
    }
}

SongSlider.propTypes = {
    token: PropTypes.string.isRequired
}


export default SongSlider