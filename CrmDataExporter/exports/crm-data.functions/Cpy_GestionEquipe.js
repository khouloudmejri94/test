function __Cpy_GestionEquipe()
{
	var vCp_F = CurrentRecord["CpyExtCp"] ;
	if(vCp_F!="")
	{
	CurrentRecord["CpyExtEquipeCp"] =  Session[vCp_F];
	}
	
	
	var vAcheteur_F = CurrentRecord["CpyOwner"] ;
	if(vAcheteur_F!="")
	{
	CurrentRecord["CpyExtEquipeAch"] =  Session[vAcheteur_F];
	}
	  return true;
}