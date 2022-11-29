# mall-ezmanagement

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


-----------------------------------------------------
### 项目技术栈
Vue全家桶: Vue + VueRouter + Vuex + Axios + ElementUI



### 模块需求
1、axios  --网络请求  `npm i --save axios`
2、Element UI模块   `vue add element`
3、VueCli 2.x/3.x

### 项目结构整理
1、初始化CSS
2、增加视图UI组件

### 服务器端
1、依赖 express mysql 
-----
注意：
连接数据库时因为mysql8.0版本问题
要进入数据库执行以下指令
1、mysql -u root -p
2、输入密码
3、use mysql;
4、alter user 'root'@'localhost' identified with mysql_native_password by '123456';
5、flush privileges;

### 配置快捷运行方案 
```js
npm install -g concurrently //合并运行
npm install -g nodemon
```