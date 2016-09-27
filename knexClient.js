//const knex = require("knex");
const settings = require("./settings"); // settings.json

const knex = require("knex")({
  client   : 'pg',
  connection : {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function getDate( rawDate ) {
  var monthStr = rawDate.slice( 0, 3 );
  var day = rawDate.slice( 4, 6 );
  var year = rawDate.slice( 7, 13 );

  var month;

  switch( monthStr ){
  case 'Jan':
    month = '01';
    break;
  case 'Feb':
    month = '02';
    break;
  case 'Mar':
    month = '03';
    break;
  case 'Apr':
    month = '04';
    break;
  case 'May':
    month = '05';
    break;
  case 'Jun':
    month = '06';
    break;
  case 'Jul':
    month = '07';
    break;
  case 'Aug':
    month = '08';
    break;
  case 'Sep':
    month = '09';
    break;
  case 'Oct':
    month = '10';
    break;
  case 'Nov':
    month = '11';
    break;
  case 'Dec':
    month = '12';
    break;
  default:
    console.log( "Error parsing month! (", monthStr, ")" );
    return "";
  }
  return year + "-" + month + "-" + day;
}

function formattedOutput( queryResult ) {
  console.log("Found", queryResult.length, "person(s) with the name '" + process.argv[2] + "':" );
  for( var i=0; i<queryResult.length; i++ ){
    console.log("-", i+1, ":", queryResult[i].first_name, queryResult[i].last_name, ", born '" + getDate( String( queryResult[i].birthdate ).slice( 4, 15 )) + "'" );
  }
}

function queryDB ( name ) {
  knex.select().from('famous_people')
  .where( 'last_name', '=', name )
  .orWhere( 'first_name', '=', name )
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    formattedOutput( rows );
  }).finally(function() {
    knex.destroy();
  });
  /*
  client.query( "SELECT * FROM famous_people WHERE last_name=$1::text OR first_name=$1::text", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    formattedOutput( result.rows );

    //console.log(result.rows); //output: 1
    client.end();
  })*/
  console.log( "Searching..." );
};

queryDB( process.argv[2] );
