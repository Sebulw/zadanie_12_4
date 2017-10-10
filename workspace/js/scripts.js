$(function() {
// function generating id for columns
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();
		function createColumn() {
		// creating components of column
			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete btn btn-danger').text('x'),
				$columnAddCard = $('<button>').addClass('add-card btn btn-success').text('Add a card');
		// adding events
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Enter the name of the card')));
			});
		// construction column element
			$column.append($columnTitle)
				   .append($columnDelete)
				   .append($columnAddCard)
				   .append($columnCardList);
		// return of created column
			return $column;
		}
	}
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();
		function createCard() {
		// creating components of card
			var $card = $('<li>').addClass('card'),
				$cardDescription = $('<p>').addClass('card-description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete btn btn-danger').text('x');
		// adding event
			$cardDelete.click(function() {
				self.removeCard();
			});
		// construction card element
			$card.append($cardDelete)
				 .append($cardDescription);
		// return of a card
			return $card;
		}
	}
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};
	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};
// jQueryUI function used to drag and drop cards
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeHolder: 'card-placeholder'
		}).disableSelection();
	}
// event for creating columns
	$('.create-column').click(function(){
		var name = prompt('Enter a column name'),
			column = new Column(name);
		board.addColumn(column);
	});
// creating columns
	var todoColumn = new Column('To do'),
		doingColumn = new Column('Doing'),
		doneColumn = new Column('Done');
// adding new columns to board
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
// creating new cards
	var card1 = new Card('New task'),
		card2 = new Card('Create kanban boards');
// adding cards to column
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});