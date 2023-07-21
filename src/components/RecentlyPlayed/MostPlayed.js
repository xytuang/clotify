import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import './mostplayed.css'

const MostPlayed = ({token}) => {
    const [mostPlayed, setMostPlayed] = useState([])

    useEffect(() => {
        trackServices.getUsersTopTracks(token).then(songs => setMostPlayed(songs.items))
    }, [])

    const handlePlay = (uri) => {
        trackServices.playTrack(token, uri)
    }
    return (
        <div>
            <div>Your favourites</div>
            <div className='mostplayed'>
                {mostPlayed.map(song => 
                    <div className='song' key={song.name} onClick={() => handlePlay(song.uri)}>
                        <img className='mostplayed-img' src={song.album.images[2].url}/>
                        <span className='song-name'>{song.name}</span>
                    </div>)}
            </div>
        </div>
    )
    
}

MostPlayed.propTypes = {
    token: PropTypes.string.isRequired,
}

export default MostPlayed