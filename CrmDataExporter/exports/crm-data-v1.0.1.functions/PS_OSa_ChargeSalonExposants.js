function PS_OSa_ChargeSalonExposants()
{
	 /***************************************************************************************************/
	 // Société                             : MASAO
	 // Nom script                          : ChargeSalonExposants
	 // Infos Paramètres                    : 
	 // Auteur                              : LMR
	 // Chapitre concerné                   : OSa
	 // Date de création                    : 04/04/2013
	 // Modifié par                         : RLM
	 // Date de modification                : 29/11/2013
	 // Version Selligent                   : 
	 // Commentaires                        : Chargement fichier Excel des exposants + lien avec so0
	 /***************************************************************************************************/
	   
		try{ 
	if(top.MyApp.CurrentSetting.nChapMode !="Reset"){
	 var vType = top.MyApp.GetItemValue("OSaExtType");
	
	 if(vType == "Edition"){
	
	 top.MyApp.OpenDlg("Browse", ["C:\\"]);
	 var chemin = top.MyApp.AppSetting.dlgReturn[0];
	 var vSalon = top.MyApp.GetItemValue("OSaNRID");
	    
	  if(chemin)
	  {
	   var nrid = top.MyApp.GetItemValue("OSaNRID");
	    var parts = chemin.split(".");
	    var extention = parts[(parts.length-1)];
	    var extention = extention.toUpperCase();
	    if( extention == undefined)
	    {
	      return false;
	    }
	
	    if( extention !="XLS" &&  extention !="XLSX")
	    {
	      top.MyApp.OpenDlg("Alert", ["Fichier", "Le fichier des exposants doit être au format Excel."]);
	      return false;
	    }
	
	
	     var objExcel = new ActiveXObject("Excel.Application");
	     var objBook = objExcel.Workbooks.Open(chemin);
	     var objSheet=objBook.Worksheets.Item(1); 
	     var arrVal = [];
	     for (var i=2;i>0;i++){
	        arrVal[i-2] = [];
	        for (var j=1;j<10;j++){
	         if(objSheet.Cells(i,j).Value){ 
	           arrVal[i-2][j-1] = objSheet.Cells(i,j).Value;
	
	         }else{
	          arrVal[i-2][j-1] ="";
	         }
	        }
	        if (!objSheet.Cells(i+1,1).Value) i = -1; 
	     }
	
	   if(arrVal.length != 0){
	    top.MyApp.OpenDlg("Alert", ["Fichier", "Vous allez charger un fichier de "+ arrVal.length +" ligne(s) et remplacer les lignes déja existantes."]);
	    var vSQL = "delete from sysadm.xsalon_exposants where cosa0_nrid ='"+vSalon+"' ";
	    var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vSQL],'','',true);
	   }
	 
	     var strSql ="";
	     for (var i=0;i<arrVal.length;i++)
	     {
	          if(strSql != '') strSql+="<_cut_/>";
	          strSql += "INSERT INTO sysadm.xsalon_exposants";
	          strSql +="(cosa0_nrid, exposant, societe, xpays, xhal, xAllSt, xlibre, xprio, xacht, xNozBout)"
	          strSql +=" VALUES ("+vSalon+" ,'"+arrVal[i][0]+"','"+arrVal[i][1]+"','"+arrVal[i][2]+"','"+arrVal[i][3]+"','"+arrVal[i][4]+"','"+arrVal[i][5]+"','"+arrVal[i][6]+"','"+arrVal[i][7]+"','"+arrVal[i][8]+"')";
	     }
	   
	     var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSql],'','',true);
	     top.MyApp.OpenView("OSa" , "DV" , 30561461545740 , "ifrView3" , true , "");
	     //Liberation de la mémoire
	     objExcel.application.quit();
	     objExcel.quit();
	     delete objExcel;
	     delete objBook;
	     delete objSheet;
	
	
	  }else{
	   top.MyApp.OpenDlg("Alert", ["Fichier", "Attention, le chemin du fichier n'est pas correct."]);
	   return false;  
	  }
	  }else{
	   top.MyApp.OpenDlg("Alert", ["Ajout Exposants", "Attention, vous devez etre sur une édition pour ajouter des exposants."]);
	   return false;
	  }
	 
	 }
	
	}catch(e){
	     alert(e.message);
	     objExcel.application.quit();
	     objExcel.quit();
	     delete objExcel;
	     delete objBook;
	     delete objSheet;
	}
		return true;
}