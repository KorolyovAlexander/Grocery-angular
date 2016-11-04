/**
 * Created by Samsung on 24.10.2016.
 */
angular.module("App")
    .controller("MainController", MainController);

MainController.$inject = ["MainService"];

function MainController(MainService) {

    var _this = this;

    _this.categories = 0;
    _this.products = 0;
    _this.product = 0;

    _this.categoryId = 0;
    _this.productId = 0;

    _this.countOnPage = 2;
    _this.itemsToShow = [];
    _this.indexes = [];
    _this.productsIndex = 0;

    _this.getProducts = getProducts;
    _this.getProduct = getProduct;
    _this.getItemsToShow = getItemsToShow;

    init();

    function init(){

        _this.categoryId = parseInt(localStorage.getItem('categoryId'));

        MainService
            .getCategories()
            .then(function (response) {
                _this.categories = response.data;
                if(_this.categoryId || _this.categoryId == 0) {
                    _this.getProducts(_this.categoryId);
                }
                else{
                    _this.categoryId = 0;
                }
            });
    }

    function getProducts(categoryId) {
        MainService
            .getProducts()
            .then(function (response) {

                _this.productId = parseInt(localStorage.getItem('productId'));

                filterProducts(response, categoryId);
                if (_this.productId || _this.productId == 0) {
                    _this.getProduct(_this.productId);
                }
                else{
                    _this.productId = 0;
                }
                saveProductsIndex();
                getItemsToShow(_this.productsIndex);
            });

        localStorage.setItem('categoryId', categoryId);
    }

    function filterProducts(response, categoryId){
        _this.products = response.data.filter(function(elem){
            return parseInt(elem.categoryId) === categoryId+1;
        });
    }

    function saveProductsIndex(){

        var countOfPages = _this.products.length/_this.countOnPage;

        _this.indexes = null;
        _this.indexes = [];
        for(var i = 0; i < countOfPages; ++i){
            _this.indexes.push({index: i+1});
        }
    }


    function getItemsToShow(index){
        _this.itemsToShow = _this.products.slice(index*_this.countOnPage, (index+1)*_this.countOnPage);
        _this.productsIndex = index;

        localStorage.setItem('productsIndex', index);
    }

    function getProduct(productId){

        _this.product = _this.products[productId];

        localStorage.setItem('productId', productId);
    }
}