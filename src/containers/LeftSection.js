import PropTypes from 'prop-types'
import { TiHome } from 'react-icons/ti'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import { BiLibrary } from 'react-icons/bi'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import trackServices from '../services/trackServices'
import Library from '../components/Library/Library'
import './LeftSection.css'

const LeftSection = ({token}) => {
    const [savedAlbums, setSavedAlbums] = useState(null)
    const [savedPlaylists, setSavedPlaylists] = useState(null)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('Recents')
    const [active, setActive] = useState(true)

    useEffect(() => {
        trackServices.getSavedAlbums(token).then(res => setSavedAlbums(res))
        trackServices.getSavedPlaylists(token).then(res => setSavedPlaylists(res))
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleSort = (event) => {
        setSort(event.target.value)
    }


    if (savedAlbums === null || savedPlaylists === null){
        return (
            <></>
        )
    }
    return (
        <div className={active ? 'left' : ''}>
            <div><Link className='text-link' to='/'><TiHome/><span className={active ? '' : 'hideLeft'}>Home</span></Link></div>
            <div><Link className='text-link' to='/search'><FaMagnifyingGlass/><span className={active ? '' : 'hideLeft'}>Search</span></Link></div>
            <Outlet/>
            <div>
                <div><BiLibrary onClick={() => setActive(!active)}/><span className={active ? '' : 'hideLeft'}>Your library</span></div>
                <div className={active ? '' : 'hideLeft'}>
                    <FaMagnifyingGlass className='defaultLibrarySearch'/>
                    <input className='librarysearch' placeholder='Search in your library' value={search} onChange={handleSearch}/>
                    <select onChange={handleSort}>
                        <option disabled>Sort by</option>
                        <option>Recents</option>
                        <option>Recently added</option>
                        <option>Alphabetical</option>
                        <option>Creator</option>
                    </select>
                </div>
                <Library savedAlbums={savedAlbums} savedPlaylists={savedPlaylists} search={search} sort={sort} active={active}/>
            </div>
        </div>
    )
}

LeftSection.propTypes = {
    token: PropTypes.string.isRequired
}

export default LeftSection