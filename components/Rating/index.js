/**
 *
 * Rating
 *
 */
/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, { Fragment } from 'react';
import PT from 'prop-types';


export const Rating = ({ rating }) =>
  <Fragment>
    {
      rating >= 4 && rating <= 4.7
        ?
        <span className='text--sm bold color--rating-good'>
          <i className="em em-drooling_face" /> {rating.toFixed(1)} / 5.0
        </span>
        :
        rating >= 3 && rating < 4
          ?
          <span className='text--sm bold color--rating-avarage'>
           <i className="em em-grinning" /> {rating.toFixed(1)} / 5.0
          </span>
          :
          <span className='text--sm bold'>
           <i className="em em-slightly_smiling_face" /> {rating.toFixed(1)} / 5.0
          </span>
    }

  </Fragment>;

Rating.defaultProps = {
  rating: 5.0
};

Rating.propTypes = {
  rating: PT.number
};
export default Rating;
