import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class App extends React.Component {
  componentWillMount() {
    this.checkLoggedIn(this.props, this.context.router);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLoggedIn(nextProps, this.context.router);
  }

  checkLoggedIn(props, router) {
    const { isLoading, user } = props.auth;
    if (isLoading === false && _.isEmpty(user)) {
      router.replace('/hoge');
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
