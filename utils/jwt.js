const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');
const Company = require('../models/Company');

const createToken = async (email, id, claim = null) => {
    try {
        const worker = await Worker.findOne({ email: email });
        var company = await Company.findOne({ ownerId: id });

        if(worker && !company) {
            company = { _id: worker.companyId };
        }

        const token = await jwt.sign({
            email,
            id,
            claim,
            workerId: worker ? worker._id : null,
            companyId: company ? company._id : null,
            companyOwner: company.ownerId,
        }, process.env.SECRET, {
            expiresIn: process.env.EXPIRES_IN,
        });

        return token;
    } catch(err) {
        console.log(err);
    }
}

const decodeToken = async (token) => {
    try {
        const decodedToken = await jwt.decode(token);
        return decodedToken;
    } catch(err) {
        console.log(err);
    }
}

const verifyToken = async (token) => {
    try {
        const verifiedToken = await jwt.verify(token, process.env.SECRET);
        return verifiedToken;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createToken,
    decodeToken,
    verifyToken,
}