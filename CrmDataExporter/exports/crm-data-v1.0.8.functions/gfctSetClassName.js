function(pvLN,pvType)
{
	/************************************************************************************************************************************/
	// Société                             : MASAO
	// Nom script                          : _gfctSetClassName 
	// Infos Paramètres                    : pvLN   -->   nom logique du champ
	//                                       pvType -->   'D' pour Disabled, 'M' pour Mandatory et 'B' pour Blank 
	 // Auteur                              : KEL                                                  
	// Chapitre concerné                   : Sell
	// Date de création                    : 02/08/2011
	// Modifié par                         :                                                   
	// Date de modification                :  
	 // Commentaires                        : Modifie le className d'un champ pour modifier sa couleur (si obligatoire, inerte ou libre)
	//                                       Utilise les Class des Skins (ne change que l'aspect graphique du champs)
	// Règles de gestion                   : 
	 /************************************************************************************************************************************/
		 var vExistClass=top.MyApp.GetItemAttribute(pvLN,'className');
	    
	    // Disabled
	    if ( pvType == 'D' ) 
	    {
	      vExistClass=vExistClass+'; disable' ;
	      if(top.MyApp.GetItemAttribute(pvLN ,"ControlType",top.MyData_View) != 5 ) top.MyApp.SetItemAttribute(pvLN ,"className",vExistClass ,top.MyData_View);
	      if(top.MyApp.FindItem(pvLN , top.MyData_View )) 
	        {
	         //top.MyApp.FindItem(pvLN , top.MyData_View ).disabled= "disabled"  ;
	         top.MyApp.FindItem(pvLN , top.MyData_View ).readOnly= true;
	  
	        }
	    }
	    // Anulation du Disabled
	    if ( pvType == 'E' ) 
	    {
	      vExistClass=vExistClass.replace('; disable','') ;
	      if(top.MyApp.GetItemAttribute(pvLN ,"ControlType",top.MyData_View) != 5 )  top.MyApp.SetItemAttribute(pvLN ,"className",vExistClass ,top.MyData_View);
	      if(top.MyApp.FindItem(pvLN , top.MyData_View )) 
	        {
	         //top.MyApp.FindItem(pvLN , top.MyData_View ).disabled= ""  ;
	         top.MyApp.FindItem(pvLN , top.MyData_View ).readOnly= false;
	        }
	    }
	    // Hidden
	    if ( pvType == 'H' ) 
	    {
	      top.MyApp.SetItem(pvLN ,"parentElement.style.visibility","hidden");
	      top.MyApp.SetItem(pvLN ,"parentElement.previousSibling.style.visibility","hidden");
	   
	    }
	    // Visible
	    if ( pvType == 'V' ) 
	    {
	      top.MyApp.SetItem(pvLN ,"parentElement.style.visibility","");
	      top.MyApp.SetItem(pvLN ,"parentElement.previousSibling.style.visibility","");
	    }
	   
	    if ( pvType == "UM" ) 
	    {
	          eval("top.MyApp.AppSetting."+  top.MyApp.AppSetting.CurrentData_View     + ".Catalog."+pvLN+".Mn = -1");
	          var itemFld = top.MyApp.FindItem(pvLN,  top.MyData_View  );
	          var itemParentFld;
	          var itemNext;
	          var itemNextNext;
	          var itmLabel;
	          var bItemNext;
	          var bItemNextNext;
	          var bItemLabel;
	          if(itemFld) {
	            itemParentFld = itemFld.parentElement;
	            itemParentFld.className = itemParentFld.className.replace(/\bMandatoryLabel\b/g, '');
	            itemNext = top.MyApp.$(itemFld).next()[0]; 
	            //cellule parente et libellé de la celulle précedente
	            if(itemParentFld && top.MyApp.$(itemParentFld).prev()) {
	              itmLabel = top.MyApp.$(itemParentFld).prev().children(0)[0];
	              bItemLabel = (itmLabel && itmLabel.nodeType == 1 && itmLabel.tagName.toUpperCase() == "SPAN" && itmLabel.className.indexOf("MandatoryLabel") != -1);
	              if(bItemLabel) itmLabel.className = itmLabel.className.replace(/\bMandatoryLabel\b/g, '');
	            }
	            //boutons ..., fleche
	            if(itemNext && itemNext.nodeType == 1) {
	              itemNextNext = top.MyApp.$(itemNext).next()[0];
	              bItemNext = ((itemNext.className.indexOf("selectLst") != -1 || itemNext.className.indexOf("inputBtn") != -1) && itemNext.className.indexOf("Mandatory") != -1);
	              bItemNextNext = (itemNextNext && itemNextNext.nodeType == 1 && itemNextNext.className.indexOf("ownerBtn") != -1 && itemNextNext.className.indexOf("Mandatory") != -1);
	              if(bItemNext) itemNext.className = itemNext.className.replace(/\bMandatory\b/g, '');
	              if(bItemNextNext) itemNextNext.className = itemNextNext.className.replace(/\bMandatory\b/g, '');
	            }
	      
	            //le champ
	            itemFld.className = itemFld.className.replace(/\bMandatory\b/g, '');
	          }
	     }
	    if ( pvType == 'NM' ) 
	    {
	          var itemFld = top.MyApp.FindItem(pvLN, top.MyData_View );
	          eval("top.MyApp.AppSetting."+  top.MyApp.AppSetting.CurrentData_View     + ".Catalog."+pvLN+".Mn = 1");
	          var itemParentFld;
	          var itemNext;
	          var itemNextNext;
	          var itmLabel;
	          var bItemNext;
	          var bItemNextNext;
	          var bItemLabel;
	          if(itemFld) {
	            itemParentFld = itemFld.parentElement;
	            itemNext = top.MyApp.$(itemFld).next()[0];
	            bItemParentMandatory = (itemParentFld && itemParentFld.className.indexOf("MandatoryLabel") == -1);
	            if(bItemParentMandatory) itemParentFld.className += " MandatoryLabel";
	            //cellule parente et libellé de la celulle précedente
	            if(itemParentFld && top.MyApp.$(itemParentFld).prev()) {
	              itmLabel = top.MyApp.$(itemParentFld).prev().children(0)[0];
	              bItemLabel = (itmLabel && itmLabel.nodeType == 1 && itmLabel.tagName.toUpperCase() == "SPAN" && itmLabel.className.indexOf("MandatoryLabel") == -1);
	              if(bItemLabel) itmLabel.className += " MandatoryLabel";
	            }
	            //boutons ..., fleche
	            if(itemNext && itemNext.nodeType == 1) {
	              itemNextNext = top.MyApp.$(itemNext).next()[0];
	              bItemNext = ((itemNext.className.indexOf("selectLst") != -1 || itemNext.className.indexOf("inputBtn") != -1) && itemNext.className.indexOf("Mandatory") == -1);
	              bItemNextNext = (itemNextNext && itemNextNext.nodeType == 1 && itemNextNext.className.indexOf("ownerBtn") != -1 && itemNextNext.className.indexOf("Mandatory") == -1);
	              if(bItemNext) itemNext.className += ' Mandatory';
	              if(bItemNextNext) itemNextNext.className += ' Mandatory';
	            }
	            //le champ
	            if(itemFld.className.indexOf("Mandatory") == -1) {
	              itemFld.className = itemFld.className + ' Mandatory';
	            }
	          }
	 
	 
	
	    }
	 
	
	    // Mandatory
	    if ( pvType == 'M' ) 
	    {
	      vExistClass=vExistClass+'; Mandatory' ;
	      top.MyApp.SetItemAttribute(pvLN ,"className",vExistClass ,top.MyData_View);
	    }
	    // Blank
	    if (( pvType == 'B' ) && (vExistClass != undefined ))
	    {
	alert(vExistClass);
	// FSC à corriger      var tabExistClass = vExistClass.split(';')
	      var tabExistClass = vExistClass.split(';')
	      var tabNewClass = [];
	      var j=0;
	    
	      for (var i=0; i<tabExistClass.length; i++)
	      {
	        if (tabExistClass[i].replace(/ /g, '').toUpperCase() != "DISABLE" && tabExistClass[i].replace(/ /g, '').toUpperCase() != "MANDATORY")
	        {
	          tabNewClass[j++] = tabExistClass[i];
	        }
	      }
	    
	      vExistClass = tabNewClass.join(';');
	      top.MyApp.SetItemAttribute(pvLN ,"className",vExistClass ,top.MyData_View);
	    }
		return true;
}