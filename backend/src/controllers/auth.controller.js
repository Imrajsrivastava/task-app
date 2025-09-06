import { registerUser, loginUser } from "../services/auth.service.js";

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await registerUser(email, password);
    setTokenCookie(res, token);
    console.log("user singed up:", user);
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    setTokenCookie(res, token);
    console.log("user logged in:", user);
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
