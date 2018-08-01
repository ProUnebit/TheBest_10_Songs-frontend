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
                <div className="triangle"></div>
                {tracks.map((track, index) => {
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
                        <div className="track-play">
                            <div className="track-play-inner">
                                {
                                    this.state.playingUrl === track.preview_url
                                        ? <span>&#10074;&#10074;</span>
                                        : <span>&#9654;</span>
                                }
                            </div>
                        </div>
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
