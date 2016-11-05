/**
 * Created by Samsung on 24.10.2016.
 */
app.service("MainService", MainService);

MainService.$inject = ["$http"];

function MainService($http) {

    this.getCategories = function() {
        return $http.get('categories.json');
    };

    this.getProducts = function() {
        return $http.get('products.json');
    };
}