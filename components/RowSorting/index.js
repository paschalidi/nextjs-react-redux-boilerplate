/**
 *
 * RowSorting
 *
 */
/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import PT from 'prop-types';

import * as actions from '../../store/restaurant-store/actions';
import { initStore } from '../../store/configure';
import withRedux from 'next-redux-wrapper';

import { Grid, Icon } from 'semantic-ui-react';


class RowSorting extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { isRatingDesc, isNameDesc, isOnlineNow, isReachableNow, style } = this.props;
    return (
      <Grid container stackable style={style}>
        {/* language=CSS */}
        <style>
          {`
              .sorting--item {
                  cursor: pointer;
                  display: inline-block;

              }
          `}
        </style>
        <Grid.Row columns={3} style={{ paddingTop: 0 }}>
          <Grid.Column width={16} style={{ paddingLeft: 0 }}>
            <div className='text--sm color--sec'>
              Sort
            </div>
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: 0 }} width={3}>
            {
              isNameDesc === undefined
                ?
                <div className='sorting--item' onClick={this.props.sortByNameAsc}>
                  Alphabetically
                </div>
                :
                isNameDesc
                  ?
                  <div className='sorting--item' onClick={this.props.sortByNameAsc}>
                    Alphabetically <Icon name='chevron up' />
                  </div>
                  :
                  <div className='sorting--item' onClick={this.props.sortByNameDesc}>
                    Alphabetically <Icon name='chevron down' />
                  </div>
            }

          </Grid.Column>
          <Grid.Column width={3}>
            {
              isRatingDesc === undefined
                ?
                <div className='sorting--item' onClick={this.props.sortByRatingDesc}>
                  Rating
                </div>
                :
                isRatingDesc
                  ?
                  <div className='sorting--item' onClick={this.props.sortByRatingAsc}>
                    Rating <Icon name='chevron down' />
                  </div>
                  :
                  <div className='sorting--item' onClick={this.props.sortByRatingDesc}>
                    Rating <Icon name='chevron up' />
                  </div>
            }
          </Grid.Column>
          <Grid.Column width={4} />
          <Grid.Column width={3} textAlign='right'>
            <input
              className="checkbox"
              type="checkbox"
              checked={isOnlineNow}
              onChange={this.props.toggleOnlineNow}
              value='Online'
            /> Online
          </Grid.Column>
          <Grid.Column width={3} textAlign='right'>
            <input
              className="checkbox"
              type="checkbox"
              checked={isReachableNow}
              onChange={this.props.toggleReachableNow}
              value='Reachable'
            /> Reachable
          </Grid.Column>

        </Grid.Row>
      </Grid>
    );
  }
}

RowSorting.defaultProps = {
  isRatingDesc: undefined,
  isNameDesc: undefined,
  isOnlineNow: true,
  isReachableNow: true
};

RowSorting.propTypes = {
  isRatingDesc: PT.bool,
  isNameDesc: PT.bool,
  isOnlineNow: PT.bool,
  isReachableNow: PT.bool
};

function mapStateToProps(state) {
  return { ...state.restaurants };
}

export default withRedux(initStore, mapStateToProps, actions)(RowSorting);