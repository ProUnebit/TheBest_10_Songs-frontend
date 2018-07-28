import React from 'react';

class App extends React.Component {
    render () {
        return (
            <div>
                <div className="app-title">MusicMaster</div>
                <div>
                    <input placeholder="Search an artists..."/>
                    <button>Button</button>
                </div>
                <div className="profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="gallery">Gallery</div>
            </div>
        )
    }
}

export default App;
