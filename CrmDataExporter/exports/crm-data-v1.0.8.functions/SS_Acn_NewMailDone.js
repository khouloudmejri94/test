function()
{
	//SS_Acn_NewMailDone
	try {
	 if (Session["ResFunction"] != "Back Office" && Session["ResFunction"] != "Administrateur" && CurrentUserName != "SRM Web Service") {
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	    var vSQL = "select e_mail as addremail , xPseudo as xPseudo, xskype as xskype, xAdresse as xAdresse, xpositions as xpositions, tel_1 as tel_1 from sysadm.am0 where titulaire = ('" + CurrentUserName + "')";
	    var vSQL2 = "select e_mail as Email  from sysadm.sp0 where pe0_nrid = " + CurrentRecord["AcnPerNRID"] ;
	     var MyResults = oQryObj.ExecuteSql(vSQL);
	     var MyResults2 = oQryObj2.ExecuteSql(vSQL2);
	     var oXmlRes = InitXml(MyResults);
	     var oXmlRes2 = InitXml(MyResults2);
	     var oRows = FindItem("Flds", oXmlRes, true);
	     var oRows2 = FindItem("Flds", oXmlRes2, true);
	     var NbRows = oRows.Count;
	     var NbRows2 = oRows2.Count;
	     //////////Selligent.Library.Monitor.Tracer.Write('Count email owner = ' + NbRows, false);
	     if (NbRows > 0 && NbRows2 > 0) {
	      //Recuperer adresse mail titulaire founisseur pour le notifier du stock
	      var vEmailOwner = GetItemValue("addremail", oRows[0]);
	      var xPseudo = GetItemValue("xPseudo", oRows[0]);
	      var vEmailContact = GetItemValue("Email", oRows2[0]);
	    var vTitle = "Let’s connect about a future collaboration - Ozeol";
	    var vBody = "My name is "+ xPseudo +", from Ozeol.<br><br>";
	        vBody = vBody + "I recently tried to contact you by phone but was unable to reach you.<br><br>";
	        vBody = vBody + "<strong>Ozeol</strong> is a leading international company specializing in the purchase and resale of overstock products. With over 14 years of experience, we collaborate with more than 300 stores across France.<br><br>";
	        vBody = vBody + "We are currently looking for new suppliers to expand our sourcing network and believe that your company could be a great fit.<br><br>";
	        vBody = vBody + "If you have excess stock, discontinued items, end-of-season collections, or unsold inventory, we would be happy to review your offers and discuss a potential collaboration.<br><br>";
	        vBody = vBody + "Please feel free to share your available stock list, including quantities, prices, and product details. Our purchasing team will promptly evaluate your proposal and get back to you.<br><br>";
	        vBody = vBody + "If you prefer to schedule a call or a virtual meeting, I would be happy to arrange a time that works best for you.<br><br>";
	        vBody = vBody + "Looking forward to your reply.<br><br>Best regards,<br>";
	        vBody = vBody + "<strong>"+ xPseudo +"</strong><br>Purchasing Department<br><a href=" + "https://www.ozeol.com"+ "><strong>www.ozeol.com</strong></a><br>";
	        var vSender = vEmailOwner.substr((vEmailOwner.length - 9), 9);
	
	
	      var vResult = App_SS_EnvoiMail(vEmailOwner, vEmailContact ,vEmailOwner , vTitle, vBody,vSender);
	     }
	     if (vResult == true || vResult == "mail envoyé") {
	        var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	        MyAcnObj.New();
	        var mySelectionRow = new SelectionRow();
	        mySelectionRow.Fields["AcnStatus"] = "FAIT";
	        mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	        mySelectionRow.Fields["AcnNature"] = "MAIL";
	        mySelectionRow.Fields["AcnType"] = "PRESENTATION";
	        mySelectionRow.Fields["AcnObject"] = "PROSPECT";
	        mySelectionRow.Fields["AcnSubject"] = "Selligent Auto Presentation";
	
	
	        mySelectionRow.Fields["AcnCpyName"] = CurrentRecord["AcnCpyName"];
	        mySelectionRow.Fields["AcnCpyNRID"] = CurrentRecord["AcnCpyNRID"];
	        mySelectionRow.Fields["AcnPerName"] = CurrentRecord["AcnPerName"];
	        mySelectionRow.Fields["AcnPerNRID"] = CurrentRecord["AcnPerNRID"];
	        mySelectionRow.Fields["AcnPriority"] = CurrentRecord["AcnPriority"];
	
	
	        // SC ADD:
	        var date = new Date();
	        date.setDate(date.getDate());
	        var dayS = date.getDate();
	        var monthS = date.getMonth() + 1;
	        var yearS = date.getFullYear();
	        var dateRs = new DateTime(yearS, monthS, dayS);
	        mySelectionRow.Fields["AcnStartDate"] = dateRs;
	
	
	
	        mySelectionRow.Fields["AcnExtAcheteur"] = CurrentRecord["AcnExtAcheteur"];
	        mySelectionRow.Fields["AcnExtEquipeAch"] = CurrentRecord["AcnExtEquipeAch"];
	        mySelectionRow.Fields["AcnExtManager"] = CurrentRecord["AcnExtManager"];
	        mySelectionRow.Fields["AcnExtRelanceAuto"] = 0;
	
	        MyAcnObj.SetAndSave(mySelectionRow);
	        var myxml = MyAcnObj.GetXml("AllFields");
	        var MyXmlDocument = InitXml(myxml);
	        var intAcnNRID = GetItemValue("AcnNRID", MyXmlDocument);
	        delete MyAcnObj;
	
	
	        CurrentRecord["AcnAcnSubject"] = "";
	        CurrentRecord["AcnAcnNRID"] = intAcnNRID;
	
	
	            } else {
	
	                throw "Check the e-mail please! ";
	                return false;
	
	            }  
	
	
	        delete oQryObj;
	        oQryObj.Dispose();
	        FreeSelligentObject(oQryObj);
	        delete oQryObj2;
	        oQryObj2.Dispose();
	        FreeSelligentObject(oQryObj2);
	 }
	} catch (e) {
	 delete MyAcnObj;
	 throw " Erreur SS_Acn_NewMailDone : " + e.message;
	}
}