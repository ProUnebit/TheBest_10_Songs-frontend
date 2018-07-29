import React from 'react'

class Gallery extends React.Component {
    render () {

        const tracks = this.props.tracks;

        return (
            <div className="gallery">
                {tracks.map((track, index) => {
                    const trackImg = track.album.images[0].url;
                    return (
                        <div key = {index} className="track">
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
