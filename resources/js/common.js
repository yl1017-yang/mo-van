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

	// 즐겨찾기 토글버튼
	$(".mark").click(function () {
		$(this).toggleClass('on');
	});

});


//상품상세 수량 계산
let basket = {
	totalPrice: 0, 
	
	//재계산
	reCalc: function() {
		this.totalPrice = 10000;  //기본가격 초기화 : 10,000 시작
		
		// 추가 옵션
		document.querySelectorAll('dd[name=option]').forEach(function(item) {
			//console.log("item = ",item);
			var input_num = item.querySelector('.p_num');
			var count = parseInt(input_num.getAttribute('value'));
		
			var span_price = item.querySelector('.p_price');
			var price = parseInt(span_price.getAttribute('value'));

			this.totalPrice += count * price;
		}, this);

		// 직접 입력
		document.querySelectorAll(".p_num_input").forEach(function(p_num_input) {
			var inputPrice = parseInt(p_num_input.value);
			if (!isNaN(inputPrice)) {
				this.totalPrice += inputPrice;
			}
		}, this);

		// 전체 수량
		var input_num_total = document.querySelector('.p_num_total');
		var total_count = parseInt(input_num_total.getAttribute('value'));
		
		// 최종 가격
		this.totalPrice = this.totalPrice * total_count;
	},
	
	// 총 가격 업데이트
	plusdateUI: function() {
		var sumPrice = document.querySelector('#sum_p_price');
		sumPrice.textContent = this.totalPrice.formatNumber();
	},

	// 필수 옵션 : 사용안함
	checkItem: function() {
		// var totalPrice = 0;
		// var radioButtons = document.querySelectorAll('input[name=basic]:checked');
		// var sumPrice = document.querySelector('#sum_p_price');
	
		// radioButtons.forEach(function(radioButton) {
		// 	totalPrice += parseInt(radioButton.getAttribute('data-price'));
		// });
	
		// sumPrice.textContent = totalPrice.formatNumber();
    },

	// 추가 수량 변경
	changePNum: function(pos) {
		var option =document.querySelector('dd[id=option' + pos + ']');
		// console.log("option = ",option);

		// 품절 상품
		if (option.classList.contains('soldout')) {
			return false;
		}

		var input_num = option.querySelector('.p_num');
		var count = parseInt(input_num.getAttribute('value'));
		
		var span_price = option.querySelector('.p_price');
		var price = parseInt(span_price.getAttribute('value'));

		if( event.target.classList.contains('plus')) {
			count = count + 1;
		} else if (event.target.classList.contains('minus')){
			count = count - 1;
		} else {
			return false;
		}		
	
		var span_sum = document.querySelector('span[name=p_sum' + pos + ']');
		
		if (parseInt(count) < 0) {
			span_sum.classList.remove('on');
			return false;
		}
		else if (parseInt(count) > 0) {
			span_sum.classList.add('on');
		}

		input_num.setAttribute('value', count);
		input_num.value = count;
		
		var sum = 0;

		if(count == 0) {
			sum = (1 * price).formatNumber();
			span_sum.classList.remove('on');
		}
		else {
			sum = (count * price).formatNumber();
		}
		
		var span_sum = option.querySelector('.sum');
		span_sum.textContent = sum;

		this.reCalc();
		this.plusdateUI();
	},

	// 직접 입력
	changePNumInput: function(pos) {
		var p_num_input = document.querySelector('input[name=p_num_input' + pos + ']').value;
		
		this.reCalc();
		this.plusdateUI();
	},

	// 전체 수량 변경
    changePNumTotal: function() {
		var input_num = document.querySelector('.p_num_total');
		var count = parseInt(input_num.getAttribute('value'));
		
		if (event.target.classList.contains('plus')) {
            count = count + 1;
        } else if (event.target.classList.contains('minus')) {
            count = count - 1;
        } else {
            return false;
        }
		
		if (parseInt(count) < 1) {
            return false;
        } else if (parseInt(count) > 1) {
        }

        input_num.setAttribute('value', count);
        input_num.value = count;
		
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
