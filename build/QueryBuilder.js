(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QueryBuilder = factory());
}(this, (function () { 'use strict';

	class WhereExpression{
		
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

	class SelectStatement extends WhereExpression{

		constructor(url, interfaces){
			super();
			this.url = url;
			this.interfaces = interfaces;
		}

		returning(returning){
			this.returning = returning;
			return this;
		}


		execute(){

			const body = {
				'STATEMENT': 'SELECT',
				'EXPRESSIONS': this.expressions,
				'RETURNING': this.returning,
				'INTERFACE': this.interfaces
			}; 

			const url = this.url;

			return new Promise((resolve, reject) => {

				const xhr = new XMLHttpRequest();
				xhr.open('POST', url, true);
				xhr.responseType = 'json';
		
				xhr.onload = () => {
					resolve(xhr.response);
				};
				
				xhr.onerror = () => {
					reject(xhr.statusText);
				};

				xhr.send(JSON.stringify(body));
			});
		}
	}

	class QueryBuilder{

		constructor(url){
			this.url = url;
		}

		select(model){
			const select = new SelectStatement(this.url, model['INTERFACE'])
				.returning(model['RETURNING']);

			return select;
		}
	}

	return QueryBuilder;

})));
