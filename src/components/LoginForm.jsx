import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [shakeForm, setShakeForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: false
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => setErrors({}), 400);
    }
  }, [errors]);


  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.username.trim()) newErrors.username = true;
    if (!form.password.trim()) newErrors.password = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Login Success ✅");
      setLoading(false);
    }, 1500);
  };

  const triggerShake = () => {
    setShakeForm(false); // reset
    setTimeout(() => setShakeForm(true), 10);
  };

  const handleReset = () => {
    setForm({ username: "", password: "" });
    setErrors({});
    setShakeForm(false);
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        
          <h4 className="text-center mb-4">Login</h4>

          {/* FORM WRAPPER */}
          <div className={shakeForm ? "form-shake" : ""}>
            <form noValidate onSubmit={handleSubmit}>
              {/* Username */}
              <div className="form-floating mb-3">
                <input
                  className={`form-control ${errors.username ? "input-error" : ""
                    }`}
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label>Username</label>
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.password ? "input-error" : ""
                    }`}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label>Password</label>
              </div>

              {/* Buttons */}
              <div className="d-grid gap-3">
                <button type="submit" className="btn btn-primary">
                  {loading ? "Logging in..." : "Login"}
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default LoginForm;
