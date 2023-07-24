import PropTypes from 'prop-types'
import './ArtistDisplay.css'

const ArtistDisplay = ({artists}) => {
    return (
        <div>
            <h4>Artists</h4>
            <div className='artistsSearchResult'>
                {artists.map(artist => 
                    <div key={artist.id}>
                        <img src={artist.images[2].url}/>
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