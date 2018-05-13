/**
 *
 * Restaurant
 *
 */
/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import PT from 'prop-types';

import { Grid, Image, Icon } from 'semantic-ui-react';
import Rating from '../Rating';
import { getArrayFromSplit, toCamelCase } from '../../utils/string-manipulators';
import InternalLink from '../InternalLink';
import Button from '../Button';


class Restaurant extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
            id,
            logoUrl,
            name,
            rating,
            city,
            categories,
            withOrderButton = true
          } = this.props;
    return (
      <div style={this.props.style}>
        <Grid container stackable className={this.props.className}>
          <Grid.Row columns={3}>
            <Grid.Column className='as-button' width={2} verticalAlign='middle'>
              <InternalLink
                href={{ pathname: '/restaurant', query: { queryId: id } }}
                as={`/restaurant/${id}`}
              >
                <Image centered circular src={logoUrl} />
              </InternalLink>
            </Grid.Column>


            <Grid.Column width={11}>
              <InternalLink
                href={{ pathname: '/restaurant', query: { queryId: id } }}
                as={`/restaurant/${id}`}
              >
                <h2 className='inline' style={{ paddingRight: '1vw' }}>{name}</h2>
              </InternalLink>

              <Rating rating={rating} />
              <div style={{ height: '4em' }}>
                <div className='flex-no-height'>
                  <div className='text--sm color--sec'>
                    <Icon name='marker' />
                    <div className='inline'>{city}</div>
                  </div>
                  <div className='bottom' />
                  <div className='text--sm color--sec inline'>
                    <div className='inline'><Icon name='tags' /></div>
                    {
                      getArrayFromSplit(categories[0].replace(/-/g, ' '), ',').map((index, key) => {
                          const length = getArrayFromSplit(categories[0].replace(/-/g, ' '), ',').length - 1;
                          if (length === key || index === 0)
                            return <div key={key} className='inline'>
                              {toCamelCase(index)}
                            </div>;
                          return <div key={key} className='inline'>
                            {toCamelCase(index)} ・
                          </div>;

                        }
                      )
                    }
                  </div>
                </div>
              </div>
            </Grid.Column>
            {
              withOrderButton
              &&
              <Grid.Column textAlign='right' width={3} verticalAlign='middle'>
                <InternalLink
                  href={{ pathname: '/restaurant', query: { queryId: id } }}
                  as={`/restaurant/${id}`}
                >
                  <Button>
                    Order
                  </Button>
                </InternalLink>
              </Grid.Column>
            }
          </Grid.Row>
        </Grid>
      </div>

    );
  }
}

Restaurant.defaultProps = {
  id: '',
  logoUrl: 'http://via.placeholder.com/350x150',
  name: 'name',
  rating: 5.0,
  city: 'city',
  categories: ['0'],
  withOrderButton: false
};

Restaurant.propTypes = {
  id: PT.string,
  logoUrl: PT.string,
  name: PT.string,
  rating: PT.number,
  city: PT.string,
  categories: PT.array.isRequired,
  withOrderButton: PT.bool
};

export default Restaurant;
