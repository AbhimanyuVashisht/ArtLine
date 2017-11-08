let GoogleStrategy = require('passport-google-oauth20').Strategy
    , passport = require('passport')
    , sequelize = require('sequelize');
let User = require('../../schema/db').User;
let secrets = require('../../secrets.json');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: secrets.GOOGLE_CLIENT_ID,
            clientSecret: secrets.GOOGLE_CLIENT_SECRET,
            callbackURL: secrets.GOOGLE_CALLBACK
        },
        function(accessToken, refreshToken, profile, done) {
            // console.log(req ,accessToken , refreshToken , profile , done);
            User.findOne({
                where: { member_id: profile.id }
            }).then((user)=>{
                console.log('found');
                done(null, user);
            }).catch((err)=>{
                console.log('not found');
                let user = new User({
                    member_id: profile.id,
                    token: accessToken,
                    username : profile.displayName,
                    profile_dp : profile._json.image.url,
                    email : profile.emails[0].value
                });
                user.save(user , function(err ,user){
                    if(err){
                        console.log("date base error");
                        done(err);
                    }
                    else{
                        done(null,user);
                    }
                });
            });
        }
    ));
};