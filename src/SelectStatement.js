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
			}

			xhr.send(JSON.stringify(body));
		});
	}
}