function(data)
{
	//showNicePopup(data) 
	
	    var overlay = document.createElement("div");
	    overlay.style.cssText = `
	        position:fixed;
	        top:0;left:0;
	        width:100%;height:100%;
	        background:rgba(0,0,0,0.5);
	        display:flex;
	        align-items:center;
	        justify-content:center;
	        z-index:9999;
	    `;
	
	    var box = document.createElement("div");
	    var isError = data.status === "KO";
	
	    box.style.cssText = `
	        background:#fff;
	        padding:25px;
	        border-radius:12px;
	        width:420px;
	        font-family:Poppins, Arial;
	        box-shadow:0 10px 30px rgba(0,0,0,0.2);
	        text-align:center;
	    `;
	
	    var color = isError ? "#e74c3c" : "#2ecc71";
	    var icon = isError 
	? `<svg width="50" height="50" viewBox="0 0 24 24" fill="none">
	     <circle cx="12" cy="12" r="10" fill="#e74c3c"/>
	     <path d="M8 8L16 16M16 8L8 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
	   </svg>`
	: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none">
	     <circle cx="12" cy="12" r="10" fill="#2ecc71"/>
	     <path d="M7 12L10 15L17 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	   </svg>`;
	
	    box.innerHTML = `
	        <div style="font-size:40px">${icon}</div>
	        <h2 style="margin:10px 0;color:${color};">${data.title}</h2>
	        <p style="margin:15px 0;">${data.message}</p>
	        <p style="font-size:13px;color:#666;">${data.action}</p>
	        <button style="
	            margin-top:20px;
	            padding:10px 20px;
	            border:none;
	            border-radius:6px;
	            background:${color};
	            color:white;
	            cursor:pointer;
	        ">OK</button>
	    `;
	
	    box.querySelector("button").onclick = function () {
	        document.body.removeChild(overlay);
	    };
	
	    overlay.appendChild(box);
	    document.body.appendChild(overlay);
}