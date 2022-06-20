// MODEL
class Model {
	constructor(list) {
		this.list = list;
	}

	addItem(item) {
		if (item.trim().length === 0) return;
		this.list.push(item);
		return this.list;
	}

	removeItem(index) {
		this.list.splice(index, 1);
		return this.list;
	}

	changeItem(index, newVal) {
		this.list.splice(index, 1, newVal);
		return this.list;
	}
}

// VIEW
class View {
	constructor() {
		this.classes = {
			delete: "fa-trash-alt",
			edit: "fa-pencil-alt",
			closeModal: "fa-times-circle"
		};
		this.elements = {
			input: $(".input"),
			listContainer: $(".list"),
			delete: $("." + this.classes.delete),
			edit: $("." + this.classes.edit),
			form: $(".form"),
			overlay: $(".overlay"),
			modal: $(".changeModal"),
			modalInput: $(".modalInput"),
			closeModal: $("." + this.classes.closeModal)
		};
	}

	render = list => {
		const html = this._constructList(list);
		this.elements.listContainer.html(html);
	};

	_constructList = list => {
		const html = list
			.map(
				(item, i) => `<li class="item mb-2" data-index="${i}">
			<p class="item__content">${item}</p>
<div class="item__control">
			<i class="btn btn-warning fas ${this.classes.edit}"></i>
			<i class="btn btn-danger fas ${this.classes.delete}"></i>
</div>
		<li>`
			)
			.join("");
		return html;
	};
}

// CONTROLLER
class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	init = () => {
		$(".container").on(
			"click",
			"." + this.view.classes.closeModal,
			this._closeModal
		);
		this.view.elements.modal.on("submit", this._saveChangedItem);
		this.view.elements.listContainer.on(
			"click",
			"." + this.view.classes.delete,
			this._removeItem
		);
		this.view.elements.listContainer.on(
			"click",
			"." + this.view.classes.edit,
			this._openModal
		);
		this.view.elements.form.on("submit", this._addItem);
		this.view.render(this.model.list);
	};

	_addItem = e => {
		e.preventDefault();
		const val = this.view.elements.input.val();
		this.model.addItem(val);
		this.view.render(this.model.list);
		this.view.elements.input.val("");
	};

	_removeItem = e => {
		const index = $(e.target)
			.closest(".item")
			.data("index");
		this.model.removeItem(index);
		this.view.render(this.model.list);
	};

	_openModal = e => {
		this.view.elements.overlay.removeClass("d-none");
		const index = $(e.target)
			.closest(".item")
			.data("index");
		const text = $(e.target)
			.closest(".item")
			.find(".item__content")
			.text()
			.trim();
		this.view.elements.modalInput
			.data("target", index)
			.val(text)
			.focus();
	};

	_closeModal = () => {
		this.view.elements.modalInput.removeData("target").val("");
		this.view.elements.overlay.addClass("d-none");
	};

	_saveChangedItem = e => {
		e.preventDefault();
		const input = this.view.elements.modalInput;
		const index = input.data("target");
		const newVal = input.val();
		if (newVal.trim().length > 0) {
			this.model.changeItem(index, newVal);
			this.view.render(this.model.list);
		}
		this._closeModal();
	};
}

const initList = ["create module", "create view", "create controller"];

const model = new Model(initList);
const view = new View();
const controller = new Controller(model, view);

controller.init();
