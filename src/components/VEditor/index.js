import VInput from '../VInput'
import './editor.css'
export default {
  name : 'v-editor',
  render(h) {
    const nameField = h(VInput, {
      props: {
        label: '姓名',
        required: true,
        placeholder: '请输入昵称'
      },
    })
    const mailField = h(VInput, {
      props: {
        label: '邮箱',
        required: true,
        placeholder: '请输入邮箱（不公开）'
      },
    })
    const siteField = h(VInput, {
      props: {
        label: '站点',
        placeholder: '请输入站点'
      },
    })
    const contentField = h(VInput, {
      props: {
        label: '内容',
        type: 'textarea',
        required: true
      },
      // style
    })
    return h('div', {
      staticClass: 'v-editor'
    }, [nameField, mailField, siteField, contentField])
  }
}