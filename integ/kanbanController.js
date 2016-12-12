angular.module("kanban").controller("kanbanController", function ($scope, $http){
	$scope.app = "Hello World";

	$scope.paraFazer = {
		cards: []
	};

	$scope.adicionarCard = function() {
		$scope.paraFazer.cards.push({editando: true});
	}

	$scope.salvarCard = function(card) {
		card.editando = false;
	}
})