import isObject from 'lodash/isObject'
import attempt from 'lodash/attempt'
import NProgress from 'nprogress'
import moment from 'moment'
import camelCase from 'lodash/camelCase'

export const toUpperUnderline = (value) => camelCase(value)
export const toUnderlineUpper = (value) => (value.replace(/([A-Z])/g, '_$1').toUpperCase())

export const currentDomain = () => {
  const hostname = window.location.hostname
  const ary = hostname.split('.')
  const path = `${ary[ary.length - 2]}.${ary[ary.length - 1]}`
  return path
}

export const phoneFormat = (value) => {
  const val = `${value}`
  if (isNaN(Number(value))) {
    return val
  } else if (val.length === 11) {
    return `${val.substr(0, 3)}-${val.substr(3, 4)}-${val.substr(7, 4)}`
  } else if (val.length === 12) {
    return `${val.substr(0, 4)}-${val.substr(4, 8)}`
  }
  return val
}

// 是否为移动端
export const isMobile = (() => {
  let bool = false
  if (global.document && global.document.body.offsetWidth < 1000) {
    bool = true
  }
  return () => (bool)
})()

// 获取屏幕类型
export const getScreenType = (() => {
  let screenType = 'sm'
  if (global.document && global.document.body.offsetWidth >= 1280) {
    screenType = 'lg'
  } else if (global.document && global.document.body.offsetWidth >= 984) {
    screenType = 'md'
  }
  return () => (screenType)
})()

export const trimSpace = str => str.replace(/(^\s*)|(\s*$)/g, '')

export const parseLodash = (str) => {
  return attempt(JSON.parse.bind(null, str))
}

export const priceFormat = (value) => {
  let v = ''
  let j = ''
  let sj = ''
  let rv = ''
  v = value.replace(/,/g, '').split('.')
  j = v[0].length % 3
  sj = v[0].substr(j).toString()

  for (let i = 0; i < sj.length; i += 1) {
    rv = (i % 3 === 0) ? `${rv},${sj.substr(i, 1)}` : rv + sj.substr(i, 1)
  }
  let rvalue = (v[1] === undefined) ? v[0].substr(0, j) + rv : `${v[0].substr(0, j)}${rv}.${v[1]}`
  if (rvalue.charCodeAt(0) === 44) {
    rvalue = rvalue.substr(1)
  }
  return rvalue
}

export const objTranslateUrl = (obj) => {
  const urlAry = []
  if (isObject(obj)) {
    Object.keys(obj).forEach((key) => {
      urlAry.push(`${key}=${obj[key]}`)
    })
  }
  return urlAry.join('&')
}

export const negativeInteger = (n) => {
  return n === 0 ? 0 : ~~n.toString().replace(/(-?).*/, '$11')
}

export const queryString = (search) => {
  const query = {}
  const queryStr = search ? search.substr(1) : window.location.search.substr(1)
  const vars = queryStr.split('&')
  vars.forEach((v) => {
    const pair = v.split('=')
    if (!query.hasOwnProperty(pair[0])) {
      query[pair[0]] = decodeURIComponent(pair[1])
    } else if (typeof query[pair[0]] === 'string') {
      const arr = [query[pair[0]], decodeURIComponent(pair[1])]
      query[pair[0]] = arr
    } else {
      query[pair[0]].push(decodeURIComponent(pair[1]))
    }
  })

  return query
}

export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
  let context = ''
  if (r != null) {
    context = r[2];
  }
  return context
}

export const getOffSet = (curEle) => {
  let totalLeft = 0;
  let totalTop = 0;
  let par = curEle.offsetParent;
  // 首先把自己本身的相加
  totalLeft += curEle.offsetLeft;
  totalTop += curEle.offsetTop;
  // 现在开始一级一级往上查找，只要没有遇到body，我们就把父级参照物的边框和偏移相加
  while (par) {
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      // 不是IE8我们才进行累加父级参照物的边框
      totalTop += par.clientTop;
      totalLeft += par.clientLeft;
    }
    // 把父级参照物的偏移相加
    totalTop += par.offsetTop;
    totalLeft += par.offsetLeft;
    par = par.offsetParent;
  }
  return {
    left: totalLeft,
    top: totalTop,
  }
}

export const generateChannel = () => {
  return Math.floor(`${Date.now()}${Math.random() * 10}`).toString(36)
}

export const getRandomStr = (count) => {
  const ts = new Date().getTime()
  return Number.parseInt(String(ts).slice(count), 10) * 10 + 1
}

let currHref = ''
const root = document.getElementById('root')
const loading = document.getElementById('loading')
export const loadProgress = (globalLoading) => {
  const href = window.location.href;
  root.style.opacity = 1
  if (currHref !== href) {
    NProgress.start()
    if (!globalLoading) {
      NProgress.done()
      currHref = href;
      loading.style.display = 'none'
    }
  }
}

export const throttle = (method, delay, duration) => {
  const self = this;
  let timer = null;
  let begin = new Date()
  return (...rest) => {
    const context = self;
    const args = rest;
    const current = new Date()
    clearTimeout(timer)
    timer = null
    if (current - begin >= duration) {
      method.apply(context, args)
      begin = current;
    } else if (delay) {
      timer = setTimeout(() => {
        method.apply(context, args)
      }, delay)
    }
  }
}

// 对api进行节流处理
export const throttleApi = (method, delay, duration) => {
  const self = this
  let timer = null
  let begin = new Date()
  return (...rest) => {
    const context = self
    const args = rest
    const current = new Date()
    clearTimeout(timer)
    timer = null
    if (current - begin >= duration) {
      begin = current
      return method.apply(context, args)
    } else if (delay) {
      timer = setTimeout(() => {
        return method.apply(context, args)
      }, delay)
    }
    return new Promise((resolve) => {
      resolve({ error: '重复点击' })
    })
  }
}

