// This file is part of the opinionator project

// Copyright (C) 2019  Jonas Bentke <jonas@slock.it>, Slock.it GmbH
 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// [Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.]
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import './../styles/Footer.css'
import config from '../../config.json';
class Footer extends Component {
  render() {
    return (
      <div className="fix-footer">
            <div className="footer-text">
                <p className="has-text-centered"><a href="https://slock.it/impressum.html">Legal Notice</a> - <a href="https://slock.it/privacy_web.html">Privacy Notice</a> - © Copright 2015-2019 Slock.it GmbH - All Rights Reserved - {config.version}</p>
            </div>
      </div>
      );
  }
}

export default Footer;