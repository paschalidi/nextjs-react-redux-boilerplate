import React, { Fragment } from 'react';
import cx from 'classnames';

import * as actions from '../store/restaurant-store/actions';
import { initStore } from '../store/configure';
import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import Layout from '../components/Layout';
import Restaurant from '../components/Restaurant';
import cookie from 'react-cookie';
import { Grid, Icon } from 'semantic-ui-react';

import { toCamelCase } from '../utils/string-manipulators';


class RestaurantPage extends React.Component {
  static async getInitialProps({ query }) {
    let token = cookie.load('accessToken');
    await axios.get('https://mockapi.pizza.de/v1/restaurants', { headers: { token } })
    .catch(async () => {
      const aws = await axios.get('https://mockapi.pizza.de/v1/auth');
      cookie.save('accessToken', aws.data.token, { path: '/' });
      token = aws.data.token;
    });

    let request = await axios.get(`https://mockapi.pizza.de/v1/restaurants/${query.queryId}`, { headers: { token } });
    return { id: query.queryId, restaurants: request.data };
  }

  constructor(props) {
    super(props);
    console.log(props);
    this.state = { activeTab: 0 };
  }

  tabClicked = (tab) => this.setState({ activeTab: tab });

  render() {
    const { restaurants } = this.props;
    const { activeTab } = this.state;
    return (
      <Layout title={'Delivery hero code challenge'}>
        {/* language=CSS */}
        <style>
          {`

              .category--container {
                  padding: 5px 15px;
                  background: #a7bacb;
                  color: white;
              }

              .category--padding {
                  padding: 5px 15px 5px 0;
              }

              .restaurant--box-shadow {
                  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
              }

              .r-header--background {
                  background: #fcfcfc;
              }

              .r-info {
                  border-bottom: 1px solid #f8f8f8;
                  background: white;
              }

              .r-info--background {
              }

              .r-info--headers {
                  letter-spacing: 0.05em;
              }

              .r-menu {
                  padding-top: 5vw;
                  background: white;
              }

              .r-menu--item {
                  border-bottom: 1px solid transparent;
                  display: inline-block;
                  cursor: pointer;
              }

              .r-menu--item-active {
                  border-bottom: 1px solid #3C4858;
              }

              .r-menu--item:hover {
                  border-bottom: 1px solid #3C4858;
              }

              .r-item--box {
                  border-bottom: 1px solid #f8f8f8;
                  position: relative;
              }

              .r-item--details {
                  border-bottom: 1px solid #f8f8f8;
                  position: relative;
              }

              .r-section--style {
                  padding-top: 1vw;
                  padding-bottom: 2vw;
                  font-weight: 400;
              }

              .r-section--arrow {
                  position: absolute;
                  right: 0;
                  top: 35%;
              }

              .r-item--box:hover {
                  background: #f8f8f8;
                  border-bottom: 1px solid #f8f8f8;
                  -webkit-box-shadow: 15px 0 0 0 #f8f8f8, -15px 0 0 0 #f8f8f8;
                  -moz-box-shadow: 15px 0 0 0 #f8f8f8, -15px 0 0 0 #f8f8f8;
                  box-shadow: 15px 0 0 0 #f8f8f8, -15px 0 0 0 #f8f8f8;
                  cursor: pointer;
              }

              .r-item--price {
                  position: absolute;
                  right: 0;
                  top: 35%;
              }

              .r-item--description {
                  padding: 1vw 0 0.4vw 0;
              }
          `}
        </style>
        <div className='r-header--background flex-no-height'>
          <div className='bottom' />
          <Restaurant
            style={{ paddingBottom: '2vw', paddingTop: '15vw' }}
            id={this.props.id}
            logoUrl={restaurants.info.logoUri}
            name={restaurants.info.name}
            rating={restaurants.rating.average}
            city={restaurants.address.city}
            categories={restaurants.info.categories}
            withOrderButton={false}
          />
        </div>

        <div style={{ padding: '1em' }} className='r-info'>
          <Grid container centered stackable>
            <Grid.Row columns={5}>
              <Grid.Column textAlign='center'>
                <div className='r-info--headers text--md'>
                  Min. order
                </div>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <div className='r-info--headers text--md'>
                  Delivery Fee
                </div>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <div className='r-info--headers text--md'>
                  Deals
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <div className='r-info--headers text--md'>
                  Openings
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <div className='r-info--headers text--md'>
                  Payment
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={5} className='padding-t'>
              <Grid.Column textAlign='center'>
                {restaurants.minOrderValue} €
              </Grid.Column>

              <Grid.Column textAlign='center'>
                {restaurants.delivery.fee.amount} €
              </Grid.Column>

              <Grid.Column textAlign='center'>
                {Object.keys(restaurants.offers).length === 0 && '-'}
              </Grid.Column>
              <Grid.Column textAlign='center'>
                {restaurants.openingTimes.map(index =>
                  <div>{index.start} - {index.end}</div>)}
              </Grid.Column>
              <Grid.Column textAlign='center'>
                {
                  restaurants.paymentMethods.map(index =>
                    <div>{toCamelCase(index.name.replace(/_/g, ' '))}</div>)
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        {
          restaurants.popularItemSection.items.length > 0
          &&
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column>POPULAR ITEMS</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>LIST</Grid.Column>
            </Grid.Row>
          </Grid>

        }
        <div className='r-menu'>
          <Grid container centered stackable>
            <Grid.Row>
              <Grid.Column width={3} textAlign='center' onClick={() => this.tabClicked(0)}>
                <div
                  className={cx(
                    'r-menu--item',
                    { 'r-menu--item-active': activeTab === 0 }
                  )}
                >
                  MENU
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center' width={3} onClick={() => this.tabClicked(1)}>
                <div
                  className={cx(
                    'r-menu--item',
                    { 'r-menu--item-active': activeTab === 1 }
                  )}
                >
                  DETAILS
                </div>
              </Grid.Column>
            </Grid.Row>
            {
              activeTab === 0 &&
              restaurants.sections.map(index =>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <div style={{ position: 'relative' }}>
                      <div className='text--md r-section--style'>{index.name}</div>
                      <div className='r-section--arrow'><Icon name='chevron down' /></div>
                    </div>
                    {
                      index.items.map(newIndex =>
                        <div className='r-item--box' onClick={() => console.log(newIndex)}>
                          <div className='text--md'>{newIndex.name}</div>
                          <div className='text--sm color--sec r-item--description'>{newIndex.description}</div>
                          <div className='r-item--price'>{newIndex.price} €</div>
                        </div>
                      )
                    }
                  </Grid.Column>
                </Grid.Row>
              )
            }
            {
              activeTab === 1 &&
              <Fragment>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <div className='text--md r-section--style'>General</div>
                    <div className='r-item--details'>
                      <div>Company Name: {restaurants.general.companyName}</div>
                      <div>Owner: {restaurants.general.owner}</div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <div className='text--md r-section--style'>Location</div>
                    <div className='r-item--details'>
                      <div>City: {restaurants.address.city}</div>
                      <div>District: {restaurants.address.district}</div>
                      <div>Address: {restaurants.address.streetName} {restaurants.address.streetNumber}</div>
                      <div>Zip code: {restaurants.address.zipcode}</div>
                      <div>Phone Number: <a href={`tel:${restaurants.address.phone}`}>{restaurants.address.phone}</a>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <div className='text--md r-section--style'>Rating</div>
                    <div className='r-item--details'>
                      <div>Rating: {restaurants.rating.average} / 5</div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <div className='text--md r-section--style'>Opening Hours</div>
                    <div className='r-item--details'>
                      <div>
                        {
                          restaurants.openingTimes.map(index =>
                            <div>{index.start} - {index.end}</div>)
                        }
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <div className='text--md r-section--style'>Payment Methods</div>
                    <div className='r-item--details'>
                      <div>
                        {
                          restaurants.paymentMethods.map((index, key) =>
                            <div>{key + 1}. {toCamelCase(index.name.replace(/_/g, ' '))}</div>)
                        }
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Fragment>
            }
          </Grid>
        </div>
      </Layout>
    )
      ;
  }
}

export default withRedux(initStore, null, actions)(RestaurantPage);
