/**
 * Created by Samsung on 05.11.2016.
 */
app.directive('zoomImage', ZoomDirective);

function ZoomDirective(){
    return{
        scope: true,
        restrict: 'E',
        templateUrl: 'zoom-directive.html',
        controller: MainController,
        link: function(scope, elem, attr, controller){

            var imageWidth = 400,
                imageHeight = 300;

            scope.$watch('vm.stepValue', function(newVal, oldVal){
                elem
                    .find('img')
                    .css({
                        transform: 'scale('+newVal+')',
                        'transform-origin': 'left top'
                    });
                console.log((imageWidth*newVal-imageWidth)/2);
                console.log((imageHeight*newVal-imageHeight)/2);
            });
        },
        bindToController: true,
        ControllerAs: 'vm'
    };
}