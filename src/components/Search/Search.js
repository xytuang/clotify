import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../../services/trackServices'
import './Search.css'
import { Route, Routes, Link } from 'react-router-dom'
import SongsOnly from './Views/SongsOnly/SongsOnly'
import PlaylistsOnly from './Views/PlaylistsOnly/PlaylistsOnly'
import All from './Views/All/All'
import AlbumsOnly from './Views/AlbumsOnly/AlbumsOnly'
import ArtistsOnly from './Views/ArtistsOnly/ArtistsOnly'
import PodcastsOnly from './Views/PodcastsOnly/PodcastsOnly'
import EpisodesOnly from './Views/EpisodesOnly/EpisodesOnly'

const Search = ({ token, player }) => {
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
                    <div>
                        <Link className='text-link' to=''><button>All</button></Link>
                        <Link className='text-link' to='songs'><button>Songs</button></Link>
                        <Link className='text-link' to='playlists'><button>Playlists</button></Link>
                        <Link className='text-link' to='albums'><button>Albums</button></Link>
                        <Link className='text-link' to='artists'><button>Artists</button></Link>
                        <Link className='text-link' to='podcasts'><button>Podcasts</button></Link>
                        <Link className='text-link' to='episodes'><button>Episodes</button></Link>
                    </div>

                    <Routes>
                        <Route index element={<All songs={songs.slice(0,5)} artists={artists.slice(0,7)} albums={albums.slice(0,7)} podcasts={podcasts.slice(0,7)} episodes={episodes.slice(0,7)} playlists={playlists.slice(0,7)} handlePlay={handlePlay}/>}/>
                        <Route path='songs' element={<SongsOnly songs={songs} token={token} player={player}/>}/>
                        <Route path='playlists' element={<PlaylistsOnly playlists={playlists} token={token} player={player}/>}/>
                        <Route path='albums' element={<AlbumsOnly albums={albums} token={token} player={player}/>}/>
                        <Route path='artists' element={<ArtistsOnly artists={artists} token={token} player={player}/>}/>
                        <Route path='podcasts' element={<PodcastsOnly podcasts={podcasts} token={token} player={player}/>}/>
                        <Route path='episodes' element={<EpisodesOnly episodes={episodes} token={token} player={player}/>}/>
                    </Routes>
                    
                    
                </>
            }
            
        </div>
    )
}


Search.propTypes = {
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}

export default Search