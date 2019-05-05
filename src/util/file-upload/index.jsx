import FileUpload from './react-fileupload.jsx';
import React from 'react';
import Product      from 'service/product-service.jsx'
const _product      = new Product();

class FileUploadr extends React.Component{

    render(){
        const options={
            baseUrl:'http://localhost:8080/product/upload',
            fileFieldName : 'upload_file',
            dataType      : 'json',
            chooseAndUpload : true,
            uploadSuccess :(res) => {
                this.props.onSuccess(res.data);
            },
            uploadError   : (err) => {
                this.props.onError(err.message || '上传图片出错啦');
            }

        }

        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className="btn btn-warning" ref="chooseAndUpload">选择</button>
               {/* <button ref="uploadBtn">upload</button>*/}
            </FileUpload>
        )
    }
}
export default FileUploadr;
