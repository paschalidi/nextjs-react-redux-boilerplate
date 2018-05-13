/**
 *
 * RowInfo
 *
 */
/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import PT from 'prop-types';
import { Grid } from 'semantic-ui-react';


class RowInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { totalItems } = this.props;
    return (
      <Grid container>
        <Grid.Row>
          <div className='text--md bold'>{totalItems} Restaurants in total</div>
        </Grid.Row>
      </Grid>

    );
  }
}

RowInfo.defaultProps = {
  totalItems: 0
};

RowInfo.propTypes = {
  totalItems: PT.number
};

export default RowInfo;
