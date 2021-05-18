//富文本
import React, { useState } from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

class RichText extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
			 editorState: BraftEditor.createEditorState(this.props.outputHTML), // 设置编辑器初始内容
			 outputHTML: "",
			 outputText: "",
	  }
	}
	componentDidMount = () => {
		   this.isLivinig = true
		   // console.log(this.props.outputHTML)
		   // 3秒后更改编辑器内容
		   setTimeout(this.setEditorContentAsync, 3000)

	}

	componentWillUnmount () {
	    this.isLivinig = false
	  }

	handleChanges = (editorState) => {
		var str="";
		var json = editorState.toRAW();
		json = JSON.parse(json);
		if (json.blocks.length > 0) {
			json.blocks.map((item, index) => {
				str += item.text;
			})
		 }
	   this.setState({
	     editorState: editorState,
	     outputText: str,
	     outputHTML: editorState.toHTML()
	   })
	   this.props.deliveryContent(editorState.toHTML(),str)
	 }

	 setEditorContentAsync = () => {
	   this.isLivinig && this.setState({
	     editorState: BraftEditor.createEditorState(this.props.outputHTML)
	   })
	 }
  render() {
	 const { editorState} = this.state
    return (
		<div className="BraftEditor">
		   <div className="editor-wrapper">
			 <BraftEditor
			   value={editorState}
			   onChange={this.handleChanges}
			 />
		   </div>
		</div>
    )
  }
}


export default RichText
