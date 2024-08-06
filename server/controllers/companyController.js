import UserModel from "../Models/UserModel.js";
import CompanyModel from "../Models/CompanyModel.js";
import validator from "validator";

//************* CREATE COMPANY CONTROLLER **********/
export const createCompanyController = async (req, res) => {
  try {
    // Get user
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Get data
    const {
      companyName,
      description,
      location,
      logo,
      website,
      email,
      industry,
      companySize,
    } = req.body;

    // Validation
    if (!companyName || !website || !email || !industry) {
      return res.status(422).json({
        success: false,
        message: "Please provide all required fields!",
      });
    }

    // Company Name Validation
    if (!validator.isLength(companyName, { min: 3, max: 100 })) {
      return res.status(422).json({
        success: false,
        message: "Name must be between 3 and 100 characters long",
      });
    }

    // Description Validation
    if (
      description &&
      !validator.isLength(description, { min: 10, max: 500 })
    ) {
      return res.status(422).json({
        success: false,
        message: "Description must be between 10 and 500 characters long",
      });
    }

    // Location Validation
    if (location && !validator.isLength(location, { min: 2, max: 100 })) {
      return res.status(422).json({
        success: false,
        message: "Location must be between 2 and 100 characters long",
      });
    }

    // Logo Validation
    if (logo && !validator.isURL(logo)) {
      return res.status(422).json({
        success: false,
        message: "Please provide a valid URL for the logo",
      });
    }

    // Email Validation
    if (!validator.isEmail(email)) {
      return res.status(422).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Website Validation
    if (!validator.isURL(website)) {
      return res.status(422).json({
        success: false,
        message: "Please provide a valid URL for the website",
      });
    }

    // Industry Validation
    const validIndustry = [
      "Technology",
      "Finance",
      "Healthcare",
      "Education",
      "Other",
    ];
    if (!validIndustry.includes(industry)) {
      return res.status(422).json({
        success: false,
        message: "Industry must select from this array!",
      });
    }

    // Company Size Validation
    const validCompanySizes = [
      "1-10",
      "11-50",
      "51-200",
      "201-500",
      "501-1000",
      "1001+",
    ];
    if (!companySize || !validCompanySizes.includes(companySize)) {
      return res.status(422).json({
        success: false,
        message: "Company size is required and must be a valid size range",
      });
    }

    // Check if comapny name is exist or not
    const existingCompanyName = await CompanyModel.findOne({ companyName });
    if (existingCompanyName) {
      return res.status(409).json({
        success: false,
        message: "Company name already exists! Please choose a different name.",
      });
    }

    // Check if email is unique
    const existingEmail = await CompanyModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists! Please use a different email address.",
      });
    }

    const newCompany = new CompanyModel({
      companyName,
      description,
      location,
      logo,
      website,
      email,
      industry,
      companySize,
      ownerId: userId,
    });
    const savedCompany = await newCompany.save();

    // Success res
    return res.status(201).json({
      success: true,
      message: "Company created successfully!",
      data: savedCompany,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
