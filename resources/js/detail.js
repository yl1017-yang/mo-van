let basket = {
	totalCount: 0,
	totalPrice: 0, 
	
	//재계산
	reCalc: function() {
	this.totalCount = 0;
	this.totalPrice = 0;
	document.querySelectorAll(".p_num").forEach(function(item) {
		/* if (item.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.checked == true) { */
		var count = parseInt(item.getAttribute('value'));
		this.totalCount += count;
		var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
		this.totalPrice += count * price;
		/* } */
	}, this);
	},
	
	//화면 업데이트
	updateUI: function() {
	/* document.querySelector('#sum_p_num').textContent = '상품갯수: ' + this.totalCount.formatNumber() + '개'; */
	document.querySelector('#sum_p_price').textContent = '합계금액: ' + this.totalPrice.formatNumber() + '원';
	},
	
	//개별 수량 변경
	changePNum: function(pos) {
	var item = document.querySelector('input[name=p_num' + pos + ']');
	var p_num = parseInt(item.getAttribute('value'));
	var newval = event.target.classList.contains('up') ? p_num + 1 : event.target.classList.contains('down') ? p_num - 1 : event.target.value;

	if (parseInt(newval) < 0 || parseInt(newval) > 99) {
		return false;
	}

	item.setAttribute('value', newval);
	item.value = newval;

	var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
	item.parentElement.parentElement.nextElementSibling.textContent = (newval * price).formatNumber() + "원";

	this.reCalc();
	this.updateUI();
	},
	// checkItem: function() {
	//   this.reCalc();
	//   this.updateUI();
	// },  
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function() {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};