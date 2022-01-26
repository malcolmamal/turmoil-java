import React from 'react';
import jQuery from 'jquery';
import Unit from './Unit';
import { WindowLocation } from '../../../js/windows/window-location';

export default class FriendlyUnit extends React.Component {
  componentDidMount() {
    const {
      ident, position, polygonsInRange, gender,
    } = this.props;

    window.turmoil.instance.activeUnit = ident;
    window.turmoil.instance.polygonsInRange = polygonsInRange;

    WindowLocation.setEquipmentBackground(gender);

    setTimeout(() => {
      WindowLocation.handleMoveToPolygon(jQuery(`#${position}`), jQuery(`#${ident}`));
    }, 200);

    setTimeout(() => {
      WindowLocation.setActivePolygons();
    }, 500);
  }

  actionOnUnitHandler(ident) {
    // do nothing at the moment
  }

  render() {
    const {
      ident, portrait, healthBar, movement,
    } = this.props;

    return (
      <Unit ident={ident} portrait={portrait} healthBar={healthBar} movement={movement} onClick={this.actionOnUnitHandler} />
    );
  }
}
