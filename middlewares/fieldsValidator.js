const { validationResult } = require("express-validator");

const fieldsValidator = (req, res, next) => {
    const errors = validationResult(req) // is req because there are the errors of the check of express validator
  
    // if errors is no empty
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    };
    next();
}

module.exports={
    fieldsValidator
}