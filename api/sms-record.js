/**
 * 获取短信记录
 *
 * @see https://www.easyapi.com
 */
export const getSmsRecordList = (params, context) => {
  return context.$axios.get(`${process.env.BASE_URL}/sms/records`, { params: { ...params } })
}


/**
 * 获取短信模板详情信息
 *
 * @see https://www.easyapi.com
 */
export const getSmsRecord = (id, context) => {
  return context.$axios.get(`${process.env.BASE_URL}/sms/record/${id}`)
}


