import React from 'react';

import FootComp from './child/footComponent'


class AppFoot extends React.Component{
    constructor(args){
        super(args);    
    }


    render (){
        return (
            <div className="foot">
                <FootComp userInfo={this.props.userInfo}/>
            </div>
        )
    }
}


// function mapStateToProps(state){
//     // console.log(state.user);
//     return {
//         users:state.user
//     }
// }





export default AppFoot;