const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;'
}

const reUnescapedHtml = /[&<>"'`]/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

function escape(s) {
  return s && reHasUnescapedHtml.test(s) ? s.replace(reUnescapedHtml, (chr) => escapeMap[chr]) : s
}

export { escape }
