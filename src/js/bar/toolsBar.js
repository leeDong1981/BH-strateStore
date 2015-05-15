/* 
* @Author: lee
* @Date:   2015-05-13 12:55:44
* @Last Modified by:   anchen
* @Last Modified time: 2015-05-13 17:27:10
*/

'use strict';
var toolsBarModule=angular.module('toolsBarModule',[]);
toolsBarModule.controller('DataNavsCtrl',function ($scope) {
    var showBarListCach = false;
    $scope.navData=[{
            first:'人事报表',
            showBarList:false,
            second:[
                {title:'人事信息表',num:0},
                {title:'员工信息表',num:1}
            ]
        },{
            first:'财务报表',
            showBarList:false,
            second:[
                {title:'月支出信息表',num:2},
                {title:'月收入信息表',num:3}
            ]
        }
    ];
    // 监听导航菜单事件
    // $scope.onBarClick = function(target , bar){
    //     console.log("toolsBarClick-Target",target)
    //     console.log("toolsBarClick-bar",bar)
    // };
})
.directive('navbar',function(){
    return{
        restrict : 'E',
        template : '<dt>{{bar.first}}</dt>',
        replace : true,
        transclude : true,
        scope : true,
        link : function (scope, element,attris){
            element.on('click',function(){
                var height=40*scope.navData[$(this).parent().index()].second.length;
                if($(this).siblings('dd').height()==0){
                $(this).parent().siblings().find('dd').height(0);
                $(this).siblings('dd').height(height);
            }else{
                $(this).siblings('dd').height(0);
            }
            })
        }
    };
})