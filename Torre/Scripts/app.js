var app = angular.module('app', ['ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };

    $scope.gridOptions = {
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [
          // default
          { field: 'id_', headerCellClass: $scope.highlightFilteredHeader },
           { field: 'id_simulacao', headerCellClass: $scope.highlightFilteredHeader },
            { field: 'qtddiscosInicial', name: 'Qtd Discos', headerCellClass: $scope.highlightFilteredHeader },
             { field: 'movimento_De', headerCellClass: $scope.highlightFilteredHeader },
              { field: 'movimento_Para', headerCellClass: $scope.highlightFilteredHeader },
               { field: 'data_inicio_simulacao', headerCellClass: $scope.highlightFilteredHeader },
                { field: 'data_fim_simulacao', headerCellClass: $scope.highlightFilteredHeader },
               


        ]
    };

    $http.get('/api/Hanois')
      .success(function (data) {

          if (data.length > 0)
              $scope.gridOptions.data = data;
          else
              alert('Não existe regitros na base de dados');

      });

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };
}])
