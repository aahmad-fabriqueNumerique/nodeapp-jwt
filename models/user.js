const mongoose = require('mongoose');
const crypto = require('crypto');

// Creating user schema 
const UserSchema = mongoose.Schema({
    // email: String,
    // password: String

    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

// CAN STOP HERE

// Method to set salt and hash the password for a user 
UserSchema.methods.setPassword = function(password) {

    this.salt = crypto.randomBytes(16).toString('hex'); // Creating a unique salt for a particular user 
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); // Hashing user's salt and password with 1000 iterations, 
};

// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};
module.exports = mongoose.model('user', UserSchema, 'jwtusers')


// HMAC (Hash-Based Message Authentication Codes) 
// The crypto.pbkdf2Sync() method gives a synchronous Password-Based Key Derivation Function 2 i.e, (PBKDF2) implementation. Moreover, a particular HMAC digest algorithm which is defined by digest is implemented to derive a key of the required byte length (keylen) from the stated password, salt, and iterations. 

// Parameters: This method accepts five parameters as mentioned above and described below:

// password: It is of type string, Buffer, TypedArray, or DataView.
// salt: It must be as unique as possible. However, it is recommended that a salt is arbitrary and in any case, it is at least 16 bytes long. It is of type string, Buffer, TypedArray, or DataView.
// iterations: It must be a number and should be set as high as possible. So, the more is the number of iterations, the more secure the derived key will be, but in that case, it takes a greater amount of time to complete. It is of type number.
// keylen: It is the key of the required byte length and it is of type number.
// digest: It is a digest algorithm of string type.