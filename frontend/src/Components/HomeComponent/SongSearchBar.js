import React from 'react';
import './SongSearchBar.css'

class SongSearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    
  render() {
  return(
 <div className="container">
	<div className="row">
        <div className="col-md-6">
            <div className="custom-search-input">
                <div className="input-group col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="Search for your favourite song" />
                    <span className="input-group-btn">
                    
                    </span>
                </div>
            </div>
        </div>
	</div>
</div>
  )
}
}

export default SongSearchBar;