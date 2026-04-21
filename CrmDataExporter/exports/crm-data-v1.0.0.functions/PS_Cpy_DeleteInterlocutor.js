function PS_Cpy_DeleteInterlocutor()
{
	try {
	
	 top.MyApp.OpenDlg("UserPrompt", ["Please insert the name of the interlocutor to delete :", ""]);
	 if (top.MyApp.AppSetting.dlgReturn[0]) {
	  vInter = top.MyApp.AppSetting.dlgReturn[0];
	 } else {
	  vInter = "Aucune saisie";
	 }
	 var p_so0nrid = top.MyApp.GetItemValue("CpyNRID");
	 //top.MyApp.OpenDlg("Alert", ["Attention","voici le NRID de la siciete: "+p_so0nrid+"."]);
	 top.MyApp.OpenDlg("Alert", ["Attention", "The name to be deleted is   : " + vInter + "."]);
	 var strSQLRes = "delete from sysadm.xso4 where Acht = '" + vInter + "' and so0_nrid = '" + p_so0nrid + "' ";
	 var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	 if (arrRes) {
	 }
	 top.MyApp.OpenDlg("Alert", ["Attention", "Interlocutor delete success !! "]);
	 top.MyApp.fraMenuBar.Execute("T_Refresh");
	
	} catch (e) {
	 alert("PS HAS Delete Interlocutor " + e.message);
	}
}