const nodemailler = require('nodemailer');

exports.getIndexPage = (req, res) =>
  res.status(200).render('index', { pageName: 'index' });

exports.getAboutPage = (req, res) =>
  res.status(200).render('about', { pageName: 'about' });

exports.getContactPage = (req, res) =>
  res.status(200).render('contact', { pageName: 'contact' });

exports.sendMail = async (req, res) => {
  const message = `
        <h1>Email Details</h1>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>EMail: ${req.body.email}</li>
        </ul>
        <h2>Message</h2>
        <p>${req.body.message}</p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = await nodemailler.createTransport({
    host: 'smtp.google.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.APP_EMAIL_USER, // generated ethereal user
      pass: process.env.APP_EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Sedu Contact Mail" <${process.env.APP_EMAIL_USER}>`, // sender address
    to: `${process.env.APP_EMAIL_TO}, ${process.env.APP_EMAIL_TO}`, // list of receivers
    subject: 'Sedu Contact Mail New Message ✔', // Subject line
    html: message,
  });

  req.flash('success', 'We Recevied Your Messages Successfully');

  res.redirect('/contact');
};
