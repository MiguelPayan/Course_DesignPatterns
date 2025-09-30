class QueryBuilder {

    private query: Query;

    constructor(){
        this.query = new Query("EMPLEADOS");
    }

    select(... fields: string[]): QueryBuilder{
        this.query.fields = fields;
        return this;
    }

    where(conditions: string):QueryBuilder{
        this.query.conditions.push(conditions);
        return this;
    }

    orderBy(orderfield:string, type: 'ASC' | 'DESC' = 'ASC'): QueryBuilder{
        let orderClause:string = `${orderfield} ${type}`
        this.query.orderFields.push(orderClause);
        return this;
    }

    limit(limitCount: number):QueryBuilder{
        this.query.limitCount = limitCount;
        return this;
    }

    build():Query{
        return this.query;
    }
}

class Query{
    public table: string;
    public fields: string[] = [];
    public conditions: string[] = [];
    public orderFields: string[] = [];
    public limitCount?: number;

    constructor(table: string) {
        this.table = table;
    }

    execute(){
        let limitCount: string = (this.limitCount != undefined) ? `TOP ${this.limitCount}` : "";
        let fields: string = (this.fields.length > 0) ? this.fields.join(", ") : "*";
        let conditions: string = (this.conditions.length > 0) ? `WHERE ${this.conditions.join(" AND ")}` : "";
        let orderFields: string = (this.orderFields.length > 0) ? `ORDER BY ${this.orderFields.join(", ")}` : "";
        return `SELECT ${limitCount} ${fields} 
            FROM ${this.table} 
            ${conditions}
            ${orderFields}`
    }
}

function mainhomework(){
    const query: Query = new QueryBuilder()
    .select("Nombre","Edad")
    .where("Nombre = 'Miguel'")
    .where("Edad > 18")
    .limit(10)
    .orderBy("Nombre",)
    .orderBy("Edad","DESC")
    .build();

    console.log(query.execute());
    
}

mainhomework();