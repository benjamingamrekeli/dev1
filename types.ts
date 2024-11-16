export interface Customer {
    name:string,
    bearerToken:string,
    credits:number
}

//zie documentatie in https://whapi.readme.io/reference/sendmessagetext
export interface Message {
    recipient:string,
    body:string
}

export interface Group {
    name:string,
    participants:string[]
}

