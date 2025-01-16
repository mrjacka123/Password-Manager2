import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [accountData, setAccountData] = useState({
    username: "",
    password: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // For editing

  // Fetch all accounts
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://password-manager2-alpha.vercel.app/api/accounts"
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  // Add new account
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://password-manager2-alpha.vercel.app/api/accounts",
        accountData
      );
      alert(response.data.message);
      fetchAccounts();
      setAccountData({ username: "", password: "" });
    } catch (error) {
      console.error("Failed to add account", error);
      alert("Failed to add account");
    }
  };

  // Handle update button click (open modal)
  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setAccountData(account);
  };

  // Update account
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://password-manager2-alpha.vercel.app/api/accounts/${selectedAccount._id}`,
        accountData
      );
      alert(response.data.message);
      fetchAccounts();
      setSelectedAccount(null); // Close modal
    } catch (error) {
      console.error("Failed to update account", error);
      alert("Failed to update account");
    }
  };

  // Delete account
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?"))
      return;
    try {
      const response = await axios.delete(
        `https://password-manager2-alpha.vercel.app/api/accounts/${id}`
      );
      alert(response.data.message);
      fetchAccounts();
    } catch (error) {
      console.error("Failed to delete account", error);
      alert("Failed to delete account");
    }
  };

  return (
    <div>
      <h1>Welcome to Account Manager</h1>

      {/* Add Account Modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        Add Account
      </button>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Account</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={accountData.username}
                  onChange={handleChange}
                  className="form-control mb-3"
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={accountData.password}
                  onChange={handleChange}
                  className="form-control mb-3"
                  required
                />

                <button type="submit" className="btn btn-primary">
                  Add Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Update Account Modal */}
      {selectedAccount && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedAccount(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={accountData.username}
                    onChange={handleChange}
                    className="form-control mb-3"
                    required
                  />

                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={accountData.password}
                    onChange={handleChange}
                    className="form-control mb-3"
                    required
                  />

                  <button type="submit" className="btn btn-primary">
                    Update Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account List */}
      <div className="mt-5">
        <h2>Account List</h2>
        <ul>
          {accounts.map((account) => (
            <li key={account._id}>
              {account.username} - {account.password}
              <button
                onClick={() => handleEditClick(account)}
                className="btn btn-sm btn-warning mx-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(account._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
