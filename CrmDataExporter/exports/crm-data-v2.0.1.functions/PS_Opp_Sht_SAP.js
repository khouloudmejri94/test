function PS_Opp_Sht_SAP()
{
	    try
	    {
	      var fso = new ActiveXObject("Scripting.FileSystemObject");
	      var strChemain = "c:\\temp\\"+top.MyApp.UserSetting.User.Initials +"_SAP.sap" ;
	      var fichier = fso.CreateTextFile(strChemain , true);
	      var strUser = "Name="+top.MyApp.CustomSetting.UserSAP ;
	      var strCmd  = "Command=ZOF11_DEMO2 Title=TEST DEMO Type=Transaction"; 
	      fichier.WriteLine("[System]");
	      fichier.WriteLine("Name=DEV");
	      fichier.WriteLine("Client=300");
	      fichier.WriteLine("[User]");
	      fichier.WriteLine("Name=DEV01");
	      fichier.WriteLine("Language=F");
	      fichier.WriteLine("[Function]");
	      fichier.WriteLine("Command=ZOF11_DEMO2 Title=TEST DEMO Type=Transaction");
	      fichier.Close();
	      top.MyApp.CustomSetting.ws = new ActiveXObject( "WScript.Shell");
	      top.MyApp.CustomSetting.ws.run (strChemain );
	    }
	    catch(e) { }
}