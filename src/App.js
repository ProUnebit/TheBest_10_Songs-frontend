import React from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

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
        // let ACCESS_TOKEN = 'BQDMB3xNRwRIJUBomDhcKaj4YwrpY6oJPLPsphY9Zfj9ZF9iMwfHMgaxCjl7Bly4oyVLfyCI6B-b7i7Rn2wx-sw089d9QlJ1sz3UwjM4BSjQe_zyY22-3CFKWK8Xraumd5S3__yXgmk-vvXwGtU20W_tfpsdqdZayijjEVJO9cqjMEffHw&refresh_token=AQCaPjI6Mktxg1PMzlSXGUTERRTYLgdm-z74rup9PHd-JIxZBEOExJ2UwIk6GmTSw6x326IguVLS-Aby_EuqxYoASbIIXjgcFQrxiaMXiChep5VU_2MhMa6369yt-FgPG9w';
        console.log(ACCESS_TOKEN);

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

        return (
            <div className="app">
                <div className="app-title">MusicMaster!!!</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                                type='text'
                                placeholder="Search for an Artists"
                                value = {this.state.query}
                                onChange = {event => {this.setState({query: event.target.value})}}
                                onKeyPress = {event => event.key === "Enter" ? this.search() : null}
                        />
                    <InputGroup.Addon onClick = {() => this.search()}>
                        <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ? <div>
                        <Profile
                            artist = {this.state.artist}
                        />
                        <Gallery
                            tracks = {this.state.tracks}
                        />
                      </div>
                    : <div></div>
                }
            </div>
        )
    }
}

export default App;
