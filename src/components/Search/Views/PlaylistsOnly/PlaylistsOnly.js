import PropTypes from 'prop-types'
import './PlaylistsOnly.css'

const PlaylistsOnly = ({playlists}) => {
    return (
        <div className='playlistsOnlyContainer'>
            {playlists.map(playlist => 
                <div key={playlist.id} className='individualItem'>
                    <img src={playlist.images[0].url}/>
                    <div>{playlist.name}</div>
                </div>
            )}
        </div>
    )
}

PlaylistsOnly.propTypes = {
    playlists: PropTypes.array.isRequired
}



export default PlaylistsOnly