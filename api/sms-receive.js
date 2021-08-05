/**
 * 获取短信收取记录列表
 *
 * @see https://www.easyai.com
 */
export const getSmsReceiveList = (params, context) => {
  return context.$axios.get(`${process.env.serviceUrl}/sms/receives`, {params: {...params}})
};


/**
 * 获取短信收取记录详情信息
 *
 * @see https://www.easyai.com
 */
export const getSmsReceive = (id, context) => {
  return context.$axios.get(`${process.env.serviceUrl}/sms/receive/${id}`)
};
