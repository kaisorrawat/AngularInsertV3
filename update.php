<?

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include'config.php';

	$data = json_decode(file_get_contents("php://input"));
	$customerId		= $data->customerId;
	$names			= $data->names;
	$email 			= $data->email;
	$countrycode 	= $data->countrycode;
	$budget 		= $data->budget;
	$used 			= $data->used;

	$qry = "UPDATE customer SET Name='".$names."', Email='".$email."', CountryCode='".$countrycode."', Budget='".$budget."', Used='".$used."' WHERE CustomerID='".$customerId."' ";

	$qry_res = mysql_query($qry) or die("Update Data Failed" .mysql_error());
	if($qry_res){
		$arr = array('msg' => "Product Updated Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
	}else{
		$arr = array('msg' => "", 'error' => 'Error In Updating record');
        $jsn = json_encode($arr);
	}
	print_r(json_encode($jsn));
?>