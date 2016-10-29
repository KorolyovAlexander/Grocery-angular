/**
 * Created by Samsung on 24.10.2016.
 */
angular.module("App")
    .controller("MainController", MainController);

MainController.$inject = ["$scope", "MainService"];

function MainController($scope, MainService) {
    $scope.categories = [];
    $scope.products = [];
    $scope.product = 0;

    function init(){
        MainService.getCategories().then(function (response) {
            $scope.categories = response.data;
        });
    }

    $scope.getProducts = function(categoryId){
        MainService.getProducts().then(function (response) {
            $scope.products = response.data.filter(function(elem){
                return elem.categoryId == categoryId+1;
            });
        });
    };

    $scope.getProduct = function(productId){
        $scope.product = $scope.products[productId];
    };

    init();
}