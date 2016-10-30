// define(
// 	'view',
// 	[],
	function Controller(model, view){
		var self = this;
		view.elements.addBtn.on('click', addItem);
		view.elements.listContainer.on('click', '.fa-times', removeItem);
		view.elements.listContainer.on('click', '.fa-pencil', openModal);
		view.elements.modalWindow.on('click', '.setCansel', closeModal);
	

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


		function openModal(e){
			var item = $(this).attr('data-value');
			view.elements.modalWindow.on('click', '.setOk', function(e){
				e.preventDefault();
				var newValue = $('#changeValue').val();
				model.changeItem(item, newValue);
				$('#changeValue').val('');
				$.magnificPopup.close();
			});
		};


		function closeModal(e){
			e.preventDefault();
			$('#changeValue').val('');
			$.magnificPopup.close();
		};

		
		return {};
	};
// )