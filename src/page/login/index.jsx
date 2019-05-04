import React from 'react';
import './index.css';
import Util  from 'util/arvin.jsx';
import User from 'service/user-service.jsx'

const _arvin = new Util();
const _user = new User();

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _arvin.getUrlParam('redirect') || '/'
        }
    }
    /*//改变用户名
    onUsernameChange(e){
        console.log(e.target.value)
        this.setState({
            username : e.target.value
        });
    }
    //密码
    onPasswordChange(e){
        console.log(e.target.value)
        this.setState({
            password : e.target.value
        });
    }*/
    componentWillMount(){
        document.title = '登陆-IBUY';
    }
    onInputChange(e) {
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        //inputName 相当于 key ：value 中的key   inputValue属于value
        this.setState({
            [inputName]: inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode ===13){
            this.onSubmit();
        }
    }
    //登陆
    onSubmit(){
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
        },
         checkResult = _user.checkLoginInfo(loginInfo);
        //验证通过
        if(checkResult.status){
            _user.login(loginInfo).then((res)=>{
                _arvin.setStorage('userInfo',res);
                //console.log(this.state.redirect);
                this.props.history.push(this.state.redirect)
            },(errMsg)=>{
                _arvin.errTips(errMsg);
            });
        }
        //验证不通过
        else {
            _arvin.errTips(checkResult.msg);
        }
    }
    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">IBuy管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">用户名</label>
                                <input type="text"
                                       name="username"
                                       className="form-control"
                                       //id="exampleInputEmail1"
                                       placeholder="请输入用户名"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">密码</label>
                                <input type="password"
                                       name="password"
                                       className="form-control"
                                       //id="exampleInputPassword1"
                                       placeholder="请输入密码"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <button className="btn btn-lg btn-warning btn-block"
                                    onClick={e => {this.onSubmit(e)}}>登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;