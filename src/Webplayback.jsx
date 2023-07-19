import { useState, useEffect } from 'react'
import LeftSection from './containers/LeftSection'
import RightSection from './containers/RightSection'
import MainSection from './containers/MainSection'

const WebPlayback = (props) => {
    // const [is_paused, setPaused] = useState(false)
    // const [is_active, setActive] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [player, setPlayer] = useState(undefined)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true
        document.body.appendChild(script)

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                // eslint-disable-next-line react/prop-types
                getOAuthToken: cb => { cb(props.token) },
                volume: 0.5
            })
            setPlayer(player)
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id)
            })
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id)
            })
    
            player.connect()
        }
    }, [])
    return (
        <>
            <div className="app">
                <LeftSection/>
                <MainSection/>
                <RightSection/>
            </div>
        </>
    )
}


export default WebPlayback
