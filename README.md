### 一、前面bb两句
因为自惭(自残)webpack配置还不够熟悉,想折腾着做一个小实例熟悉。想着七夕快到了,做一个聊天室自己和自己聊天吧哈哈。好了,可以停止bb了,说一下干货。

### 二、 这个项目能学到啥?
为了减少秒关文章的冲动。我得把好话放在前头。做了这个项目，我学会了....(对于我).
1. Webpack的配置以及各个参数概念都有一定的熟悉。
2. React+Webpack+Express的配合使用
3. 熟悉React的JSX语法、生命周期等的熟悉
4. Socket.io(入门)
5. localStorage(入门)
6. less(入门)
  
以上的都或多或少地涉及了(大神请别见笑)。不知道有没有和我一样的小伙伴以前看到socket、localStroage之类的都只懂个概念,真正使用还真没个数。没有吗？好吧。其实这几个东西写起来真的不难，和他高大上的概念并不成比例。  
例如socket.io只需要20行代码就能完成基本功能  
localStroage也需要创建一个对象,一个方法即可完成。  
所以无需惧怕！继续看下去

### 三、 项目涉及的技术及地位
1. Webpack   <font color="#888">地位:★ ★ ★ ★ ★</font>  
    * 原因: 因为项目最初构建目的是一步步熟悉Webpack的配置,以及和React、node的搭配,所以不给满星Webpack怕是会闹别扭。

    * 内容: 基础知识的配置(入口文件等等),loader的配置(react加载器等)，配置热更新，打包后自动生成html文件...
    
    * 扩展: 如果想要先熟悉了解webpack的一些基础知识,可以参考[入门及配置Webpack](https://www.cnblogs.com/soyxiaobi/p/9451144.html)
    
2. Express(node)    <font color="#666">地位:★ ★ ★ ★ ☆</font>
    * 原因: 虽然同样是不可或缺的地位,没开启服务怎么访问呀！但是之所以低Webpack一等(仅仅指在这个项目),是因为对node的配置不多,大部分都是通过express自动生成的。在此项目,更改的就只有app.js渲染的文件类型(默认是jade,更改为html)还有指向文件。
    * 内容: 渲染文件类型、更改指向目录、更改端口...
    * 扩展：确保安装了express,然后通过$ express  myappName初始化构建项目即可

3. React    <font color="#888">地位:★ ★ ★ ★ ☆</font>
    * 原因: 你说不用react也可以构建聊天室?当然可以,但是我们项目毕竟是React+Webpack,不用react的话...挺尴尬的？所以项目也要求你要懂一些react的语法啦。掌握一些基础知识即可:自定义组件、父子传值之类...
    * 内容: 页面内容的呈现、逻辑的处理(其实就是普通html、js)
    * 扩展: 基础.没...没啥好扩展的啦(项目一开始用到了react-redux,但是后面发现没什么必要就去掉了)

4. socket.io、localStroage、Less    <font color="#888">地位:★ ★ ★ ☆ ☆</font>
    * 原因：把这三类归在一起，一来是因为我对三类都不太熟悉(所以跟我一样的不用怕！不会很复杂)
    * 内容: socket.io负责接收某位客户端传来的信息,并广播到所有客户端上。  
    localStroage的加入有点勉强,我只是顺便想熟悉一下它,并尝试保存聊天记录。具体作用是通过localStroage获取用户信息,如果没有则添加。但是我在最开始会清除掉localStroage,所以每次刷新页面的时候都需要重新填写,所以项目localStroage存在作用不大,只是代替了模拟数据。  
    项目使用的Less也比较基础,只是简化了层级关系的写法(这一点确实比css方便很多)
    * 扩展: socket.io用法可看:[socket.io中文文档](https://www.w3cschool.cn/socket/socket-ulbj2eii.html)  
        localStroage用法可看:[这篇博客](https://www.cnblogs.com/st-leslie/p/5617130.html)
    * Socket.io将Websocket和轮询(polling)机制以及其他痛通信方式封装成通用接口,解决了浏览器的兼容性
---

### 四、摩拳擦掌:准备项目前期
1. 我们先来看一下项目部分截图:    
     ![项目截图1](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816185210499-1430474677.png)  
    ![项目截图2](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816185255719-1478467566.png)
    ![项目截图3](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816185340129-2012033507.png)
    ![项目截图4](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816185406249-1841889652.png)  
    想看gif动图的可以直接<a href="#jump" target="_self">跳下去</a>哦  
    是不是很想亲自做一个出来?别急,我们这就开始。打开VSCode,打开音乐！！
2.  因为项目是通过edxpress初始化的,所以需要安装express,可通过express --version检查自己的版本确保安装(我的版本是4.16.0)。如果未安装,可执行:<font color="red">$ npm install express -g</font>
```
express SoyChat //创建express项目,名字个人喜欢

cd SoyChat      //进入目录

npm install     //安装依赖

node bin/www    //启动项目
```
访问localhost:3000 看到Welcome to Express的话恭喜你！闯过第一关！
> 注意:启动命令也可以用npm run start 启动,因为package.json的script里面已经默认设置了npm run start指代 node ./bin/www命令。两个使用其中一个都可以启动项目！ 如果遇到端口占用情况,进入bin/www文件修改端口即可。

3.就知道这点难不倒你。开始动手写项目前我把最终目录写一下,方便后面参考使用。(可跳过)
```
SoyChat /
    bin/
        www         //默认生成文件,服务启动文件
        
    client/         //客户端,编写代码的地方
        components  //公共组件
        dist        //打包后存放位置
        modules     //主要的逻辑组件
        r_routes    //react组件路由
        views       //模板文件、React渲染文件
            index.html
            
    node_modules/  
    public/         //存放图片等静态资源
    routes/         //默认生成文件,express设置路由文件
        index.js
        
    app.js          //默认生成文件,服务启动配置
    package.json  
    webpack.config.js   //webpack配置文件
```

4.完整项目的github地址:[小语1.0](https://github.com/soybeanxiaobi/soyChat-React-Webpack)  
拷贝到本地之后  
```
npm install     //安装依赖
npm run build   //打包
npm run start   //启动服务

浏览器访问localhost:8000,测试聊天可开多一个窗口
```

### 五、开战！编写项目
#### 1.更改服务启动相关配置(app.js)
> 删除routes/文件下的user.js 去掉app.js引入的userRouter、app.use('/users',userRouter)
更改视图渲染文件的类型:jade => html
```
var ejs = require('ejs'); //需要安装ejs模块:npm install ejs --save

app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, './client/dist'));    //html文件加载路径
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './client/dist'))); //css.js...之类文件加载路径
```
可能会疑惑./client/dist是个什么东西？  
其实这个文件是我们打包后存放的位置,我们不直接访问React渲染的html页面,而是指向webpack打包后生成的html;
例如,这个项目最终打包好后的dist文件如下:  
![dist文件夹](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816142956738-1764092028.png)

好了,node服务我们配置到这就完事了.啥？真的就这么简单。

#### 2.高能预警:Webpack的配置(敲桌子!)
安装Webpack依赖:<font color="red">npm install webpack --save-dev</font>
> 这里的--save-dev是把依赖加载到package.json的devDependencies中,--save是安装到dependencies中。前者是开发所需要用到的,后者是生产环境需要用到的。这里不做具体介绍,可看[《入门及配置Webpack》](https://www.cnblogs.com/soyxiaobi/p/9451144.html)

呼～终于安装好了。接着新建一个webpack.config.js文件吧。
```
//webpack.config.js
var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/client/r_routes/index',    //入口文件 
    output: {
        path:path.join(__dirname + '/client/dist'),   //打包后存放位置
        filename:'bundle.js',    //打包后的文件名
    },

    module :{
        loaders : [{
            test :/(\.jsx|\.js)$/,
            exclude : /node_modules/,
            loader :'babel-loader',
            options:{
                presets:[
                    "env", "react" 
                ]
            }
        },
        {
            test : /\.css$/,
            loader:'style-loader!css-loader'
        },
        {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
　　　　　　test: /\.(png|jpg)$/,
　　　　　　loader: 'url-loader?limit=8192'// limit 字段代表图片打包限制
　　　　 }
        ]
    },

    plugins: [
        //根据index.html作为模板,打包的时候自动生成html并引入打包的js文件
        new HtmlWebpackPlugin({
            template: __dirname + "/client/views/index.html"
        }),

        //引入全局webpack
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })
    ],
}
```
接下来介绍里面的几个参数:
* entry:打包的入口文件.这边指向react的根路由文件r-routes/index。打包的时候会从该文件入口,一层层获取所有组件
```
//r-routes/index
import React from 'react';
import ReactDOM from 'react-dom';

import ReactApp from '../modules/r_app'//根组件

ReactDOM.render(<ReactApp />,document.getElementById('app'));
```
可能会疑惑,如何知道把<React />render(渲染)到哪个html的id=app上呢？  
&emsp;原来这个和webpack的plugins(插件)的new HtmlWebpackPlugin有关。这个对象会读取一个目录下的html文件为模版，然后经过处理后再去output指定的目录输入一个新的html文件。因为在这里指定了/client/views/index.html文件为模板,所以react的所有都会渲染到这个html文件中。

* output:配置打包输出位置以及输出文件名字。(html的生成是通过new HtmlWebpackPlugin方法)

* module:里面是各种loader加载器;webpack理论上只能加载js文件,但是通过各种loader它可以加载图片、css等等文件。  
> 项目用到的loader:style-loader、css-loader、file-loader...详见package.json

要使webpack打包支持react和ES6语法还需要安装babel等依赖
```
npm  install --save-dev react react-dom babelify babel-preset-react
npm install --save babel-preset-es2015  //支持ES6语法

//loader配置参考上面的即可
```
* plugins:各种插件配置  
例如上面全局jquery的配置(记得安装jquery依赖包<font color="red">npm install jquery --save</font>)

* 注意我这里没有配置热更新,因为热更新有自己的服务,但我想使用node启动服务,不用webpack-dev-server的服务,所以就没配置(网上应该有解决方法,给node服务添加热更新,但是我没找到,所以项目只有自动打包,但还是需要手动刷新浏览器)
>npm install webpack-dev-server --save-dev  //热更新安装

至此,webpack.config.js配置完成。接下来我们看看package.json
```
//package.json
{
  "name": "app",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "build": "webpack --progress --watch"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "ejs": "^2.6.1",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "jquery": "^3.3.1",
    "less": "^3.8.1",
    "morgan": "~1.9.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^1.0.0",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "http-proxy-middleware": "^0.18.0",
    "less-loader": "^4.1.0",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-router-dom": "^4.3.1",
    "socket.io": "^2.1.1",
    "socket.io-client": "^2.1.1",
    "style-loader": "^0.22.1",
    "url-loader": "^1.0.1",
    "webpack": "^3.0.0",
    "webpack-cli": "^3.1.0",
    "webpack-dev-middleware": "^3.1.3",
    "webpack-dev-server": "^2.9.7"
  }
}
```
安装的依赖包我就不具体介绍,重点介绍scripts的参数  
```
...
"scripts": {
    "start": "node ./bin/www",
    "build": "webpack --progress --watch"
  },
...
```
这里是可根据情况配置一些指代命令。  
本来项目启动需要node ./bin/www,但是通过配置,我终端输入npm run start(npm run + 指令)也能达到一样的效果。  
同理,我利用npm run build 代替了webpack的打包命令,并附带了一些参数命令。 
```
--progress  //显示进度条  
--watch     //监听变动并自动打包  
-p          //压缩脚本
```

大吉大利！枯燥的项目配置到此结束！

#### 3. 熟悉的前端味道:编写React组件
```
//r-routes/index.js
import ReactApp from '../modules/r_app'     //根组件
```
我们可以看到r-routes/index.js引用了一个根组件r_app,r_app再分成<AppHead />、<AppContent />、<AppFoot />  
![](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816161555668-902238943.png)  
<b>1. localStroage的使用</b>  
值得注意的是刚进入页面的时候,输入信息框会根据localStroage是否含有用户信息来决定是否出现
![](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816161730704-1648004025.png)
```
//r_app.js
//引入组件
import AppHead from './head/index'
import AppContent from './content/index'
import AppFoot from './foot/index'
import UserInfoModal from '../component/userInfoModal/index'
import './r_app.less'
...
const storage = window.localStorage;
    storage.removeItem('userInfo');  //进入页面时清除localStroage
    
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
...
render (){
    // console.log(this.state.userInfo)
    return (
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
    );
}
```
可以发现,r_app.js只是做了localStroage的读取和判断,但是并没有写入任何,localStroage字段。并且永远不会进入if(storage['userInfo'])语句,因为每次在最前面都会把信息remove。所以信息输入框每次刷新页面都依然会弹出来.  

<b>耍我呢?localStroage出来秀逗的?</b>  

= =localStroage在这里确实有点大材小用,因为一开始想持续性保存用户的信息以及聊天记录,但是发现这样测试难以进行。我就一部电脑,读取的localStroage['userInfo']不就一模一样么。

说回正题,那添加localStroage的操作在哪执行?  

答案就在<UserInfoModal onSubmitData={this.onGetData}/>子组件里,当用户在<UserInfoModal />提交信息后,存储到localStroage并且把数据传回r_app,然后r_app再执行对应操作
```
//UserInfoModal.js
...
<button  className="submitBtn" onClick={this.submitFn.bind(this)}>提交</button>

submitFn(){
    let userName = $('#userName').val();
    if(!userName){
        alert('名字还未输入哦')
        return;
    }
    let headImg = this.state.choseImg;
    let userId = "indexCode" + Math.round(Math.random() * 100000); //随机创建id,用来判断是自身信息还是别人信息  
    //数据传回父组件r_app.js
    this.props.onSubmitData({
        userName,
        headImg,
        userId,
    })
}
...

//r_app.js
...
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
...
```
>注意:localStroage只能存储String类型的数据,如果需要存储对象,需要通过JSON.Stringify()转换。取数据的时候通过JSON.parse()即可

<b>2. Socket.io的使用  </b>   
实现效果:底部input发送的数据传递到content组件并展示,并且要求所有客户端都能收到。  
实现思路:利用socket.io实现实时通信,先把发送信息的客户端的用户信息以及信息中转到服务器,服务器再分派给所有订阅了这个socket事件的客户端。接收到消息的<AppContent />把信息显示到内容上。
* 安装ocket.io
```
npm install socket.io --save-dev    //安装服务器端的socket.io
npm install socket.io-client --save-dev     //安装客户端的socket.io
```
* 服务器端使用socket.io
```
// bin/www
//新增socket.io模块
var io = require('socket.io')(server);

io.on('connection', function(socket){
  //接受客户端传送的sendMessage命令
  socket.on('sendMessage', function(ioUserInfo,msg){
      console.log(ioUserInfo);  //用户ioUserInfo
      console.log(msg);  //接收用户的发送信息

      //通过接受sendMessage这个action的数据再广播给所有'订阅的人'(即on了这个事件的)
      socket.broadcast.emit('getMessage', ioUserInfo, msg);
      //socket.emit()发送信息给全部人,只要订阅了getMessage的人都会收到变量ioUserInfo和msg
      //socket.broadcast是发送除自己外的人
  });
})
```
引入socket.io模块,当处于connection的时候即可进行接收、发送信息。上面服务器接收(on)到某个用户传来的信息之后再广播(emit)给大家

on和emit可以这么理解,接收信息是on事件,发送信息是emit事件  
```
//发送标志为message信息,信息内容为:test
socket.emit('message','test')

//订阅了标志为message的信息的客户端将会接收到这条test信息
socket.on('message',function(data){
    console.log(data);//test  
})
```
* 客户端端使用socket.io-client
```
const socket = require('socket.io-client')('http://localhost:8000');  
socket.on()....
socket.emit()...
```

* 客户端发送io.socket信息
```
//footComponent.js
...
let disabled = Object.keys(this.props.userInfo).length ? '' : 'disabled'; //未填用户信息的时候禁止input输入内容
return (
    <div className="footDiv">
        <input disabled={disabled} className="footIpt" placeholder="请输入..."  onChange={this.dataChange} value={this.state.message}/>
        <button className={`footBtn ${this.state.hasCont}`} onClick={this.clickBtn}>发送</button>
    </div>
)
...

componentDidMount(){
    document.addEventListener("keydown",this.handleEnterKey);(绑定一个键盘按下的方法)
}

//点击按钮发送信息
clickBtn(){
    const { message } = this.state; //获取input输入的内容
    const { userInfo } = this.props;
    // console.log('发送' + this.state.message)
    //是否发送内容
    this.sendMessage(userInfo,message);
}

//回车后发送信息
handleEnterKey(e){
    let that = this;
    const { message } = this.state; //获取input输入的内容
    const { userInfo } = this.props;
    if(e.keyCode === 13){   
        //回车keyCode==13
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
    socket.emit('sendMessage',ioUserInfo,message)   //客户端发送
}
```  
* 客户端接收信息
```
//content/index.js
socket.on('getMessage', function(ioUserInfo,msg){
    console.log(ioUserInfo);    //ioUserInfo为发送msg的用户信息    
    console.log(msg)    //用户发送的内容
}

```
* 判断是己方信息还是对方信息  
通过一开始分配的userId来区分信息类型,如果是己方信息,应用向右浮动样式(.contLiMy);如果是对方信息,应用向左浮动样式(.contLiOther)
```
componentWillReceiveProps(nextProps){    
    const { userInfo } = nextProps;  //获取父级传递过来的userInfo,里面携带自身的userId
    
    socket.on('getMessage', function(ioUserInfo,msg){
        console.log(ioUserInfo);
        // 如果socket传回ioUserInfo.userId和自身相同,则判断为自身发送的信息

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
    });
}
    
return(
    <div className="content">
        <ul className="contUl">
            <div className="contTop">欢迎你:{this.props.userInfo.userName}</div>
        </ul>
    </div>
)
```

这里有一个小技巧,如果内容超出高度出现滚动条的时候,需要保持显示底部的内容.在填充内容后加上一行代码
```
...
$('.contUl').append(appendLi);
$('.contUl').scrollTop($('.contUl')[0].scrollHeight);//保持显示滚动条高度的位置(即底部)
...
```  
![](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816184659070-1811275578.png)

至此项目的主要功能都已经完成啦。未介绍的less其实和css写法差不多,这里less只是简化了父层的写法  
![less](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816185814861-949206107.png)

一些点击、hover功能都是用最基础的js、jq实现的。
例如:聊天框的实现(利用伪类:after制作三角形)
```
//对方聊天框
.chatBg{
    font-size:15px;
    padding:3px 10px;
    border-radius: 3px;
    color: #EFEFEF;            
    background-color: #8c628d; 
    margin-right:8px;
    position: relative;
}
//聊天框三角形的制作
.chatBg:before{
    right:-12px; 
    border-color:transparent transparent transparent #8c628d;  //四边分别代表:上右下左    
}
```


### 六、马后话(总结)
#### 1. 总结  
项目总体的实现没有难度,都是最基础的东西。能帮助初学者(例如我)学到和巩固知识点才是最重要的！有任何疑问或者任何错误,欢迎留言啦！谢谢小伙伴们的耐心阅读～～

#### 2. 最后给大家呈上一张最终效果的gif图
<span id="#jump"></span>![项目预览gif](https://images2018.cnblogs.com/blog/1414709/201808/1414709-20180816135942586-1715853213.gif) 



