import React from 'react'
import './App.css'
import { Badge } from 'react-bootstrap';

class Profile extends React.Component {
    render () {

        let artist = {
            name: '',
            external_urls: {
                spotify: ''
            },
            followers: {
                total: ''
            },
            images: [
                {
                    url: ''
                }
            ],
            genres: []
        };

        artist = this.props.artist !== null ? this.props.artist : artist;

        return (
            <div className="profile" onClick = {() => window.open(artist.external_urls.spotify)}>
                <img alt="Profile" className="profile-img" src = {artist.images[0].url}/>
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-followers">
                        <Badge>{artist.followers.total} Followers</Badge>
                    </div>
                    <div className="profile-genres">
                        {
                            artist.genres.map((genre, index) => {
                                genre = genre !== artist.genres[artist.genres.length - 1]
                                    ? ` ${genre}, `
                                    : ` & ${genre}.`
                                return (
                                    <span key = {index}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
