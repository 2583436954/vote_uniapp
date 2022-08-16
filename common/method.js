import * as http from '../api/api.js';
export const getActivityContentById = (data,callback,hideLoading) => http.request('/applet/activity/getActivityContentById','GET',data,callback,hideLoading);
export const getMessageByOpenId = (data,callback,hideLoading) => http.request('/applet/activity/getMessageByOpenId','GET',data,callback,hideLoading);
export const goVote = (data,callback,hideLoading) => http.request('/applet/activity/goVote','GET',data,callback,hideLoading);
export const getVoteCustomerByOpenId = (data,callback,hideLoading) => http.request("/applet/activity/getVoteCustomerByOpenId","GET",data,callback,hideLoading);