import Kefir from 'kefir'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'

import Calendar from './calendar'

const wrapper = document.createElement('div')
wrapper.className = 'datepicker--wrapper'
document.body.appendChild(wrapper)

const els = document.querySelectorAll('.black_mui16150')
const y = window.pageYOffset
const days = Array.prototype.map.call(els, (el) => {
  return {
    y: el.getBoundingClientRect().top + y,
    day: moment(el.innerText.replace(/（.）/, ''), 'MM月DD日')
  }
})

function navigateToDay(day) {
  const position = days.findIndex(d => d.day.isSame(day, 'day'))
  if (position > -1) {
    window.scrollTo(0, days[position].y)
  }
}

const currentDay = Kefir.fromEvents(window, 'scroll', () => {
  return window.pageYOffset
})
  .map(y => {
    return days.find((d, i) => {
      if (i == days.length - 1) {
        return true
      }
      const bottom = window.innerHeight + y
      return d.y <= bottom && days[i + 1].y > bottom
    })
  })
  .skipDuplicates()
  .map(d => d.day)

ReactDOM.render(<Calendar
  currentDay={currentDay}
  onSelect={navigateToDay} />, wrapper)
