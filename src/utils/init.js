import store from '../store'
//刷新保留

if(localStorage.getItem("ezManage")){
    store.commit("login/setUser",JSON.parse(localStorage.getItem("ezManage")))
}