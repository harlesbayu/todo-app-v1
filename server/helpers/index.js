const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');

module.exports = {
    generatePassword: function (email, password) {
        return new Promise(function (resolve, reject) {
            const saltRound = 10
            const emailPassword = email + password
            bcrypt.genSalt(saltRound, function (err, salt) {
                bcrypt.hash(emailPassword, salt, function (err, hash) {
                    if (!err) {
                        resolve(hash)
                    } else {
                        reject(err)
                    }

                })
            })
        })
    },

    checkPassword: function (salt, password, email) {
        return new Promise((resolve, reject) => {
            const emailPassword = email + password
            bcrypt.compare(emailPassword, salt, function (err, data) {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            });
        })
    },

    sendMailConf: function (userAccount) {
        
      // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_ACCOUNT_EMAIL, // generated ethereal user
                    pass: process.env.USER_PASSWORD_EMAIL // generated ethereal password
                }
            });
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"todolistApp@todo.com', // sender address
                to: userAccount, // list of receivers
                subject: 'Registration todolistApp Complete', // Subject line
                html: 'Selamat bergabung di TodoListApp, selalu catat kegiatanmu di aplikasi kami ya, buatlah harimu-harimu dengan kegiatan yang positif' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                // console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });

    }
}