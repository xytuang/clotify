import PropTypes from 'prop-types'
import { useState, useEffect } from'react'
import { useParams } from 'react-router-dom'
import trackServices from '../../services/trackServices'


import './IndividualAlbum.css'
import FormattedTime from '../Footer/components/FormattedTime'


const IndividualAlbum = ({token}) => {
    const id = useParams().id
    const [album, setAlbum] = useState(null)
    useEffect(() => {
        trackServices.getAlbum(token, id).then(data => setAlbum(data))
    }, [])
    
    if (album === null){
        return (
            <></>
        )
    }

    return (
        <div>
            <div className='individualAlbumDetails'>
                <img src={album.images[2].url}/>
                <div>
                    <div>{album.album_type}</div>
                    <div>{album.name}</div>
                    <div>{album.artists.map(artist => <span key={artist.id}>{artist.name} . </span>)} {album.release_date} . {album.total_tracks} song</div>
                </div>
            </div>
            <div>Buttons</div>
            <div className='individualAlbumTracks'>
                <div className='individualAlbumTrackHeaders'>
                    <span>#</span> <span>Title</span> <span>time icon</span>
                    {album.tracks.items.map(item => <><span>{item.track_number}</span> <span>{item.name}</span> <FormattedTime numSeconds={item.duration_ms/1000}/></>)}
                </div>
                
            </div>
        </div>
        
    )
}

IndividualAlbum.propTypes = {
    token: PropTypes.string.isRequired
}
export default IndividualAlbum