var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String},
    email: { type: String, unique: true, lowercase: true },
    password: String,
    notifications: [{
        associatedId: { type : mongoose.Schema.Types.ObjectId },
        commentedBy: String,
        type: String,
        date: {type: Date, default: Date.now}
    }],
    followers:{
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    },
    following: {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    },

    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    tokens: Array,

    profile: {
        name: { type: String, default: '' },
        gender: { type: String, default: '' },
        city: { type: String, default: '' },
        country: { type: String, default: '' },
        website: { type: String, default: '' },
        picture: { type: String, default: '' }
    },
    work:[
        {
            name:{type:String,default:''},
            position:{type:String,default:''},
            start:{type:String,default:''},
            end:{type:String,default:''}
        }
    ],
    school:[
        {
            name:{type:String,default:''},
            degree:{type:String,default:''},
            start:{type:String,default:''},
            end:{type:String,default:''}
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function(size) {
    if (!size) size = 200;
    if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=wavatar&r=pg';
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('User', userSchema);