import {serviceUrl} from './api'

/**
 * 获取短信记录
 *
 * @see https://www.easyai.com
 */
export const getSmsRecordList = (params, context) => {
  return context.$axios.get(`${serviceUrl}/sms/records`, {params: {...params}})
};


/**
 * 获取短信模板详情信息
 *
 * @see https://www.easyai.com
 */
export const getSmsRecord = (id, context) => {
  return context.$axios.get(`${serviceUrl}/sms/record/${id}`)
};


