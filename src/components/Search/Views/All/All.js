import PropTypes from 'prop-types'

import SongDisplay from './SongDisplay'
import ArtistDisplay from './ArtistDisplay'
import AlbumDisplay from './AlbumDisplay'
import PlaylistDisplay from './PlaylistDisplay'
import EpisodeDisplay from './EpisodeDisplay'
import PodcastDisplay from './PodcastDisplay'

const All = ({songs, artists, albums, playlists, episodes, podcasts, handlePlay}) => {
    return (
        <>
            <SongDisplay songs={songs} handlePlay={handlePlay}/>
            <ArtistDisplay artists={artists}/>
            <AlbumDisplay albums={albums}/>
            <PlaylistDisplay playlists={playlists}/>
            <EpisodeDisplay episodes={episodes}/>
            <PodcastDisplay podcasts={podcasts}/>
        </>
    )
}

All.propTypes = {
    songs: PropTypes.array.isRequired,
    artists: PropTypes.array.isRequired,
    albums: PropTypes.array.isRequired,
    playlists: PropTypes.array.isRequired,
    episodes: PropTypes.array.isRequired,
    podcasts: PropTypes.array.isRequired,
    handlePlay: PropTypes.func.isRequired,
}

export default All