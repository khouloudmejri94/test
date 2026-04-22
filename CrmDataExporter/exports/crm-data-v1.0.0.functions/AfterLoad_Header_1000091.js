function AfterLoad_Header_1000091()
{
	// moved in AfterLoad_FP_30518615202848
	
	 var bDossierJuridique = top.MyApp.GetItemValue("ReqExtDossGereJuri");
	
	if(bDossierJuridique == 1)
	{
	    //var vPathVirtualDir = "../../VirtualFile/" + top.MyApp.AppSetting.DBName;
	    //var vAdrImgFlagJur = vPathVirtualDir+"/Img/flag_litige_juridique.gif"
	    //var vAdrImgFlagJur = "http://"+location.host+top.MyApp.AppSetting.RootPath+"__Images/flag_juridique.png"
	    top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView1.fraData.document.getElementById("tblMain"), 9, 5, 2, 2,  '<IMG alt="Dossier traité par le juridique" src="https://'+location.host+top.MyApp.AppSetting.RootPath+'__Images/flag_juridique.png" width="120px" height="40px" />', true);
	}
		var ObjStatus = top.MyApp.FindItem("ReqStatus");
	
	
	
	if(top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.UserSetting.User.ProfileInitials !="LTG" && top.MyApp.UserSetting.User.ProfileInitials !="ADMT" && top.MyApp.UserSetting.User.ProfileInitials !="ADMF" )
	{
	    if(ObjStatus)
	    {
	        ObjStatus.disabled = true;
	        ObjStatus.className = "disable";
	    }
	}
	
	
	if (ObjStatus && ObjStatus.value == "Clos")
	{
	    //if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") != "true")
	    //{
	        if(top.MyApp.CurrentSetting.bConsultMode == true)
	        {
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	        }
	        else
	        {
	            top.MyApp.fraMenuBar.Execute("R_Consult");
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	        }
	    //}
	
	}else{
	     top.MyApp.fraMenuBar.Execute("R_Edit");
	}
		try{
	     var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	     var ObjStatus = top.MyApp.FindItem("ReqStatus");
	
	     if(top.MyApp.CurrentSetting.nChapMode == "Open" && (vProfiluser == 'LTG' || vProfiluser == 'ADMT' || vProfiluser == 'ADMF') && ObjStatus.value == 'Clos'){
	          top.MyApp.FindItem("ReqStatus").style.width = '50%';
	          var Cell = top.MyApp.FindItem("ReqStatus").parentNode;
	          Cell.innerHTML = Cell.innerHTML + '<BUTTON class="ShtsButton" style="width:50%;" onclick="top.MyApp.PS_Req_Decloturer();" id="ReqDecStatusBtn" name="ReqDecStatusBtn">Réouvrir</BUTTON>';
	     }
	
	}catch(e){
	     alert(e.message);
	}
		/////17.09.2015 CBA
	if(top.MyApp.CurrentSetting.nChapMode == "Open")
	{
	     
	     var vNRID = top.MyApp.GetItemValue("ReqCpyNRID"); 
	     var resXml = top.MyApp.ExecuteServerScript(32481013708136,[vNRID]);
	     var MyXml = top.MyApp.InitXmlCli(resXml);
	     var vReqExtMailComm = top.MyApp.GetItemAttributeFromXML(MyXml,"CpyEmailAddress","Val");
	     if(vReqExtMailComm !="")
	     {
	          top.CurrentSetting.Catalog.ReqExtMailComm.Ed = 1;
	          top.MyApp.SetItemValue("ReqExtMailComm", vReqExtMailComm );
	          top.CurrentSetting.Catalog.ReqExtMailComm.Ed = 0;
	          
	          var vMailCompta = top.MyApp.GetItemValue("ReqExtMailcompta");
	          var vMailLiti = top.MyApp.GetItemValue("ReqExtMailLiti");  
	          var vString = "";
	         
	          if(vMailCompta =="")
	          {
	               if(vMailLiti =="")
	               {
	                   vString = vString.concat(vReqExtMailComm);           
	               }
	              else
	               {
	                  vString = vMailLiti.concat(";");
	                  vString = vString.concat(vReqExtMailComm);
	               }
	     
	          }
	          else
	          {
	              vString = vMailCompta.concat(";");
	              if(vMailLiti =="")
	               {
	                  vString = vString.concat(vReqExtMailComm);          
	               }
	              else
	               {
	                  vString = vString.concat(vMailLiti );
	                  vString = vString.concat(";");
	                  vString = vString.concat(vReqExtMailComm);  
	               }
	          }
	         // alert(vString);
	          
	             top.CurrentSetting.Catalog.ReqExtEmail.Ed = 1;
	             top.MyApp.SetItemValue("ReqExtEmail", vString);
	             top.CurrentSetting.Catalog.ReqExtEmail.Ed = -1; 
	               
	         //   top.MyApp.fraMenuBar.Execute("R_Save");
	          
	     }
	
	    
	}
	/////17.09.2015 CBA
}