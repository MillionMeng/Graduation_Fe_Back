import Util  from 'util/arvin.jsx';


const _arvin = new Util();

class Statistic{
    //首页数据统计
    getHomeCount(){
        return  _arvin.request({
            url : 'http://localhost:8080/manage/get/statistic'

        });
    }


}

export default Statistic;