import React from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, Well } from 'react-bootstrap';
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
        // let ACCESS_TOKEN = 'BQCHHZIsq0xG_mQP5Ciac4MIbj9xmMMbprqGJPN17CvHAw9SKtVKbXz4EEmFyDkVtTMHJHeEp4GN3acsPtR0Xo3EpDe2tylbq9lGkJQsmdqlcK_qJZ_W-xXWzv7QqYHTJWJa1cRL4TArfn09QRoY71hNy9ClOCSJp3fqnR6wwzM1zW05Hg';
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
                <h2 className="app-title">The Best <span>10</span> Songs</h2>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                                bsSize="large"
                                type='text'
                                className="search-input"
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
                    ? <div className="main-container">
                        <Profile
                            artist = {this.state.artist}
                        />
                        <Gallery
                            tracks = {this.state.tracks}
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
