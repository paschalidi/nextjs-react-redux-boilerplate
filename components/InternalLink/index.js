/**
 *
 * InternalLink
 *
 */
import React from 'react';
import Link from 'next/link';


export default ({ as, children, href, prefetch = true, ...props }) =>
  <Link as={as} prefetch={prefetch} href={href}>
    <a {...props}>
      {children}
    </a>
  </Link>;