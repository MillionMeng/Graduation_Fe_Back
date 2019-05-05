import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import Util  from 'util/arvin.jsx';
import Product from 'service/product-service.jsx';
import './index.scss'

const _arvin = new Util();
const _product = new Product();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            listType        : 'list'
        };
    }
    componentDidMount(){
        this.loadProductList();
    }
    //加载商品列表
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        //如果是搜索，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType    = this.state.searchType;
            listParam.keyword       = this.state.searchKeyword;
        }

        _product.getProductList(listParam).then(res => {
            this.setState(res);
        },(errMsg) => {
            this.setState({
                list : []
            });
            _arvin.errTips(errMsg);
        });
    }
    //搜索
    onSearch(searchType,searchKeyword){
        let listType  = searchKeyword ===''? "list" : "search";
        this.setState({
            listType        : listType,
            pageNum         : 1,
            searchType      : searchType,
            searchKeyword   : searchKeyword
        },()=> {
            this.loadProductList();
        })
    }
    //页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        },() => {
            this.loadProductList();
        });
    }
    //更新商品状态 上架or下架
    onSetProductStatus(e,productId,currentStatus){
        let newStatus        = currentStatus == 1 ? 2 : 1,
            confirmTips      = currentStatus == 1 ? '确定下架该商品?' : '确定下架该商品?';
        if(window.confirm(confirmTips)){
            _product.setProductStatus({
                productId : productId,
                status    : newStatus
            }).then(res => {
                _arvin.successTips(res);
                this.loadProductList();
            }, err =>{
                _arvin.errTips(err);
            });
        }
    }
    render(){
        let tableHeads = [
            {name :  '商品ID',width : '10%' },
            {name :  '商品信息',width : '45%' },
            {name :  '价格',width : '10%' },
            {name :  '状态',width : '15%' },
            {name :  '操作',width : '20%' },
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表">

                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-warning">
                            <i className="fa fa-plis"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>

                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword)=> {this.onSearch(searchType,searchKeyword)}}/>

                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product,index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <span>{product.status == 1 ? '销售中' : '已下架'}</span>
                                        <button className="btn btn-xs btn-warning" onClick={(e) => {this.onSetProductStatus(e,product.id,product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={ `/product/detail/${product.id}` }>查看详情</Link>
                                        <Link className="opear" to={ `/product/save/${product.id}` }>编辑</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>

                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) =>{this.onPageNumChange(pageNum)}}
                />
                </div>
        )
    }
}
export default ProductList;