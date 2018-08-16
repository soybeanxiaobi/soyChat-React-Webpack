import React from 'react';

const socket = require('socket.io-client')('http://localhost:8000');   //客户端socket.io
import $ from 'jquery'


import './style/content.less'

class AppContent extends React.Component{
    constructor(args){
        super(args);

        this.state = {
            // users:[],
        }
    }
    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){    
        const { userInfo } = nextProps;  
        //不使用this.props因为刚开始渲染content组件的this.props为空,直到用户添加信息后,在render才会赋值给this.props。目前为止this.props均为空,所以需要使用nextProps
        // console.log(userInfo);
        socket.on('getMessage', function(ioUserInfo,msg){
            // console.log(msg);
            console.log(ioUserInfo);
            // 如果socket传回userId和自身相同,则判断为自身发送的信息
            //ioUserInfo为对方发送的消息    nextProps.userInfo为己方信息
            let appendLi = ''
            if(ioUserInfo.userId == userInfo.userId){
                appendLi = `<li class="contLi contLiMy">
                    <div class="contLiMy">
                        <div class="headImg">
                            <img src=${userInfo.headImg}  />
                        </div> 
                        <div class="chatContent">
                            <div class="chatName">
                                <span>${userInfo.userName}</span>
                            </div>
                            <div class="chatBg">
                                <span>${msg}</span>
                            </div>
                        </div>
                    </div>
                </li>`
            }
            else{
                appendLi = `<li class="contLi contLiOther">
                    <div class="contLiOther">
                        <div class="headImg">
                            <img src=${ioUserInfo.headImg}  />
                        </div>
                        <div class="chatContent">
                            <div class="chatName">
                                <span>${ioUserInfo.userName}</span>
                            </div>
                            <div class="chatBg">
                                <span>${msg}</span>
                            </div>
                        </div>
                    </div>
                </li>
                `
            }
            $('.contUl').append(appendLi);
            
            $('.contUl').scrollTop($('.contUl')[0].scrollHeight);//保持滚动条底部

        });
    }

    //在render()挂载完后才调用
    componentDidUpdate(){
    }



    render(){

        // let appendLi = this.state.users.map((item,index) => 
        //     <li key={index} className="contLi contLiMy">
        //         <div className="contLiMy">
        //             <div className="headImg">
        //                 <img src={astronaImg}  />
        //             </div>
        //             <div className="chatContent">
        //                 <div className="chatName">
        //                     <span>{item.name}</span>
        //                 </div>
        //                 <div className="chatBg">
        //                     <span>{item.message}</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </li>
        //  对方信息
        // <li className="contLi contLiOther">
        //     <div className="contLiOther">
        //         <div className="headImg">
        //             <img src={planetImg}  />
        //         </div>
        //         <div className="chatContent">
        //             <div className="chatName">
        //                 <span>xiaodo</span>
        //             </div>
        //             <div className="chatBg">
        //                 <span>132456</span>
        //             </div>
        //         </div>
        //     </div>
        // </li>
        // )
        
        // console.log(appendLi);
        return(
            <div className="content">
                <ul className="contUl">
                    <div className="contTop">欢迎你:{this.props.userInfo.userName}</div>
                </ul>
            </div>
        )
    }
}


export default AppContent;