function()
{
	try{
	     var vParam = [];
	
	     vParam[0] = top.MyApp.GetItemValue("QuoOppReference");
	     vParam[1] = top.MyApp.GetItemValue("QuoCustReference");
	
	     var strResultat = top.MyApp.ExecuteServerScript(30678316346746,vParam);
	     alert("Resultat : " + strResultat);
	}catch(e){
	     alert("Catch : " + e.message);
	}
}