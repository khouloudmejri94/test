function Selligent_PerNameMandatory()
{ /* Selligent predefined script */
 var strValue = top.MyApp.GetItemValue("PerName",top.MyData_View);
 if((!strValue) || (strValue.search(/\S/)==-1))
 {
  var objItem = top.MyApp.FindItem("PerName",top.MyData_View);
  if(objItem)
  {
   objItem.focus();
  }
  alert(top.MyApp.arrTranslations["'PerName' field is mandatory"]);
  return false;
 }
 return true;
}