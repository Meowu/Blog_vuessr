import VChip from './Chip/VChip'
export default {
  name: 'v-taglist',
  functional: true,
  render(h, { data, props, listeners, children}) {
    const child = props.tags.map(tag => h(VChip, {}, tag))
    const datas = {
      staticClass: 'tag-class',
      on: listeners,
      style: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: '8px'
      }
    }
    return h('div', datas, child)
  } 
}