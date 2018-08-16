//渲染组件,处理发送信息逻辑

import React from 'react'
const socket = require('socket.io-client')('http://localhost:8000');   //客户端socket.io

import '../style/foot.less'

export default class FootComp extends React.Component{
    constructor(args){
        super(args);
    
        this.state={
            hasCont:'',
            message:'',
            inputVal:'',
        }


        this.clickBtn = this.clickBtn.bind(this);
        this.dataChange = this.dataChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }



    componentDidMount(){
        document.addEventListener("keydown",this.handleEnterKey);
    }

    //点击按钮发送信息
    clickBtn(){
        const { message } = this.state;
        const { userInfo } = this.props;
        // console.log('发送' + this.state.message)
        //是否发送内容
        this.sendMessage(userInfo,message);
    }

    //回车后发送信息
    handleEnterKey(e){
        let that = this;
        const { message } = this.state;
        const { userInfo } = this.props;
        if(e.keyCode === 13){
            // console.log('回车' + that.state.message);
            //是否发送内容
            this.sendMessage(userInfo,message);
        }
    }

    sendMessage(ioUserInfo,message){
        if(message){
            this.sendSocketIO(ioUserInfo,message);//发送websocket

            this.setState({
                message:'',  //清空input内容            
            })
        }
    }

    sendSocketIO(ioUserInfo,message){
        socket.emit('sendMessage',ioUserInfo,message)
    }

    //input内容改变
    dataChange(e){
        // console.log(e.target.value);//获取内容
        //如果内容不为空,改变button颜色
        if(e.target.value.length){
            this.setState({
                hasCont:'hasContBtn',
                message:e.target.value,
            })
        }
        else{
            this.setState({
                hasCont:'',
                message:e.target.value
            })
        }
    }

    render(){
        // console.log(this.props.userInfo);        
        let disabled = Object.keys(this.props.userInfo).length ? '' : 'disabled';
        // console.log(disabled)
        return (
            <div className="footDiv">
                <input disabled={disabled} className="footIpt" placeholder="请输入..."  onChange={this.dataChange} value={this.state.message}/>
                <button className={`footBtn ${this.state.hasCont}`} onClick={this.clickBtn}>发送</button>
            </div>
        )
    }

}