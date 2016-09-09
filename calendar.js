import moment from 'moment'
import RCCalendar from 'rc-calendar'
import React from 'react'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {day: moment()}
    this._setDay = this._setDay.bind(this)
  }

  componentDidMount() {
    this.props.currentDay.onValue(this._setDay)
    this.props.emitter.emit('request')
  }

  componentWillUnmount() {
    this.props.currentDay.offValue(this._setDay)
  }

  _setDay(d) {
    this.setState({day: d})
  }

  render() {
    return <RCCalendar
      value={this.state.day}
      onSelect={this.props.onSelectDay} />
  }
}

Calendar.propTypes = {
  emitter: React.PropTypes.object.isRequired,
  currentDay: React.PropTypes.object.isRequired,
  onSelectDay: React.PropTypes.func.isRequired
}
