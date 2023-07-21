/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const request = require('request')
const dotenv = require('dotenv')

const port = 3001

global.access_token = ''

dotenv.config()

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const app = express()

const generateRandomString = (length) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

app.get('/auth/login', (req, res) => {
    const scope = 'streaming user-read-email user-read-private user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing'
    
    const state = generateRandomString(16)

    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: 'http://localhost:3000/auth/callback',
        state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString())
})

app.get('/auth/callback', (req, res) => {
    const code = req.query.code
  
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: 'http://localhost:3000/auth/callback',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        json: true
    }
  
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token
            res.redirect('/')
        }
    })
})

app.get('/auth/token', (req, res) => {
    res.json({access_token: access_token})
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})