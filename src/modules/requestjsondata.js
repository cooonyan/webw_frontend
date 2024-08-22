export async function requestbackend(RequestDataName, RequestDataValue){
    const postData = { [RequestDataName]: RequestDataValue };
    try {
        const response = await fetch('http://127.0.0.1:5000/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(postData) 
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log(result);
        } else {
            console.error('Expected JSON response but received:', contentType);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export default requestbackend
