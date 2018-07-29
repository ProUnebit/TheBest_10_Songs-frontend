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

    search = () => {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        let ALBUM_URL = `https://api.spotify.com/v1/artists`
        const ACCESS_TOKEN = 'BQBosz4kuQkgpwnXffETdaxgKxGSZTUamJgQFRB7a0H2H6k6ml0fxf2FThqUOFkDuOfyVgaX2Z-lyvXNzcn95gDPZaGT8fWYPIYZcqaegmYwyzprcuXnNx6EMiQg4Xq-VcQ6Ic7FJnOpFAciSdZFsunBz0v4y9XjkwSev-M5pono6aF58g&refresh_token=AQBcZwwaymzWo6eUgBOXwoHnGCDIR4KGUcrc4nK5EkJsp1eaIRe3l1i9pDOtuDeJLu6Cusb9Y6d5RPF6_H3t2UGpR3s7Q7XbmZgxZOVwVL0MggCwPi8zSipcXBOEwTNcphg';

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
                    console.log('top traks: ', json);
                    const tracks = json.tracks;
                    this.setState({tracks : tracks});
                })
        })
    }

    render () {

        return (
            <div className="app">
                <div className="app-title">MusicMaster</div>
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
