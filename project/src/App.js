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
        const ACCESS_TOKEN = 'BQDe-TnHCGeKAnnnzkLDIWZRQCx_2GVF0VzCkf5IHkFJ3dDbAJ0vPs_G3iuiQ-fWzRn3U8qZxMahmNTx6HkEqwSUsWpyymMDppd_WlWDZxeu67JPG6Q8Yu7yS_smmzufLkauutEJ5-W4qX_bb3iDJwSs_5ebTC9_9iGbgjHMYjeGX7vtOg';

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
