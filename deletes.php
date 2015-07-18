<?
	include('config.php');

	$id = $_GET['id'];
	$sql = "SELECT * FROM customer";
	$records = mysql_query($sql);

	if(isset($_GET['id'])){
		$id = $_GET['id'];
		$delete = "DELETE FROM customer WHERE CustomerID = '$id' ";
		$res = mysql_query($delete) or die("FAILED" .mysql_error());
	}


?>