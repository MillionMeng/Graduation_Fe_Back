import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';
import Util  from 'util/arvin.jsx';
import Statistic from 'service/statistic-service.jsx'

const _arvin = new Util();
const _statistic = new Statistic();

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount : '-',
            productCount : '-',
            orderCount : '-'
        }
    }
    //保险
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _statistic.getHomeCount().then(res =>{
            this.setState(res);
        },(errMsg) =>{
            _arvin.errTips(errMsg);
        });
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="IBuy后台管理系统-首页" />
                    {/*<button className="btn btn-warning">text </button>*/}
                {/*</PageTitle>*/}
                <div className="row">


                    <div className="col-md-4">
                        <Link to="/order" className="color-box green">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单数量</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">{/*4列*/}
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户数量</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/product" className="color-box  blue">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品数量</span>
                            </p>
                        </Link>
                    </div>


                </div>
            </div>
        );
    }
}
export default Home;