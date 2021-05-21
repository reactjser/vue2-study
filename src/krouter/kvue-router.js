let Vue;

class VueRouter {
  constructor(options) {
    this.options = options;

    // 数据响应式
    Vue.util.defineReactive(
      this,
      'current',
      window.location.hash.slice(1) || '/'
    );

    // 监控url变化
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1);
    });
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 注册router实例
  // 通过全局混入：Vue.mixin({beforeCreate})
  Vue.mixin({
    beforeCreate() {
      // 仅在根组件创建时执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 注册router-view组件
  Vue.component('router-view', {
    render(h) {
      const { current, options } = this.$router;
      const route = options.routes.find((route) => route.path === current);
      const component = route ? route.component : null;
      return h(component);
    },
  });

  // 注册router-link组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
};

export default VueRouter;
