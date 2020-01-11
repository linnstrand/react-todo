import React from 'react';
import { COLORS } from '../constants/colors';

export class ColorOptions extends React.Component {
  render() {
    return (
      <div
        className={
          'shadow-sm color-options ' + (this.props.visibleColor ? 'shown' : '')
        }>
        {COLORS.map(color => {
          const styling = {
            borderColor: color.hex,
            backgroundColor: color.hex
          };
          return (
            <button
              key={color.hex}
              className='color-button'
              title={color.name}
              style={styling}
              onClick={() => this.props.setColor(color.hex)}
              aria-label={color.name}
            />
          );
        })}
      </div>
    );
  }
}
