export default {
  formatTime: function (value) {
    let interval = Date.now() - Date.parse(value)
    if (interval / (1000*60*60*24*30*12) >= 1) {
      return `${parseInt(interval / (1000*60*60*24*30*12))}年前`
    } else if (interval / (1000*60*60*24*30) >= 1) {
      return `${parseInt(interval / (1000*60*60*24*30))}个月前`
    } else if (interval / (1000*60*60*24) >= 1) {
      return `${parseInt(interval / (1000*60*60*24))}天前`
    } else if (interval / (1000*60*60) >= 1) {
      return `${parseInt(interval / (1000*60*60))}小时前`
    } else if (interval / (1000*60) >= 1) {
      return `${parseInt(interval / (1000*60))}分钟前`
    }
  },
}
