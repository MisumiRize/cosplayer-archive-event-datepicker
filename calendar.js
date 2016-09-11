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

  _handleSelect(day) {
    this.props.onSelectDay(day)
    this.setState({day})
  }

  _handleChange(day) {
    this.setState({day})
  }

  render() {
    const showDateInput = (process.env.DEBUG == '1') ? true : false
    return <RCCalendar
      showDateInput={showDateInput}
      value={this.state.day}
      onSelect={this._handleSelect.bind(this)}
      onChange={this._handleChange.bind(this)}
    />
  }
}

Calendar.propTypes = {
  emitter: React.PropTypes.object.isRequired,
  currentDay: React.PropTypes.object.isRequired,
  onSelectDay: React.PropTypes.func.isRequired
}