export const getTimeByMilliseconds = (ms, robj) => {
  if (ms < 0) return 0

  const d = moment.duration(ms, 'milliseconds')
  const hours = Math.floor(d.asHours())
  const mins = Math.floor(d.asMinutes()) - hours * 60
  if (robj) {
    return {
      hours,
      mins,
      seconds: d._data.seconds,
    }
  }

  if (!hours) {
    return `${mins}:${d._data.seconds}`
  }

  return `${hours}:${mins}:${d._data.seconds}`
}

export const getScrollbarWidth = () => {
  const odiv = document.createElement('div'); // 创建一个div
  const styles = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll', // 让他有滚动条
  }
  let scrollbarWidth = 0;
  Object.keys(styles).forEach((key) => {
    odiv.style[key] = styles[key];
  })
  document.body.appendChild(odiv); // 把div添加到body中
  scrollbarWidth = odiv.offsetWidth - odiv.clientWidth; // 相减
  odiv.remove(); // 移除创建的div
  return scrollbarWidth + 5; // 返回滚动条宽度
}

export const getSystemNavigator = (() => {
  let e = null
  const t = navigator.userAgent
  let i = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (i[1] === 'Chrome') {
    e = t.match(/(OPR(?=\/))\/?(\d+)/i)
    if (e !== null) {
      i = e
    }
  } else if (i[1] === 'Safari') {
    e = t.match(/version\/(\d+)/i)
    if (e !== null) {
      i = e
    }
  } else if (~t.toLowerCase().indexOf('qqbrowser')) {
    e = t.match(/(qqbrowser(?=\/))\/?(\d+)/i)
    if (e !== null) {
      i = e
    }
  } else if (~t.toLowerCase().indexOf('micromessenger')) {
    e = t.match(/(micromessenger(?=\/))\/?(\d+)/i)
    if (e !== null) {
      i = e
    }
  } else if (~t.toLowerCase().indexOf('edge')) {
    e = t.match(/(edge(?=\/))\/?(\d+)/i)
    if (e !== null) {
      i = e
    }
  } else if (~t.toLowerCase().indexOf('trident')) {
    e = /\brv[ :]+(\d+)/g.exec(t) || []
    i = [null, 'IE', e[1]]
  }

  let n = 0
  const o = [{
    s: 'Windows 10',
    r: /(Windows 10.0|Windows NT 10.0)/,
  }, {
    s: 'Windows 8.1',
    r: /(Windows 8.1|Windows NT 6.3)/,
  }, {
    s: 'Windows 8',
    r: /(Windows 8|Windows NT 6.2)/,
  }, {
    s: 'Windows 7',
    r: /(Windows 7|Windows NT 6.1)/,
  }, {
    s: 'Windows Vista',
    r: /Windows NT 6.0/,
  }, {
    s: 'Windows Server 2003',
    r: /Windows NT 5.2/,
  }, {
    s: 'Windows XP',
    r: /(Windows NT 5.1|Windows XP)/,
  }, {
    s: 'Windows 2000',
    r: /(Windows NT 5.0|Windows 2000)/,
  }, {
    s: 'Windows ME',
    r: /(Win 9x 4.90|Windows ME)/,
  }, {
    s: 'Windows 98',
    r: /(Windows 98|Win98)/,
  }, {
    s: 'Windows 95',
    r: /(Windows 95|Win95|Windows_95)/,
  }, {
    s: 'Windows NT 4.0',
    r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
  }, {
    s: 'Windows CE',
    r: /Windows CE/,
  }, {
    s: 'Windows 3.11',
    r: /Win16/,
  }, {
    s: 'Android',
    r: /Android/,
  }, {
    s: 'Open BSD',
    r: /OpenBSD/,
  }, {
    s: 'Sun OS',
    r: /SunOS/,
  }, {
    s: 'Linux',
    r: /(Linux|X11)/,
  }, {
    s: 'iOS',
    r: /(iPhone|iPad|iPod)/,
  }, {
    s: 'Mac OS X',
    r: /Mac OS X/,
  }, {
    s: 'Mac OS',
    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
  }, {
    s: 'QNX',
    r: /QNX/,
  }, {
    s: 'UNIX',
    r: /UNIX/,
  }, {
    s: 'BeOS',
    r: /BeOS/,
  }, {
    s: 'OS/2',
    r: /OS\/2/,
  }, {
    s: 'Search Bot',
    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
  }];

  o.forEach((item) => {
    if (item.r.test(navigator.userAgent)) {
      n = item.s;
    }
  })

  return {
    name: i[1],
    version: i[2],
    os: n,
  }
})()

// 获取上传文件
export const upload = (evt, callback, index) => {
  const file = evt.currentTarget.files[index || 0]
  const reader = new FileReader()
  reader.onload = () => {
    let formData = new FormData()
    formData.append('file', file)
    callback(formData, file)
  }
  reader.readAsDataURL(file)
}

export const imageCroppingUrl = (imageUrl, croppingParams) => {
  if (!imageUrl) return ''
  let image = imageUrl.indexOf('?') > -1 ? imageUrl.split('?')[0] : imageUrl
  if ((image.indexOf('oss') > -1 || image.indexOf('static') > -1) || image.indexOf('http') > -1) {
    image = `${image}?x-oss-process=image/resize,${croppingParams}`
  }

  return image
}

