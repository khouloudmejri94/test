function()
{
	top.MyApp.Custom_DemandeDerogBtn = false;
	top.MyApp.SetItem("QuoExtAppelDerog", "style.visibility", 'Hidden');
	top.MyApp.SetItem("QuoExtAppelDerog", "parentElement.style.visibility", "hidden");
	
	top.MyApp.SetItem("QuoExtDemDerogMdp", "style.visibility", 'Hidden');
	top.MyApp.SetItem("QuoExtDemDerogMdp", "parentElement.style.visibility", "hidden");
		//Bouton test rentabilité SAP
	try {
	    var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	    var vInitials = top.MyApp.UserSetting.User.Initials;
	    var vUserName = top.MyApp.UserSetting.User.Name;
	       var vFunction = top.MyApp.UserSetting.User.Function;
	    var vItemRent = top.MyApp.FindItem("Label38450277638366");
	   
	    if (vItemRent) {
	     vItemRent.innerHTML = "<a id='Label38450277638366' ><img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Quo/Profit_Check3.png' title='Check profit' height=25 width=50></div><div style='text-align:right;' width=50 height=50></a> ";
	   
	     if (vProfiluser == 'ADMT' || vProfiluser == 'MNG_ACH_OPR' || vFunction == 'Directeur support') {
	      vItemRent.onclick = function () {
	       PS_Quo_CheckRentable();
	       //alert('je suis ' + vInitials);
	      }
	     }
	    }
	   } catch (e) {
	    alert("AfterLoad Dérogation - Test Rentabilité : " + e.message);
	   }
	   //Bouton test rentabilité SAP
		PS_Quo_Derog_Status();
	var typeHnd = top.MyApp.FindItem("QuoExtTypeDerog", top.MyData_View);
	if (typeHnd) {
	 top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Quo_Derog_Status);
	 top.MyApp.fctAddEvent(typeHnd, "change", PS_Quo_Derog_Status);
	}
}