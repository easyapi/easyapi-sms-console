/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = (context) => {
  return context.$axios.get(`${process.env.accountUrl}/api/account`)
}
