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
			};
		};
		init();
		
		self.renderList = function(data){
			var list = tmpl($('#listTemplate').html(), {data: data});
			self.elements.listContainer.html(list);
		};
		
		self.renderList(model.data);
	};
// )