export const getUrlParam = function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
export const getUrlParam1 = function(param) {
    const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
    const result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
}