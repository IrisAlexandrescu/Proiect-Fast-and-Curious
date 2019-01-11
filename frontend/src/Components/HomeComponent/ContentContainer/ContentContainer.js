import React from 'react';
import './ContentContainer.css';

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="content-container">
                <h1>ContentContainer</h1>
            </div>
        )
        
    }
}

export default ContentContainer;