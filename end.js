import {EventEmitter} from 'events'
import Kefir from 'kefir'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'
import url from 'url'

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
const first = days[0].day
const last = days[days.length - 1].day
const loc = url.parse(window.location.href, true)
delete(loc.search)

function navigateToDay(day) {
  const found = days.find(d => d.day.isSame(day, 'day'))
  if (found) {
    window.location.hash = '#event-' + found.day.format('YYYYMMDD')
    return
  }
  const currentPage = parseInt(loc.query.p || '1')
  if (day.isSame(first, 'month') && day.isBefore(first, 'day') && currentPage > 1) {
    loc.query.p = (currentPage - 1).toString()
  } else if (day.isSame(last, 'month') && day.isAfter(last, 'day')) {
    loc.query.p = (currentPage + 1).toString()
  } else {
    delete(loc.query.p)
  }
  loc.query.t = day.isBefore(moment(), 'day') ? '1' : '0'
  loc.query.d = day.format('YYYYMM')
  loc.hash = '#event-' + day.format('YYYYMMDD')
  window.location = url.format(loc)
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
  .throttle(500)
  .map(findDay)
  .skipDuplicates()
  .map(d => d.day)
const currentDay = Kefir.merge([fromRequest, fromScroll])

ReactDOM.render(<App
  emitter={emitter}
  currentDay={currentDay}
  onSelectDay={navigateToDay}
/>, wrapper)
