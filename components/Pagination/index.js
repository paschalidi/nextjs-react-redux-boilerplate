/**
 *
 * Pagination
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
import { Grid } from 'semantic-ui-react';
import Button from '../Button';


class Pagination extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handlePaginationClick = (key) => {
    window.scrollTo(0, 0);
    this.props.selectPage(key);
  };

  render() {
    const { activePage, totalPages } = this.props;
    return (
      <div>
        {/* language=CSS */}
        <style>
          {`
              .page--style {
                  margin: 0 auto;
                  cursor: pointer;
                  padding: 5px 10px;
                  border: solid 1px #ddd;
              }

              .active-page {
                  background-color: #444 !important;
              }

              .page {
                  background: #f9f9f9;
              }
          `}
        </style>
        <Grid container centered>
          <Grid.Row>
            {
              new Array(totalPages).fill(0).map((index, key) =>
                <Grid.Column
                  key={key}
                  textAlign='center'
                  width={1}
                >
                  <Button onClick={() => this.handlePaginationClick(key)} className={`${activePage === key ? 'active-page' : 'page transparent'}`}>
                    {key + 1}
                  </Button>
                </Grid.Column>
              )
            }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Pagination.defaultProps = {
  activePage: 0,
  totalPages: 1
};

Pagination.propTypes = {
  activePage: PT.number,
  totalPages: PT.number
};

function mapStateToProps(state) {
  return { ...state.restaurants };
}

export default withRedux(initStore, mapStateToProps, actions)(Pagination);
