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