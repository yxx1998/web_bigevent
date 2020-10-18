$.ajaxPrefilter(function(options) {
    // 每次调用了$.get,$.post,$.ajax的时候都会先调用ajaxprefilter
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的根路径

})