{/* 多附近上传 */}
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class MyUpload extends React.Component {
  constructor(props) {
  	super(props);
    }
  handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    console.log(fileList)
    this.props.changeFileList(fileList)
  };

  render() {
    const props = {
      action: this.props.action,
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.props.fileList}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    );
  }
}

 export default MyUpload;
