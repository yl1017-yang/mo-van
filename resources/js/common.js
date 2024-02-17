
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
	var popplus = $(".mo_gnb_wrap");

    $(".mo_btn_open").on("click", function() {
        var value = $(this).attr('data-value');
        $('.mo_gnb_wrap[data-value='+value+']').addClass('on');
        $("html, body").css({'height':$(window).height(), 'overflow':'hidden'});
    });

    $(".mo_btn_close").on('click', popplusClose);
    $(".mo_gnb_wrap .dim_bg").on('click', popplusClose);
    
    function popplusClose() {
    	popplus.removeClass('on');
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

//상품상세 수량계산
let basket = {
	totalCount: 0,
	totalPrice: 0, 
	
	//재계산
	reCalc: function() {
		this.totalCount = 0;
		this.totalPrice = 10000;  //필수가격

		// 필수 옵션 계산
		document.querySelectorAll(".p_num").forEach(function(item) {
			var count = parseInt(item.getAttribute('value'));
			this.totalCount += count;
			var price = item.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
			this.totalPrice += count * price;
		}, this);

		// 직접 계산
		document.querySelectorAll(".p_num_input").forEach(function(p_num_input1) {
			this.totalCount += parseInt(p_num_input1);
		}, this);
	},
	
	//화면 업데이트
	plusdateUI: function() {
		document.querySelector('#sum_p_price').textContent = this.totalPrice.formatNumber();
	},
	
	//개별 수량 변경
	changePNum: function(pos) {
		var item = document.querySelector('input[name=p_num' + pos + ']');
		var p_num = parseInt(item.getAttribute('value'));
		var newval = event.target.classList.contains('plus') ? p_num + 1 : event.target.classList.contains('minus') ? p_num - 1 : event.target.value;

		if (isNaN(newval) || parseInt(newval) < 0 || parseInt(newval) > 99) {
			return false;
		}

		item.setAttribute('value', newval);
		item.value = newval;

		var price = item.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
		item.parentElement.nextElementSibling.textContent = (newval * price).formatNumber();

		console.log('newval-'+ newval, 'price-'+ price, 'item.value' + item.value, sum_p_price);

		this.reCalc();
		this.plusdateUI();
	},

	changePNumInput: function(pos) {
		const p_num_input1 = document.querySelector('#p_num_input1').value;
		document.querySelector("#result").innerText = p_num_input1;
		
		// 합계 계산
		this.totalCount += parseInt(p_num_input1);

		this.reCalc();
		this.plusdateUI();
	},
}


// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function() {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};


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

let startY;
let endY;

bottomSheet.addEventListener("touchstart", (e) => {
  console.log("touchstart", e.touches[0].pageY);
  startY = e.touches[0].pageY;
});

bottomSheet.addEventListener("touchmove", (e) => {
  console.log("touchmove", e.changedTouches[0].pageY);
  if (!startY) return;

  let currentY = e.changedTouches[0].pageY;
  let deltaY = currentY - startY;

  if (Math.abs(deltaY) > 50) {
	  if (deltaY < 0) {
		  console.log("아래로 스와이프");
		  handleSlideUp();
	  } else {
		  console.log("위로 스와이프");
		  handleSlideDown();
	  }

	  startY = null;
  }
});

bottomSheet.addEventListener("touchend", () => {
  startY = null;
  console.log("touchend");
});