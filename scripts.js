var nameValuePair;

// BUTTONS' FUNCTIONALITY
$("#addBtn").click(function(){
  if(validateInput()){
    // Add LI child to pairList UL
    $('#pairList').append($('<li>').text(nameValuePair).attr('class','pairListItem'));
  }
});

$("#deleteBtn").click(function(){
  deleteSelectedItems();
});

$("#sortByNameBtn").click(function(){
  sortByName();
});

$("#sortByValueBtn").click(function(){
  sortByValue();
});

$("#showXMLBtn").click(function(){
  generateXML();
});


$( "button, input" ).click( function( event ) {
      event.preventDefault();
  });

//Selecting items on the list = Toggling .selected class
$(document).on('click', '.pairListItem', function () {
  $(this).toggleClass("selected");
});

//FUNCTIONS
function validateInput(){
  nameValuePair = $("input[name=nameValue]").val();
  //Names and Values can contain only alpha-numeric characters. The equal-sign is used to delimit the pair, spaces before and/or after the equal-sign may be entered by the end user (and should be ignored.)
  var characterReg = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;
    if(!characterReg.test(nameValuePair)) {
        $("#errorMsg" ).dialog();
    } else{
      nameValuePair = nameValuePair.replace(/\s/g, ''); //remove backspaces
      return true;
    }
}

function deleteSelectedItems(){
  $('#pairList').find('li.selected').remove();
}

function sortByName(){
  var list = $('#pairList');
  var listitems = list.children('li').get();
  listitems.sort(function(a, b) {
    var compA = $(a).text().toUpperCase();
    var compB = $(b).text().toUpperCase();
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  })
  $.each(listitems, function(i, itm)
    {
      list.append(itm);
    });
}

function sortByValue(){
  var list = $('#pairList');
  var listitems = list.children('li').get();
  listitems.sort(function(a, b) {
    var compA = $(a).text().split("=")[1].toUpperCase();
    var compB = $(b).text().split("=")[1].toUpperCase();
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  })
  $.each(listitems, function(i, itm)
    {
      list.append(itm);
    });
}

function generateXML(){
  var gen_XML = "<xml>" + "\n";
  gen_XML += "<"+$('ul').attr("id")+">"+"\n";;
  $( "li" ).each(function() {
    gen_XML +="<"+$(this).attr("class")+">"+"\n";;
    gen_XML +="<name>"+$(this).text().split("=")[0]+"</name>"+"\n";;
    gen_XML +="<value>"+$(this).text().split("=")[1]+"</value>"+"\n";;
    gen_XML +="</"+$(this).attr("class")+">"+"\n";;
  })
  gen_XML += "</"+$('ul').attr( "id" )+">"+"\n";;
  gen_XML += "</xml>";
  $("#modalXML").text(gen_XML);
  $("#modalXML" ).dialog({maxHeight: 400});
}
