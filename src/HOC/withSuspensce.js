import React, { lazy, Suspense } from 'react';

const WithSuspense = (WrappedComponent) => (
  <Suspense fallback={<div>Loading...</div>}>
    <WrappedComponent />
  </Suspense>
);

export default WithSuspense;
