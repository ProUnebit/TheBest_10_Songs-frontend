import React from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import SpotifyLogo from './spotify.svg'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    componentDidMount() {

    }

    search = () => {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        let ALBUM_URL = `https://api.spotify.com/v1/artists`
        let APP_LOCATION = window.location.href;
        let ACCESS_TOKEN = APP_LOCATION.split('=')[1];
        // let ACCESS_TOKEN = 'BQAteRtsF6XWcWa4Hf3DiGxk5cm_Ik_FOJv9hX41uqRRAJa-q66Q2bk2ALOzXJ2P6CtlMUtrmgJLAiWfItICE1I37GMV8yFELeQoUtJTb22Vrz-Fqw-OHf0KBmxu_jcHiKotW19CtscrTxoeVHC071lQQizDh3334ZFAMxCwopxZY_7N3Q';
        console.info(ACCESS_TOKEN);

        let fetchOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, fetchOptions)
          .then(response => response.json())
          .then(json => {
            const artist = json.artists.items[0];
            this.setState({ artist: artist });

            FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
            fetch(FETCH_URL, fetchOptions)
                .then(response => response.json())
                .then(json => {
                    const tracks = json.tracks;
                    this.setState({tracks : tracks});
                })
        })
    }

    render () {
        // All this.state values
        let { query, artist, tracks } = this.state;

        return (
            <div className="app">
                <h2 className="app-title">The Best <span>10</span> Songs</h2>
                <img
                    src={SpotifyLogo}
                    alt="Spotify logo"
                    width="30px"
                    height="30px"
                    style={{marginLeft: '5px'}}
                />
                <FormGroup>
                    <InputGroup>
                        <FormControl
                                bsSize="large"
                                type='text'
                                className="search-input"
                                placeholder="Search for an Artists"
                                value = {query}
                                onChange = {event => {this.setState({query: event.target.value})}}
                                onKeyPress = {event => event.key === "Enter" ? this.search() : null}
                        />
                    <InputGroup.Addon onClick = {() => this.search()}>
                        <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    artist !== null
                    ? <div className="main-container">
                        <Profile
                            artist = {artist}
                        />
                        <Gallery
                            tracks = {tracks}
                        />
                        <span className="my-mail">
                            Mail for communication: &nbsp; <a href="mailto:ProUnebit@yandex.ru">ProUnebit@yandex.ru</a>
                        </span>
                      </div>
                    : <span
                        role="img"
                        aria-label="Music Note"
                        style = {{fontSize: '66px'}}
                      >🎵
                      </span>
                }
            </div>
        )
    }
}

export default App;
