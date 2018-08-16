/**
 * 公共组件:添加用户信息窗口
 */
import React from 'react'

import $ from 'jquery'
//引入头像图片
import astronaImg from '../../../public/img/astrona.png'
import planetImg from '../../../public/img/planet.png'
import alienImg from '../../../public/img/alien.png'
import starPlanetImg from '../../../public/img/starPlanet.png'

import './style/userInfoModal.less'

export default class UserInfoModal extends React.Component{
    constructor(args){
        super(args)
        
        this.state = {
            choseImg:''
        }

    }


    //click
    choseImgFn(index){
        // console.log(this.refs[`imgDiv${index}`]);
        //通过ref获取dom节点,改变style样式
        // console.log(index);
        //清空原先点击的
        $('.list .imgDiv').css('border','1px solid #FFF');
        //选中点击的
        $('.list .imgDiv').eq(index).css('border','1px solid #8c628d');
        //存储点击的图片
        let choseImg =  $('.list .imgDiv').eq(index).children('img').attr('src')
        // console.log(choseImg)
        this.setState({
            choseImg,
        })
    }

    //submitFn
    submitFn(){
        let userName = $('#userName').val();
        if(!userName){
            alert('名字还未输入哦')
            return;
        }
        let headImg = this.state.choseImg;
        let userId = "indexCode" + Math.round(Math.random() * 100000); //随机创建id,用来判断是自身信息还是别人信息
        this.props.onSubmitData({
            userName,
            headImg,
            userId,
        })

    }


    render() {
        const headImgArr = [astronaImg,planetImg,alienImg,starPlanetImg];

        return(
            <div className="modal">
                <div className="modalName">
                    <span>请输入信息</span>
                </div>

                <div className="modalCont">
                    <div className="list">
                        <span>姓名</span>
                        <input placeholder="请输入姓名" id="userName"/>
                    </div>
                    <div className="list">
                        <span>选择头像</span>
                        <div className="showImg">
                            {
                                headImgArr.map( (item,index) => 
                                    <div ref={`imgDiv${index}`} key={index} className={`imgDiv`} onClick={this.choseImgFn.bind(this,index)}>
                                        <img src={item} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="modalFoot">
                    <button  className="resetBtn">重置</button>
                    <button  className="submitBtn" onClick={this.submitFn.bind(this)}>提交</button>
                </div>
            </div>
        )
    }
}