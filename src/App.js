import { useState, useEffect } from 'react'
import Login from './components/Login'
import './index.css'
import WebPlayback from './Webplayback'
import LeftSection from './containers/LeftSection'
import MainSection from './containers/MainSection'
import RightSection from './containers/RightSection'

const App = () =>  {
    const [token, setToken] = useState('')

    useEffect(() => {
        async function getToken(){
            const response = await fetch('/auth/token')
            const json = await response.json()
            
            setToken(json.access_token)
        }
        getToken()
        
    }, [])
    console.log(token)
    if (token === ''){
        return (
            <Login/>
        )
    }
    else {
        return (
            <WebPlayback token={token}>
                <LeftSection/>
                <MainSection token={token}/>
                <RightSection/>
            </WebPlayback>
        )
    }
    
}

export default App
