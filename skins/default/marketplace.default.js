jQuery(function($) {

	function cropPreviewImage(input) {
		//alert("a");
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			var width = $(input).parent().width();
			var height = $(input).parent().height();
			var rate = width/height;

			reader.onload = function (e) {
				var image = new Image();
				image.src = e.target.result;
				image.onload = function() {
					if( rate > this.width/this.height){
						$(input).parent().find('.preview').width(width);
						$('.preview').width(width);
					}
						
					else{
						$(input).parent().find('.preview').height(height);
						$('.preview').height(height);
					}
						
				};

				$(input).parent().find('.preview').attr('src', e.target.result).show();
				$(input).parent().find('.mp-no-image').hide();

				$('.preview').attr('src', e.target.result).show();
				$('.mp-no-image').hide();


				
			}
			reader.readAsDataURL(input.files[0]);
			
		}
	}
	$(".insertImage").change(function(){

		var ext = $(this).val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			alert('이미지 형식만 업로드하실 수 있습니다.');
			this.value = '';
			$(this).parent().find('.preview').hide();
			$(this).parent().find('.mp-no-image').show();
		}
		else
		{
			// $(".ffimage1").value = this.value;
			// $(".ffimage2").value = this.value;
			// $(".insertImage").value = this.value;

			
			// cropPreviewImage($(".ffimage1"));
			// cropPreviewImage($(".ffimage2"));
			// cropPreviewImage($(".insertImage"));
			cropPreviewImage(this);
		}

	});

	$('input.number').keyup(function(event){
	  // skip for arrow keys
	  if(event.which >= 37 && event.which <= 40){
		  event.preventDefault();
	  }
	  var $this = $(this);
	  var num = $this.val().replace(/,/gi, "").split("").reverse().join("");
	  var num2 = RemoveRougeChar(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));

	  $this.val(num2);
	});

	function RemoveRougeChar(convertString){
		
		if(convertString.substring(0,1) == ","){
			return convertString.substring(1, convertString.length)            
			
		}
		return convertString;
	}

	$( "#item_price" ).keyup(function(){
		this.value = this.value.replace(/[^0-9\.,]/g,'');
		$("#item_price_ko").text('( ' + int_to_han(this.value.replace(/[^0-9]/g,'')) + '원 )');
	});

});

function quickSearchSubmit(){
	document.quick_search.p_f.value = 
		document.quick_search.p_f.value.replace(/,/g,'');
	document.quick_search.p_t.value = 
		document.quick_search.p_t.value.replace(/,/g,'');
	document.quick_search.w_f.value = 
		document.quick_search.w_f.value.replace(/,/g,'');
	document.quick_search.w_t.value = 
		document.quick_search.w_t.value.replace(/,/g,'');
	document.quick_search.submit();
}
