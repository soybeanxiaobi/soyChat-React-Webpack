import React from 'react';

//引入组件
import AppHead from './head/index'
import AppContent from './content/index'
import AppFoot from './foot/index'
import UserInfoModal from '../component/userInfoModal/index'

import './r_app.less'

class ReactApp extends React.Component{
    constructor(arg){
        super(arg)

        this.state = {
            userInfoState:false,
            userInfo:{}
        }

        this.onGetData = this.onGetData.bind(this);
    }

    componentWillMount(){
        const storage = window.localStorage;
        storage.removeItem('userInfo');  //清除localStroage
        
        if(!storage){
            // console.log("浏览器不支持localstorage");
            return false;
        }else{
            // console.log("浏览器支持localstorage");
            //判断是否存在localStroage
            if(storage['userInfo']){
                //已经存在localStroage.隐藏输入信息框

                this.setState({
                    userInfo:JSON.parse(storage['userInfo']),   //把StringObject转换成Object
                    userInfoState:true,
                })
            }
        }
    }

    //子级返回数据
    onGetData (e){
        // console.log(e);获得子组件传递的数据,包括userName和headImg
        let userInfo = {}; 
        userInfo.userName = e.userName;
        userInfo.headImg = e.headImg;
        userInfo.userId = e.userId;
        
        this.setState({
            userInfo,
            userInfoState:true,//隐藏输入信息框
        },function(){
            const storage = window.localStorage;
            storage['userInfo'] = JSON.stringify(this.state.userInfo);//localStorage只能存储String类型,需将对象转换成string
            // console.log(storage['userInfo'])

        })
    }


    render (){
        // console.log(this.state.userInfo)
        return (
            // <Provider store={store}>  
                <div className="appWried" >
                    {
                        this.state.userInfoState ? '' : <UserInfoModal onSubmitData={this.onGetData} />
                    }
                    {
                        <div style={{height:'100%',width:'100%'}} className={this.state.userInfoState ? '' : 'unClick'} >
                            <AppHead />
                            <AppContent userInfo={this.state.userInfo}/>
                            <AppFoot userInfo={this.state.userInfo} />
                        </div>
                    }
                </div>
            // </Provider>
        );
    }
}

export default ReactApp;