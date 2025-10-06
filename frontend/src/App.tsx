import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const callApi = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch("http://localhost:3001/private", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div style={{ padding: 40 }}>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <>
          <p>Olá, {user?.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
          <button onClick={callApi}>Chamar API Protegida</button>
        </>
      )}
    </div>
  );
}
