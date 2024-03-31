const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  userInfo: state => state.user.info,
  resumeField: state => state.user.resumeField,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  hasGetInfo: state => state.user.hasGetInfo,
  firmId: state => state.firmId
}

export default getters
