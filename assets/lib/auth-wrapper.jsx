import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './auth-wrapper.css';

/**
 * React High Oder Component for User Authentication with React-Redux
 *
 * ex.
 * const authWrapper = new AuthWrapper({
 *   redirectUrl: '/unauthorized',
 *   authStateSelector: (state) => state.authData
 * });
 * return authWrapper(AppComponent);
 */
class AuthWrapper {
  static defaultOptions = {
    redirectUrl: '/unauthorized',
    authStateSelector: (state) => state.authData,
    /**
     * @param {object} authData
     * @return {boolean}
     */
    isAuthenticating: (authData) => (authData.isLoading === true),
    /**
     * @param {object} authData
     * @return {boolean}
     */
    isAuthenticated: (authData) => !_.isEmpty(authData.user)
  };

  constructor(options) {
    this.options = Object.assign({}, AuthWrapper.defaultOptions, options);
  }

  /**
   * Wrap React Component
   *
   * @param {React.Component} WrappedComponent
   * @return {React.Component}
   */
  wrapComponent(WrappedComponent) {
    const { redirectUrl, authStateSelector, isAuthenticating, isAuthenticated } = this.options;
    const mapStateToProps = (state, ownProps) => ({
      authData: authStateSelector(state, ownProps)
    });

    class Auth extends React.Component {
      static contextTypes = {
        router: PropTypes.object.isRequired
      };

      static propTypes = {
        authData: PropTypes.object.isRequired
      };

      componentWillMount() {
        this.redirectIfNotAuthenticated(this.props, this.context.router);
      }

      componentWillReceiveProps(nextProps) {
        this.redirectIfNotAuthenticated(nextProps, this.context.router);
      }

      redirectIfNotAuthenticated(props, router) {
        const { authData } = props;
        if (isAuthenticating(authData) === false && isAuthenticated(authData) === false) {
          router.replace(redirectUrl);
        }
      }

      render() {
        const { authData } = this.props;
        if (isAuthenticating(authData)) {
          return (
            <div className={styles.wrapper}>
              <div className={styles.loader} />
            </div>
          );
        }
        return <WrappedComponent {...this.props} />;
      }
    }

    return connect(mapStateToProps)(cssModules(Auth, styles));
  }
}

export default AuthWrapper;
