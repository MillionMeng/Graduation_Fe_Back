import Util  from 'util/arvin.jsx';


const _arvin = new Util();

class User{
    login(loginInfo){
       return  _arvin.request({
           type: 'POST',
           url : 'http://localhost:8080/manage/user/login',
           contentType    :'application/x-www-form-urlencoded',
           data : loginInfo
       })
    }
    logout(){
        return  _arvin.request({

            url : 'http://localhost:8080/user/logout'
        })
    }
    getUserList(pageNum){
        return  _arvin.request({
            url : 'http://localhost:8080/manage/get_user_list',
            data : {
                pageNum : pageNum
            }
        })
    }
    //检查登陆接口数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // 判断用户名为空
        if(typeof username !== 'string' || username.length ===0){
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        // 判断密码为空
        if(typeof password !== 'string' || password.length ===0){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }

}

export default User;