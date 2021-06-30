import {serviceUrl} from './api'


/**
 * 获取短信汇总列表
 *
 * @see https://www.easyai.com
 */
export const getSmsSummayList = (params, context) => {
  return context.$axios.get(`${serviceUrl}/api/summaries`, {params: {...params}})
};


/**
 * 获取短信汇总详情信息
 *
 * @see https://www.easyai.com
 */
export const getSmsSummay = (id, context) => {
  return context.$axios.get(`${serviceUrl}/sms/summary/${id}`)
};
