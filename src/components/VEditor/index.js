import VInput from "../VInput";
import VButton from "../VButton";
import Vue from "vue";
// import { store } from '../../entry.client'
import Api from "../../api";
import "./editor.css";
const editor = {
  name: "v-editor",
  props: {
    articleId: String,
    commentId: String,
  },
  inject: ['refresh'],
  data() {
    return {
      comment: {
        name: "",
        email: "",
        content: "",
        site: ""
      }
    };
  },
  methods: {
    replyArticle() {}
  },
  render(h) {
    const nameField = h(VInput, {
      props: {
        label: "姓名",
        required: true,
        placeholder: "请输入昵称",
        value: this.comment.name
      },
      on: {
        input: val => this.comment.name = val
      }
    });
    const mailField = h(VInput, {
      props: {
        label: "邮箱",
        required: true,
        placeholder: "请输入邮箱（不公开）",
        value: this.comment.email
      },
      on: {
        input: val => this.comment.email = val
      }
    });
    const siteField = h(VInput, {
      props: {
        label: "站点",
        placeholder: "请输入站点",
        value: this.comment.site
      },
      on: {
        input: val => this.comment.site = val
      }
    });
    const contentField = h(VInput, {
      props: {
        label: "内容",
        type: "textarea",
        required: true,
        value: this.comment.content
      },
      on: {
        input: val => this.comment.content = val
      }
      // style
    });

    const btnGroup = h(
      "div",
      {
        staticClass: "btn-group",
        style: {
          maxWidth: '400px',
        }
      },
      [h(VButton, {
        on: {
          click: () => this.close()
        }
      }, "取消"), h(VButton, {
        on: {
          click: () => {
            console.log(this.articleId, this.commentId)
            if (this.commentId) {
              this.$bar.start()
              Api.replyComments(this.commentId, this.comment).then(() => {
                this.refresh().then(() => {
                  this.$bar.finish()
                })
              })
            } else if (this.articleId) {
              this.$bar.start()
              Api.replyArticles(this.articleId, this.comment).then(() => {
                console.log(this.$parent)
                this.$parent.getCurrent().then(() => {
                  this.$bar.finish()
                })
              })
            }
          }
        }
      },"提交")]
    );
    return h(
      "div",
      {
        staticClass: "v-editor"
      },
      [nameField, mailField, siteField, contentField, btnGroup]
    );
  }
};

let instance;

const EditorConstructor = Vue.extend(editor);
const defaults = {
  target: null,
  articleId: '',
  commentId: '',
  parent: null,
};

EditorConstructor.prototype.close = function() {
  if (instance) {
    instance = undefined;
  }
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
  this.$destroy();
};

EditorConstructor.prototype.open = function() {};

const Editor = (options = {}) => {
  if (Vue.prototype.isServer) return;
  options = Object.assign({}, defaults, options);
  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (instance) {
    instance.close()
  }
  const parent = options.target === document.body ? document.body : options.target;
  instance = new EditorConstructor({
    el: document.createElement("div"),
    parent: options.parent,  // 因为实例是动态创建的，因此它是没有上下文关系的，或者说它只有自己的作用域，无法访问父实例。有必要的话，可以传入 parent 来指定其父实例，然后通过 $parent 或者 $children 就可以实现父子间通讯。此外还可以实现依赖注入 provide/inject 来访问父组件的内容。
    propsData: {
      articleId: options.articleId,
      commentId: options.commentId
    }
  });
  parent.appendChild(instance.$el);
  return instance;
};

export default Editor;
