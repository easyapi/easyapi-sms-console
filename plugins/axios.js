import Cookies from 'js-cookie'
import {Message} from 'element-ui'

export default function ({$axios, redirect}) {
  $axios.onRequest((config) => {
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aGFuZzIwMDg0QDEyNi5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTY0NzU4NTg1OH0.2us0H53UW7sywer8LklxdIWTKJpvx2ReC6IThon51up5kX62sZ49bWWrZDRoXn0H6Ux1mmYiQ7mmXBmT7M95UQ"
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
  })
  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     if (error.response.data.code === -9) {
  //       window.location.href = 'https://account.easyapi.com/login?from=https://sms.easyapi.com'
  //     } else if (error.response.data.code === -8) {
  //       window.location.href = 'https://team.easyapi.com/new?from=https://sms.easyapi.com'
  //     } else {
  //       Message.error(error.response.data.message)
  //     }
  //   }
  // })
}
