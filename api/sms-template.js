/**
 * 获取短信模板列表
 *
 * @see https://www.easyapi.com
 */
export const getSmsTemplateList = (params, context) => {
  return context.$axios.get(`${process.env.BASE_URL}/sms/templates`, { params: { ...params } })
}

/**
 * 获取短信签名列表
 *
 * @see https://www.easyapi.com
 */
export const getSmsSignatureList = (params, context) => {
  return context.$axios.get(`${process.env.BASE_URL}/sms/signatures`, { params: { ...params } })
}


/**
 * 获取短信模板详情信息
 *
 * @see https://www.easyapi.com
 */
export const getSmsTemplate = (id, context) => {
  return context.$axios.get(`${process.env.serviceUrl}/sms/template/${id}`)
}


/**
 * 添加短信模板
 */
export const createSmsTemplate = (data, context) => {
  return context.$axios.post(`${process.env.BASE_URL}/sms/template`, data)
}


/**
 * 修改短信模板
 */
export const updateSmsTemplate = (id, data, context) => {
  return context.$axios.put(`${process.env.BASE_URL}/sms/template/${id}`, data)
}


/**
 * 删除短信模板
 */
export const deleteSmsTemplate = (id, context) => {
  return context.$axios.delete(`${process.env.BASE_URL}/sms/template/${id}`)
}
