function(pNRID,pTable,pChamp)
{
	if(top.MyApp.CurrentSetting.nChapMode == "Open"){
	 var arrMyArray=[];
	 
	 arrMyArray[0] = pNRID;
	 arrMyArray[1] = pTable; 
	 arrMyArray[2] = pChamp;
	 top.MyApp.OpenDlg('31801313619156', arrMyArray);
	}
}