import React from 'react';
import Blog from './Blog';
import BlogSinglePage from './BlogSinglePage';
import { Route, Switch } from 'react-router-dom';

const blogAlias = 'posts';

const BlogRouter = () => (
  <>
    <Route
      path={`/${blogAlias}`}
      exact
      render={() => <Blog blogAlias={blogAlias} />}
    />
    <Route path={`/${blogAlias}/:id`} component={BlogSinglePage} />
  </>
);

export default BlogRouter;
