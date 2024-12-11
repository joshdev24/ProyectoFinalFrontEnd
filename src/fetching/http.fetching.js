
export const POST = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'POST',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
		
	}
	
}


export const GET = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'GET',
            ...params
        });
        
        return response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const PUT = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'PUT',
            ...params
            
        });
        return response.json();
    } catch (error) {
        throw error;
    }
};
export const DELETE = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'DELETE',
            ...params
            
        });
        return response.json();
    } catch (error) {
        throw error;
    }
};

const getUnnauthenticatedHeaders = () =>{
	const unnauthenticatedHeaders = new Headers()
	unnauthenticatedHeaders.set('Content-Type', 'application/json')
	unnauthenticatedHeaders.set('x-api-key', 'b18fb255-e3b7-4ba9-9fc6-b52dbf69ae38')
	return unnauthenticatedHeaders
}

const getAuthenticatedHeaders = () => {
	const authenticatedHeaders = new Headers()
	authenticatedHeaders.set('Content-Type', 'application/json')
	authenticatedHeaders.set('x-api-key', 'b18fb255-e3b7-4ba9-9fc6-b52dbf69ae38')
	authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
	return authenticatedHeaders
}



export {getAuthenticatedHeaders,getUnnauthenticatedHeaders}