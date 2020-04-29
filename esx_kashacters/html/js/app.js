$(".character-box").hover(
    function() {
        $(this).css({
            "background": "rgb(44, 51, 69)",
            "transition": "200ms",
        });
    }, function() {
        $(this).css({
            "background": "rgba(44, 51, 69, 0.6)",
            "transition": "200ms",          
        });
    }
);

$(".character-box").click(function () {
    $(".character-box").removeClass('active-char');
    $(this).addClass('active-char');
    $(".character-buttons").css({"display":"block"});
    if ($(this).attr("data-ischar") === "true") {
        $("#delete").css({"display":"block"});
    } else {
        $("#delete").css({"display":"none"});
    }
});

$(".character-box").click(function () {
    if ($(this).attr("data-ischar") === "true") {
        $("#play-char").html('PLAY');
    } else {
        $("#play-char").html('CREATE CHARACTER');
    }
});


$("#play-char").click(function () {
    $.post("http://esx_kashacters/CharacterChosen", JSON.stringify({
        charid: $('.active-char').attr("data-charid"),
        ischar: $('.active-char').attr("data-ischar"),
    }));
    Kashacter.CloseUI();
});

$("#deletechar").click(function () {
    $.post("http://esx_kashacters/DeleteCharacter", JSON.stringify({
        charid: $('.active-char').attr("data-charid"),
    }));
    Kashacter.CloseUI();
});

(() => {
    Kashacter = {};

    Kashacter.ShowUI = function(data) {
        $('body').css({"display":"block"});
        $('.main-container').css({"display":"block"});
        if(data.characters !== null) {
            $.each(data.characters, function (index, char) {
                if (char.charid !== 0) {
                    var charid = char.identifier.charAt(4);
                    $('[data-charid=' + charid + ']').html('<h3 class="character-fullname">'+ char.firstname +'</h3><div class="character-info"><p class="character-info-name"><strong>Name: </strong><span>'+ char.firstname +' '+ char.lastname +'</span></p><p class="character-info-work"><strong>Work: </strong><span>'+ char.job +' '+ char.job_grade +'</span></p><p class="character-info-money"><strong>Cash: </strong><span>'+ char.money +'</span></p><p class="character-info-bank"><strong>Bank: </strong><span>'+ char.bank +'</span></p> <p class="character-info-dateofbirth"><strong>Date of birth: </strong><span>'+ char.dateofbirth +'</span></p> <p class="character-info-gender"><strong>Gender: </strong><span>'+ char.sex +'</span></p></div>').attr("data-ischar", "true");
                }
            });
        }
    };

    Kashacter.CloseUI = function() {
        $('body').css({"display":"none"});
        $('.main-container').css({"display":"none"});
        $(".character-box").removeClass('active-char');
        $("#delete").css({"display":"none"});
		$(".character-box").html('<h3 class="character-fullname"><i class="fas fa-plus"></i></h3><div class="character-info"><p class="character-info-new">Create new character</p></div>').attr("data-ischar", "false");
    };
    window.onload = function(e) {
        window.addEventListener('message', function(event) {
            switch(event.data.action) {
                case 'openui':
                    Kashacter.ShowUI(event.data);
                    break;
            }
        })
    }

})();