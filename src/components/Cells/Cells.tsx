import * as classNames from 'classnames';
import * as React from 'react';

import './Cells.css';

interface Props {
  on: boolean,
  highlight: boolean,
  children: any,
  onClick: () => void,
}

export const Cells: React.SFC<Props> = (props) => {
  return (
    <div
      className={
        classNames({
          'Cells': true,
          'Highlight': props.highlight,
          'On': props.on,
        })
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
};