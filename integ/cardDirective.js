angular.module("kanban").directive("uiCard", function() {
	return {
		templateUrl: "views/card.html", 
		replace: true, 
		restrict: "AE", 
		transclude: true, 
		scope: {
			responsavel: "=", 
			texto: "=", 
			editando: "="
		}
	};
});