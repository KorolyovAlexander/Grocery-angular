/**
 * Created by Samsung on 24.10.2016.
 */
angular.module("App")
    .controller("MainController", MainController);

MainController.$inject = ["MainService", "$timeout"];

function MainController(MainService, $timeout) {

    var _this = this;

    _this.categories = 0;
    _this.products = 0;
    _this.product = 0;

    function init(){

        var categoryID = localStorage.getItem('categoryId'),
            productID = localStorage.getItem('productId');

        MainService
            .getCategories()
            .then(function (response) {
                _this.categories = response.data;
            });

        _this.getProducts(parseInt(categoryID));

        $timeout(function() {
            _this.getProduct(parseInt(productID));
        }, 100);
    }

    _this.getProducts = function(categoryId){
        MainService
            .getProducts()
            .then(function (response) {
                _this.products = response.data.filter(function(elem){
                    return parseInt(elem.categoryId) === categoryId+1;
                });
            });

        localStorage.setItem('categoryId', categoryId);
    };

    _this.getProduct = function(productId){
        _this.product = _this.products[productId];

        localStorage.setItem('productId', productId);
    };

    init();
}