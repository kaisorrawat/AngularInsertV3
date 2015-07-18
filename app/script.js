app.controller('customerCtrl',['$scope','$modal','$log','$http', '$location', '$window', function ($scope, $modal, $log, $http, $location, $window){
	
	$scope.isCollapsed = true;
	$scope.animationsEnabled = true;

	// $scope.Navigate = function (id){
	// 	// $window.location.href = 'customerEdit2.html?id=' +id;
	// 	$scope.newEmployee = {};
	// 	$scope.update_prod = true;
	// 	$scope.add_prod = false;
	// 	$http.post('selectEdit.php',
	// 	{
	// 		'prod_index' : id
	// 	}
	// 		)
	// 	.success(function (data, status, headers, config){
	// 		$scope.newEmployee.customer				=	data[0]["ID"];
	// 		$scope.newEmployee.names				=	data[0]["Name"];
	// 		$scope.newEmployee.email				=	data[0]["Email"];
	// 		$scope.newEmployee.countrycode			=	data[0]["CountryCode"];
	// 		$scope.newEmployee.budget				=	data[0]["Budget"];
	// 		$scope.newEmployee.used					=	data[0]["Used"];

	// 	})
	// 	.error(function (data, status, headers, config){

	// 	})
	// 	modalInstance.result.then(function(selectedItem){
	// 		console.log('selectedItem', selectedItem);
	//    		console.log('customer', $scope.newEmployee.customer);
	//    		console.log('names', $scope.newEmployee.names);
	//    		console.log('email', $scope.newEmployee.email);
	//    		console.log('countrycode', $scope.newEmployee.countrycode);
	//    		console.log('budget', $scope.newEmployee.budget);
	//    		console.log('used', $scope.newEmployee.used);
	//      //  if(selectedItem.save != "update"){
	//     	// p.ID = selectedItem.ID;
	//     	// p.Name = selectedItem.Name;
	//     	// p.Email = selectedItem.Email;
	//     	// p.CountryCode = selectedItem.CountryCode;
	//     	// p.Budget = selectedItem.Budget;
	//     	// p.Used = selectedItem.Used;
	//      //  }
	//     }, function () {
	//       $log.info('Modal dismissed at: ' + new Date());
	//     });
	// };

	$scope.addEmployee = function(){
		alert("Function Doing");
		$scope.errors = [];
		$scope.msgs = [];


		$http.post('insert.php',{
			'customer': 	$scope.newEmployee.customer,
			'names': 		$scope.newEmployee.names,
			'email': 		$scope.newEmployee.email,
			'countrycode': 	$scope.newEmployee.countrycode,
			'budget': 		$scope.newEmployee.budget,
			'used': 		$scope.newEmployee.used
		}).success(function(data, status, headers, config){
			if($scope.newEmployee.names != "" || $scope.newEmployee.email != "" || $scope.newEmployee.countrycode != "" || $scope.newEmployee.budget != "" ||  $scope.newEmployee.used != "" || data != ""){
				console.log($scope.newEmployee.customer);
				console.log($scope.newEmployee.names);
				console.log($scope.newEmployee.email);
				console.log($scope.newEmployee.countrycode);
				console.log($scope.newEmployee.budget);
				console.log($scope.newEmployee.used);
				console.log("inserted Successfully");
			}
			
			if(data.msgs != ''){
				$scope.msgs.push(data.msgs);
			}else{
				$scope.errors.push(data.errors);
			}
		}).error(function(data, status){
			$scope.errors.push(status);
		});
		window.location="index.html";
	}

	

  	$scope.openEdit = function (p,size) {

	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'customerEdit.html',
	      controller: 'ModalInstanceCtrl',
	      scope: $scope,
	      size: size,
	      resolve: {
	        items: function () {
	          return p;
	        }
	      }
	    });
	   	//alert("Step1");
	    $scope.update_prod = true;
		$scope.add_prod = false;
		$scope.newEmployee = {};
		$http.post('selectEdit.php',
		{
			'prod_index' : p
		}
			)
		.success(function (data, status, headers, config){
			$scope.newEmployee.customerId			=	data[0]["CustomerID"];
			$scope.newEmployee.names				=	data[0]["Name"];
			$scope.newEmployee.email				=	data[0]["Email"];
			$scope.newEmployee.countrycode			=	data[0]["CountryCode"];
			$scope.newEmployee.budget				=	data[0]["Budget"];
			$scope.newEmployee.used					=	data[0]["Used"];

		})
		.error(function (data, status, headers, config){

		})

	    modalInstance.result.then(function(selectedItem){
	   		console.log('selectedItem', selectedItem);
	   		console.log('customer', 	$scope.newEmployee.customer);
	   		console.log('names', 		$scope.newEmployee.names);
	   		console.log('email', 		$scope.newEmployee.email);
	   		console.log('countrycode', 	$scope.newEmployee.countrycode);
	   		console.log('budget', 		$scope.newEmployee.budget);
	   		console.log('used', 		$scope.newEmployee.used);
	     //  if(selectedItem.save != "update"){
	    	// p.ID = selectedItem.ID;
	    	// p.Name = selectedItem.Name;
	    	// p.Email = selectedItem.Email;
	    	// p.CountryCode = selectedItem.CountryCode;
	    	// p.Budget = selectedItem.Budget;
	    	// p.Used = selectedItem.Used;
	     //  }
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
  	};

  	$scope.get_employee = function() {
  		$http.get("selects.php")
		.success(function(respose){
			$scope.datas = respose.records;
		});
  	}
	

	$scope.deletes = function(deletesID, index){
		alert(deletesID);
		$http.get('deletes.php?id=' + deletesID)
		.success(function(data){
			$scope.data.splice(that.$index, 1);
		})
		window.location="index.html";
	}

}])

app.controller('ModalInstanceCtrl',['$scope','$modalInstance','$http', function ($scope, $modalInstance, $http){

	$scope.cancel = function(){
		alert("Function Doing");
		$modalInstance.dismiss('close');
	}
	$http.get('customerEdit.html').success(function(data){
		$scope.employee = data;
	});

	$scope.updateEmployee = function (){
		alert("Function Doing");
		$http.post('update.php',
		{
			'customerId': 	$scope.newEmployee.customerId,
			'names': 		$scope.newEmployee.names,
			'email': 		$scope.newEmployee.email,
			'countrycode': 	$scope.newEmployee.countrycode,
			'budget': 		$scope.newEmployee.budget,
			'used': 		$scope.newEmployee.used
		}
			)
		.success(function (data, status, headers, config){
			$scope.get_employee();
		})
		.error(function (data, status, headers, config){

		})
		window.location="index.html";
	}
	
}])

// app.controller('EditCtrl', function ($scope, $location, $routeParams, id){
// 	var url = "selectEdit.php?id=" + id;
// 	    $scope.dataS = {};
// 	    $http({
// 	    	url: url,
// 	    	method: "GET"
// 	    })
// 	    .success(function(respose){
// 	    	$scope.dataS.CustomerID = respose.ID;
// 	    	$scope.dataS.Name = respose.Name;
// 	    	$scope.dataS.Email = respose.Email;
// 	    	$scope.dataS.CountryCode = respose.CountryCode;
// 	    	$scope.dataS.Budget = respose.Budget;
// 	    	$scope.dataS.Used = respose.Used;
// 	    })
// })
	
