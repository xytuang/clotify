import PropTypes from 'prop-types'
import './basicDisplay.css'
import { Link } from 'react-router-dom'

const PlaylistDisplay = ({playlists}) => {
    return (
        <div>
            <h4>Playlists</h4>
            <div className='containerSearchResult'>
                {playlists.map(playlist => 
                    <Link to={`../playlist/${playlist.id}`} key={playlist.id} className='individualItem'>
                        <img src={playlist.images[0].url}/>
                        <div>{playlist.name}</div>
                    </Link>
                )}
            </div>
        </div>
    )
}

PlaylistDisplay.propTypes = {
    playlists: PropTypes.array.isRequired,
}

export default PlaylistDisplay