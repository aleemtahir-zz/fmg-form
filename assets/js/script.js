const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
});



jQuery(document).ready(function() {
	$('#tab-2').click(function() {

		animateCSS('#price-entry2 form', 'fadeinleftbig');
	});

	$('#tab-1').click(function() {

		animateCSS('#price-entry1 form', 'fadeinleftbig');
	});
	animateCSS('#price-entry1 form', 'fadeinleftbig');

	$(document).on('submit','#sellerForm',function(e){
        e.preventDefault();

        // Calculate
        // calculateSellerForm();

		// $('#results1').removeClass('d-none');
		// $(window).scrollTop($('#results1').offset().top);
    }); 


});


// function calculateSellerForm() {
// 	let inputDuration = parseInt($('#inputDuration').val());
// 	let inputMonthyRent = parseInt($('#inputMonthyRent').val());
// 	let inputLoanAmount = parseInt($('#inputLoanAmount').val());
// 	let inputMortgageAmount = parseInt($('#inputMortgageAmount').val());
// 	let inputTaxAmount = parseInt($('#inputTaxAmount').val());

// 	let inputTotalUnits = parseInt($('#inputTotalUnits').val());
// 	let inputOccupiedUnits = parseInt($('#inputOccupiedUnits').val());
	
// 	let incomeText = $('#incomeText').text(inputMonthyRent * 12).html();
// 	let expensesText = $('#expensesText').text(0).html();
// 	let debtText = $('#debtText').text(inputMortgageAmount * 12).html();
// 	let cashflowText = $('#cashflowText').text(parseInt(incomeText - expensesText - debtText)).html();
// 	let grossText = $('#grossText').text(0).html();
// 	let vacancyRateText = $('#vacancyRateText').text(parseInt(inputOccupiedUnits/inputTotalUnits)).html();
// 	let effectiveIncomeText = $('#effectiveIncomeText').text(0).html();
// 	let netIncomeText = $('#netIncomeText').text(0).html();
// 	let annualCFText = $('#annualCFText').text(0).html();
// }

function calculateIncome(element) {
	$('#inputIncome').val(parseInt(element.value) * 12);
	calculateCF();
}

function calculateMortgage(element) {
	$('#inputDebtService').val(parseInt(element.value) * 12);
	calculateCF();
}

function calculateCF() {
	let i = $('#inputIncome').val() || 0;
	let oe = $('#inputOperatingExpenses').val() * 12 || 0;
	let ds = $('#inputDebtService').val() || 0;

	$('#inputCashflow').val(i - oe - ds);

	calculateNOI();
}

function calculateVacancyRate() {
	let ou = $('#inputOccupiedUnits').val() || 0;	
	let tu = $('#inputTotalUnits').val() || 0;	
	console.log('ou: '+ ou);
	console.log('tu: '+ tu);

	$('#inputVacancyRate').val(parseInt(ou) / parseInt(tu));
	calculateEGI();
}

function calculateEGI() {
	let gi = $('#inputGrossIncome').val() || 0;	
	let vr = $('#inputVacancyRate').val() || 0;	
	console.log('gi: '+gi);
	console.log('vr: ' +vr);

	$('#inputEGrossIncome').val(parseInt(gi) - parseFloat(vr));	
	calculateNOI();
}

function calculateNOI() {
	let egi = $('#inputEGrossIncome').val() || 0;	
	let oe = $('#inputOperatingExpenses').val() || 0;	
	console.log('egi: '+egi);
	console.log('oe: ' +oe);

	$('#inputNOI').val(parseFloat(egi) - parseFloat(oe * 12));	
	calculateACF();
}

function calculateACF() {
	let noi = $('#inputNOI').val() || 0;	
	let ds = $('#inputDebtService').val() || 0;	
	console.log('noi: '+noi);
	console.log('ds: ' +ds);

	$('#inputACF').val(parseFloat(noi) - parseFloat(ds));	
}

function calculateCoCR() {
	let acf = $('#bInputACF').val() || 0;
	let dp = $('#downPayment').val() || 0;

	$('#cashReturn').val(acf / dp);
}

function calculateCapRate() {
	let noi = $('#bInputNOI').val() || 0;
	let sp = $('#salePrice').val() || 0;

	$('#capRate').val(noi / sp);

	// onchange noi
	calculatePCF();
}

function calculatePCF() {
	let noi = $('#bInputNOI').val() || 0;
	let ds = $('#bInputDebtService').val() || 0;

	$('#inputPCF').val(noi - ds);
}