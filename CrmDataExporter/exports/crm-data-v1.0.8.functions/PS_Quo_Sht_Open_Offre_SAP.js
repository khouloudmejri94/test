function(p_NumOffre )
{
	try
	{
	                          var fso = new ActiveXObject("Scripting.FileSystemObject");
	       
	                          //Vérification de l'existance de S:/
	                          if ( !fso.FolderExists( "S:/" ) == true )
	                          {
	                              var strChemain = "c:\\temp\\Offre_"+top.MyApp.UserSetting.User.Initials +"_SAP.sap" ;                         
	                              var rep = "c:\\temp\\" ;
	                          }
	                          else
	                          {
	                              var strChemain = "s:\\tmp\\Offre_"+top.MyApp.UserSetting.User.Initials +"_SAP.sap" ;
	                              var rep = "s:\\tmp\\" ;   
	                          }
	
	                          if ( !fso.FolderExists(rep) == true )
	                          {
	                              fso.CreateFolder(rep);
	                          }
	
	                          var fichier = fso.CreateTextFile(strChemain , true);
	                          var strUser = top.MyApp.CustomSetting.UserSAP ;
	                          if(!strUser) strUser  ="DEV01";
	                          fichier.WriteLine("[System]");
	                          fichier.WriteLine("Name=PRD");
	                          fichier.WriteLine("Client=300");
	                          fichier.WriteLine("Description="+top.MyApp.CustomSetting.tabGlobalVar["SAP_BDD"]);
	                          fichier.WriteLine("[User]");
	                          fichier.WriteLine("Name="+strUser);
	                          fichier.WriteLine("Language=FR");
	                          fichier.WriteLine("[Function]");
	                          fichier.WriteLine("Command=*zof11n_crm zenoffre-zzangnr="+p_NumOffre +";DYNP_OKCODE=/0");
	                          fichier.WriteLine("Title=SAP");                         
	                          fichier.WriteLine("[Configuration]");         
	                          fichier.WriteLine("GuiSize=Maximized");         
	                          fichier.WriteLine("[Options]"); 
	                          fichier.WriteLine("Reuse=1");
	                          fichier.Close();
	                          top.MyApp.CustomSetting.ws = new ActiveXObject("WScript.Shell");
	                          top.MyApp.CustomSetting.ws.run(strChemain);
	}
	catch(e)
	{
	     alert(e.message);
	}
}