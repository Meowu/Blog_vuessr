import VAvatar from './Avatar'
import VIcon from './VIcon'
import VReaction from './UserReaction'
import VEditor from '../components/VEditor'
import './comment.css'
export default {
  name: 'v-comment',
  inject: ['refresh'],
  props: {
    side: {
      type: String,
      default: 'left',
      validator: v => v === 'left' || v === 'right'
    },
    reply: Boolean,
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADGklEQVRoQ+2ay2sTURTGvzszeadJk7akiEGD8VXU2kV9UEQXCuJGXQjipq7UrSv/DBdudKcbEdxUBR/gQhChKhKrktaqVAi2kTZ95NG8JjNyByem0xhuS4Xc8V4IZHFmOL/znXvOuZch19LPdPxHiwhgm6stFLa5wBAKC4VtFgGR0jYTdBWOUFgobLMIiJS2maCiaImUFiltswhsWEpf7RpCRPHVwzNRnsXtxcS6wnUmsBsHPVGQ30//VAu4nnm1rndZH/pnwHmtgvtLn/C5MrcmR7tlL4ZDA+iR/wSvrYGreg0gBAokvC6mMJIdXxPwMV8Mx/3boOoaFCIZ72lr4IpeA/35JSdmawXcWUhgrrbMBO0kMi6FB7FZCSCrleGTnJBB2hu4rNeQqi4h7gxDhYbn+W94UZhiAj7kieJUxw7IRMLXSgZxZxcfwKPLKRz2RkEVm6ou4Nb8Wybgi50D2OXqwYJWwsdSGkPeLXwAP8yNG85uUjpQ1FU8yCbxvpRuCb3T2Y1zwT3GVkiWZzGj5kD3MxcpPZJNIqL4ccS3FRIIxkpp3Fv60BLYbEW06D3OTaJDdvEFTAvVhc5+hCS3kaJ3F8eMvd1sNbaiaTWHm/NvcNQX4ws4UZrB+eA+9Lt7oUHHy8J3PM1/aQpstiICUrc74Y/zB7zf3YvTgT54iAJTOdqyrOtyeBAxR2hFJnAJTMFMGApK9+ZoMbWC1wyKmygr9jq3wGa60omp2Xxtpn1ZV/EoN4F3xWkjINwCNxYk63wddQTrhc2a8twCU7XMlkP/N87XJ/3bjdZFl7WocQ281xXB2WAfvMRRn6/prHwlfMAYTpq1La6BrcXrSX4Sug5jbnYQuelgwj2wtXhpAPpcPX8dPbkHbixeNJ3pCkgu/FCzuJEZXdWbuQduLF7m1U2txQRmC+DGExENQKsZ2xbAFNI889KPw1qdomwDbN5q0HRudU5ue2CmK402MNqwa9o2YGFyQQAzhYljI6Ewx+IxuS4UZgoTx0ZCYY7FY3JdKMwUJo6NhMIci8fkulCYKUwcGwmFORaPyfVfZOsCzi79pDcAAAAASUVORK5CYII='
    }
  },
  methods: {
    formatDate(timestamp, format='yyyy-MM-dd HH:mm') {
      if (!Number(timestamp)) {
        throw new Error("parameter must be a Number.")
      }
      const len = timestamp.toString().length
      if (len !== 10 && len !== 13) { // 这里必须是 && 并集。
        throw new Error('Number expected to be 10 or 13 at length.')
      }
      const time = Number(timestamp).toString().length === 10 ? timestamp*1000 : timestamp
      
      const padZero = number => number.toString().replace(/^(\d)$/, "0$1") // 补0
      const newDate = new Date(Number(time))
      const year = newDate.getFullYear()
      const month = newDate.getMonth() + 1
      const date = newDate.getDate()
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()
      
      switch (format) {
        case 'yyyy-MM-dd':
          return `${padZero(year)}-${padZero(month)}-${padZero(date)}`
          break;
        case 'MM-dd':
          return `${padZero(month)}-${padZero(date)}`
          break;
        case 'HH:mm':
          return `${padZero(hours)}:${padZero(minutes)}`
          break
        default:
          return `${padZero(year)}-${padZero(month)}-${padZero(date)} ${padZero(hours)}:${padZero(minutes)}`
      }
    },
    genUpBtn() {
      const children = []
      children.push(this.$createElement('span', {
        staticClass: 'comment-up__btn',
        ref: 'btn'
      }))
      if (this.content.ups > 0) {
        children.push(this.$createElement('span', {
          staticClass: 'comment-ups',
          domProps: {
            innerText: this.content.ups
          }
        }))
      }
      return this.$createElement('div', {
        staticClass: 'comment-up',
        on: {
          click: e => {
            this.$bar.start()
            this.$store.dispatch('upComments', this.content._id).then( _ => {
              this.refresh().then(() => {
                this.$bar.finish()
                this.$refs.up.style.color　= '#FFF'
                this.$refs.btn.style.borderBottomColor　= '#FFF'
                this.$refs.up.style.backgroundColor = '#0084FF'
              })
            })
          }
        },
        ref: 'up'
      }, children)
    },
    genTime(h, time) {
      let timestamp = new Date(this.content.createdAt).toString()
      timestamp = +new Date(timestamp)
      return h('time', {
        staticClass: 'comment-time',
        attrs: {datetime: time}
      }, this.formatDate(timestamp))
    },
    genMeta(h) {
      const name = h('a', {staticClass: 'comment-name', attrs: {href: '#'}}, this.content.name)
      return h('div', {
        staticClass: 'comment-meta',
      }, [name, this.genTime(h)])
    },
    genMain(h) {
      return h('div', {
        staticClass: 'comment-main'
      }, [h('div', {staticClass: 'comment-header'}, [this.genMeta(h)]), h('div', {staticClass: 'comment-content', domProps: {innerHTML: this.content.content}}), h(VReaction, {props: {reply: this.reply}, style: {marginTop: '20px'}, 
      on: {
        click: () => {
          // console.log('clicked comment.')
          // console.log(this.content)
          const editor = new VEditor({target: this.$el.parentNode, commentId: this.content._id, parent: this})
        }
      }
    })])
    }
  },
  render(h) {
    let children
    const avatar = this.content.avatar || this.url
    let style = {}
    if (this.side === 'left') {
      style.marginRight = '16px'
    }
    const side = h('div', {
      staticClass: 'comment-side',
      style: style
    }, [
      h(VAvatar, {props: {url: avatar, round: '3px'}}),
      this.genUpBtn()
    ])
    if (this.side === 'left') {
      children = [side, this.genMain(h)]
    } else {
      children = [this.genMain(h), side]
    }
    return h('div', {
      staticClass: 'comment-item'
    }, children)
  }
}