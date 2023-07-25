import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import trackServices from '../../services/trackServices'

import './mostplayed.css'

const MostPlayed = ({ token}) => {
    const [mostPlayed, setMostPlayed] = useState([])

    useEffect(() => {
        trackServices.getUsersTopTracks(token).then(songs => setMostPlayed(songs.items))
    }, [])



    return (
            
        <div>
            <div>Your favourites</div>
            <div className='mostplayed'>
                {mostPlayed.map(song => 
                    <div className='song' key={song.id}>
                        <Link to={`/album/${song.album.id}`}>
                            <img className='mostplayed-img' src={song.album.images[2].url}/>
                            <span className='song-name'>{song.name}</span>
                        </Link>
                        <Outlet/>
                    </div>)}
            </div>
        </div>
    )
    
}

MostPlayed.propTypes = {
    token: PropTypes.string.isRequired,
}

export default MostPlayed