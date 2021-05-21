let Vue;

class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        // 添加$$, Vue就不会代理
        $$state: options.state,
      },
    });

    this._mutations = options.mutations;
    this._actions = options.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    throw new Error('请使用replaceState重置状态');
  }

  // 修改状态，commit('add', payload)
  commit(type, payload) {
    const mutation = this._mutations[type];

    if (!mutation) {
      throw new Error('mutation不存在');
    }

    mutation(this.state, payload);
  }

  // dispatch('add', payload)
  dispatch(type, payload) {
    const action = this._actions[type];

    if (!action) {
      throw new Error('action不存在');
    }

    action(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 注册$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
