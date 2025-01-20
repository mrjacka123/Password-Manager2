import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Home.css";
import {
  Key,
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Settings,
  User,
} from "lucide-react";
import Footer from "./Footer";
import Swal from "sweetalert2";

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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

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
      Toast.fire({
        icon: "success",
        title: "Account added successfully",
      });
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
      Toast.fire({
        icon: "success",
        title: "Account updated successfully",
      });
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleDeleteAccount = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this account? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/accounts/delete/${id}`);
          setAccounts((prev) => prev.filter((account) => account._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The account has been deleted.",
            timer: 2000,
          });
        } catch (error) {
          console.error("Error deleting account:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong. Unable to delete the account.",
          });
        }
      }
    });
  };

  const userAccounts = accounts.filter(
    (account) => account.userEmail === state.email
  );

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#28282B" }}
      className="d-flex flex-column"
    >
      <div
        style={{ backgroundColor: "#28282B" }}
        className="container flex-grow-1 mt-5"
      >
        <h1 className="display-4 text-center text-primary mb-4">
          Hello, {state.username}
        </h1>

        <div
          style={{ gap: "5px" }}
          className="d-flex justify-content-center mb-4"
        >
          <button className="btn btn-secondary btn-lg">
            <Settings />
          </button>
          <Link to="/">
            <button className="btn btn-danger btn-lg">
              <LogOut />
            </button>
          </Link>
        </div>
        <hr style={{ border: "solid 2px white", marginBottom: "30px" }} />

        <div className="d-flex mb-4">
          <button
            type="button"
            className="btn btn-success btn-md"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            +<User size={20} /> Add Account
          </button>
        </div>
        {/* Add Account Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-black text-white">
              <div className="modal-header bg-black">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add New Account
                </h1>
                <button
                  type="button"
                  className="btn-close bg-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddAccount}>
                  <div className="mb-3">
                    <label htmlFor="accountType" className="form-label">
                      Username or Email
                    </label>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      id="accountType"
                      className="form-control bg-dark text-white"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="accountPassword" className="form-label">
                      Password
                    </label>
                    <input
                      style={{ border: "none" }}
                      type="password"
                      id="accountPassword"
                      className="form-control bg-dark text-white"
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="modal-footer bg-black">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-center text-secondary m-4">Your Accounts</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {userAccounts.map((account) => (
            <div key={account._id} className="col">
              <div
                style={{ backgroundColor: "#212121", color: "#fff" }}
                className="card shadow-sm mb-3"
              >
                <div className="card-body">
                  <h5 className="card-title">
                    Username: {account.accountType}
                  </h5>
                  <p className="card-text">
                    Password: {account.accountPassword.replace(/./g, "*")}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => {
                        setEditAccount(account);
                        setEditAccountType(account.accountType);
                        setEditAccountPassword(account.accountPassword);
                      }}
                      className="btn btn-warning btn-sm text-white"
                    >
                      <Edit2 size={25} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteAccount(account._id)}
                    >
                      <Trash2 size={25} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editAccount && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-black text-white">
                <div className="modal-header bg-black">
                  <h5 className="modal-title">Update Account</h5>
                  <button
                    type="button"
                    className="btn-close bg-white"
                    onClick={() => setEditAccount(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateAccount(editAccount._id);
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="editAccountType" className="form-label">
                        Username or Email
                      </label>
                      <input
                        type="text"
                        id="editAccountType"
                        className="form-control bg-dark text-white"
                        value={editAccountType}
                        onChange={(e) => setEditAccountType(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="editAccountPassword"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="editAccountPassword"
                        className="form-control bg-dark text-white"
                        value={editAccountPassword}
                        onChange={(e) => setEditAccountPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="modal-footer bg-black">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditAccount(null)}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Update Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
