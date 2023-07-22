import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import trackServices from '../services/trackServices'

const Search = ({ token}) => {
    const [search, setSearch] = useState('')
    const [display, setDisplay] = useState([])
    useEffect(() => {
        if (search !== ''){
            trackServices.findTrack(token, search).then(songs => setDisplay(songs.tracks.items))
        }
        // console.log(display)
    }, [search])
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handlePlay = (uri) => {
        trackServices.playTrack(token, uri)
    }

    return (
        <div>
            <input value={search} onChange={handleSearch} placeholder='What do you want to listen to?'/>
            <div>
                {display.map(song => 
                    <div key={song.id}>
                        <div onClick={() => handlePlay(song.uri)}>{song.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}


Search.propTypes = {
    token: PropTypes.string.isRequired
}

export default Search