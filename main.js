function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllRecords = function() {
  $.getJSON('https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=keyc8nbtQj5D8O5Du',
    function(airtable){
      var html = [];
      $.each(airtable.records, function(index, record) {
        var id = record.id;
        var name = record.fields['Name'];
        var rating = record.fields['Rating'];
        var picture = record.fields['Pictures'];
        html.push(listView(id, name, rating, picture));
      });
      $('body').append(html);
    }
  );
}

$.getJSON('https://api.airtable.com/v0/appt7r1tPguIDQ6wI/Table%201?api_key=keyc8nbtQj5D8O5Du',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var id = record.id;
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var ratings = record.fields['Ratings'];
      var picture = record.fields['Picture'];
      console.log(picture);
      console.log(ratings);
      if(picture && picture[0]) {
          html.push(`<img src="${picture[0].url}"/>`)
      }
      html.push(`<h2>${name}, ${address}, ${ratings}</h2>`);
    });
    $('body').append(html);
  }
);
var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appt7r1tPguIDQ6wI/Table%201${id}?api_key=keyc8nbtQj5D8O5Du`,
    function(record){
      var html = [];
      console.log(record.id)
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var picture = record.fields['Pictures'];
      html.push(detailView(name, address, rating, picture));
      var cost = record.fields['Cost'];
      var type = record.fields['Type'];
      html.push(detailView(name, address, rating, picture, cost, type ));
      $('body').append(html);
      var itemHTML = listview(id, name, address, rating, picture, cost, type )
    }
  );
}
var listView = function(name, address, rating, picture) {
    return `
    <h2>${name}</h2>
    <p>${address}</p>
    <p>${rating}</p>
    ${picture ? `<img src="${picture[0].url}">` : ``}
    `;

}
var detailView = function(name, address, rating, picture) {
  
  return `
 <h2>${name}</h2>
 <p>${address}</p>
 <p>${rating}</p>
 ${picture ? `<img src="${picture[0].url}">` : ``}
 `;
}
