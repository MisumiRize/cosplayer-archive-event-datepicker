import RCCalendar from 'rc-calendar'
import React from 'react'

export default class Calendar extends React.Component {
  render() {
    return <RCCalendar onSelect={this.props.onSelect} />
  }
}

Calendar.propTypes = {
  onSelect: React.PropTypes.func
}
