/**
 *
 * Button
 *
 */
import React from 'react';
import PT from 'prop-types';


const Button = ({ children, ...props }) =>
  <div className='inline' style={{ padding: '0 5px 3px 0' }}>
    <button
      onClick={() => props.onClick()}
      className={`${props.className && props.className} btn`}
      style={props.style}
      type="button"
    >
      {/* language=CSS */}
      <style>
        {`
            .btn {
                cursor: pointer;
                padding: 8px 15px;
                display: inline-block;
                margin: 0;
                overflow: hidden;
                border-width: 0;
                outline: none;
                border-radius: 2px;
                background-color: #2ecc71;
                color: white;
                transition: background-color .2s;
                font-weight: 200;
            }

            .btn:hover,
            .btn:focus {
                background-color: #27ae60;
            }

            .btn.transparent {
                background-color: transparent;
                border: solid 1px #999;
                color: #313541;
            }

            .btn.transparent:hover,
            .btn.transparent:focus {
                background-color: #999;
                color: white;
            }

            .btn.orange {
                border: solid 1px #e67e22;
                background-color: #e67e22;
            }

            .btn.orange:hover, .btn.orange:focus {
                border: solid 1px #d35400;
                background-color: #d35400;
            }
        `}
      </style>
      {children}
    </button>
  </div>;

Button.defaultProps = { children: 'button' };

Button.propTypes = { children: PT.any };

export default Button;
