import User from "../models/user.js";
import OTP from "../models/otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const initiateSignupService = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Create OTP record
    // Note: OTP model should handle hashing if set up, but let's double check usage.
    // The OTP model has a pre-save hook that hashes 'otp' field.
    // So we pass the PLAIN otp here.
    await OTP.create({
        email,
        otp,
        expiresAt
    });

    // console.log(`Generated OTP for ${email}: ${otp}`); 

    // Return OTP to caller for now (since no email service)
    return { otp };
};

export const verifySignupOtpService = async ({ email, otp, name, password, role }) => {
    // Find latest OTP for email
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
        throw new Error("Invalid or expired OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
        throw new Error("OTP expired");
    }

    // Verify OTP
    // The stored otp is hashed.
    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
        throw new Error("Invalid OTP");
    }

    // Create User
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Clean up OTPs
    await OTP.deleteMany({ email });

    // Return user without password
    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

export const loginService = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "your_jwt_secret_key", // Fallback if env not set
        { expiresIn: "1d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};
