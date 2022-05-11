let boardList_json;
let temp_write_num;
$(function () {
    boardList();
});

function boardList(cur_num) {
    $("#div_table > table > tbody > tr").remove();
    $(".div_paging_a").children().remove();
    $(".div_paging_a").text("");

    let boardList = localStorage.getItem("boardList");
    if (boardList !== null && boardList !== undefined && boardList !== "") {

        let boardParse = JSON.parse(boardList);
        console.log(boardParse);

        let total_cnt = boardParse.length;
        console.log("total_cnt::::::::::" + total_cnt);

        let basic_paging_cnt = 3;
        let paging_cnt = total_cnt / 10;
        console.log("paging_cnt:::::::::" + paging_cnt);

        let paging_num;
        if (cur_num !== null && cur_num !== undefined && cur_num !== "" && cur_num != 0) {
            paging_num = cur_num;
        } else {
            paging_num = 1;
        }

        let min_num = (paging_num * 10) - 9;
        let max_num = (paging_num * 10)

        let paging_output = "";
        for (let i = 0; i < paging_cnt; i++) {

            if (i == 0) {
                paging_output += "<a href='#' class='button_side' onclick='boardList(" + (paging_num - 1) + ")'>&lt;&lt;</a>"
            }

            if (paging_num == 1) {
                if (i < 3) {
                    paging_output += "<a href='#' onclick='boardList( " + (i + 1) + " )'> " + (i + 1) + " </a>";
                }
            } else if (paging_num == parseInt(paging_cnt) + 1 || paging_num == paging_cnt) {
                if (paging_num - 3 == i || paging_num - 2 == i || paging_num - 1 == i) {
                    paging_output += "<a href='#' onclick='boardList( " + (i + 1) + " )'> " + (i + 1) + " </a>";
                }
            } else {
                if (paging_num - 2 == i || paging_num - 1 == i || paging_num == i) {
                    paging_output += "<a href='#' onclick='boardList( " + (i + 1) + " )'> " + (i + 1) + " </a>";
                }
            }
            if (i == parseInt(paging_cnt) || i == (paging_cnt - 1)) {
                if (paging_num == parseInt(paging_cnt) + 1 || paging_num == parseInt(paging_cnt)) {
                    paging_output += "<a href='#' class='button_side' onclick=boardList(" + (paging_num) + ")>&gt;&gt;</a>";
                } else {
                    paging_output += "<a href='#' class='button_side' onclick=boardList(" + (paging_num + 1) + ")>&gt;&gt;</a>";
                }
            }
        }
        $(".div_paging_a").append(paging_output);

        if (paging_cnt > basic_paging_cnt) {
            $(".button_side").show();
        } else {
            $(".button_side").hide();
        }

        let output = "";
        boardParse.reverse().forEach(function (element, index) {
            if (min_num <= index + 1 && index + 1 <= max_num) {
                output = "";
                output += "<tr id='write_hash" + index + "'>";
                output += "<td>" + (total_cnt - index) + "</td>";
                output += "<td>" + (element.select_plat) + "</td>";
                output += "<td>" + "<a href='#' onclick=fn_title(" + element.write_num + ")>" + element.notice_title + "</a></td>";
                output += "<td>" + element.mem_id + "</td>";
                output += "<td>" + element.write_date + "</td>";
                output += "</tr>";

                $("#div_table > table > tbody").append(output);
            }
        });
    }
}
function fn_title(temp_write_num) {
    $('#updateArea2').stop().slideDown();
    let offset = $("#updateArea2").offset();
    $('html').animate({ scrollTop: offset.top }, 400);

    sessionStorage.setItem("temp_write_num", temp_write_num);
    if (temp_write_num !== null && temp_write_num !== undefined && temp_write_num !== "") {
        let boardList = localStorage.getItem("boardList");
        boardList_json = JSON.parse(boardList);
        console.log(boardList_json);
        for (let i in boardList_json) {
            if (temp_write_num == boardList_json[i].write_num) {
                console.log(temp_write_num + "와" + boardList_json[i].write_num + "는 동일 합니다.");

                //찾은 글을 화면에 넣어주기
                $("#update_plat").val(boardList_json[i].select_plat);
                $("#update_title").val(boardList_json[i].notice_title);
                $("#update_content").val(boardList_json[i].notice_content);

                //본인글이 아닌경우 수정, 삭제 버튼 숨기기(삭제버튼에 id="write_delete"추가)
                let mem_id = sessionStorage.getItem("mem_id");
                if (mem_id != boardList_json[i].mem_id) {
                    $("#write_update").hide();
                    $("#write_delete").hide();
                }
            }
        }
    }
}
function offDisplay2() {
    $('#updateArea2').stop().slideUp();
    let offset = $("#Board").offset();
    $('html').animate({ scrollTop: offset.top }, 400);
}
$(function () {
    temp_write_num = sessionStorage.getItem("temp_write_num");
    console.log("temp_write_num::::::" + temp_write_num);
});

