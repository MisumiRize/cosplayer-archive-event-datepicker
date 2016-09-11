import React from 'react'

import Calendar from './calendar'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showCalendar: true}
  }

  render() {
    let calendar
    if (this.state.showCalendar) {
      calendar = <Calendar
        emitter={this.props.emitter}
        currentDay={this.props.currentDay}
        onSelectDay={this.props.onSelectDay}
      />
    } else {
      calendar = null
    }
    return <div>
        <input
          id="calendar-toggle"
          type="checkbox"
          checked={this.state.showCalendar}
          onChange={this._handleChange.bind(this)}
        />
        <label htmlFor="calendar-toggle">
          カレンダーを表示
        </label>
        {calendar}
      </div>
  }

  _handleChange() {
    this.setState({showCalendar: !this.state.showCalendar})
  }
}

App.propTypes = {
  emitter: React.PropTypes.object.isRequired,
  currentDay: React.PropTypes.object.isRequired,
  onSelectDay: React.PropTypes.func.isRequired
}
