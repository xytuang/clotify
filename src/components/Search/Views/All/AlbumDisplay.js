import PropTypes from 'prop-types'
import './basicDisplay.css'
import { Link } from 'react-router-dom'

const AlbumDisplay = ({albums}) => {
    return (
        <div>
            <h4>Albums</h4>
            <div className='containerSearchResult'>
                {albums.map(album => 
                    <Link to={`../album/${album.id}`}key={album.id} className='individualItem'>
                        
                        <img src={album.images[2].url}/>
                        <div>{album.name}</div>
                    </Link>
                )}
            </div>
        </div>
    )
}

AlbumDisplay.propTypes = {
    albums: PropTypes.array.isRequired,
}

export default AlbumDisplay