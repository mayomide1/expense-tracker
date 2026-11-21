require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./User");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `An account with this email already exists.` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname: fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Account created successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    
    if(email || currentPassword || newPassword === "") {
      return res.status(400).json({ message: "All field are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;

    await user.save();

    res
      .status(200)
      .json({ message: "Password has been changed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete-user/:userId", async(req, res) => {
    try{
        const {userId} = req.params
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({message: "Your account has been deleted sucessfully."})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

const port = process.env.PORT;

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
