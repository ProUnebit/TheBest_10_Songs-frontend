import React from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null
        }
    }

    search = () => {
        console.log(this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
        const ACCESS_TOKEN = 'BQC3Vsn_ny1KMe3fSVS3nK0RlZOVRn0CRUOrHGb4b0Cv8_HfVgrDaLWRIe-Z4aA1t5ReA_W34p2h1W-0YQ09U_4rAZvZ1LQAVIXNye5PtTpbc9U6en3FrXgJWsQ0OIRMljZ7CESgsLbG-chainiboqiGxbduX066fTqrR8z9Cj2-9o4fKQ&refresh_token=AQC_-gKloW0EFpzt2K063NxhWobCEIw3jcMHpIGA1jLcQn-r5obKtQExQzLD84IXGTzJRMxzV60ESmicH-uVs-l6yRXivl-vU4Ocd22-C9SwGqXt7B_ayrQmBtQbvKmqcIY';
        console.log(FETCH_URL);

        let myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            const artist = json.artists.items[0];
            this.setState({ artist });
        })
    }

    render () {

        let artist = {
            name: '',
            followers: {
                total: ''
            }
        };

        if (this.state.artist !== null) {
            artist = this.state.artist;
        }

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
                <div className="profile">
                    <div>{artist.name}</div>
                    <div>{artist.followers.total}</div>
                </div>
                <div className="gallery">Gallery</div>
            </div>
        )
    }
}

export default App;
