import moment from 'moment'
import RCCalendar from 'rc-calendar'
import React from 'react'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: moment()}
  }

  componentDidMount() {
    this.props.currentDay.onValue(d => this.setState({value: d}))
  }

  render() {
    return <RCCalendar
      value={this.state.value}
      onSelect={this.props.onSelect} />
  }
}

Calendar.propTypes = {
  currentDay: React.PropTypes.object,
  onSelect: React.PropTypes.func
}
