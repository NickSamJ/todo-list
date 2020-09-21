import React from 'react';
import Polls from './Polls';
import PollSinglePage from './PollSinglePage';
import { Route, Switch } from 'react-router-dom';

const urlAlias = 'polls';

const PollsRouter = () => (
  <>
    <Route
      path={`/${urlAlias}`}
      exact
      render={() => <Polls urlAlias={urlAlias} />}
    />
    <Route path={`/${urlAlias}/:id`} component={PollSinglePage} />
  </>
);

export default PollsRouter;
