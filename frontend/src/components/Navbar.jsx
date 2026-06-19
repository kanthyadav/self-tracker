function Navbar({ setToken }) {
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;