var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var SALTWORKFACTOR = 10;

// *An undertain error happens here if I add somemore limit to the fields.
var UserSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String},
    firstName: { type: String },
    lastName: { type: String },
    company: { type: String },
    createdOn: { type: Date, default: Date.now },
    lastSignon: { type: Date, default: Date.now},
});

UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALTWORKFACTOR, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password){
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
