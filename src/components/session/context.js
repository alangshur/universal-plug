import React from 'react';

const AuthUserContext = React.createContext(null);

export const withAuthUser = Component => props => (
    <AuthUserContext.Consumer>
        {user => <Component {...props} user={user} />}
    </AuthUserContext.Consumer>
);

export default AuthUserContext;