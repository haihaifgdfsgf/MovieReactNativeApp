const HttpUrlConfig={
    getNormal(url,params){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return url;
    },
    QUERY_HOT_MOVIE:"https://api.douban.com/v2/movie/in_theaters",
};
export default HttpUrlConfig;