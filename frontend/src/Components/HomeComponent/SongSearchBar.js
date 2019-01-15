import React from 'react';
import './SongSearchBar.css'
import axios from 'axios';
import SongCardsList from './SongCardsList'

class SongSearchBar extends React.Component {
     constructor(props) {
      super(props);
      this.state = {value:'',displayedSongs:[]}

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
   } 
     handleChange(e) {
      this.setState({ value: e.target.value });
   }

   keyPress(e){
      if(e.keyCode == 13){
          const searchURL = window.location.href.split('/').slice(0,-1).join('/') + ':8081/search?term='+e.target.value;
          console.log(searchURL);
            
            const headers = {
                Authorization: `Bearer ${this.props.access_token}`
            }
            axios.get(searchURL,{ headers }).then(response => {
                this.setState({
                    displayedSongs: response.data
                })
            })
        
      }
   }
  render() {
  return(
 <div>
 <div className="container">
	<div className="row">
        <div className="col-md-6">
            <div className="custom-search-input">
                <div className="input-group col-md-12">
                    <input type="text" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange}  className="form-control input-lg" />
                </div>
            </div>
        </div>
	</div>
  </div>
  <div className="songs">
   <SongCardsList displayedSongs={this.state.displayedSongs} />
   </div>
</div>
  )
}
}

export default SongSearchBar;