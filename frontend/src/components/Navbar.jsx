function Navbar({ setToken }) {
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <div className="navbar">
      <h1 className="navbar-title">
        Expense Tracker
      </h1>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;