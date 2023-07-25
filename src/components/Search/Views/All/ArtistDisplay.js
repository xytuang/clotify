import PropTypes from 'prop-types'
import './basicDisplay.css'
import { Link } from 'react-router-dom'

const ArtistDisplay = ({artists}) => {
    return (
        <div>
            <h4>Artists</h4>
            <div className='containerSearchResult'>
                {artists.map(artist => 
                    <Link to={`../artist/${artist.id}`} key={artist.id} className='individualItem'>
                        <img src={artist.images[0].url} alt='test'/>
                        <div>{artist.name}</div>
                    </Link>
                )}
            </div>
        </div>
    )
}

ArtistDisplay.propTypes = {
    artists: PropTypes.array.isRequired,
}

export default ArtistDisplay