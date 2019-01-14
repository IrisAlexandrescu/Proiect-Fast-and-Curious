import React, { Component } from "react";
import './SideNavbar.css'

import settings from '../../button-images/settings.png'

class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
  render() {
  	       const playlistimg = require('./home-images/' + 'playlist' + '.png')
          const graphimg = require('./home-images/' + 'graph' + '.png')
          const singout = require('./home-images/' + 'singout' + '.png')
  return(
 <div class="sidebar">
			    <div class="w3-sidebar w3-bar-block"> 
					<div class="w3-bar-item w3-button" name="pensula_btn" id="pensula_btn">
						 <img className="img1" width="20px"height="20px" src={playlistimg}/>
					</div>
					<div class="w3-bar-item w3-button" name="linie_btn" id="linie_btn">
						<img className="img2" width="20px"height="20px" src={graphimg}/>
					</div>
					<div class="w3-bar-item w3-button">
						<img className="img3" width="20px"height="20px" src={singout}/>
					</div>
					<a href={""}><div class="settings-button"><img class="static" src={settings} /><img class="active" src="https://loading.io/spinners/gear/lg.config-gear-loading-icon.gif"/></div></a>
			    </div>

</div>
  );
}
}

export default SideNavbar;