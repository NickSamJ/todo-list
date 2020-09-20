import React from 'react';

const Router = (props) => {

    <BrowserRouter>
    <Navigation />
    <div className="container-fluid">
        <Alert />
        <Switch>
            <Route path="/react-admin" exact render={() => (admminPage)} />
            {topMenuLinks}
            <Route path="/login" exact component={LogIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/reset-password" exact component={ResetPassword} />
            <Route component={ErrorPage} />
        </Switch>
    </div>
</BrowserRouter>
};

export default Router;