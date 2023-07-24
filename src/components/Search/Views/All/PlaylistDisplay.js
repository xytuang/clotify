import PropTypes from 'prop-types'
import './basicDisplay.css'

const PlaylistDisplay = ({playlists}) => {
    return (
        <div>
            <h4>Playlists</h4>
            <div className='containerSearchResult'>
                {playlists.map(playlist => 
                    <div key={playlist.id} className='individualItem'>
                        <img src={playlist.images[0].url}/>
                        <div>{playlist.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

PlaylistDisplay.propTypes = {
    playlists: PropTypes.array.isRequired,
}

export default PlaylistDisplay