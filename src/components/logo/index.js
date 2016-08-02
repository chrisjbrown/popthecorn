import React, { Component } from 'react';
import LogoImage from 'base/assets/logo.png';

class Logo extends Component {

  render() {
    const styles = { width: 128 };

    return (
      <div className="flex items-center">
        <img style={ styles }
          src={ LogoImage }
          data-ref="logo-image"
          alt="DBK Picker" />
      </div>
    );
  }

  contructor() {}

}

export default Logo;
