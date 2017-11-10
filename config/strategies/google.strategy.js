let GoogleStrategy = require('passport-google-oauth20').Strategy
    , passport = require('passport')
    , mailController = require('../../sendgrid/controller');

let User = require('../../schema/db').User;
let secrets = require('../../secrets.json');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: secrets.GOOGLE_CLIENT_ID,
            clientSecret: secrets.GOOGLE_CLIENT_SECRET,
            callbackURL: secrets.GOOGLE_CALLBACK
        },
        function(accessToken, refreshToken, profile, done) {
            // console.log(accessToken , refreshToken , profile , done);
            User.findOne({
                where: { member_id: profile.id }
            }).then(async (user)=>{
                if(user === null){
                    console.log('not found');
                    try{
                        let user = await User.create({
                            member_id: profile.id,
                            token: accessToken,
                            url: profile._json.url,
                            username : profile.displayName,
                            email : profile.emails[0].value,
                            profile_dp : profile._json.image.url
                        });
                        // console.log(user);
                        mailController.welcomeMailController(user.email);
                        done(null, user);
                    }catch (err){
                        console.log("data base error");
                        done(err);
                    }

                }else {
                    console.log('found');
                    done(null, user);
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    ));
};