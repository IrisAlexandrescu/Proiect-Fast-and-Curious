import React, { Component } from "react";
import './SideNavbar.css'

import settings from '../../button-images/settings.png'

class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
  render() {
  return(
 <div class="sidebar">
			    <div class="w3-sidebar w3-bar-block"> 
					<div class="w3-bar-item w3-button" name="pensula_btn" id="pensula_btn">
						<label for="button-1" id="checkboxLabel1" title="Button1">   </label>
						<input type="checkbox" class="checkbox" id="button-1" />
					</div>
					<div class="w3-bar-item w3-button" name="linie_btn" id="linie_btn">
						<label for="button-2" id="checkboxLabel2" title="Button2">    </label>
						<input type="checkbox" class="checkbox" id="button-2" />
					</div>
					<div class="w3-bar-item w3-button">
						<label for="button-3" id="checkboxLabel3" title="Button3">   </label>
						<input type="checkbox" class="checkbox" id="button-3" /> 
					</div>
					<a href={""}><div class="settings-button"><img class="static" src={settings} /><img class="active" src="https://loading.io/spinners/gear/lg.config-gear-loading-icon.gif"/></div></a>
			    </div>

</div>
  );
}
}

export default SideNavbar;