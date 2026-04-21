function test_split_date()
{
	var vdate = "06/04/2021 10:53:15";
	var Part_Req_Exp = vdate.substring(0,10).split("/");
	var fDate_Req_Exp = Part_Req_Exp[2] + "-" + Part_Req_Exp[1] + "-" + Part_Req_Exp[0];
	return fDate_Req_Exp;
}