function PS_Quo_VD_Echantillon_AfterPop()
{
	top.fraData_View.ifrView2.fraData.fctIsCellEditable = function fctIsCellEditable(p_objCell,p_strCellName,p_objSrcElement)
	{
	  if(p_strCellName == 'ExtEchntlln1StatusEchantillon' && p_objSrcElement.innerText != ' ' && p_objSrcElement.innerText != '') {return false;}
	  if((p_objCell.Ed!=1)||(((p_objCell.EdGrpDataToInsert==1)&&(p_objSrcElement.parentNode.className.indexOf("ToInsert")<0))||((top.MyApp.AppSetting.NotEdit[p_strCellName]!=null)))){return false;}else{return true;}
	}
}