function fn_submit() {
    let write_num = localStorage.getItem("write_num");
    if (write_num === null || write_num === undefined || write_num === "") {
        write_num = 1;
    } else {
        write_num = parseInt(write_num) + 1;
    }
    console.log("write_num:::::::" + write_num);

    let select_plat = $("#select_plat").val();
    console.log(select_plat);
    let notice_title = $("#notice_title").val();
    console.log(notice_title);
    let notice_content = $("#notice_content").val();
    console.log(notice_content);

    let mem_id = sessionStorage.getItem("mem_id");
    console.log("mem_id:::::" + mem_id);

    let current_date = new Date();
    console.log("current_date:::::" + current_date.toLocaleString());

    let boardWrite = {};
    boardWrite.write_num = write_num;
    boardWrite.mem_id = mem_id;
    boardWrite.notice_title = notice_title;
    boardWrite.notice_content = notice_content;
    boardWrite.select_plat = select_plat;
    boardWrite.write_date = current_date.toLocaleString();

    let boardArray = localStorage.getItem("boardList");
    if (boardArray === null || boardArray === undefined || boardArray === "") {
        boardArray = [];
    } else {
        boardArray = JSON.parse(boardArray);
    }
    boardArray.push(boardWrite);
    let boardList = JSON.stringify(boardArray);
    localStorage.setItem("boardList", boardList);
    localStorage.setItem("write_num", write_num);
    alert("등록이 완료되었습니다.");
    location.reload();
}
function fn_write_update() {
    let ret = confirm("수정 하시겠습니까?");
    if (ret == true) {
        /*4차-3 (모든 글에서 해당 글을 찾아서 수정할꺼 이므로 아까 불러온 글목록으로 가지고 사용하기 위해서)
            boardList_json는 위에 지역변수로 사용했기 떄문에 전역변수로 변경해줘야 함(4차-4)*/
        console.log(boardList_json);
        for (let i in boardList_json) {
            //4차-6 (세션에서 가져온 임시 글 번호 사용하기 위해서) temp_write_num 전역변수로 변경하기(4차-7)
            if (temp_write_num == boardList_json[i].write_num) {

                //4차-9 데이터 수정 처리하고 리스트 페이지로 돌아가서 확인 해보기 (4차-e)
                console.log(temp_write_num + "와" + boardList_json[i].write_num + "는 동일 합니다.");

                //수정한 값으로 변경해주기
                boardList_json[i].select_plat = $("#update_plat").val();
                boardList_json[i].notice_title = $("#update_title").val();
                boardList_json[i].notice_content = $("#update_content").val();
            }
        }
        let boardList = JSON.stringify(boardList_json);
        localStorage.setItem("boardList", boardList);
        //수정 후 목록으로 돌아가므로 세션값을 지우고 가기
        sessionStorage.removeItem("temp_write_num");
        alert("수정 하였습니다.");
        location.reload();
    } else {
        alert("취소 하셨습니다.");
    }
}
function fn_write_delete(){
	let ret = confirm("삭제 하시겠습니까?");
	if(ret == true) {
		console.log("temp_write_num::::"+temp_write_num );
		for(let i in boardList_json){
	        //console.log("boardList_json["+i+"].notice_title:::::::"+boardList_json[i].notice_title)
	         if (temp_write_num == boardList_json[i].write_num ){
				let mem_id = sessionStorage.getItem("mem_id");
				if(mem_id == boardList_json[i].mem_id ){
					boardList_json.splice(i, 1);
        	 	}else{
        	 		alert("해당 작성자만 삭제 가능합니다.");
        	 		return;
        	 	}
	         }
		}
		let boardList = JSON.stringify(boardList_json);
		localStorage.setItem("boardList", boardList);
		//수정 후 목록으로 돌아가므로 세션값을 지우고 가기
		sessionStorage.removeItem("temp_write_num");
		alert("삭제 되었습니다.");
		location.reload();
	}else {
	  	alert("취소 하셨습니다.");
	}
}
function sub_search() {
	alert("success");
}
function fn_logout(){
	//alert("fn_logout");
	let ret = confirm("로그아웃 하시겠습니까?");
	if(ret){
		sessionStorage.removeItem("mem_id");
		alert("로그아웃  하였습니다. 로그인 페이지로 이동합니다.");
		location.href ="/finalproject_ajax/login.do";
	}else{
		alert("로그아웃을 취소하셨습니다.");		
	}
}
$(function() {
	let mem_id = sessionStorage.getItem("mem_id");
	console.log("mem_id::"+mem_id);
	
	let memberList = localStorage.getItem("memberList");
	console.log("memberList::::"+memberList);
	
	let mem_arr = JSON.parse(memberList);
	console.log(mem_arr.length);
	
	for(let i=0; i<mem_arr.length; i++){
		if(mem_arr[i].mem_id == mem_id && mem_arr[i].mem_pw == mem_id ){
			//alert("비밀번호를 변경하셔야 합니다.");
			//$("#modal_div1").show();	
			$("#modal_div1").fadeIn();
		}
	}
})
 $(document).on("click", function(e){  
        if( $("#modal_div1").is(e.target)) {
         $("#modal_div1").css({ visibility:"hidden", 
                                     opacity:0 });
    		}
		if( $("#modal_div3").is(e.target)) {
         $("#modal_div3").css({ visibility:"hidden", 
                                     opacity:0 });
    		}
  });
