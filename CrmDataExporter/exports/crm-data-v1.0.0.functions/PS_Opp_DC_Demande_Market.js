function PS_Opp_DC_Demande_Market()
{
	//PS_Opp_DC_Demande_Market
	   //alert('entre ==> PS_Opp_DC_Demande_Market');
	try{
	    var vProfil = top.MyApp.UserSetting.User.ProfileInitials;
	    //récupération du NRID de la ligne sélectionnée.
	    var strNRID= g_eventSrcElement.parentElement.NRID;
	    //alert(strNRID);
	    var arrMyArray=[];
	    arrMyArray[0] = strNRID;
	    /*arrMyArray[1] = pTable; 
	    arrMyArray[2] = pChamp;
	    arrMyArray[3] = pChampModif;*/
	    top.MyApp.OpenDlg('39229677509144', arrMyArray, top, undefined, undefined, undefined, undefined, function () {}); //WDS_Reponse_Affaire_StandBy
	}catch(e){
	    alert("Opp DC Demande info - " + e.message);
	}
		return true;
}