import React from 'react'
import { PageHeader } from 'react-bootstrap'
import { Link } from 'react-router'

class About extends React.Component {
  render() {
    return (
      <div className="container">
        <PageHeader>404 NotFound</PageHeader>
        <Link to="/">Top Page</Link>
      </div>
    )
  }
}

export default About