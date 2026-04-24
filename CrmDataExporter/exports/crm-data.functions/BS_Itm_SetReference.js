function BS_Itm_SetReference()
{
	var vUnivers : String = CurrentRecord["ItmExtUnivers"];
	var vFam: String = CurrentRecord["ItmExtFam"];
	var vSsFam: String = CurrentRecord["ItmExtSousFam"];
	var vDate: String = DateTime.Now.ToString();
	
	var datevalue:DateTime  = (Convert.ToDateTime(vDate.ToString()));
	
	var dd: String  = datevalue.Day.ToString();
	var mm: String  = datevalue.Month.ToString();
	var yy: String  = datevalue.Year.ToString();
	
	CurrentRecord["ItmExtRef"] = vUnivers + "_" + vFam + "_" + vSsFam + "_" +yy+mm+dd;
}