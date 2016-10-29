/**
 * Created by Samsung on 24.10.2016.
 */
var app = angular.module('App', ['ui.router']);

angular.element(document).ready(function(){
    angular.bootstrap(angular.element(document), ['App']);
});

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("categories", {
            url: "/",
            templateUrl: "categories.html"
        })
        .state("products", {
            url: "/products",
            templateUrl: "products.html"
        })
        .state("product", {
            url: "/product",
            templateUrl: "product.html"
        });

    $urlRouterProvider.otherwise('/');
});