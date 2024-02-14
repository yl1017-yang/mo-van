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
const handleWrap = document.querySelector(".bottom_sheet_handle");
const bottomSheet = document.querySelector(".bottom_sheet");

function handleSlide() {
  bottomSheet .classList.toggle("is_active");
}
function handleSlideUp() {
  bottomSheet .classList.add("is_active");
}
function handleSlideDown() {
  bottomSheet .classList.remove("is_active");
}

// bottomSheet .addEventListener("click", () => {
//   handleSlideUp();
// });

let startPoint = 0;
let endPoint = 0;

// handleWrap.addEventListener("mousedown", (e) => {
//   console.log("mousedown", e.pageY);
//   startPoint = e.pageY;
//   e.preventDefault();
//   handleSlideUp();
// });  
// handleWrap.addEventListener("mouseup", (e) => {
//   console.log("mouseup", e.pageY);
//   endPoint = e.pageY;
// });

bottomSheet.addEventListener("mousedown", (e) => {
  console.log("mousedown", e.pageY);
  startPoint = e.pageY;
  e.preventDefault();
  handleSlide();
});  
bottomSheet.addEventListener("mouseup", (e) => {
  console.log("mouseup", e.pageY);
  endPoint = e.pageY;
});


// handleWrap.addEventListener("touchstart", (e) => {
//   console.log("touchstart", e.touches[0].pageY);
//   startPoint = e.touches[0].pageY;
// });  
// handleWrap.addEventListener("touchend", (e) => {
//   console.log("touchend", e.changedTouches[0].pageY);
//   endPoint = e.changedTouches[0].pageY;
//   handleSlideUp();
// });

bottomSheet.addEventListener("touchstart", (e) => {
  console.log("touchstart", e.touches[0].pageY);
  startPoint = e.touches[0].pageY;
});  
bottomSheet.addEventListener("touchend", (e) => {
  console.log("touchend", e.changedTouches[0].pageY);
  endPoint = e.changedTouches[0].pageY;
  handleSlide();
});