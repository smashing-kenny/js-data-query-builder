export default class WhereExpression{
	
	constructor(){
		this.expressions = [];
		this.disjunction = false;
	}

	not(){
		this.disjunction = true;
		return this;
	}

	equal(name, constant){
		this.expressions.push({'TYPE': 'EQUAL', 'NAME': name, 'CONSTANT': constant, 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}

	greater(name, constant){
		this.expressions.push({'TYPE': 'GREATER', 'NAME': name, 'CONSTANT': constant, 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}

	less(name, constant){
		this.expressions.push({'TYPE': 'LESS', 'NAME': name, 'CONSTANT': constant, 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}

	greaterEqual(name, constant){
		this.expressions.push({'TYPE': 'GREATER_EQUAL', 'NAME': name, 'CONSTANT': constant, 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}

	lessEqual(name, constant){
		this.expressions.push({'TYPE': 'LESS_EQUAL', 'NAME': name, 'CONSTANT': constant, 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}


	like(name, constant){
		this.expressions.push({'TYPE': 'LIKE', 'NAME': name, 'CONSTANT': constant, 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}

	between(name, begin, end){
		this.expressions.push({'TYPE': 'BETWEEN', 'NAME': name, 'CONSTANT': [begin, end], 'DISJUNCTION': this.disjunction});
		this.disjunction = false;
		return this;
	}

}
