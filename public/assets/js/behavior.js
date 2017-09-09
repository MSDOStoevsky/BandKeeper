function S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function cid_gen() {
    return (S4()+S4()+S4());
}

function guid() {
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' +
      S4() + '-' + S4() + S4() + S4();
}

function coll_del(cid){
    $("#confirm-modal").show();
    $("#confirm-yes").click(function(){
        $.ajax({
            url:  '/api/collection/'+cid,
            type: 'DELETE',
            success: function(){
                $('#confirm-modal').hide();
                window.location.reload();
            } || $.noop
        });
    });
    $("#confirm-no").click(function(){
        $('#confirm-modal').hide();
    });
}

$("#modal-close").on("click", function(){
    $("#add-art-modal").hide();
});



$("#add-coll-btn").on("click", function(){
    $("#add-coll-modal").show();
});

$("#modal-close").on("click", function(){
    $("#add-coll-modal").hide();
});

$("#modal-submit").on("click", function() {
    var namef = $( "#name-field" ).val();
    var descrf = $( "#descr-field" ).val();
    var thumbf = $( "#thumb-field" ).val();

    if ( true ) {
        $.ajax({
            url: "/api/collection/",
            data : JSON.stringify(
            {
                cid : cid_gen(),
                name: namef,
                description: descrf,
                thumb: thumbf === null ? "/assets/img/collection.png" : thumbf,
                updated: newdate,
            }),
            contentType : 'application/json',
            type : 'POST',
            success: function(){
                $('#add-coll-modal').hide();
                $('#new-coll-form')[0].reset();
                window.location.reload();
            } || $.noop,
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                $('#add-coll-modal').hide();
                $('#new-coll-form')[0].reset();
            }  
        });
    }
});