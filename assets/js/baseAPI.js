$.ajaxPrefilter(function(options) {
    // 每次调用了$.get,$.post,$.ajax的时候都会先调用ajaxprefilter
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    // 统一为有权限的接口设置headers请求头
    // 不是所有接口都需要加headers所以用if判断
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res) {

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = "/login.html"
        }

    }

})