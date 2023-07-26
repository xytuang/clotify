import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Library.css'

const Library = ({savedAlbums, savedPlaylists, search, sort, active}) => {
    let albums = savedAlbums.items
    let playlists = savedPlaylists.items
    switch (sort) {
    case 'Alphabetical': {
        albums.sort((a,b) => {
            const nameA = a.album.name.toUpperCase()
            const nameB = b.album.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })

        playlists.sort((a,b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
        break
    }
    case 'Recents': {
        albums.sort((a,b) => {
            const dateA = a.album.release_date
            const dateB = b.album.release_date
            if (dateA < dateB) {
                return -1
            }
            if (dateA > dateB) {
                return 1
            }
            return 0
        })
        break
    }
    case 'Creator': {
        albums.sort((a,b) => {
            const artistA = a.album.artists[0].name.toUpperCase()
            const artistB = b.album.artists[0].name.toUpperCase()
            if (artistA < artistB) {
                return -1
            }
            if (artistA > artistB) {
                return 1
            }
            return 0
        })

        playlists.sort((a,b) => {
            const artistA = a.owner.display_name.toUpperCase()
            const artistB = b.owner.display_name.toUpperCase()
            if (artistA < artistB) {
                return -1
            }
            if (artistA > artistB) {
                return 1
            }
            return 0
        })
        break
    }
    case 'Recently added': {
        albums.sort((a,b) => {
            const addedA = a.added_at
            const addedB = b.added_at
            if (addedA < addedB) {
                return -1
            }
            if (addedA > addedB) {
                return 1
            }
            return 0
        })
        break
    }
    }
    if (search !== ''){
        search = search.toLowerCase()
        albums = albums.filter(elem => elem.album.name.includes(search) || elem.album.artists.filter(artist => artist.name.toLowerCase().includes(search)).length !== 0)
    }
    return (
        <>
            <div className='savedLibraryItems'>
                {albums.map(item => 
                    <Link to={`/album/${item.album.id}`} key={item.album.id} className={active ? 'oneLibraryItem' : 'img-only'}>
                        <img src={item.album.images[0].url}/>
                        {
                            active ? 
                                <div>
                                    <div>{item.album.name}</div>
                                    <div>Album . {item.album.artists.map(artist => <span key={artist.id}>{artist.name}</span>)}</div>
                                </div> 
                                : <></>
                        }
                        
                    </Link>
                )}

                {playlists.map(item => 
                    <Link to={`/playlist/${item.id}`} key={item.id} className={active ? 'oneLibraryItem' : 'img-only'}>
                        <img src={item.images[0].url}/>
                        {
                            active ? 
                                <div>
                                    <div>{item.name}</div>
                                    <div>Playlist . {item.owner.display_name}</div>
                                </div>
                                :<></>
                        }
                        
                    </Link>
                )}
            </div>
        </>
    )
}

Library.propTypes = {
    savedAlbums: PropTypes.object.isRequired,
    savedPlaylists: PropTypes.object.isRequired,
    search: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}

export default Library