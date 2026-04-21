function SS_Per_OnNewRecord()
{
	try
	{
	    CurrentRecord["PerExtDateCreation"]  = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["PerExtCreateur"]      = CurrentUserName ;
	     var date = new Date();
	      date.setDate(date.getDate());
	      var dayS = date.getDate();
	      var monthS = date.getMonth()+1;
	      var yearS = date.getFullYear();
	      var dateRs = new DateTime(yearS,monthS,dayS);
	
	     CurrentRecord["PerCpyInDate"] = CurrentRecord["PerExtDateCreation"];
	}
	catch(e)
	{
	     throw "Error on SS_Per_OnNewRecord " + e;
	}
}