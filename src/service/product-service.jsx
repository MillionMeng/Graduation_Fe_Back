import Util  from 'util/arvin.jsx';


const _arvin = new Util();

class Product {

    //商品列表
    getProductList(listParam) {
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url                         ='http://localhost:8080/product/list';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url                         = 'http://localhost:8080/product/search';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword
        }
        return _arvin.request({
            url: url,
            data:data
        })
    }
    //更改产品销售状态
    setProductStatus(productInfo){
        return _arvin.request({
            type : 'post',
            url: 'http://localhost:8080/product/setstatus',
            data:productInfo
        })
    }
    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择分类！'
            }
        }

        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的数量！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '描述不能为空！'
            }
        }


        return result;
    }
    // 保存商品
    saveProduct(product){
        return _arvin.request({
            type    : 'post',
            url     : 'http://localhost:8080/product/save',
            data    : product
        });
    }
    // 获取商品详情
    getProduct(productId){
        return _arvin.request({
            url     : 'http://localhost:8080/product/detail',
            data    : {
                productId : productId || 0
            }
        });
    }

    /**
     * 分类相关
     * @param productInfo
     * @returns {*}
     */

    //查找分类节点 （平级）
    getCategoryList(parentCategoryId){
        return _arvin.request({
            url: 'http://localhost:8080/category/get_category',
            data:{
                categoryId : parentCategoryId || 0
            }
        })
    }

    upload() {
        return _arvin.request({
            baseUrl: 'http://localhost:8080/product/upload',
            fileFieldName: 'upload_file',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            uploadSuccess : (res)=>{
                console.log(res);
            },
            uploadError   : (err) => {
                console.log(err);
            }
        })
    }




}

export default Product;