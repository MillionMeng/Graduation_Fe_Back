import Util  from 'util/arvin.jsx';


const _arvin = new Util();

class Product {
    // 获取订单列表
    getOrderList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url             = 'http://localhost:8080/ordermanage/list';
            data.pageNum    = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = 'http://localhost:8080/ordermanage/search';
            data.pageNum    = listParam.pageNum;
            data.orderNo    = listParam.orderNo;
        }
        return _arvin.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 获取订单详情
    getOrderDetail(orderNumber){
        return _arvin.request({
            url     : 'http://localhost:8080/ordermanage/detail',
            data    : {
                orderNo : orderNumber
            }
        });
    }
    sendGoods(orderNumber){
        return _arvin.request({
            type    : 'post',
            url     : 'http://localhost:8080/ordermanage/send_goods',
            data    : {
                orderNo : orderNumber
            }
        });
    }


}

export default Product;