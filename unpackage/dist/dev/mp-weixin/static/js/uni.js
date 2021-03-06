
function doHandleDate() { //获取年月
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    var tMonth = myDate.getMonth();
 
    var m = tMonth + 1;
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    return tYear +'-'+ m;
}
function formatDate(params) {
	// params 0昨天 1今天 2明天
	var date = new Date();
	if(params==0){
		date.setTime(date.getTime()-24*60*60*1000);
	}
	if(params==2){
		date.setTime(date.getTime()+24*60*60*1000);
	}
	
	var myyear = date.getFullYear();
	var mymonth = date.getMonth()+1;
	var myweekday = date.getDate();
 
	if(mymonth < 10){
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10){
		myweekday = "0" + myweekday;
	}
	return (myyear+"-"+mymonth + "-" + myweekday);
}

function doHandleYear(tYear) { //获取年
    var myDate = new Date();
    var tYear = myDate.getFullYear();
 
    return tYear;
}
function doHandleMonth() {  //获取月
    var myDate = new Date();
    var tMonth = myDate.getMonth();
 
    var m = tMonth + 1;
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    return m;
}


module.exports = {
	doHandleDate: doHandleDate,
	formatDate: formatDate,
	doHandleYear: doHandleYear,
	doHandleMonth: doHandleMonth
}