function fn_change(){
	let mem_pw = $("#mem_pw").val().trim();
 	if(mem_pw.length<4){
		alert("PASSWORD가 너무 짧습니다. 4글자 이상 입력해 주세요");
		$("#mem_pw").val("");
		return;	
	}
	let mem_pw_check = $("#mem_pw_check").val();
    if(mem_pw != mem_pw_check){
    	$("#mem_pw_check").val("");
    	alert("입력하신 비밀번호와 재확인 비밀번호가 틀립니다.");
    	return; 
    }
    let mem_id = sessionStorage.getItem("mem_id");
    console.log("mem_id::"+mem_id);

    let memberList = localStorage.getItem("memberList");
    console.log("memberList::::"+memberList);

    let mem_arr = JSON.parse(memberList);
    console.log(mem_arr.length);
    //specialyw03
    for(let i=0; i<mem_arr.length; i++){
   		console.log(mem_arr[i].mem_id+" , "+mem_id+" , "+mem_arr[i].mem_pw+" , "+mem_pw);
    	if(mem_arr[i].mem_id == mem_id){
    		if(mem_arr[i].mem_pw != mem_pw){
    			mem_arr[i].mem_pw = mem_pw;
    		}else{
    			alert("기존 비밀번호와 같습니다. 다시입력해주세요");
    			document.loginForm.reset();
    			return false;
    			
    			/* 참고사항 
    				사실 비밀번호는 일방향 해시 암호화 되어야 합니다.
	    			비밀번호는 화면단에 전송하지 않아야 합니다.
	    			검증은 서버단에서 되어야 합니다.
    			*/
    		}
    	}
    }
	memberList = JSON.stringify(mem_arr);
    localStorage.setItem("memberList", memberList);
    alert("비밀번호 변경이 완료 되었습니다.");
    //$("#modal_div1").hide();
    $("#modal_div1").fadeOut();
}
var plat_data = [];
$.post("https://id.twitch.tv/oauth2/token?client_id=aqjn2ixssohuzaijlzdydhhe3i8dz0&client_secret=6y186fsnr52pxuhqzdep9714b3x4n2&grant_type=client_credentials",
            function (data) {
                a = data.access_token;
                $.ajax({
                    type: 'GET',
                    url: 'https://api.twitch.tv/helix/streams?language=ko',
                    headers: {
                        'Authorization': 'Bearer ' + a,
                        'Client-Id': 'aqjn2ixssohuzaijlzdydhhe3i8dz0'
                    },
                    success: function (data) {
                        console.log(data);
							plat_data = data;
                        let insertHtml = "";
                        for (let i = 0; i < 10; i++) {
                            insertHtml += "<tr>";
                            insertHtml += "<td>" + (i + 1) + "</td>";
                            insertHtml += "<td>" + data.data[i].user_name + "</td>";
                            insertHtml += "<td>" + "<a href='https://www.twitch.tv/"+ data.data[i].user_login +"'>" + data.data[i].title + "</a>" + "</td>";
                            insertHtml += "<td>" + data.data[i].game_name + "</td>";
                            insertHtml += "<td>" + data.data[i].viewer_count + "</td>";
                            insertHtml += "</tr>";
                        }
                        $("#div_plat > table > tbody").html(insertHtml);
                    }
                });
            });

