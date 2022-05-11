<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%request.setCharacterEncoding("UTF-8");%>
<meta charset="UTF-8">
<style>
	@import
		url('https://fonts.googleapis.com/css2?family=Orbitron:wght@790&display=swap')	;
</style>
<script src="http://code.jquery.com/jquery-1.8.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="./css/style_main.css">
<title>Memwiki</title>
</head>
<body>
	<div id="wrap">
		<div id="img_div" class="intro_bg">
			<div class="header">
				<div class="logoArea">
					<ul class="logo">
						<li><a href="#">MEMWIKI</a></li>
						<li></li>
					</ul>
				</div>
				<div class="navArea">
					<ul class="nav">
						<li><a href="main.do">Home</a></li>
						<li><a href="#">Rank</a></li>
						<li class="goBoard"><a href="#Board">Board</a></li>
						<li onclick="onMap()" class="goMap"><a href="#">Co_Map</a></li>
					</ul>
				</div>
				<input type="checkbox" id="menuicon"> <label for="menuicon">
					<span></span> <span></span> <span></span>
				</label>
				<div class="header_icon">
					<ul class="menu">
						<li class="goHome"><a href="#wrap">Home</a></li>
						<li><a href="#">Rank</a></li>
						<li class="goBoard"><a href="#Board">Board</a></li>
						<li onclick="onMap()" class="goMap"><a href="#">Co_Map</a></li>
					</ul>
				</div>
			</div>
			<div class="main_bg"></div>
		</div>
	</div>
</body>
</html>