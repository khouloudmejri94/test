function()
{
	
	
	  var vCp_Aff = CurrentRecord["OppExtChefproduit"] ;
	   if(vCp_Aff!="")
	   {
	  CurrentRecord["OppExtEquipeCp"] =  Session[vCp_Aff];
	   }
	   
	   
	   var vAcheteur_Aff = CurrentRecord["OppExtAcheteur"] ;
	   if(vAcheteur_Aff !="")
	   {
	  CurrentRecord["OppExtEquipeAch"] =  Session[vAcheteur_Aff];
	   }
		return true;
}