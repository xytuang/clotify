import PropTypes from 'prop-types'
import './AlbumDisplay.css'

const AlbumDisplay = ({albums}) => {
    return (
        <div>
            <h4>Albums</h4>
            <div className='albumSearchResult'>
                {albums.map(album => 
                    <div key={album.id}>
                        <img src={album.images[2].url}/>
                        <div>{album.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

AlbumDisplay.propTypes = {
    albums: PropTypes.array.isRequired,
}

export default AlbumDisplay