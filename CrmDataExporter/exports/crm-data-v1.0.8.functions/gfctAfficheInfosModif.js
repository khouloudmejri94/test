function(pNRID,pTable,pChamp,pChampModif)
{
	if(top.MyApp.CurrentSetting.nChapMode == "Open"){
	 var arrMyArray=[];
	 
	 arrMyArray[0] = pNRID;
	 arrMyArray[1] = pTable; 
	 arrMyArray[2] = pChamp;
	 arrMyArray[3] = pChampModif;
	 //top.MyApp.OpenDlg('32211766606238', arrMyArray);
	top.MyApp.OpenDlg('32211766606238', arrMyArray, top, undefined, undefined, undefined, undefined, function () {}); //WDS_Affiche_Infos_Modif
	}
}