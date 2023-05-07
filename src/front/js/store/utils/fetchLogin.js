const fetchLogin = async (mail, pass) => {
  localStorage.removeItem("token")
  console.log(mail, pass);
  const tempbody = {
    email: mail,
    password: pass,
  };

  let tempToken = "";

  await fetch(process.env.BACKEND_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempbody),
  })
    .then((res) => res.json())
    .then((res) => (tempToken = res));
  console.log(tempToken);
  localStorage.setItem("token", JSON.stringify(tempToken));
};

export default fetchLogin;
