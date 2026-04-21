function _gfctExport()
{
	//debugger;
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   // Création des répertoires
	   ///////////////////////////////////////////////////////////////////////////////////////////
	 
	 
	   var vDBName = top.MyApp.AppSetting.DBName;
	   var vNow = top.MyApp.fctFormatDate(new Date(),"YYYY-MM-DD", "[yyyy]-[MM]-[dd]","YYYY-MM-DD");
	   var vMyRep0 = "c:/web8param";
	   var vMyRep00 = "c:/web8param/NOZ";
	   var vMyRep1 = vMyRep00  + "/" + vDBName + vNow;
	   var vMyRep2 = vMyRep1 + "/Server"
	   var vMyRep3 = vMyRep1 + "/Client"
	   var vMyRep4 = vMyRep1 + "/WebDynaScreen"
	   var vMyRep5 = vMyRep1 + "/Query"
	   var vMyRep6 = vMyRep1 + "/SQL";
	   var vMyRep7 = vMyRep6 + "/XPS";
	   var vMyRep8 = vMyRep6 + "/XFCN";
	 
	   var fso = new ActiveXObject("Scripting.FileSystemObject");
	   if (!fso.FolderExists(vMyRep0) )
	   {
	     fso.CreateFolder(vMyRep0);
	     fso.CreateFolder(vMyRep00);
	     fso.CreateFolder(vMyRep1);
	     fso.CreateFolder(vMyRep2);
	     fso.CreateFolder(vMyRep3);
	     fso.CreateFolder(vMyRep4);
	     fso.CreateFolder(vMyRep5);
	     fso.CreateFolder(vMyRep6);
	     fso.CreateFolder(vMyRep7);
	     fso.CreateFolder(vMyRep8);
	   }
	   else
	   {
	     if (!fso.FolderExists(vMyRep1))
	     {
	       fso.CreateFolder(vMyRep1);
	       fso.CreateFolder(vMyRep2);
	       fso.CreateFolder(vMyRep3);
	       fso.CreateFolder(vMyRep4);
	       fso.CreateFolder(vMyRep5);
	       fso.CreateFolder(vMyRep6);
	       fso.CreateFolder(vMyRep7);
	       fso.CreateFolder(vMyRep8);
	     }
	   }
	   //fso.DeleteFolder(vMyRep, true);     //suppression du répertoire s'il existe. Le "true" force la suppression.
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   //Export des scripts
	   ///////////////////////////////////////////////////////////////////////////////////////////
	    var vQry = "select function_name, function_text, tier_id, nrid from scr0";
	    var vTabMesScripts = [];
	   
	    //vTabMesScripts = top.MyApp._gfctExtReq(vQry);
	   
	    var MyObjXML = top.MyApp.fctGetQryResult( vQry, "true" , 0 , -1 );
	    var arrResult=[]
	    var nFullCount=top.MyApp.GetItemAttributeFromXML( MyObjXML ,"Result","FullCount" )
	    var MyNodes = top.MyApp.GetItemAttributeFromXML( MyObjXML ,"MetaData/*","","","","","","",true)
	    for(var j=0; j<nFullCount;j++)
	    {
	      arrResult[j]=[]
	      for(var i=0; i<MyNodes.length;i++)
	      {
	        arrResult[j][i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "Val", "../id", j+1)
	      }
	    }
	    if (nFullCount == 0) {arrResult[0]=[];arrResult[0][0]=undefined;}
	   vTabMesScripts =  arrResult
	   
	   for(var i=0;i<vTabMesScripts.length;i++)
	   {
	     var vMonChem = ""
	     if(vTabMesScripts[i][2] == 1)
	     {
	       vMonChem = vMyRep3;
	     }
	     else
	     {
	       vMonChem = vMyRep2;
	     }
	     var fso = new ActiveXObject("Scripting.FileSystemObject");
	     var fichier = fso.CreateTextFile(vMonChem + "/" + vTabMesScripts[i][0] + "_" + vTabMesScripts[i][3] + ".js", true);
	     fichier.WriteLine(vTabMesScripts[i][1]);
	     fichier.Close();
	   }
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   //Export des WDS
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   var vQry = "select name, text, nrid from wp0";
	   var vTabMesScripts = [];
	   //vTabMesScripts = top.MyApp._gfctExtReq(vQry);
	   
	    var MyObjXML = top.MyApp.fctGetQryResult( vQry, "true" , 0 , -1 );
	    var arrResult=[]
	    var nFullCount=top.MyApp.GetItemAttributeFromXML( MyObjXML ,"Result","FullCount" )
	    var MyNodes = top.MyApp.GetItemAttributeFromXML( MyObjXML ,"MetaData/*","","","","","","",true)
	    for(var j=0; j<nFullCount;j++)
	    {
	      arrResult[j]=[]
	      for(var i=0; i<MyNodes.length;i++)
	      {
	        arrResult[j][i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "Val", "../id", j+1)
	      }
	    }
	    if (nFullCount == 0) {arrResult[0]=[];arrResult[0][0]=undefined;}
	   vTabMesScripts =  arrResult
	   
	   
	   for(var i=0;i<vTabMesScripts.length;i++)
	   {
	     var fso = new ActiveXObject("Scripting.FileSystemObject");
	     var fichier = fso.CreateTextFile(vMyRep4 + "/" + vTabMesScripts[i][0] + "_" + vTabMesScripts[i][2] + ".js", true);
	     fichier.WriteLine(vTabMesScripts[i][1]);
	     fichier.Close();
	   }
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   //Export des VD
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   var vQry = "select nom, memo, nrid from sq0";
	   var vTabMesScripts = [];
	   //vTabMesScripts = top.MyApp._gfctExtReq(vQry);
	   
	   var MyObjXML = top.MyApp.fctGetQryResult( vQry, "true" , 0 , -1 );
	   var arrResult=[]
	   var nFullCount=top.MyApp.GetItemAttributeFromXML( MyObjXML ,"Result","FullCount" )
	   var MyNodes = top.MyApp.GetItemAttributeFromXML( MyObjXML ,"MetaData/*","","","","","","",true)
	   try
	   {
	     for(var j=0; j<nFullCount;j++)
	     {
	       arrResult[j]=[]
	       for(var i=0; i<MyNodes.length;i++)
	       {
	         arrResult[j][i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "Val", "../id", j+1)
	       }
	     }
	     if (nFullCount == 0) {arrResult[0]=[];arrResult[0][0]=undefined;}
	     vTabMesScripts =  arrResult
	  
	     for(var i=0;i<vTabMesScripts.length;i++)
	     {
	       try
	       {
	         var fso = new ActiveXObject("Scripting.FileSystemObject");
	         var fichier = fso.CreateTextFile(vMyRep5 + "/" + vTabMesScripts[i][0] + "_" + vTabMesScripts[i][2] + ".js", true);
	         fichier.WriteLine(vTabMesScripts[i][1]);
	         fichier.Close();
	       }
	       catch(e){}
	     }
	   }
	   catch(e)
	   {
	     alert("Erreur export des requêtes");
	   }
	 
	 
	   ///////////////////////////////////////////////////////////////////////////////////////////
	   //Export des procédures stockées et fonctions SQL
	   ///////////////////////////////////////////////////////////////////////////////////////////
	 
	    try
	    {
	       //récupère le nom des procédures stockées
	     var arrLesProcs = [];
	     var vReq = "select name from dbo.sysobjects where type = 'P' order by name";
	     arrLesProcs = top.MyApp._gfctExtReq(vReq);
	   
	   
	     //génération des fichiers
	   
	     //export des procédures stockées
	     for(var i=0; i<arrLesProcs.length; i++)
	     {
	       var arrTest = [];
	       var vReq = "select definition from sys.sql_modules where OBJECT_NAME(object_id) = '" + arrLesProcs[i][0] + "'";
	       arrTest = top.MyApp.ExecSql(vReq);
	   
	       var fso = new ActiveXObject("Scripting.FileSystemObject");
	       var fichier = fso.CreateTextFile(vMyRep7 + "/" + arrLesProcs[i][0] + ".txt", true);
	       fichier.WriteLine(arrTest[0][0]);
	       fichier.Close();
	     }
	   }
	   catch(e)
	   {
	     alert("Erreur export des procédures stockées");
	   }
	   
	   try
	   {
	 
	     //récupère le nom des fonctions
	     var arrLesFcns = [];
	     var vReq = "select name from dbo.sysobjects where type = 'FN' or type = 'TF' or type = 'IF' order by name";
	     arrLesFcns = top.MyApp._gfctExtReq(vReq);
	 
	     //export des fonctions SQL
	     for(var i=0; i<arrLesFcns.length; i++)
	     {
	       var arrTest = [];
	       var vReq = "select definition from sys.sql_modules where OBJECT_NAME(object_id) = '" + arrLesFcns[i][0] + "'";
	       arrTest = top.MyApp.ExecSql(vReq);
	       var fso = new ActiveXObject("Scripting.FileSystemObject");
	       var fichier = fso.CreateTextFile(vMyRep8 + "/" + arrLesFcns[i][0] + ".txt", true);
	       fichier.WriteLine(arrTest[0][0]);
	       fichier.Close();
	     }
	   } 
	   catch(e)
	   {
	     alert("Erreur export des fonctions SQL ");
	   }
	   
	 
	   alert("Export terminé dans " + vMyRep0);
		return true;
}