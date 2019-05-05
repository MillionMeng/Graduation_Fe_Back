import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import Util  from 'util/arvin.jsx';
import Product from 'service/product-service.jsx';

const _arvin = new Util();
const _product = new Product();

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList        : [],
            parentId            : 0,
            categoryName        : ''
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    //显示上级分类列表
    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList:res
            });
        },(errMsg) => {
            _arvin.errTips(errMsg);
        });
    }
    // 表单的值发生变化
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        this.setState({
            [name] : value
        });
    }
    // 提交
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        // 品类名称不为空，提交数据
        if(categoryName){
            _product.saveCategory({
                parentId        : this.state.parentId,
                categoryName    : categoryName
            }).then((res) => {
                _arvin.successTips(res);
                this.props.history.push('/product-category/index');
            }, (errMsg) => {
                _arvin.errTips(errMsg);
            });
        }
        // 否则，提示错误
        else{
            _arvin.errTips('请输入品类名称');
        }
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="品类列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId"
                                            className="form-control"
                                            onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">上级分类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>上级分类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                           placeholder="请输入分类名称"
                                           name="categoryName"
                                           value={this.state.name}
                                           onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-warning"
                                            onClick={(e) => {this.onSubmit(e)}}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddCategory;