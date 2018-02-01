import VAvatar from './Avatar'
import './comment.css'
export default {
  name: 'v-comment',
  props: {
    side: {
      type: String,
      default: 'left',
      validator: v => v === 'left' || v === 'right'
    }
  },
  data() {
    return {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADGklEQVRoQ+2ay2sTURTGvzszeadJk7akiEGD8VXU2kV9UEQXCuJGXQjipq7UrSv/DBdudKcbEdxUBR/gQhChKhKrktaqVAi2kTZ95NG8JjNyByem0xhuS4Xc8V4IZHFmOL/znXvOuZch19LPdPxHiwhgm6stFLa5wBAKC4VtFgGR0jYTdBWOUFgobLMIiJS2maCiaImUFiltswhsWEpf7RpCRPHVwzNRnsXtxcS6wnUmsBsHPVGQ30//VAu4nnm1rndZH/pnwHmtgvtLn/C5MrcmR7tlL4ZDA+iR/wSvrYGreg0gBAokvC6mMJIdXxPwMV8Mx/3boOoaFCIZ72lr4IpeA/35JSdmawXcWUhgrrbMBO0kMi6FB7FZCSCrleGTnJBB2hu4rNeQqi4h7gxDhYbn+W94UZhiAj7kieJUxw7IRMLXSgZxZxcfwKPLKRz2RkEVm6ou4Nb8Wybgi50D2OXqwYJWwsdSGkPeLXwAP8yNG85uUjpQ1FU8yCbxvpRuCb3T2Y1zwT3GVkiWZzGj5kD3MxcpPZJNIqL4ccS3FRIIxkpp3Fv60BLYbEW06D3OTaJDdvEFTAvVhc5+hCS3kaJ3F8eMvd1sNbaiaTWHm/NvcNQX4ws4UZrB+eA+9Lt7oUHHy8J3PM1/aQpstiICUrc74Y/zB7zf3YvTgT54iAJTOdqyrOtyeBAxR2hFJnAJTMFMGApK9+ZoMbWC1wyKmygr9jq3wGa60omp2Xxtpn1ZV/EoN4F3xWkjINwCNxYk63wddQTrhc2a8twCU7XMlkP/N87XJ/3bjdZFl7WocQ281xXB2WAfvMRRn6/prHwlfMAYTpq1La6BrcXrSX4Sug5jbnYQuelgwj2wtXhpAPpcPX8dPbkHbixeNJ3pCkgu/FCzuJEZXdWbuQduLF7m1U2txQRmC+DGExENQKsZ2xbAFNI889KPw1qdomwDbN5q0HRudU5ue2CmK402MNqwa9o2YGFyQQAzhYljI6Ewx+IxuS4UZgoTx0ZCYY7FY3JdKMwUJo6NhMIci8fkulCYKUwcGwmFORaPyfVfZOsCzi79pDcAAAAASUVORK5CYII='
    }
  },
  methods: {
    genReplyBtn(h, text='回复') {
      return h('button', {
        staticClass: 'comment-reply',
        on: {
          click: () => {}
        }
      }, text)
    },
    genTime(h, time) {
      time = new Date()
      return h('time', {
        staticClass: 'comment-time'
      }, '2018-02-30')
    },
    genMeta(h) {
      const name = h('a', {staticClass: 'comment-name', attrs: {href: '#'}}, '桀的理想国')
      return h('div', {
        staticClass: 'comment-meta',
      }, [name, this.genTime(h)])
    },
    genMain(h) {
      return h('div', {
        staticClass: 'comment-main'
      }, [h('div', {staticClass: 'comment-header'}, [this.genMeta(h), this.genReplyBtn(h)]), h('div', {staticClass: 'comment-content', domProps: {innerHTML: '<p>Hello, <strong>Vue.</strong></p>'}})])
    }
  },
  render(h) {
    let children
    if (this.side === 'left') {
      children = [h(VAvatar, {props: {url: this.url, round: '4px'}}), this.genMain(h)]
    } else {
      children = [this.genMain(h), h(VAvatar, {props: {url: this.url, round: '4px'}})]
    }
    return h('div', {
      staticClass: 'comment-item'
    }, children)
  }
}