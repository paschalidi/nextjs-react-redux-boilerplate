/**
 *
 * Layout
 *
 */
/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, { Fragment } from 'react';
import NextHead from 'next/head';
import ProgressLoader from '../../components/ProgressLoader';


class Layout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children, title } = this.props;
    return (
      <Fragment>
        <NextHead>
          <title>{title}</title>
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6" />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400"
            rel="stylesheet"
          />
          <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
          <link rel="stylesheet" type="text/css" href="/static/index.css" key="index-css" />

          <meta name="description" content='Delivery hero code challenge' />
          <meta
            name="google-site-verification"
            content="UsrcaotuK_VXJnLMdyJBqtgpGtaaFNRihg96a7rVplY"
          />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </NextHead>
        <ProgressLoader />
        {children}
      </Fragment>
    );
  }
}

export default Layout;
