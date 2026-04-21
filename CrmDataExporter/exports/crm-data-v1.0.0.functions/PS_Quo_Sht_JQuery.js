function __PS_Quo_Sht_JQuery()
{
	function fonction1(callback) {
	  top.MyApp.$("body").append('<span id=WaitSpanId style="position:absolute; top:25%; width:100%; text-align:center;"><div id=WaitDivId ></div></span>');
	  top.MyApp.$("#WaitDivId").dialog({
	      autoOpen: true,
	      resizable: false,
	      modal: true,
	      width: 190,
	      height: 160,
	      create: function(event, ui) {
	          //var imageUrl = "http://www.freakyjolly.com/wp-content/uploads/2019/04/am-spinner.gif";
	          top.MyApp.$("#WaitDivId").prev(".ui-dialog-titlebar").hide();
	          //top.MyApp.$("#WaitDivId").css("background", "transparent url('" + imageUrl + "') no-repeat center center");
	          top.MyApp.$("#WaitDivId").css("background", "url('" + top.MyApp.AppSetting.RootPath + '__Images/ajax-loaderCustDlg.gif' + "') no-repeat center center");
	      },
	      open: function(event, ui) {
	          setTimeout(function() {
	              top.MyApp.$("#WaitDivId").dialog('close');
	              top.MyApp.$("#WaitDivId").remove();
	              callback();
	          }, 7000);
	      }
	  });
	}
	
	function fonction2() {
	    //alert("Message confirmation enregistrement !");
	    top.MyApp.fraMenuBar.Execute("T_Refresh");
	}
	fonction1(fonction2);
}