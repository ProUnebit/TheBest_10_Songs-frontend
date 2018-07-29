import React from 'react'

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            playingUrl: '',
            audio: null
        }
    }

    playAudio = previewUrl => {
        let audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio: audio
            })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio: audio
                })
            }
        }
    }

    render () {

        const tracks = this.props.tracks;
        //or
        // const { tracks } = this.props;

        return (
            <div className="gallery">
                {tracks.map((track, index) => {
                    console.log(track)
                    const trackImg = track.album.images[0].url;
                    return (
                        <div
                            key = {index}
                            className="track"
                            onClick = {() => this.playAudio(track.preview_url)}
                            >
                            <img
                                src = {trackImg}
                                className="track-img"
                                alt="track"
                            />
                        <p className="track-text">
                            {track.name}
                        </p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery;
