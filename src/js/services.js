/*
    username注意
        grid = 表格数据

 */

routerApp.factory('BHserver', ['$rootScope','$http','$stateParams', function ($rootScope,$http, $stateParams) {

    var datas = {
        user:{},
        gridData:{},
        dataList: function(username,path,getType,data) { 
            this.doRequest(username, path , getType);
        },

        doRequest: function(username, path , getType ,data) {
            $http({
                method: getType,
                url: path
            })
            .success(function(data, status) {
                    datas.gridData = data;
                    datas.user = {name:'lee',sex:'m'};
                    $rootScope.$broadcast( 'datas.update' );
            })
        }
    };
    
    return datas;
}]);