/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Footer from './components/Footer/Footer'
import LeftSection from './containers/LeftSection'
import MainSection from './containers/MainSection'
import RightSection from './containers/RightSection'
import { useDispatch } from 'react-redux'
import { setStatus } from './reducers/stateReducer'


const WebPlayback = (props) => {
    const [is_active, setActive] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [player, setPlayer] = useState(undefined)
    const dispatch = useDispatch()

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
                // setTrack(state.track_window.current_track)
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true)
                    dispatch(setStatus(state))
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
                    <div className='app'>
                        <LeftSection token={props.token}/>
                        <MainSection token={props.token} player={player}/>
                        <RightSection/>
                    </div>
                    <Footer player={player} token={props.token}/>
                </div>
            </>
        )
    }
    
}



export default WebPlayback
