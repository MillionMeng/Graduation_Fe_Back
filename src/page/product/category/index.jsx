import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import Util  from 'util/arvin.jsx';
import Product from 'service/product-service.jsx';

const _arvin = new Util();
const _product = new Product();

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list                : [],
            parentCategoryId    : this.props.match.params.categoryId || 0
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list:res
            });
        },(errMsg) => {
            this.setState({
                list : []
            });
            _arvin.errTips(errMsg);
        });
    }
    // 更新分类的名字
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName : newName
            }).then(res => {
                _arvin.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _arvin.errTips(errMsg);
            });
        }
    }
    render(){
        let listBody = this.state.list.map((category,index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                           onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId === 0
                                ? <Link to={`/product-category/index/${category.id}`}>查看下级分类</Link>
                                : null
                        }
                    </td>
                </tr>
            );
        });
        return(
            <div id="page-wrapper">
                <PageTitle title="分类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-warning">
                            <i className="fa fa-plis"></i>
                            <span>添加分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <p>上级分类ID: {this.state.parentCategoryId}</p>
                </div>
                <TableList tableHeads={['ID','名称','操作']}>
                    {listBody}
                </TableList>
            </div>
        )
    }
}
export default CategoryList;