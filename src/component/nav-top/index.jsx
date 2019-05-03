import React    from 'react';
import {Link}   from 'react-router-dom';

class NavTop extends React.Component{
    constructor(props){
        super(props);
    }
    //退出登陆
    onLogout(){

    }
    render(){
        return(
            <div className="navbar navbar-default top-navbar"/* role="navigation"*/>
                <div className="navbar-header">
                    <Link className="navbar-brand" to="index.html"><b>IBUY</b></Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle"/* data-toggle="dropdown"*/ href="javascript:;" /*aria-expanded="false"*/>
                            <i className="fa fa-user fa-fw"></i>
                            <span>欢迎，adminqweqwe</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            {/*<li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                            </li>
                            <li className="divider"></li >*/}
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i>
                                <span>Logout</span>
                            </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;