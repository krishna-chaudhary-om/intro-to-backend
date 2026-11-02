import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body ?? {};

        if (!username || !email || !password) {
            return res.status(400).json({ message: "username, email and password are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const exists = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });
        if (exists) {
            return res.status(409).json({ message: "User with this email or username already exists" });
        }

        const user = await User.create({ username, email, password });

        return res.status(201).json({
            message: "User registered successfully",
            user: { _id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user || !(await user.isPasswordCorrect(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: { _id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    // No tokens/cookies yet, so there is nothing to clear on the server.
    return res.status(200).json({ message: "Logged out successfully" });
};
