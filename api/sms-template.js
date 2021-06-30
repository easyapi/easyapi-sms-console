import {serviceUrl} from './api'

/**
 * 获取短信模板列表
 *
 * @see https://www.easyai.com
 */
export const getSmsTemplateList = (params, context) => {
  return context.$axios.get(`${serviceUrl}/sms/templates`, {params: {...params}})
};


/**
 * 获取短信模板详情信息
 *
 * @see https://www.easyai.com
 */
export const getSmsTemplate = (id, context) => {
  return context.$axios.get(`${serviceUrl}/sms/template/${id}`)
};


/**
 * 添加短信模板
 */
export const createSmsTemplate = (data, context) => {
  return context.$axios.post(`${serviceUrl}/sms/template`, data)
};


/**
 * 修改短信模板
 */
export const updateSmsTemplate = (id, data, context) => {
  return context.$axios.put(`${serviceUrl}/sms/template/${id}`, data)
};


/**
 * 删除短信模板
 */
export const deleteSmsTemplate = (id, context) => {
  return context.$axios.delete(`${serviceUrl}/sms/template/${id}`)
};
