import React from 'react';
import './SongSearchBar.css'
import axios from 'axios';
import SongCardsList from './SongCardsList'
import { Button, Modal, ModalBody, ModalFooter,ModalHeader } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import SearchSongCard from './SearchSongCard'
import SongCard from './SearchSongCard.js';


class SongSearchBar extends React.Component {
     constructor(props) {
      super(props);
      this.state = {value:'',displayedSongs:[],modal:false,options:[],currentSubtitle:'',currentTitle:'',currentImgSrc:''}

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
      this.toggle = this.toggle.bind(this);
      this.ChangeOpt=this.ChangeOpt.bind(this);
   } 
   ChangeOpt(opt){
       const result = this.state.displayedSongs.map((song, i) => {
               if(song.name==opt.label)
               {
                   this.setState({currentTitle:song.name,currentSubtitle:song.artists.join(','),currentImgSrc:song.image_url})
               }
             })
   }
     handleChange(e) {
      this.setState({ value: e.target.value });
   }
     
      toggle() {
    this.setState({
      modal: !this.state.modal
    });
    console.log(this.state.modal)
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
             let listsongs=[];
                const cards = this.state.displayedSongs.map((song, i) => {
                  let songname=song.name
                  listsongs.push({"label":song.name,"value":i});
                })
                this.setState({options:listsongs});
             
                  this.toggle();
            })
           
      }
   }
  render() {
  return(
 <div>
 <div className="container">
	<div className="row-input">
        <div className="col-md-6">
            <div className="custom-search-input">
                <div className="input-group col-md-12">
                    <input type="text" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange}  className="form-control input-lg" />
                </div>
            </div>
        </div>
        <div className="buttonblock">
       <div className="modalcontent">
    
       <Modal className="modalcont" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="sm">
          <ModalHeader toggle={this.toggle}>
           <Select className="select-search"options={this.state.options} onChange={this.ChangeOpt}  />
          </ModalHeader>
          <ModalBody>
        {this.state.currentImgSrc&&this.state.currentTitle&& 
            <SongCard 
            imgSrc={this.state.currentImgSrc} 
            title={this.state.currentTitle} 
            subtitle={this.state.currentSubtitle} 
            />}
          </ModalBody>
          <ModalFooter>
             <Button color="primary" >Add</Button>
          </ModalFooter>
        </Modal>
    
      </div>
       </div>
	</div>
  </div>
</div>
  )
}
}

export default SongSearchBar;