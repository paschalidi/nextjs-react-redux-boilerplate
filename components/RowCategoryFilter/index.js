/**
 *
 * CategoryFilters
 *
 */
/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import PT from 'prop-types';

import cx from 'classnames';
import * as actions from '../../store/restaurant-store/actions';
import { initStore } from '../../store/configure';
import withRedux from 'next-redux-wrapper';
import { Grid } from 'semantic-ui-react';
import Button from '../Button';
import { toCamelCase } from '../../utils/string-manipulators';


class RowCategoryFilter extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { activeButton: null };
  }

  handleButtonClick = (index, key) => {
    this.setState({ activeButton: key });
    this.props.filterByCategory(index);
  };
  resetButtonState = (entry) => {
    this.setState({ activeButton: null });
    this.props.initRestaurants(entry);
  };

  render() {
    const { allCategories, entry } = this.props;
    return (
      <Grid container>
        {/* language=CSS */}
        <style>
          {`
              .active {
                  color: white !important;
              }
          `}
        </style>
        <Grid.Row style={{ paddingTop: 0 }}>
          <Grid.Column style={{ paddingLeft: 0 }} width={16}>
            <div className='text--sm color--sec'>
              Filter
            </div>
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: 0 }} width={16}>
            <Button
              className={cx({ 'orange active': this.state.activeButton === null }, 'transparent')}
              onClick={() => this.resetButtonState(entry)}
            >
              Reset filtering
            </Button>

            {
              allCategories.map((index, key) =>
                <Button
                  key={index}
                  className={cx({ 'orange active': key === this.state.activeButton }, 'transparent')}
                  onClick={() => this.handleButtonClick(index, key)}
                >
                  {toCamelCase(index.replace(/-/g, ' '), ',')}
                </Button>
              )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

RowCategoryFilter.defaultProps = {
  allCategories: [],
  entry: {}
};

RowCategoryFilter.propTypes = {
  allCategories: PT.array,
  entry: PT.object
};

function mapStateToProps(state) {
  return { ...state.restaurants };
}

export default withRedux(initStore, mapStateToProps, actions)(RowCategoryFilter);
