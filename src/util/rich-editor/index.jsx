import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

//通用富文本编辑器  依赖jquery
class RichEditor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }
    loadEditor(){
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue : this.props.placeholder || '请输入内容',
            upload: {
                url             : 'http://localhost:8080/product/richtext_img_upload',
                defaultImage    : '',
                fileKey         : 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    //事件：初始化富文本
    bindEditorEvent(){
        this.simditor.on('valuechanged',e => {
            this.props.onValueChange(this.simditor.getValue());
        })
    }
    render(){
        return(
            <div className="rich-editor">...
                <textarea ref="textarea"></textarea>
            </div>
        );
    }
}
export default RichEditor;