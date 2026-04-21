function _gfctExtReq(pvRequete)
{
	   var arrResult=[]
	   if(pvRequete.toUpperCase().indexOf('INSERT')!= -1 || pvRequete.toUpperCase().indexOf('UPDATE') != -1 || pvRequete.toUpperCase().indexOf('DELETE') != -1)
	  {
	      arrResult[0]=[];
	      var arrParam=[];
	      arrParam[0] = pvRequete;
	      
	        //appel du script _gsfctExecuteSql
	      arrResult[0][0] = top.MyApp.ExecuteServerScript("30231053360342", arrParam);
	    
	        if( arrResult[0][0].indexOf('ERROR' , 0) != -1) { alert(arrResult[0][0]); return false; }
	     return arrResult;;
	  }
	   var MyObjXML = top.MyApp.fctGetQryResult( pvRequete , "true" , 0 , -1 )
	   var nFullCount=top.MyApp.GetItemAttributeFromXML( MyObjXML ,"Result","FullCount" )
	   var MyNodes = top.MyApp.GetItemAttributeFromXML( MyObjXML ,"MetaData/*","","","","","","",true)
	   for(var j=0; j<nFullCount;j++)
	   {
	     arrResult[j]=[]
	     for(var i=0; i<MyNodes.length;i++)
	     {
	       arrResult[j][i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "Val", "../id", j+1)
	     }
	   }
	   if (nFullCount == 0) {arrResult[0]=[];arrResult[0][0]="";}
	   return arrResult;
}