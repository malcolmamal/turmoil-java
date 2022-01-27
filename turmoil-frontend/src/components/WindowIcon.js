import React from 'react';
import Windows from '../js/core/turmoil-windows';

class WindowIcon extends React.Component {
  render() {
    const { ident } = this.props;

    return (
      <div className={`windowIcon ${ident}WindowIcon noSelection`} onClick={() => Windows.switchShowClose(ident, true)}>
        <div className="windowIconHover" />
        <div className="windowIconText noSelection">{ident}</div>
      </div>
    );
  }
}

export default WindowIcon;
