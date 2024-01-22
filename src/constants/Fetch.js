const handleFuncPOST = async () => {
    try {
        if (!localStorage.token) {
            // return navigate('/login')
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/url` , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
            //    body data key-pair values
            })
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        console.log(data);
        // set data to state if needed

        // alert the success if needed
    }
    catch (error) {
        console.error('Fetch error:', error);
        // alert the error 
        // Swal.fire({
        //     title: 'Error!',
        //     text: 'Fetch error: ' + error,
        //     icon: 'error',
        //     confirmButtonText: 'OK'
        // });
    }

}

const handleFuncDELETE = async (id) => {
    try {
        if (!localStorage.token) {
            // return navigate('/login')
        }
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/delete_cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        console.log(data);
        // after delete please call get request to fetch updated data
        // fetchCart()
    }
    catch (error) {
        console.error('Fetch error:', error);
        // Swal.fire({
        //     title: 'Error!',
        //     text: 'Fetch error: ' + error,
        //     icon: 'error',
        //     confirmButtonText: 'OK'
        // });
    }
}

const handleFuncGET = async () => {
        try {
            if (!localStorage.token) {
                // return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/my-cart`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            //set data to state
            // setCart(data)
        }
        catch (error) {
            console.error('Fetch error:', error);
            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Fetch error: ' + error,
            //     icon: 'error',
            //     confirmButtonText: 'OK'
            // });
        }
}


{/*
    HTTP post  

    --> create a function above the return statement
    --> call the function in the return statement IN THE BUTTON or any statefull element


    HTTP delete

    --> create a function above the return statement
    --> call the function in the return statement IN THE BUTTON or any statefull element

    
    HTTP GET

    --> create a function above the return statement
    --> cal the function in function or UseEffect

*/}