import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import './recentlyplayed.css'

const RecentlyPlayed = ({token}) => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    useEffect(() => {
        trackServices.getUsersTopTracks(token).then(songs => setRecentlyPlayed(songs.items))
    }, [])
    return (
        <div>
            <div>Good Evening</div>
            <div className='recentlyPlayed'>{recentlyPlayed.map(song => <div key={song.name}>{song.name}</div>)}</div>
        </div>
    )
    
}

RecentlyPlayed.propTypes = {
    token: PropTypes.string.isRequired,
}

export default RecentlyPlayed