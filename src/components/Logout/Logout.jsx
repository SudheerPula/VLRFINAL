

/*
*window.location need to changed to Redirect in React
*/
 const Logout = (history) => {
    const handleLogout = () => {
        localStorage.clear();      
        window.location.href="/login";
        window.location.reload();
      };
    return(
       handleLogout()
    )
}
export {Logout}