function Selligent_CpyNameMandatory()
{ /* Selligent predefined script */
 var strValue = top.MyApp.GetItemValue("CpyName",top.MyData_View);
 if((!strValue) || (strValue.search(/\S/)==-1))
 {
  var objItem = top.MyApp.FindItem("CpyName",top.MyData_View);
  if(objItem)
  {
   objItem.focus();
  }
  alert(top.MyApp.arrTranslations["'Company' field is mandatory"]);
  return false;
 }
 return true;
}