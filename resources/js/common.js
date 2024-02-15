$(function () {
	$(window).on('load', function () {
		sliderVisual();
	});

	// 메인 : 비주얼배너
	var sliderVisual = new Swiper('.slider_visual', {
		loop: true,
		speed: 800,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.slider_visual .swiper-pagination',
			clickable: true,
		},
	});
});

$(function () {
	// 전체메뉴
	var popup = $(".mo_gnb_wrap");

    $(".mo_btn_open").on("click", function() {
        var value = $(this).attr('data-value');
        $('.mo_gnb_wrap[data-value='+value+']').addClass('on');
        $("html, body").css({'height':$(window).height(), 'overflow':'hidden'});
    });

    $(".mo_btn_close").on('click', popupClose);
    $(".mo_gnb_wrap .dim_bg").on('click', popupClose);
    
    function popupClose() {
    	popup.removeClass('on');
        $("html, body").css({'height':'auto', 'overflow':'auto'});
    }

	// 탭메뉴
	$(".tab_wrap .tab_box li").click(function () {
		$(".tab_wrap .tab_box li").removeClass('on');
		$(".tab_wrap .content").removeClass('on');
		$(this).addClass('on');
		$("#" + $(this).data('id')).addClass('on');
	});
});



//바텀시트 핸들바
const bottomSheet = document.querySelector(".bottom_sheet");
const dimmed = document.querySelector(".bottom_sheet_dimmed");

function handleSlide() {
	bottomSheet.classList.toggle("is_active");
}
function handleSlideUp() {
	bottomSheet.classList.add("is_active");
	dimmed.classList.add("is_active");
}
function handleSlideDown() {
	bottomSheet.classList.remove("is_active");
	dimmed.classList.remove("is_active");
}

let startY = 0;
let endY = 0;

bottomSheet.addEventListener("touchstart", (e) => {
	console.log("touchstart", e.touches[0].pageY);
	startY = e.touches[0].pageY;
});

bottomSheet.addEventListener('touchend', (e) => {
	let endY = e.changedTouches[0].clientY;
	let deltaY = endY - startY;    

	if (deltaY > 0) {
			console.log("아래 방향으로 스와이프");
			handleSlideDown();
	} else if (deltaY < 0) {
			console.log("위 방향으로 스와이프");
			handleSlideUp();
	}
});