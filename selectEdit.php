<?

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include'config.php';

	$data = json_decode(file_get_contents("php://input"));
	$index = mysql_real_escape_string($data->prod_index);
	$qry = mysql_query('SELECT * FROM customer WHERE CustomerID = "'.$index.'" ');
	$data = array();

	if($qry === FALSE) { 
    die(mysql_error()); // TODO: better error handling
	}

	while ($row = mysql_fetch_array($qry)) {
		# code...
		$data[] = array(
			"CustomerID"	=> $row['CustomerID'],
			"Name"			=> $row['Name'],
			"Email"			=> $row['Email'],
			"CountryCode"	=> $row['CountryCode'],
			"Budget"		=> $row['Budget'],
			"Used"			=> $row['Used']
			);
	}

	print_r(json_encode($data));
	return json_encode($data);

// 	$conn = new mysqli("localhost", "root", "root", "data");

// if(isset($_GET['id'])){
// 	$id = $_GET['id'];
// 	$result = $conn->query("SELECT * FROM customer WHERE CustomerID = '$id' ");
// }
// 	$outp = "";

// 	while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
// 		if($outp != ""){
// 			$outp .= ",";
// 		}
// 		$outp .= '{"ID":"' .$rs["CustomerID"]. '",';
// 		$outp .= '"Name":"' .$rs['Name'].'",';
// 		$outp .= '"Email":"' .$rs['Email'].'",';
// 		$outp .= '"CountryCode":"' .$rs['CountryCode'].'",';
// 		$outp .= '"Budget":"' .$rs['Budget'].'",';
// 		$outp .= '"Used":"' .$rs['Used'].'"}';
// 	}
// 	//$outp = '{"records":['.$outp.']}';
// 	$conn->close();

	echo($outp);

?>