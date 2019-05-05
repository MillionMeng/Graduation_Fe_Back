import React                from 'react';
import PageTitle            from 'component/page-title/index.jsx';
import CategorySelect       from './category-selector.jsx';

import Util  from 'util/arvin.jsx';
import Product from 'service/product-service.jsx';
import './save.scss';
const _arvin = new Util();
const _product = new Product();

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : 1 //商品状态1为在售
        }
    }
    componentDidMount(){
        console.log(1);
        this.loadProductDeatil();
    }
    // 加载商品详情
    loadProductDeatil(){

        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){
            console.log(3);
            console.log(this.state.id);
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                this.setState(res);
            }, (errMsg) => {
                _arvin.errTips(errMsg);
            });
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-sm-5">
                            <p className="form-control-static">{this.state.name}</p>
                         </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelect
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />

                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">价格</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.price} readOnly/>
                                <span className="input-group-addon">￥</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">数量</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.stock} readOnly/>
                                <span className="input-group-addon" >件</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">描述</label>
                        <div className="col-sm-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">图片</label>

                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => (
                                        <div className="img-con" key={index}>
                                            <img className="img" src={image.url} />
                                        </div>)
                                ) : (<div>暂无图片</div>)
                            }
                        </div>

                    </div>

                   {/* dangerouslySetInnerHTML : html字符串直接转化成html*/}
                    <div className="form-group">
                        <label className="col-md-2 control-label">详情</label>
                        <div className="col-sm-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default ProductDetail;