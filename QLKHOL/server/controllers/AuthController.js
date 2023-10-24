const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const transporter = require("../config/transporter");
const otpGenerator = require("otp-generator");
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");
const Otp = require("../models/Otp");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      // Tìm người dùng trong database
      const user = await User.findOne({ email });
      if (user && user.password === password) {
        // Tạo JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, "QLKH", {
          expiresIn: "1h",
        });
        // Tạo user response data
        const userWithoutPassword = { ...user.toObject(), password: undefined };

        res.cookie("jwt_token", token, { httpOnly: true, secure: true });
        res.json({ success: true, data: userWithoutPassword, token });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  async register(req, res) {
    const { email } = req.body;

    const userExist = await User.findOne({ email: email });
    if(userExist) {
      res.json({
        success: false,
        message: "Email này đã được đăng kí rồi!",
      });
    }


    // Save OTP to database
    const saveOTP = async (otp) => {
      var newOtp = new Otp();
      newOtp.code = otp;
      newOtp.email = email;
      try {
        const savedOTP = await newOtp.save();
        if (savedOTP) {
          console.log("Lưu OTP thành công");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Generator OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    // Email option template
    const mailOptions = {
      from: "haizero191@gmail.com",
      to: email,
      subject: "Welcome to EduConnect",
      html: `<p>Please enter your OTP to verify account create: <strong>${otp}</strong></p>`,
    };

    // Send the OTP code to user by email verify
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send("Email sending failed.");
      } else {
        saveOTP(otp);
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: true,
          message: "OTP already send to your mail check this and verify!",
        });
      }
    });
  }

  async verifyOTP(req, res) {
    const { data, otp } = req.body;
  
    if (otp) {
      const otpRecord = await Otp.findOne({ email: data.email });
      if (otpRecord && otpRecord.code === otp) {
        try {
          const deleteOtp = await Otp.findByIdAndDelete(otpRecord._id);
          // Create new user here --------------------------------------
          try {
            const user = new User(data);
            const savedUser = await user.save();
            res
              .status(200)
              .json({ success: true, message: "Register successfully !" });
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
          //------------------------------------------------------------
        } catch (error) {
          res.json({ message: "OTP is incorrect !" });
        }
      } else {
        res.json({ message: "OTP was error ! please try again" });
      }
    }
  }

  async checkRole(req, res) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Kiểm tra định dạng Authorization header
      const token = authHeader.split(" ")[1]; // Lấy phần token sau từ "Bearer"
      // Giải mã và xác thực JWT
    jwt.verify(token, "QLKH", (err, userDecoded) => {
        if (err) {
          // JWT không hợp lệ
          return res
            .status(401)
            .json({ status: false, message: "Invalid token" });
        }
        // Kiểm tra vai trò của người dùng từ thông tin trong JWT
        if (userDecoded.role === "user") {
          return res
            .status(200)
            .json({ status: true, message: "Wellcome User :>", permission: 0 });
        }
        if (userDecoded.role === "teacher") {
          return res.status(200).json({
            status: true,
            message: "Wellcome Teacher :>",
            permission: 1,
          });
        }
        if (userDecoded.role === "admin") {
          return res.status(200).json({
            status: true,
            message: "Wellcome Admin :>",
            permission: 2,
          });
        }
        // Người dùng không phải admin, từ chối truy cập
        return res
          .status(403)
          .json({ status: false, message: "Access denied" });
      });
    } else {
      // Không có Authorization header trong yêu cầu
      return res.status(401).json({ message: "Missing token" });
    }
  }
}

module.exports = new AuthController();
