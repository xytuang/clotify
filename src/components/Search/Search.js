import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import SongDisplay from './SongDisplay'
import ArtistDisplay from './ArtistDisplay'
import AlbumDisplay from './AlbumDisplay'
import './Search.css'
import PlaylistDisplay from './PlaylistDisplay'
import EpisodeDisplay from './EpisodeDisplay'
import PodcastDisplay from './PodcastDisplay'

const Search = ({ token}) => {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [albums, setAlbums] = useState([])
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [podcasts, setPodcasts] = useState([])

    useEffect(() => {
        if (search !== ''){
            trackServices.find(token, search)
                .then(res => {
                    setSongs(res.tracks.items) 
                    setAlbums(res.albums.items) 
                    setArtists(res.artists.items)
                    setPlaylists(res.playlists.items)
                    setEpisodes(res.episodes.items)
                    setPodcasts(res.shows.items)
                })
        }
    }, [search])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handlePlay = (uri) => {
        trackServices.playTrack(token, [uri])
    }
    
    return (
        <div className='searchContainer'>
            <input value={search} onChange={handleSearch} placeholder='What do you want to listen to?'/>
            {search === '' ? <div></div> : 
                <>
                    <SongDisplay songs={songs} handlePlay={handlePlay}/>
                    <ArtistDisplay artists={artists}/>
                    <AlbumDisplay albums={albums}/>
                    <PlaylistDisplay playlists={playlists}/>
                    <EpisodeDisplay episodes={episodes}/>
                    <PodcastDisplay podcasts={podcasts}/>
                </>
            }
            
        </div>
    )
}


Search.propTypes = {
    token: PropTypes.string.isRequired
}

export default Search