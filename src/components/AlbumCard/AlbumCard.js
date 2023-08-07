import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './AlbumCard.css'

const AlbumCard = ({album}) => {
    return (
        <Link to={`../album/${album.id}`} className='album-card'>
            <img src={album.images[0].url} className='album-cover'/>
            <div className='album-name'>{album.name}</div>
        </Link>
    )
}
AlbumCard.propTypes = {
    album: PropTypes.object.isRequired
}
export default AlbumCard