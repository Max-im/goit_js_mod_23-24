// define(
// 	'view',
// 	[],
	function Model(newData){
		var self = this;
		self.data = newData;
		


		self.addItem = function(item){

			if(item.length === 0){
				return;
			}

			self.data.push(item);
			return self.data;
		};
		self.removeItem = function(item){
			var index = self.data.indexOf(item);
			
			if( index === -1){
				return;
			}

			self.data.splice(index, 1);
			return self.data;
		};

		self.changeItem = function(item, newValue){

			var index = self.data.indexOf(item);
			console.log(self.data);
			if( index === -1){
				return;
			}
 			// self.data[index] = newValue;
 			self.data.splice(index, 1, newValue);
 			$('.span')[index].innerHTML = newValue;
 			console.log(index);


			return self.data;
		};
	};
// )






