import store from '../store'
export function isAccountLoggedIn(){
  return store.state.user.isLogin;
}