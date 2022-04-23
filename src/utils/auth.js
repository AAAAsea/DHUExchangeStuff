import store from '../store'
export function isAccountLoggedIn() {
  return store.state.data.isLoggedIn && store.state.data.user;
}

