import {EventEmitter} from 'events'
import Kefir from 'kefir'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

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

function findDay(y) {
  return days.find((d, i) => {
    if (i == days.length - 1) {
      return true
    }
    const bottom = window.innerHeight + y
    return d.y <= bottom && days[i + 1].y > bottom
  })
}

const emitter = new EventEmitter()
const fromRequest = Kefir.fromEvents(emitter, 'request', () => {
  return findDay(window.pageYOffset).day
})
const fromScroll = Kefir.fromEvents(window, 'scroll', () => window.pageYOffset)
  .map(findDay)
  .skipDuplicates()
  .map(d => d.day)
const currentDay = Kefir.merge([fromRequest, fromScroll])

ReactDOM.render(<App
  emitter={emitter}
  currentDay={currentDay}
  onSelectDay={navigateToDay}
/>, wrapper)
