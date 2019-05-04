import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

//通用分页组件
class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
          <div className="row">...
              {/*current={this.props.current}*/
              /*结构函数*/}
            <RcPagination {...this.props}
                          hidOnSinglePage
                          showQuickJumper  />
          </div>
        );
    }
}
export default Pagination;