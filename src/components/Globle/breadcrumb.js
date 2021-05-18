import React from 'react';
import Box from '../ComponentContainer';
import { connect, ConnectProps , history} from 'umi';
import { Link, withRouter  } from 'react-router-dom'


import { Breadcrumb } from 'antd';

export default class Breadcrums extends React.Component {
  constructor(props) {
  	super(props);
      this.state = {
      	collapsed: false,
      	breadcrumb:[]
      };
    }


	 componentDidMount = () => {
		  this.getBreadcrumbData()
	 }
	getBreadcrumbData = () =>{
		let breadcrumb = location.pathname.split("/").filter(i => i);
		this.setState({breadcrumb})
	}



	goBackHome = () =>{
	   history.push('/')
	}

	render() {
    const {breadcrumb} = this.state
		return (
      <>
      <Box>
					<Breadcrumb>
							<Breadcrumb.Item
              onClick={()=>this.goBackHome()}
              >Home</Breadcrumb.Item>
              {
                breadcrumb.map((item,index)=>{
                  return (
                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                  )
                })
              }
					 </Breadcrumb>
			 </Box>
			</>
		);
	}
}
