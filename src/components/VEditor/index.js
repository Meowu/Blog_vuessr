import VInput from "../VInput";
import VButton from "../VButton";
import Vue from "vue";
import Api from "../../api";
import "./editor.css";
const editor = {
  name: "v-editor",
  props: {
    reply: {
      type: String,
      default: "article"
    }
  },
  data() {
    return {
      comment: {
        name: "",
        mail: "",
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
        input: val => (this.mail = val)
      }
    });
    const mailField = h(VInput, {
      props: {
        label: "邮箱",
        required: true,
        placeholder: "请输入邮箱（不公开）",
        value: this.comment.mail
      },
      on: {
        input: val => (this.mail = val)
      }
    });
    const siteField = h(VInput, {
      props: {
        label: "站点",
        placeholder: "请输入站点",
        value: this.comment.site
      },
      on: {
        input: val => (this.mail = val)
      }
    });
    const contentField = h(VInput, {
      props: {
        label: "内容",
        type: "textarea",
        required: true,
        content: this.comment.content
      },
      on: {
        input: val => (this.mail = val)
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
          click: () => console.log('submit')
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
  reply: "article"
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
    console.log("existed.");
    return instance;
  }
  const parent =
    options.target === document.body ? document.body : options.target;
  instance = new EditorConstructor({
    el: document.createElement("div"),
    propsData: {
      reply: options.reply
    }
  });
  parent.appendChild(instance.$el);
  console.log("new");
  return instance;
};

export default Editor;