// 회원삭제
function fn_delete2() {
	$("#modal_div3").fadeIn();
}
function fn_delete(){
			let member_id = sessionStorage.getItem("mem_id");
			let ret = confirm("탈퇴 하시겠습니까?");
     		let memberList = localStorage.getItem("memberList");
     		let memberList_json = JSON.parse(memberList);
     		let member_pass = $(".int-area2 > input[name='mem_pw']").val();
     		
     		if (ret == true) {
     			console.log("탈퇴를 진행하겠습니다.");
     			console.log("memberList_json", memberList_json);
					console.log("member_id", member_id);
					console.log("member_pass", member_pass);
					console.log("memberList_json[0].mem_id", memberList_json[0].mem_id);
					console.log("memberList_json[0].mem_pw", memberList_json[0].mem_pw);
  			for(let i in memberList_json) {
     				if (memberList_json[i].mem_id == member_id) {
     					console.log("member_id", member_id);
     					console.log("member_pass", member_pass);
     					if(member_pass == memberList_json[i].mem_pw){
     						memberList_json.splice(i, 1);
     					}else{
     						alert("비밀번호가 일치하지 않습니다.");
     						return;
     					}
     				}
     			}
     			memberList = JSON.stringify(memberList_json);
     			localStorage.setItem("memberList", memberList);
     			alert("MemWiki를 이용해주셔서 감사합니다..");
     			location.href = "/finalproject_ajax/login.do";
				sessionStorage.removeItem("mem_id");
     		} else {
     			alert("취소하셨습니다.");
     		}
}
// RankBoard 활성화
function onRank() {
		$('#div_plat').stop().slideDown();
		let offset = $("#input_search").offset();
   		$('html').animate({ scrollTop: offset.top }, 400);
}
function offDisplay() {
	$('#writeArea2').stop().slideUp();
	let offset = $("#Board").offset();
	$('html').animate({
		scrollTop : offset.top
	}, 400);
}
// RankChart 활성화
function fn_chart() {
	console.log(plat_data);
    console.log(a);
	$("#modal_graph").fadeIn();
    // 차트를 그럴 영역을 dom요소로 가져온다.
    var chartArea = document.getElementById('myChart').getContext('2d');
    // 차트를 생성한다. 
    var myChart = new Chart(chartArea, {
        // ①차트의 종류(String)
        type: 'bar',
        // ②차트의 데이터(Object)
        data: {
            // ③x축에 들어갈 이름들(Array)
            labels: [ plat_data.data[0].user_name, plat_data.data[1].user_name, plat_data.data[2].user_name, plat_data.data[3].user_name, plat_data.data[4].user_name
            , plat_data.data[5].user_name, plat_data.data[6].user_name, plat_data.data[7].user_name, plat_data.data[8].user_name, plat_data.data[9].user_name],
            // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
            datasets: [{
                // ⑤dataset의 이름(String)
                label: '현재 시청자수',
                // ⑥dataset값(Array)
                data: [ plat_data.data[0].viewer_count, plat_data.data[1].viewer_count, plat_data.data[2].viewer_count, plat_data.data[3].viewer_count, plat_data.data[4].viewer_count
            , plat_data.data[5].viewer_count, plat_data.data[6].viewer_count, plat_data.data[7].viewer_count, plat_data.data[8].viewer_count, plat_data.data[9].viewer_count],
                // ⑦dataset의 배경색(rgba값을 String으로 표현)
                backgroundColor: '#17C0EB',
                // ⑧dataset의 선 색(rgba값을 String으로 표현)
                borderColor: '#17C0EB',
                // ⑨dataset의 선 두께(Number)
                borderWidth: 1,
                color: '#17C0EB'
            }]
        },
        // ⑩차트의 설정(Object)
        options: {
            // ⑪축에 관한 설정(Object)
            scales: {
                // ⑫y축에 대한 설정(Object)
                y: {
                    // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                    beginAtZero: true
                }
            }
        }
    });
}
$(document).mouseup(function (e){
	var container = $('#modal_graph');
	if( container.has(e.target).length === 0){
	container.css('display','none');
	}
});
// Top 버튼
$(function () { 
    $(window).scroll(function () {
        if ($(this).scrollTop() > 2) {
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    }); 
    $("#topBtn").click(function () {
		$('#writeArea2').stop().slideUp();
		$('#div_plat').stop().slideUp();
		$('#mapArea2').stop().slideUp();
		$('#updateArea2').stop().slideUp();
        $('html, body').animate({
            scrollTop: 0 
        }, 400); 
	return false; 
    });
});
