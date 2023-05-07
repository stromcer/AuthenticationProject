const fetchPrivate = async (handleOk) => {
  const token = localStorage.getItem("token");
  const tokenBueno = JSON.parse(token) 
  const Auth = `Bearer ${tokenBueno}` ;

  return fetch(process.env.BACKEND_URL + "/api/private", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": Auth,
    },
  })
    .then((res) => res.json())
    .then((res) => handleOk(res) )
    .catch((e) => (console.log(e)));
};

export default fetchPrivate;
