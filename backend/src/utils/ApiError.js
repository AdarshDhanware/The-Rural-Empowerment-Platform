class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode,
        this.data=null, // read it at chat gpt (what is in this.data)
        this.errors=errors, 
        this.message=message,
        this.success=false

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor);
        }

    }

}


export {ApiError} // for multiple times usage
// export default ApiError   // this means only for one export