/**
 * 列表模块
 * @type {[type]}
 */
var bookListModule = angular.module("BookListModule", []);
bookListModule.controller('BookListCtrl',[
    '$scope', 
    '$http', 
    '$state', 
    '$stateParams',
    '$filter',
    'BHserver',
    
    function($scope, $http, $state, $stateParams,$filter,BHserver)
    {
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 5,
            currentPage: 1
        };
        $scope.setPagingData = function(data, page, pageSize , titleData) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.books = pagedData;
            $scope.defs = titleData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

    //这里可以根据路由上传递过来的bookType参数加载不同的数据
     
        $scope.getPagedDataAsync = function(pageSize, page, searchText) {

            setTimeout(function() {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $scope.$watch('grid', function(newGrid) {
                        BHserver.dataList('grid','../src/data/books' + $stateParams.bookType + '.json','get')
                        });
                } else {
                    BHserver.dataList('grid','../src/data/books' + $stateParams.bookType + '.json','get');

                     $scope.$on( 'datas.update', function( event ) {

                        /*按格式数据显示表格相应单元名字*/
                        
                        var gridColNamesFilter = function gridColNamesFilter(gridData){
                            var gridCols =[];
                            for (var name in gridData ) {
                                if(name != 'userId'){
                                    var columnData = getGridColName(name);
                               
                                    columnData.sortable = true;
                                    switch (name){ 
                                        case 'index' : 
                                             columnData.width = '4%';
                                        break;
                                        case 'userId' : 
                                             columnData.hidden = true;
                                        break; 
                                    }
                                    gridCols.push(columnData);
                                }
                            };
                            return gridCols;
                        }
                        /*标题对照*/
                        function getGridColName(name){
                            var titleObj={};
                            var titleName = {
                                userId:"userId",
                                index: "序号",
                                num:"编号",
                                userName: "用户名",
                                userPhone:"用户手机号",
                                userType:"用户类型",
                                author: "发起人",
                                IDCardNo:"身份证",
                                infoName:"用户登录名",
                                clientName:"客户姓名",
                                age:"年龄",
                                mail:"邮箱",
                                authorID:"推荐人ID",
                                clientID:"客户ID",
                                bankName:'银行卡名称',
                                bankNo:'银行卡号',
                                withdraw:"提现金额",
                                withdrawType:'提现状态',
                                withdrawTime:'提现时间',
                                errorExplain:"失败原因",
                                agency:"提现手续费",
                                joinTime:"注册时间",
                                recharge:"充值",
                                rechargeTime:"充值时间",
                                rechargeLan:"充值通道",
                                rechargeType:"充值状态",
                                pubTime: "交易时间",
                                actionType:"交易类型",
                                actionNo:"交易编号",
                                projectNo:"项目编号",
                                income:"收入",
                                outcome:"支出",
                                remark:"备注",
                                investment:"投资金额",
                                investmentTime:"投资时间",
                                borrowTitle:"借款标题",
                                maxMoney:"满标金额",
                                product:"投资产品名称",
                                productRates:"投资产品利率" ,
                                productMax:"投资产品满标额度",
                                bidTime:"产品发标时间",
                                bidOutTime:"产品满标时间",
                                bidType:"投标状态",
                                refundTimePeriod:"还款周期"
                            };
                            
                                titleObj.field = name;
                                titleObj.displayName = titleName[name];
                                titleObj.enableCellEdit = false;
                            return titleObj;
                        };
                        $scope.setPagingData(BHserver.gridData, page, pageSize , gridColNamesFilter(BHserver.gridData[0]));

                     });
                }
            }, 100);
        };
        var defs;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

            $scope.gridOptions = {
                data: 'books',
                rowTemplate: '<div style="height: 100%;"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                    '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                    '<div ng-cell></div>' +
                    '</div></div>',
                multiSelect: false,
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEdit: true,
                enablePinning: false,
                columnDefs: 'defs' ,
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                filterOptions: $scope.filterOptions
            };
        }]);

/**
 * 这里是详情模块
 * @type {[type]}
 */
var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
});
