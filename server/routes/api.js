const express = require('express');
const router = express.Router();
const ical = require('node-ical');
const nodemailer = require('nodemailer');
const S = require('string');
const moment = require('moment');
const path = require('path');
const https = require('https');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

// declare mongojs & connect
var mongojs = require('mongojs');
var db = mongojs('max:max@ds119685.mlab.com:19685/moos');

//Ical 'http://lanyrd.com/topics/nodejs/nodejs.ics'  || airbnb : https://www.airbnb.de/calendar/ical/6713316.ics?s=1c409705409c6f5b9de6118abe596147
router.get('/file',function (req, res){
    let result = [];
    let dates = [];
    let ints =  [];
    let sliced = [];
    let final = [];
    let final_pret = [];
    let today = moment();

    let result2 = [];

    //Get Data from ICS FILE
    var data = ical.parseFile('server/routes/bookings.ics');

  for (var k in data ){
    if(data.hasOwnProperty(k)){
      if(data[k].summary === 'Not available'){
        var ev = {
          'check_in': moment(data[k].start),
          'check_out': moment(data[k].end)
        };
        var nights = Math.abs(ev.check_in.diff(ev.check_out,'days'));

        //push days and nights
        final.push(ev.check_in.format('DD.MM.YYYY'));
        for (var i = 1; i <= nights; i++) {
          night = moment(ev.check_in.add("1", "d"));
          final.push(night.format('DD.MM.YYYY'));
        }
        final.push(ev.check_out.format('DD.MM.YYYY'));
        }
      }
  }

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
  //console.log(final);
    res.send(final);
});

//get all Posts
router.get('/info',function (req, res){
  db.cms.find(function (err, info){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(info[0]);
  });
});

//Save new content
router.put('/cms',function (req, res){
  var id = req.body._id;
  var data = req.body;
  //console.log(req.body.info2);
  db.cms.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
      info1: req.body.info1 ,
      info2: req.body.info2 ,
      nachbarschaft1: req.body.nachbarschaft1 ,
      nachbarschaft2: req.body.nachbarschaft2 ,
      markt: req.body.markt,
        preisInfo: req.body.preisInfo,
        email: req.body.mail
      } },
    new: true
  }, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
    //console.log("got here");
   // console.log(doc);
  });
});

// Get all post
router.get('/posts', function(req, res, next){
  db.posts.find( function(err, posts){
    if(err){
      res.send(err);
    }
    res.json(posts);
  });
});


// Get Single post ?? dafgug
router.get('/post/:id', function(req, res, next){
  db.posts.findOne({_id: mongojs.ObjectId()}, function(err, post){
    if(err){
      res.send(err);
    }
    console.log(post);
    res.json(post);
  });
});

// update one post
router.put('/posts/:id',function (req, res){
  var id = req.params.id;
  console.log(id);
  //console.log(req.body.info2);
  db.posts.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
        'form' : {
          title: req.body.title ,
          tags: req.body.tags ,
          img_url: req.body.img_url,
          img_id: req.body.img_id,
          content: req.body.content
        },
        'time' : req.body.time
      } },
    new: true
  }, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
    //console.log("got here");
    // console.log(doc);
    res.json(doc);
  });
});

router.delete('/post/:id', function(req, res, next){
  console.log("got in delete");
  var id = req.params.id;
  console.log(id);
  db.posts.remove({_id: mongojs.ObjectId(id)}, function(err, post){
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log("should be fine");
    res.json(post);
  });
});


///
//  Begin Tags api
///


router.post('/tags', function(req, res, next){
  //console.log("got here");
  var tag = req.body;
  if(!tag.name){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.tags.save(tag, function(err, tag){
      if(err){
        res.send(err);
      }
      res.json(tag);
    });
  }
});

// Get all tags on the server
router.get('/tags', function(req, res, next){
  db.tags.find( function(err, tags){
    if(err){
      res.send(err);
    }
    res.json(tags);
  });
});

router.delete('/tags/:id', function(req, res, next){
  console.log("got in tags delete");
  var id = req.params.id;
  console.log(id);
  db.tags.remove({_id: mongojs.ObjectId(id)}, function(err, post){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(post);
  });
});

// Get all images on the server
router.get('/imgs', function(req, res, next){
  db.imgs.find( function(err, posts){
    if(err){
      res.send(err);
    }
    res.json(posts);
  });
});

router.delete('/imgs/:id', function(req, res, next){
  console.log("got in imgs delete");
  var id = req.params.id;
  console.log(id);
  db.imgs.remove({_id: mongojs.ObjectId(id)}, function(err, post){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(post);
  });
});


function getSecondPart(str) {
  return str.split('/')[1];
}

// Image Endpoint --> blog
  router.post('/imgs', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const sampleFile = req.files.image;
  //console.log(sampleFile.name);
  // Use the mv() method to place the file somewhere on your server
    //const token = uuidv4() + path.extname(sampleFile.name);
    const token = sampleFile.name;
  sampleFile.mv('src/assets/blog/' + token , function(err) {
    if (err)
      return res.status(500).send(err);

    var url = 'http://localhost:4200/assets/blog/' + token;
    var url_prod = 'http://159.89.19.33/assets/blog/' + token ;

      // Create Entry in database to find image afterwards
      const img = {
        'name' : sampleFile.name,
        'path' : url
      };
    console.log(url);
      db.imgs.save(img, function(err, post){
        if(err){
          res.send(err);
        }
        console.log("img_uploaded");
      });

    // Change to Prod | Dev version
    //res.json('http://159.89.19.33/api/blog/imgs/' + sampleFile.name);
    console.log(url);
   res.send(true);
  });
});





//Save Task
router.post('/posts', function(req, res, next){
  //console.log("got here");
  var post = {
    'form': req.body,
    'time': moment(new Date()).format('DD.MM.YYYY')
  };
  if(!post.form.title){
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


// Update Task
router.put('/post/:id', function(req, res, next){
  var updPost = {};
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

router.get('/bookings',function (req, res){

  db.bookings.find(function (err, bookings){
    if(err){
      res.send("Error found while loading the Data");
    }
    console.log("bookings");
    console.log(bookings);
    res.json(bookings);
  });
});



///        delete Booking
router.delete('/bookings/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  db.bookings.remove({_id: mongojs.ObjectId(id)}, function(err, bookings){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(bookings);
  });

});

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
 Gebucht sind ${req.body.form.people} Erwachsene und ${req.body.form.kids} Kinder. Außerdem wurden ${req.body.form.pets} Haustiere angemeldet.<br> Der Preis pro Nacht beträgt in der derzeitgen Saison <strong>${req.body.priceNight} € </strong>, damit der Gesamtaufenthalt in etwa <strong>${req.body.price} € </strong> (inkl. 30 € Reinigunsgebühr)<br>
<br><br>Alle weiteren Informationen werden im folgenden Email Kontakt ausgetauscht. ng <br>Vielen Dank für Ihre Buchungsanfrage! 
<br><br>mit freundlichen Grüßen <strong>Susanne Meyer-Keusch </strong>
</p>
`;

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

/*transporter.sendMail(mailOptions, (error, info) => {

  console.log('Message sent: %s', info.messageId);
  console.log(output);

});*/
});

module.exports = router;

