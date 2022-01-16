const _debounce = () => {
  let timeId
  return function (fn, delay) {
    if (timeId) {
      window.clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn()
      timeId = null
    }, delay)
  }
}

const debounce = _debounce()

export {debounce}
