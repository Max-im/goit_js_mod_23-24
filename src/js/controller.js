define('Controller', ['jquery', 'Model', 'View'], function() {
  return function Controller(model, view) {
    var self = this;
    view.elements.addBtn.click(addItem);
    view.elements.listContainer.on('click', '.fa-times', removeItem);
    view.elements.listContainer.on('click', '.fa-pencil', openModal);

    function addItem() {
      var newItem = view.elements.input.val();
      model.addItem(newItem);
      view.renderList(model.data);
      view.elements.input.val('');
    }

    function removeItem() {
      var item = $(this).attr('data-value');
      model.removeItem(item);
      view.renderList(model.data);
    }

    function openModal(e) {
      e.preventDefault();
      $('#changeValue').val('');
      var item = $(this).attr('data-value');
      $('#overlay').fadeIn(400, function() {
        $('#modal_form')
          .css('display', 'block')
          .animate({ opacity: 1, top: '50%' }, 200);
      });
      view.elements.modalWindow.on('click', '.setOk', changeItem);
      function changeItem() {
        var newChangeItem = $('#changeValue').val();
        model.changeItem(item, newChangeItem);
        closeModal();
        view.renderList(model.data);
      }
      view.elements.modalWindow.on('click', '.close', closeModal);
      function closeModal() {
        $('#modal_form').animate({ opacity: 0, top: '45%' }, 200, function() {
          $(this).css('display', 'none');
          $('#overlay').fadeOut(400);
        });
      }
    }
  };
});
