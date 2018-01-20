/**
 * Created by ditsc on 16.10.2017.
 */
const express = require('express');
const router = express.Router();
const ical = require('node-ical');
const nodemailer = require('nodemailer');
const S = require('string');
const moment = require('moment');
const path = require('path');
const https = require('https');
const fs = require('fs');

// declare mongojs & connect
var mongojs = require('mongojs');
var db = mongojs('max:max@ds119685.mlab.com:19685/moos');
//Ical 'http://lanyrd.com/topics/nodejs/nodejs.ics'  || airbnb : https://www.airbnb.de/calendar/ical/6713316.ics?s=1c409705409c6f5b9de6118abe596147
router.get('/ical',function (req, res){
  ical.fromURL('http://www.airbnb.de/calendar/ical/6713316.ics?s=1c409705409c6f5b9de6118abe596147',{}, function(err, data) {
    for (var k in data ){
      if(data.hasOwnProperty(k)){
        var ev = data[k];
        console.log("Conference",
          ev.summary
        )
      }
    }
    res.send(data);
  });
});

router.get('/file',function (req, res){
    let result = [];
    let dates = [];
    let ints =  [];
    let sliced = [];
    let final = [];
    let final_pret = [];
    let today = moment();


    //Get Data from ICS FILE
    var data = ical.parseFile('server/routes/bookings.ics');
    for (var k in data ){
      if(data.hasOwnProperty(k)){
        var ev = data[k];
        result.push( ev.description);
      }
    }

    //filter out numbers of file || filter nulls
    for ( var r in result){
      if(result[r] != null){
        dates.push(result[r].match(/\d+/g));
        // console.log(result[r]);
        // console.log(r);
      }
    }

    //Filter out Dates || parseInt --> create Dates push -> final
    for ( var sl in dates){
      sliced[sl] = dates[sl].slice(0,6);
      sliced[sl].slice(0,6);

         //For through every number in Each EVENT
        for( var dt in dates[sl]){
          sliced[sl][dt]  = parseInt(dates[sl][dt]);
        }

        //Create Date && get nights
        var check_in = moment([sliced[sl][2],sliced[sl][1]-1,sliced[sl][0]]);
        var check_out = moment([sliced[sl][5],sliced[sl][4]-1,sliced[sl][3]]);
        var nights = sliced[sl][6];
        // console.log(nights);
        //Check if check_in = check_out --> add other dates to event
        if (check_out.isSameOrAfter(today)) { //
          if (!nights || !check_in.isValid || !check_out.isValid) {
            console.log("error no nights . min 2 nights");
          } else {
            final.push(check_in.format('DD.MM.YYYY'));

            for (var i = 1; i <= nights; i++) {
              night = moment(check_in.add("1", "d"));
              final.push(night.format('DD.MM.YYYY'));
            }
            // final.push(check_out)
          }
        }
        }



   //Send JSON Data to endpoint
  //  console.log("final lenght");
    res.send(final);
});

router.get('/json',function(req,res){
  var json_raw = ical2json.convert("bookings.ics");
  res.json(json_raw);
})
//get all Posts
router.get('/posts',function (req, res){
  db.posts.find(function (err, posts){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(posts);
  });
});



// Get Single post
router.get('/posts/:id', function(req, res, next){
  db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, post){
    if(err){
      res.send(err);
    }
    res.json(post);
  });
});


//Save Task
router.post('/post', function(req, res, next){
  var post = req.body;
  if(!post.title || !(post.content + '')){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.posts.save(post, function(err, post){
      if(err){
        res.send(err);
      }
      res.json(post);
    });
  }
});

// Delete Task
router.delete('/posts/:id', function(req, res, next){
  db.posts.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, post){
    if(err){
      res.send(err);
    }
    res.json(post);
  });
});

// Update Task
router.put('/posts/:id', function(req, res, next){
  var post = req.body;
  var updPost = {};
/*
  if(post.isDone){
    updPost.isDone = post.isDone;
  }

  if(task.title){
    updPost.title = post.title;
  }
*/
  if(!updPost){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  } else {
    db.posts.update({_id: mongojs.ObjectId(req.params.id)},updPost, {}, function(err, post){
      if(err){
        res.send(err);
      }
      res.json(post);
    });
  }
});

//Begin für Bookings api
//Save Task
router.post('/bookings', function(req, res, next){
  var booking = req.body;
  if(!booking.form.email){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.bookings.save(booking, function(err, booking){
      if(err){
        res.send(err);
      }
      res.json(booking);
    });
  }
  const output = `
  <h3>Buchungsbestätigung: </h3>
  <p> Herzlich Willkommen  <strong><i>${req.body.form.first_name} ${req.body.form.last_name} </i></strong><br> Ihre Email Adresse lautet : ${req.body.form.email}. <br>
  <br> Ihre gewünschte Buchung wurde gespeichert:  Check-In am <strong>${req.body.form.dateFrom} </strong> und Check-out <strong>${req.body.form.dateTo}</strong><br>
 Gebucht sind ${req.body.form.people} Erwachsene und ${req.body.form.kids} Kinder. Außerdem ${req.body.form.pets} Haustiere.<br> Der Preis pro Nacht beträgt in der derzeitgen Saison <strong>${req.body.priceNight} € </strong>, damit der Gesamtaufenthalt in etwa <strong>${req.body.price} € </strong> (inkl. 30 € Reinigunsgebühr)<br>
<br><br>Alle weiteren Informationen werden im folgenden Email Kontakt ausgetauscht. ng <br>Vielen Dank für Ihre Buchungsanfrage! 
<br><br>mit freundlichen Grüßen <strong>Susanne Meyer-Keusch </strong>
</p>
`;

// create reusable transporter object using the default SMTP transport
/*let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'vz7aismnzoa4wdga@ethereal.email',
      pass: 'RcmGhKPRD6yNR83FkT'
  }
}); */
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'studiomurnauermoos@gmail.com',
         pass: 'studiomurnauermoos'
     }
 });

var mail_recievers = 'studiomurnauermoos@gmail.com, '+booking.form.email;
// setup email data with unicode symbols
var mailOptions = {
    from: '"Susanne Meyer Keusch" <your@email.com>',  // sender address
    to: mail_recievers,   // list of receivers
    subject: 'Neue Buchung auf Studio Murnauer Moos',   // Subject line
    html: output // html body
};

//  send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

});

});

module.exports = router;
