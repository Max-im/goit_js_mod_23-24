// define(
// 	'view',
// 	[],
	function Controller(model, view){
		var self = this;
		view.elements.addBtn.on('click', addItem);
		view.elements.listContainer.on('click', '.fa-times', removeItem);
		view.elements.listContainer.on('click', '.fa-pencil', changeItem);

		function addItem(){
			var newItem = view.elements.input.val();
			model.addItem(newItem);
			view.renderList(model.data);
			view.elements.input.val('');
		};
		function removeItem(){
			var item = $(this).attr('data-value');
			model.removeItem(item);
			view.renderList(model.data);
		};
		function changeItem(){
			var item = $(this).attr('data-value');
			model.changeItem(item);
			view.renderList(model.data);
		};

		return {};
	};
// )