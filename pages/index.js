import React from 'react';
import Layout from '../components/Layout';


class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout title={'BCGDV-challenge'}>
        {/* language=CSS */}
        <style>{` `}</style>

        <div>hello from index</div>

      </Layout>
    );
  }
}

export default (Index);
