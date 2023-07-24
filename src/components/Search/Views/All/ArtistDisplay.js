import PropTypes from 'prop-types'
import './basicDisplay.css'

const ArtistDisplay = ({artists}) => {
    return (
        <div>
            <h4>Artists</h4>
            <div className='containerSearchResult'>
                {artists.map(artist => 
                    <div key={artist.id} className='individualItem'>
                        <img src={artist.images[0].url} alt='test'/>
                        <div>{artist.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

ArtistDisplay.propTypes = {
    artists: PropTypes.array.isRequired,
}

export default ArtistDisplay