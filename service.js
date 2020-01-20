const weekLast = function () {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				let y=year,m=month,d=day;
				if(day>=30){
					d = '0' + 1;
					if(month>=12){
						m = '0' + 1;
						y = year - 0 + 1;
					}else if(month<9){
						m =  month-0+1;
						m = '0' + month;
					}else{
						m = month-0+1;
					}
				}else if(day<9){
					d = day - 0 + 1;
					d = '0' + day;
				}else{
					d = day - 0 + 1;
				}
				var nowTime = y + '-' + m + '-' + d;
				if(day<=7){
					day = day-7+30;
					if(month<=1){
						month = month -1+12;
						year = year - 1
					}
				}else{
					day = day-7;
					if(day<10){
						'0' + day;
					}
				}
				var lastTime = year+'-'+month+'-'+ day
				var weekTime = lastTime + '~' + nowTime;
				return weekTime
			} 
const monthThis = function () {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				let y=year,m=month,d=day;
				if(day>=30){
					d = '0' + 1;
					if(month>=12){
						m = '0' + 1;
						y = year - 0 + 1;
					}else if(month<9){
						m =  month-0+1;
						m = '0' + month;
					}else{
						m = month-0+1;
					}
				}else if(day<9){
					d = day - 0 + 1;
					d = '0' + day;
				}else{
					d = day - 0 + 1;
				}
				var nowTime = y + '-' + m + '-' + d;
				if(month<=1){
					month = month -1+12;
					year = year - 1
				}else{
					month = month -1;
					if(month<10){
						'0' + month;
					}
				}
				var lastTime = year+'-'+month+'-'+ day
				var monthThis = lastTime + '~' + nowTime;
				return monthThis
			}
const quarterThis = function () {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				let y=year,m=month,d=day;
				if(day>=30){
					d = '0' + 1;
					if(month>=12){
						m = '0' + 1;
						y = year - 0 + 1;
					}else if(month<9){
						m =  month-0+1;
						m = '0' + month;
					}else{
						m = month-0+1;
					}
				}else if(day<9){
					d = day - 0 + 1;
					d = '0' + day;
				}else{
					d = day - 0 + 1;
				}
				var nowTime = y + '-' + m + '-' + d;
				if(month<=3){
					month = month - 3 + 12;
					year = year - 1
				}else{
					month = month -3;
					if(month<10){
						'0' + month;
					}
				}
				var lastTime = year+'-'+month+'-'+ day
				var quarterThis = lastTime + '~' + nowTime;
				return quarterThis
			}
const yearThis = function () {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				let y=year,m=month,d=day;
				if(day>=30){
					d = '0' + 1;
					if(month>=12){
						m = '0' + 1;
						y = year - 0 + 1;
					}else if(month<9){
						m =  month-0+1;
						m = '0' + month;
					}else{
						m = month-0+1;
					}
				}else if(day<9){
					d = day - 0 + 1;
					d = '0' + day;
				}else{
					d = day - 0 + 1;
				}
				var nowTime = y + '-' + m + '-' + d;
				year = year - 1
				var lastTime = year+'-'+month+'-'+ day
				var yearThis = lastTime + '~' + nowTime;
				return yearThis
			}
const dayAll = function () {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				var nowTime = year + '-' + month + '-' + day;
				if(day>=30){
					day = '0' + 1;
					if(month>=12){
						month = '0' + 1;
						year = year - 0 + 1
					}else if(m<10){
						m = m-0+1;
					}
				}else{day = day - 0 + 1}
				var lastTime = year+'-'+month+'-'+ day;
				var dayAll = nowTime + '~' + lastTime;
				return dayAll
			}
const GetDateStr = function(AddDayCount) { 
			   var dd = new Date();
			   dd.setDate(dd.getDate()-0+AddDayCount);//获取AddDayCount天后的日期
			   var y = dd.getFullYear(); 
			   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
			   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
			   return y+"-"+m+"-"+d; 
			}
const GetMonthStr= function(count) { 
			   const date = new Date();
			   let year = date.getFullYear();
			   let month = date.getMonth() + 1;
			   if(month<=count){
				   month = month - count + 12
				   year = year - 1
			   }else{
				   month = month - count;
				   }
			   month = month > 9 ? month : '0' + month;
			   return year+"-"+month; 
			}
const  getDate= function (type) {
	    const date = new Date();
	    let year = date.getFullYear();
	    let month = date.getMonth() + 1;
	    let day = date.getDate();
	    if (type === 'start') {
	        year = year - 60;
	    } else if (type === 'end') {
	        year = year + 2;
	    }
	    month = month > 9 ? month : '0' + month;;
	    day = day > 9 ? day : '0' + day;
	    return `${year}-${month}-${day}`;
	}
const fermitTime = function(time){
		var now = new Date(time);
		var year = now.getFullYear();
		var mon = now.getMonth()+1;
		var day= now.getDate();
		var hour= now.getHours();
		var minutes= now.getMinutes();
		var second= now.getSeconds();
		if(mon<10){
		mon = '0'+mon;
		};
		if(day<10){
		day = '0'+day;
		}
		if(hour<10){
		hour = '0'+hour;
		};
		if(minutes<10){
		minutes = '0'+minutes;
		};
		if(second<10){
		second = '0'+second;
		}
		var postDate = year+'-'+mon+'-'+day + ' ' + hour + ':' + minutes+ ':' + second;
		return postDate;
	}
const singleDay = function(time){
	let y = time.slice(0,4);
	let m = time.slice(5,7);
	let d = time.slice(8,10);
	if(d>=30){
		d = '0' + 1;
		if(m>=12){
			m = '0' + 1;
			y = y - 0 + 1;
		}else if(m<9){
			m =  m-0+1;
			m = '0' + m;
		}else{
			m = m-0+1;
		}
	}else if(d<9){
		d = d - 0 + 1;
		d = '0' + d;
	}else{
		d = d - 0 + 1;
	}
	let endTime = y + '-' + m + '-' + d;
	return endTime;
}
export default {
	weekLast,
	monthThis,
	quarterThis,
	yearThis,
	dayAll,
	GetDateStr,
	GetMonthStr,
	getDate,
	fermitTime,
	singleDay,
}
