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
const wget = require('wget-improved');

// declare mongojs & connect
var mongojs = require('mongojs');
var db = mongojs('max:studio97.@ds161346.mlab.com:61346/moo');

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

router.get('/fewo_alt',function (req, res){
 /* let result = [];  let dates = [];  let ints =  [];  let sliced = [];
    let final_pret = [];
  let result2 = [];*/
  var final = [];let today = moment();
  const src= "https://www.traum-ferienwohnungen.de/ical/88889a307404dc3fea1ebc83a44d0bc38214472f/95395/179210.ics?provider=1";
  const output = 'server/routes/bookings.ics';
  var download = wget.download(src,output);
  download.on('error', function(err) {
    console.log("error download : " + err);
  });
  download.on('start', function(fileSize) {
    console.log("filesize download : " + fileSize);
  });
  //Get Data from ICS FILE
  var data = ical.parseFile('server/routes/bookings.ics');
  let temp = today.subtract(2,'months');
  //console.log(today);  console.log(temp);
  for (var k in data ){
    if(data.hasOwnProperty(k)){
      //console.log(data[k].start + " \t " + data[k].end);
      //console.log(today);
      //moment(data[k].start).isAfter(today.subtract(2,'m'))
      if(moment(data[k].start).isAfter(temp)){
        final.push({
          'start': data[k].start,
          'end': data[k].end
        })
      }
    }
  }
  final.sort(function(a,b){ return a.start-b.start;});
  console.log(final.length);
  res.send(final);
});

//get all Posts
router.get('/info',function (req, res){
  db.cms.find(function (err, info){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(info);
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

//update new Heading
router.put('/cms/headings/',function (req, res){
  var id = req.body.id;
  var data = req.body;
  //console.log(req.body.info2);
  db.cms.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
        h1: req.body.h1 ,
        h2: req.body.h2 ,
        h3: req.body.h3 ,
        h4: req.body.h4 ,
        h5: req.body.h5,
        preis1: req.body.preis1,
        preis2: req.body.preis2,
        preis3: req.body.preis3,
        preis4: req.body.preis4,
        preis5: req.body.preis5
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
          content: req.body.content,
          font: req.body.font
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

router.put('/tags/:id',function (req, res){
  var id = req.params.id;

  //console.log(req.body.info2);
  db.tags.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
        'name' : req.body.name,
        'color': req.body.color
      } },
    new: true
  }, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
    // console.log(doc);

    // update existing blog posts
    //console.log(req.body.info2);
    db.posts.findAndModify({
      query: {'posts.tags._id': mongojs.ObjectId(id)},

      update: { $set: {
          'tags.name' : req.body.name,
          'tags.color': req.body.color
        } },
      new: true
    }, function (err, doc, lastErrorObject) {
      // doc.tag === 'maintainer'
       console.log(err);
       console.log(doc);

    });
    res.json(doc);
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
  const sampleFile = req.files.image || req.files.file;
  //console.log(sampleFile.name);
  // Use the mv() method to place the file somewhere on your server
    //const token = uuidv4() + path.extname(sampleFile.name);

    // --> setting PROD MODE
    // change src | dist --> switch urls | use one variable maybe?
    const token = sampleFile.name;
  sampleFile.mv('dist/assets/blog/' + token , function(err) {
    if (err)
      return res.status(500).send(err);

    var url = 'http://localhost:4200/assets/blog/' + token;
    var url_prod = 'http://159.89.19.33/assets/blog/' + token ;

      // Create Entry in database to find image afterwards
      const img = {
        'name' : sampleFile.name,
        'path' : url_prod
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

   res.json(url_prod);
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

/////
//Begin Gears Api
/////
router.get('/gears',function (req, res){
  db.gears.find(function (err, gears){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(gears);
  });
});


//Save Task
router.post('/gears', function(req, res, next){
  console.log(req.body);
  var gear = {
    'name': req.body.name,
    'icon': req.body.icon,
    'position': req.body.position
  };
  if(!gear.name){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.gears.save(gear, function(err, gear){
      if(err){
        res.send(err);
      }
      res.json(gear);
    });
  }
});


// Update gear
router.put('/gears/:id',function (req, res){
  var id = req.params.id;
  //console.log(req.body.info2);
  db.gears.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
        'icon' : req.body.icon,
        'name': req.body.name
      } },
    new: true
  }, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
    //console.log("got here");
    // console.log(doc);
    res.json(doc);
  });
});


/// delete
router.delete('/gears/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  db.gears.remove({_id: mongojs.ObjectId(id)}, function(err, gears){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(gears);
  });
});


/////
//Begin Gallery Api
/////
router.get('/gallery',function (req, res){
  db.gallery.find(function (err, gears){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(gears);
  });
});


//Save Task
router.post('/gallery', function(req, res, next){
  console.log(req.body);
  var gear = {
    'title': req.body.title,
    'img_path': req.body.img_path,
    'position': req.body.position
  };
  if(!gear.title){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.gallery.save(gear, function(err, gear){
      if(err){
        res.send(err);
      }
      res.json(gear);
    });
  }
});


