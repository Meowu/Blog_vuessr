<script>
import VChip from "../components/Chip/VChip";
import VCard from "../views/ArticleCard";
import VHamburger from "./Hamburger";
import VFullnav from "./NavbarFull.js";
import VNav from "./Navbar";
import VLoading from "./Loading";
import VFooter from "./Footer";
import VList from "./List";
import TagList from "./TagList";
import VAvatar from "./Avatar";
import VComment from "./Comment";
import VIcon from "./VIcon";
import VInput from './VInput';
import VEditor from './VEditor'
export default {
  name: "Hello",
  components: {
    VChip,
    VCard,
    VHamburger,
    VNav,
    VLoading,
    VFullnav,
    VFooter,
    VList,
    TagList,
    VAvatar,
    VComment,
    VIcon,
    VInput,
    VEditor
  },
  data() {
    return {
      show: null,
      category: [
        { name: "Node.js", number: 14, id: "1" },
        { name: "Python", number: 6, id: "2" },
        { name: "Rust", number: 10, id: "3" }
      ],
      name: '656',
      url:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADGklEQVRoQ+2ay2sTURTGvzszeadJk7akiEGD8VXU2kV9UEQXCuJGXQjipq7UrSv/DBdudKcbEdxUBR/gQhChKhKrktaqVAi2kTZ95NG8JjNyByem0xhuS4Xc8V4IZHFmOL/znXvOuZch19LPdPxHiwhgm6stFLa5wBAKC4VtFgGR0jYTdBWOUFgobLMIiJS2maCiaImUFiltswhsWEpf7RpCRPHVwzNRnsXtxcS6wnUmsBsHPVGQ30//VAu4nnm1rndZH/pnwHmtgvtLn/C5MrcmR7tlL4ZDA+iR/wSvrYGreg0gBAokvC6mMJIdXxPwMV8Mx/3boOoaFCIZ72lr4IpeA/35JSdmawXcWUhgrrbMBO0kMi6FB7FZCSCrleGTnJBB2hu4rNeQqi4h7gxDhYbn+W94UZhiAj7kieJUxw7IRMLXSgZxZxcfwKPLKRz2RkEVm6ou4Nb8Wybgi50D2OXqwYJWwsdSGkPeLXwAP8yNG85uUjpQ1FU8yCbxvpRuCb3T2Y1zwT3GVkiWZzGj5kD3MxcpPZJNIqL4ccS3FRIIxkpp3Fv60BLYbEW06D3OTaJDdvEFTAvVhc5+hCS3kaJ3F8eMvd1sNbaiaTWHm/NvcNQX4ws4UZrB+eA+9Lt7oUHHy8J3PM1/aQpstiICUrc74Y/zB7zf3YvTgT54iAJTOdqyrOtyeBAxR2hFJnAJTMFMGApK9+ZoMbWC1wyKmygr9jq3wGa60omp2Xxtpn1ZV/EoN4F3xWkjINwCNxYk63wddQTrhc2a8twCU7XMlkP/N87XJ/3bjdZFl7WocQ281xXB2WAfvMRRn6/prHwlfMAYTpq1La6BrcXrSX4Sug5jbnYQuelgwj2wtXhpAPpcPX8dPbkHbixeNJ3pCkgu/FCzuJEZXdWbuQduLF7m1U2txQRmC+DGExENQKsZ2xbAFNI889KPw1qdomwDbN5q0HRudU5ue2CmK402MNqwa9o2YGFyQQAzhYljI6Ewx+IxuS4UZgoTx0ZCYY7FY3JdKMwUJo6NhMIci8fkulCYKUwcGwmFORaPyfVfZOsCzi79pDcAAAAASUVORK5CYII=",

    };
  },
  mounted() {
    this.show = document.documentElement;
  },
  // computed: {
  //   show() {
  //     // width >= 1024 ? 'full' : 'small'
  //     const width = document.documentElement.clientWidth || document.body.clientWidth
  //     return width
  //   }
  // },
  watch: {
    show() {
      // width >= 1024 ? 'full' : 'small'
    },
    'name'(val, old) {
      // console.log(val);
    }
  },
  methods: {
    click() {
      console.log("clicked.");
    }
  }
};
</script>

<template>
  <div id='hello'>
    <div class="box">
      <v-nav />
      <v-fullnav />

    </div>
    <v-input v-model="name" :autofocus='true' />
    <v-input type='textarea' rows='6' />
    <v-comment />
    <v-editor />
    <v-list :list="category" title='分类查看' />
    <v-loading @click="click" />
    <tag-list :tags='category'  />
    <v-icon />
  </div>
</template>
<style lang="stylus" scoped>
#hello {
  width: 100%;
  padding: 0.333rem;
  margin-top: 110px;
}

.nav-toggle {
  padding: 10px;
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;

  .icon-bar {
    display: block;
    background-color: #000000;
    width: 20px;
    height: 2px;

    & + .icon-bar {
      margin-top: 4px;
    }
  }
}

@media screen and (min-width: 1024px) {
  #hello {
    width: 960px;
    margin: 100px auto 0;
  }

  .navbar {
    display: none;
    visibility: hidden;
  }

  .full-navbar {
    display: block;
    width: 960px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .full-navbar {
    display: none;
    visibility: hidden;
  }

  .navbar {
    display: block;
  }
}
</style>

