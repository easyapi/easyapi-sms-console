import Cookies from 'js-cookie'

export default function ({$axios, redirect}) {
  $axios.onRequest((config) => {
    // let token = Cookies.get('Authorization')
    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aGFuZzIwMDg0QDEyNi5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTYzMDQ4MDA4NX0.V8OK1zKzx9GJCc8_X8IMeabdDZYXL6_VX3h3z43LfUHkQt4v0wQoAz9Vimr1jCf88oWguEnCOsYG02snh1FoxA'
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      if (error.response.data.code === -9) {
        // window.location.href = 'https://account.easyapi.com/login?from=https://sms.easyapi.com'
      } else if (error.response.data.code === -8) {
        // window.location.href = 'https://team.easyapi.com/new?from=https://sms.easyapi.com'
      } else {
        this.$message.warning(error.response.data.message)
      }
    }
  })
}
