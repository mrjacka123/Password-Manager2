import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const { state } = useLocation();
  const [accountType, setAccountType] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [editAccount, setEditAccount] = useState(null); // For editing an account
  const [editAccountType, setEditAccountType] = useState("");
  const [editAccountPassword, setEditAccountPassword] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/accounts/all"
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/accounts/add",
        {
          userEmail: state.email,
          accountType,
          accountPassword,
        }
      );

      setAccountType("");
      setAccountPassword("");
      setAccounts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  const handleUpdateAccount = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/accounts/update/${id}`,
        {
          accountType: editAccountType,
          accountPassword: editAccountPassword,
        }
      );
      setAccounts((prev) =>
        prev.map((account) =>
          account._id === id ? { ...account, ...response.data } : account
        )
      );
      setEditAccount(null); // Close the modal
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/accounts/delete/${id}`);
      setAccounts((prev) => prev.filter((account) => account._id !== id));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const userAccounts = accounts.filter(
    (account) => account.userEmail === state.email
  );

  return (
    <div>
      <h1>Hello, {state.username}</h1>
      <p>Email: {state.email}</p>
      <br />
      <Link to="/">
        <button>Logout</button>
      </Link>
      <br />

      <form onSubmit={handleAddAccount}>
        <label htmlFor="accountType">Account type</label>
        <input
          type="text"
          id="accountType"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
        />
        <br />

        <label htmlFor="accountPassword">Account password</label>
        <input
          type="password"
          id="accountPassword"
          value={accountPassword}
          onChange={(e) => setAccountPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit" className="btn btn-primary">
          Add Account
        </button>
      </form>

      <h2>Added Accounts</h2>
      <ul>
        {userAccounts.map((account) => (
          <li key={account._id}>
            {account.accountType} - {account.accountPassword}
            <button
              onClick={() => {
                setEditAccount(account);
                setEditAccountType(account.accountType);
                setEditAccountPassword(account.accountPassword);
              }}
              className="btn btn-warning btn-sm mx-2"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteAccount(account._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {editAccount && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditAccount(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label>Account Type</label>
                <input
                  type="text"
                  value={editAccountType}
                  onChange={(e) => setEditAccountType(e.target.value)}
                  className="form-control"
                />
                <label>Account Password</label>
                <input
                  type="password"
                  value={editAccountPassword}
                  onChange={(e) => setEditAccountPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setEditAccount(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => handleUpdateAccount(editAccount._id)}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
