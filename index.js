import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'

import Calendar from './calendar'

const wrapper = document.createElement('div')
wrapper.className = 'datepicker--wrapper'
document.body.appendChild(wrapper)

const els = document.querySelectorAll('.black_mui16150')
const days = Array.prototype.map.call(els, (el) => {
  return moment(el.innerText.replace(/（.）/, ''), 'MM月DD日')
})

const navigateToDay = (day) => {
  const position = days.findIndex((d) => {
    return d.isSame(day, 'day')
  })
  if (position > -1) {
    const rect = els[position].getBoundingClientRect()
    window.scrollTo(0, rect.top + window.pageYOffset)
  }
}

ReactDOM.render(<Calendar onSelect={navigateToDay}/>, wrapper)
