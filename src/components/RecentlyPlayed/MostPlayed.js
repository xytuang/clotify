import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import './mostplayed.css'

const MostPlayed = ({token}) => {
    const [mostPlayed, setMostPlayed] = useState([])

    useEffect(() => {
        trackServices.getUsersTopTracks(token).then(songs => setMostPlayed(songs.items))
    }, [])
    console.log(mostPlayed.map(song=> song.uri))

    const handlePlay = (uri) => {
        trackServices.playTrack(token, uri)
    }
    return (
        <div>
            <div>Good Evening</div>
            <div className='recentlyPlayed'>
                {mostPlayed.map(song => 
                    <div key={song.name} onClick={() => handlePlay(song.uri)}>
                        <img src={song.album.images[2].url}/>
                        {song.name}
                    </div>)}
            </div>
        </div>
    )
    
}

MostPlayed.propTypes = {
    token: PropTypes.string.isRequired,
}

export default MostPlayed