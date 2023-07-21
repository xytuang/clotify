/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Footer from './components/Footer/Footer'

const track = {
    name: '',
    album: {
        images: [
            { url: '' }
        ]
    },
    artists: [
        { name: '' }
    ]
}


const WebPlayback = (props) => {
    const [is_paused, setPaused] = useState(false)
    const [is_active, setActive] = useState(false)
    const [current_track, setTrack] = useState(track)
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

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return
                }
                setTrack(state.track_window.current_track)
                setPaused(state.paused)
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                })
            }))
            
    
            player.connect()
        }
    }, [])
    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    }
    else {
        return (
            <>
                <div>
                    <div className='app'>{props.children}</div>
                    <Footer player={player} current_track={current_track} is_paused={is_paused} token={props.token}/>
                </div>
            </>
        )
    }
    
}



export default WebPlayback