// Update gear
router.put('/gallery/:id',function (req, res){
  var id = req.params.id;
  console.log(id);
  //console.log(req.body.info2);
  db.gallery.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
        'title' : req.body.title,
        'img_path': req.body.img_path,
        'position': req.body.position
      } },
    new: true
  }, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
    //console.log("got here");
    // console.log(doc);
    res.json(doc);
  });
});


/// delete
router.delete('/gallery/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  db.gallery.remove({_id: mongojs.ObjectId(id)}, function(err, gears){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(gears);
  });
});




/////
//Begin Preis Api
/////
router.get('/preise',function (req, res){
  db.preise.find(function (err, gears){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(gears);
  });
});


//Save Task
router.post('/preise', function(req, res, next){
  console.log(req.body);
  var gear = {
    'color': req.body.color,
    'content': req.body.content,
    'font': req.body.font
  };
  if(!gear.content){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.preise.save(gear, function(err, gear){
      if(err){
        res.send(err);
      }
      res.json(gear);
    });
  }
});


// Update gear
router.put('/preise/:id',function (req, res){
  var id = req.params.id;
  //console.log(req.body.info2);
  db.preise.findAndModify({
    query: {_id : mongojs.ObjectId(id)},
    update: { $set: {
        'color' : req.body.color,
        'content': req.body.content,
        'font': req.body.font
      } },
    new: true
  }, function (err, doc, lastErrorObject) {
    // doc.tag === 'maintainer'
    //console.log("got here");
    // console.log(doc);
    res.json(doc);
  });
});


/// delete
router.delete('/preise/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  db.preise.remove({_id: mongojs.ObjectId(id)}, function(err, gears){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(gears);
  });
});

///*
//Begin für Bookings api
/////
router.get('/bookings',function (req, res){
  db.bookings.find(function (err, gears){
    if(err){
      res.send("Error found while loading the Data");
    }
    res.json(gears);
  });
});

router.get('/fewo',function (req, res){
  // get fewo bookings
  /* let result = [];  let dates = [];  let ints =  [];  let sliced = [];
   let final_pret = [];
 let result2 = [];*/
  var final = [];let today = moment();
  var final_days = [];var booking_days= []; var free_days = [];
  const src= "https://www.traum-ferienwohnungen.de/ical/88889a307404dc3fea1ebc83a44d0bc38214472f/95395/179210.ics?provider=1";
  const output = 'server/routes/bookings.ics';
 /* var download = wget.download(src,output);
  download.on('error', function(err) {
    console.log("error download : " + err);
  });
  download.on('start', function(fileSize) {
    console.log("filesize download : " + fileSize);
  });*/
  //Get Data from ICS FILE
  var data = ical.parseFile('server/routes/bookings.ics');
  let temp = today.subtract(2,'months');
  //console.log(today);  console.log(temp);
  for (var k in data ){
    if(data.hasOwnProperty(k)){
      //console.log("data");
     // console.log(data[k].start + " <- st | en -> " + data[k].end);
      //console.log(today);
      //moment(data[k].start).isAfter(today.subtract(2,'m'))
      if(moment(data[k].start).isAfter(temp)){
        final.push({
          'start': moment(data[k].start).add(1, 'd'),
          'end': moment(data[k].end).add(1, 'd')
        });

        var start = moment(data[k].start);var end = moment(data[k].end);
        while(start <= end) {
            final_days.push(start);
            start = moment(start).add(1, 'days');
         }
      }
    }
  }
  //console.log("Final \n");
   //console.log(final_days.length);
  final.sort(function(a,b){ return a.start-b.start;});
  final_days.sort(function(a,b){ return a-b;});

  // get bookings
  db.bookings.find(function (err, bookings){
    if(err){
      res.send("Error found while loading the Data");
    }
     for (var booking of bookings) {
      //console.log(booking);
       var start =  moment(booking.form.dateFrom, 'DD.MM.YYYY');
       var end = moment(booking.form.dateTo, 'DD.MM.YYYY');
      if (booking.free) {
        //console.log(booking);
        while(start <= end) {
          //console.log("free");
          free_days.push(start);
          start = moment(start).add(1, 'days');
        }
      } else {
        while(start <= end) {
          //console.log("booking_days loop");
          booking_days.push(start);
          start = moment(start).add(1, 'days');
        }
      }
     } //-- end for loop
     /*
    console.log("free days \n");
    console.log(free_days);
    console.log("booking days \n");
    console.log(booking_days.length);*/
    var merged_bookings = arrayUnique(booking_days.concat(final_days));
    merged_bookings = arrayUnique(merged_bookings);
    console.log('merged');console.log(merged_bookings.length);

    console.log('merged - duplicate');console.log(merged_bookings.length);
    for (var k =0;k<merged_bookings.length;k++) {
      for (var free of free_days){
        if (merged_bookings[k].isSame(free)) {
          merged_bookings.splice(k,1);
        }
      }
    }
  console.log('merged _ after cleanup');console.log(merged_bookings.length);
    res.json(merged_bookings);
  })

});

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (moment(a[i]).isSame(moment(a[j])) ){
        // console.log("duplicate");
        a.splice(j--, 1);
      }

    }
  }
  return a;
}
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
  if(!booking.form.first_name){
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

