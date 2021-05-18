import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Form, Input, Button, Checkbox, Divider,Table ,Popover , Popconfirm ,message} from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import Box from '@/components/ComponentContainer';
import { connect, ConnectProps,  FormattedMessage, Dispatch,  history } from 'umi';
import RichText from '@/components/Globle/richText.js'
import Breadcrumb from '@/components/Globle/breadcrumb.js';
import UploadEnclosure from '@/components/Globle/upload.js'
import UploadImgCrop from '@/components/Globle/uploadImgCrop.js'
class DataCenter extends React.Component{
  constructor(props) {
  	super(props);
    this.state = {
        outputHTML:"",
        fileList: [
          {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
          }
        ],
        action:"https://www.mocky.io/v2/5cc8019d300000980a055e76"
    }
  }
  componentDidMount = () => {
  };

  deliveryContent = (value) =>{
  	this.setState({outputHTML:value})
  }

  changeFileList = (val) =>{
       this.setState({fileList: val});
  }

  render() {
     const { outputHTML , fileList , action } = this.state
     return (
     <div>
       <Breadcrumb/>
       <Box style={{background:"white",margin: '10px 0px'}}>
           <RichText
             outputHTML={outputHTML}
             deliveryContent={this.deliveryContent.bind(this)}/>
       </Box>
        {/* 多附件上传 */}
       <Box  style={{background:"white",margin: '10px 0px'}}>
            <UploadEnclosure
            fileList={fileList}
            changeFileList={this.changeFileList.bind(this)}
            action={action}
            />
       </Box>
       {/* 图片上传 */}
       <Box  style={{background:"white",margin: '10px 0px'}}>
           <UploadImgCrop/>
       </Box>


     </div>
     )
  }
}


 export default DataCenter;
