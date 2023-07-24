import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import SongDisplay from './SongDisplay'
import ArtistDisplay from './ArtistDisplay'
import AlbumDisplay from './AlbumDisplay'

const Search = ({ token}) => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [albums, setAlbums] = useState([])
    const [artists, setArtists] = useState([])
    useEffect(() => {
        if (search !== ''){
            trackServices.find(token, search).then(res => {setSongs(res.tracks.items); setAlbums(res.albums.items); setArtists(res.artists.items)})
        }
    }, [search])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handlePlay = (uri) => {
        trackServices.playTrack(token, [uri])
    }

    return (
        <div>
            <input value={search} onChange={handleSearch} placeholder='What do you want to listen to?'/>
            <SongDisplay songs={songs} handlePlay={handlePlay}/>
            <ArtistDisplay artists={artists}/>
            <AlbumDisplay albums={albums}/>
        </div>
    )
}


Search.propTypes = {
    token: PropTypes.string.isRequired
}

export default Search