import { body, validationResult } from "express-validator";
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const error = validationResult(req);
        if (error.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: error.array() });
    };
};
const signinValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain atleast 6 characters"),
];
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...signinValidator
];
const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Name is required"),
];
// export const SignUpValidate = validate(signupValidator) ---  can be passed like that as well
export { signupValidator, validate, signinValidator, chatCompletionValidator };
//# sourceMappingURL=validators.js.map