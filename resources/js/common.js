$(function () {
	$(window).on('load', function () {
		sliderVisual();
		sliderStore();
		sliderPremium();
		sliderBanner();
		sliderCategory();
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


	// 서브상단 : 내주변 카테고리
	var sliderCategory = new Swiper('.local_category', {
		slidesPerView: 3,
		spaceBetween: 0,
		nested: true,
	});

	// 서브 : 내주변 - 지도보기 리스트
	var sliderPremium = new Swiper('.slider_map_list', {
		slidesPerView: 1.2,
		spaceBetween: 12,
		centeredSlides: true,
		loop: true,
		loopAdditionalSlides: 12,
		speed: 800,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});
});


$(function () {
	// 메인 : 내주변 매장 포트폴리오 탭메뉴
	$(".portfolio_wrap .portfolio_tab li").click(function () {
		$(".portfolio_wrap .portfolio_tab li").removeClass('on');
		$(".portfolio_wrap .content").removeClass('on');
		$(this).addClass('on');
		$("#" + $(this).data('id')).addClass('on');
	});


	// 삭제 레이어팝업
	$('.btn_del').on('click', function (e) {
		e.preventDefault();
		$('.pop_wrap').addClass('active');
		$("body").css({ 'height': $(window).height(), 'overflow': 'hidden' });
	});
	$('.pop_wrap .btn_confirm').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.pop_wrap').removeClass('active');
		$("body").css({ 'height': 'auto', 'overflow': 'auto' });
	});

	// 내주변 - 카테고리 클릭시 토스트배너 출력
	$('.btn_cate').on('click', function () {
		$(".category_box .btn_close").show();
		$(".category_box" + $(this).attr("href")).fadeIn(200);
		//$(".category_box" + $(this).attr("href")).css({'display':'block'});
		$(".category_box").find('.category_content').animate({ bottom: 0 }, 200);
		$("body").css({ 'height': $(window).height(), 'overflow': 'hidden' });
	});
	$('.category_box .btn_close').on('click', function () {
		$(".btn_cate").show();
		$(".category_box").fadeOut(300);
		//$(".category_box").css({'display':'none'});
		$(".category_box").find('.category_content').animate({ bottom: -150 }, 300);
		$("body").css({ 'height': 'auto', 'overflow': 'auto' });
	});

	// 주소검색 - 검색 취소
	var $search = $('.add_search .search_result');
	var $clearIpt = $('.add_search .btn_cancle');

	$search.keyup(function () {
		$(".add_search .btn_cancle").toggle(Boolean($(this).val()));
	});

	$clearIpt.toggle(Boolean($search.val()));
	$clearIpt.click(function () {
		$(".add_search .search_result").val('').focus();
		$(this).hide();
	});

	// 주소검색 - 삭제,전체삭제
	$('.recently_search_wrap .btn_alldel').on('click', function () {
		$(".recently_search_wrap").children().remove();
	});
	$('.recently_search_wrap .btn_delete').on('click', function () {
		$(this).parent().remove();
	});

});