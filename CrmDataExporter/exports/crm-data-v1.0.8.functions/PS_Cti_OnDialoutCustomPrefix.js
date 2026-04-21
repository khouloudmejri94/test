function()
{
	//Auteur : Pierre-Louis EGAUD
		var uCti = top.MyApp.UserSetting['Cti'];
	var prefix = uCti["DialoutCustomPrefixVal"];
	var retval = false;
	//si le prefix est null et que la variable top.MyApp.CustomSetting.AcnExtIndicatif est différent de "", alors c'est l'appel provient d'une action, on prend le préfixe de AcnExtIndicatif
	if (prefix == "0033" && top.MyApp.CustomSetting.AcnExtIndicatif != "") 
	{
	  uCti["DialoutCustomPrefixVal"] = "0";
	  top.MyApp.CustomSetting.AcnExtIndicatif = "0033";
	  retval = true;
	
	}
	
	
	return retval;
}