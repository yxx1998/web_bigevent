$(function() {
    // 给注册和登录的链接添加点击事件
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中到处layer对象
    var layer = layui.layer;
    // 通过form.verify()自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        // 校验两次输入是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框的值，还需要拿到密码框的值，然后进行一次等于的判断如果判断失败，则renturn一个提示消息
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        var url = '/api/reguser';
        $.post(url, data,
            function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                // 模拟人的点击行为
                $('#link_login').click();
            })
    })


    // 监听登录表单的提交事件

    $('#form_login').submit(function(e) {
        e.preventDefault();
        var data = {
            username: $("#form_login [name=username]").val(),
            password: $("#form_login [name=password]").val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功');
                console.log(res.token);

                // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxNzQsInVzZXJuYW1lIjoieHp3eWIiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTYwMjgzNTM3MiwiZXhwIjoxNjAyODcxMzcyfQ.zhX8F2n_zxTDZQGKx1zGV2Y_dGbbBMuO5c2051NElcw
                // 将登陆成功得到的token字符串保存到localstorage中
                localStorage.setItem('token', res.token);
                // 跳转到主页面
                location.href = '/index.html';
            }
        })
    })

})