$(function() {

    // 调用getUserInfo获取用户基本信息
    getUserInfo();
})
var layer = layui.layer;
$('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    // icon是前面的图标，title是提示
    // 第二个参数是一个回调函数
    // 进行的具体操作就是写在回调函数里
    layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem('token');
        location.href = "/login.html";
        // 关闭confirm询问框
        layer.close(index);
    });
})

// 获取用户的基本信息的方法
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // 请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // // 如果成功了，就渲染用户头像
            renderAvatar(res.data);
            // console.log(res);
        }


    })
}
//渲染用户的头像
function renderAvatar(user) {
    // 获取用户昵称
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}