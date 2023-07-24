import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import trackServices from '../../../services/trackServices'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const LikeButton = ({token, uri}) => {
    const [inSavedAlbums, setPresentAlbums] = useState(false)
    const [inSavedTracks, setPresentTracks] = useState(false)

    useEffect(() => {        
        trackServices.checkSavedAlbums(token, uri.substring(14)).then(res => setPresentAlbums(res[0]))
        trackServices.checkSavedTracks(token, uri.substring(14)).then(res => setPresentTracks(res[0]))
    }, [])

    const handleLike = () => {
        const id = uri.substring(14)
        if (uri.includes('album')){
            trackServices.saveAlbum(token,id)
            setPresentAlbums(true)
        }
        else if (uri.includes('track')){
            trackServices.saveTrack(token,id)
            setPresentTracks(true)
        }
    }

    const handleUnlike = () => {
        const id = uri.substring(14)
        if (uri.includes('album')){
            trackServices.deleteAlbum(token,id)
            setPresentAlbums(false)
        }
        else if (uri.includes('track')){
            trackServices.deleteTrack(token,id)
            setPresentTracks(false)
        }
    }

    if (uri.includes('album')){
        return (
            <>
                {inSavedAlbums ? <AiFillHeart onClick={() => handleUnlike()}/> : <AiOutlineHeart onClick={() => handleLike()}/>}
                
            </>
        )
    }
    else if (uri.includes('track')){
        return (
            <>
                {inSavedTracks ? <AiFillHeart onClick={handleUnlike}/> : <AiOutlineHeart onClick={handleLike}/>}
            
            </>
        )
    }
}

LikeButton.propTypes = {
    token: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
}

export default LikeButton