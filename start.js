import moment from 'moment'

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    Array.prototype.forEach.call(mutation.addedNodes, node => {
      if (node.nodeName == 'SPAN' && node.className == 'black_mui16150') {
        const day = moment(node.innerText.replace(/（.）/, ''), 'MM月DD日')
        node.id = 'event-' + day.format('YYYYMMDD')
      }
    })
  })
})
observer.observe(document, {childList: true, subtree: true})
