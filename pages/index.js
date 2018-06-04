import React from 'react';

import * as actions from '../store/restaurant-store/actions';
import { initStore } from '../store/configure';
import withRedux from 'next-redux-wrapper';
import axios from 'axios';

import Layout from '../components/Layout';
import Restaurant from '../components/Restaurant';
import cookie from 'react-cookie';
import Pagination from '../components/Pagination';
import RowSorting from '../components/RowSorting';
import RowInfo from '../components/RowInfo';
import RowCategoryFilter from '../components/RowCategoryFilter';


class Index extends React.Component {
  static async getInitialProps() {
    let token = cookie.load('accessToken');
    await axios.get('https://mockapi.pizza.de/v1/restaurants', { headers: { token } })
    .catch(async () => {
      const aws = await axios.get('https://mockapi.pizza.de/v1/auth');
      cookie.save('accessToken', aws.data.token, { path: '/' });
      token = aws.data.token;
    });

    let request = await axios.get('https://mockapi.pizza.de/v1/restaurants', { headers: { token } });
    return { entry: request.data, token };
  }

  constructor(props) {
    super(props);
    props.initRestaurants(props.entry);
    props.initCategories(props.entry);
  }

  render() {
    const { startIndex, endIndex, data, totalItems, entry } = this.props;
    if (!data) return (
      <Layout title={'Delivery hero code challenge'}>
        <div />
      </Layout>
    );
    return (
      <Layout title={'Delivery hero code challenge'}>
        {/* language=CSS */}
        <style>
          {`

              .header {
                  background: white;
                  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
                  padding: 2vw 0;
              }

              .r--box-shadow {
                  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
              }

              .r--info {
                  background: white;
              }
          `}
        </style>

        <div className='header'>
          <RowInfo totalItems={totalItems} />

          <RowCategoryFilter entry={entry} />

          <RowSorting />
        </div>

        {
          Object.keys(data)
          .filter(index => {
            const isBetweenTheIndexes = index >= startIndex && index <= endIndex;
            if (isBetweenTheIndexes)
              return data[index];
          })
          .map(index =>
            <Restaurant
              key={index}
              className='r--info r--box-shadow'
              style={{ marginBottom: '2vw', marginTop: '2vw' }}
              id={data[index].id}
              logoUrl={data[index].general.logo_uri}
              name={data[index].general.name}
              rating={data[index].rating.average}
              city={data[index].address.city}
              categories={data[index].general.categories}
            />
          )
        }

        <Pagination />

      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.restaurants };
}

export default withRedux(initStore, mapStateToProps, actions)(Index);
