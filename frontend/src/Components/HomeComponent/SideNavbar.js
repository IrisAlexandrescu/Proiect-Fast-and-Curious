import React, { Component } from "react";
import './SideNavbar.css'

import settings from '../../button-images/settings.png'

class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
  render() {
  return(
 <div className="sidebar">
			    <div className="w3-sidebar w3-bar-block"> 
					<div className="w3-bar-item w3-button" name="pensula_btn" id="pensula_btn">
						<label htmlFor="button-1" id="checkboxLabel1" title="Button1">   </label>
						<input type="checkbox" className="checkbox" id="button-1" />
					</div>
					<div className="w3-bar-item w3-button" name="linie_btn" id="linie_btn">
						<label htmlFor="button-2" id="checkboxLabel2" title="Button2">    </label>
						<input type="checkbox" className="checkbox" id="button-2" />
					</div>
					<div className="w3-bar-item w3-button">
						<label htmlFor="button-3" id="checkboxLabel3" title="Button3">   </label>
						<input type="checkbox" className="checkbox" id="button-3" /> 
					</div>
					<a href={""}><div className="settings-button"><img className="static" src={settings} /><img className="active" src="https://loading.io/spinners/gear/lg.config-gear-loading-icon.gif"/></div></a>
			    </div>

</div>
  );
}
}

export default SideNavbar;