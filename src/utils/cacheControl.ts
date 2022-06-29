import jsCookies from 'js-cookie'

const localStorage: Storage = window.localStorage

function getFromCache(key) {
  let savedUserData = null
  if (localStorage) {
    const value = localStorage.getItem(key)
    try {
      savedUserData = JSON.parse(value)
    } catch (_) {
      savedUserData = value
    }
  } else {
    savedUserData = jsCookies.get(key)
  }
  return savedUserData
}

function setCache(key, value, expires = 7) {
  const valueStr = JSON.stringify(value)
  if (localStorage) {
    localStorage.setItem(key, valueStr)
  } else {
    jsCookies.set(key, value, { expires: expires })
  }
}

export { getFromCache, setCache }
