import VFullnav from "./components/NavbarFull";
import VNav from "./components/Navbar";
import VFooter from "./components/Footer";
import './index.css'
export default {
  name: 'App',
  functional: true,
  render(h) {
    return h('div', {staticClass: 'root', attrs: {id: 'app'}}, [h(VFullnav),h(VNav), h('router-view'), h(VFooter)])
  }
}