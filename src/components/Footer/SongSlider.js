import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import PropTypes from 'prop-types'

const SongSlider = ({token}) => {
    const [data, setData] = useState({})
    useEffect(() => {
        trackServices.getCurrentlyPlayingTrack(token).then(data => setData(data))
    }, [data])

    return (
        <div>{data.progress_ms}</div>
    )

}

SongSlider.propTypes = {
    token: PropTypes.string.isRequired
}


export default SongSlider