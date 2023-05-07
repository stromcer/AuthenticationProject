const fetchSignup = (newEmail, newPassword) => {

    let temp_body = {
        email : newEmail,
        password: newPassword,
        is_active: true
    }

    console.log(JSON.stringify(temp_body))

    return fetch(process.env.BACKEND_URL + "/api/singup",{
        method:"POST",
        headers:{
            "Content-Type": "application/JSON"
            
        },
        body: JSON.stringify(temp_body)
    })
}




export default fetchSignup;