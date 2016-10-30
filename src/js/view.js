// define(
// 	'view',
// 	[],
	function View(model){
		var self = this;

		function init(){
			var wrapper = tmpl($('#wrapperTemplate').html());
			$('.main').append(wrapper);
			self.elements = {
				input: $('#addItem'),
				addBtn: $('#addBtn'),
				listContainer: $('#cont'),
				modalWindow: $('#test-modal'),
				popupOk: $('.setOk')
			};
		};
		init();
		
		self.renderList = function(data){
			var list = tmpl($('#listTemplate').html(), {data: data});
			self.elements.listContainer.html(list);
		};
		
		self.renderList(model.data);


		$('.popup-modal').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#changeValue',
			modal: true
		});
	
	};
// )