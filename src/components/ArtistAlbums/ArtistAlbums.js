import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import trackServices from '../../services/trackServices'
import AlbumCard from '../AlbumCard/AlbumCard'
import './ArtistAlbums.css'

const ArtistAlbums = ({album, token}) => {
    const [artistAlbums, setArtistAlbums] = useState(null)
    useEffect(() => {
        trackServices.getArtistAlbums(token, album.artists[0].id).then(data => setArtistAlbums(data))
    }, [])

    if (artistAlbums == null){
        return (
            <></>
        )
    }
    return (
        <div className='artist-albums'>
            More by {album.artists[0].name}
            <div  className='albumCardContainer'>
                {artistAlbums.items.filter(item => item.id != album.id).slice(0,5).map(item => <AlbumCard key={item.id} album={item}/>)}
            </div>
        </div>
    )
}

ArtistAlbums.propTypes = {
    album: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
}

export default ArtistAlbums