/**
 * 获取七牛KEY
 */
export const getQiniuKey = (context) => {
  return context.$axios.get(`${process.env.BASE_URL}/qiniu/key`)
}

/**
 * 获取七牛空间TOKEN
 */
export const getQiniuToken = (context) => {
  return context.$axios.get(`${process.env.BASE_URL}/qiniu/upToken`)
}
