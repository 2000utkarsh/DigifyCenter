$(document).ready(() => {
    appearOnScroll();
    slideOwlCarousel();
    setTimeout(() => {
        appearSignupForm();
    }, 1000);
    automaticAppearSignupFormTimer = setTimeout(() => {
        automaticAppearSignupForm()
    }, 20000);
    manageSignupForm();
})

const rotateCard = (obj,string,view) => {
    
    var button_class = $(obj).attr('class').split(' ');
    var active_class =  button_class[button_class.length-1].split('-');
    var service_index = active_class[active_class.length-1];
    
    if(view==='desktop'){
        if(string === 'front'){
            
            var card_front_array = $('.card-container');
            var card_front_flip = card_front_array[service_index-1].children[0];
            
            var card_back_flip = card_front_array[service_index-1].children[1];
            
            card_front_flip.style.transform = 'rotateY(180deg)';
            card_back_flip.style.transform = 'rotateY(0deg)';
            
        }
        else{
            

            var card_front_array = $('.card-container');
            var card_front_flip = card_front_array[service_index-1].children[0];
            
            var card_back_flip = card_front_array[service_index-1].children[1];
            card_front_flip.style.transform = 'rotateY(0deg)';
            card_back_flip.style.transform = 'rotateY(180deg)';
            
        }
    }
    else{
        if(string === 'front'){
            
            var card_front_array = $('#mobile-container .card-container');
            var card_front_flip = card_front_array[service_index-1].children[0];
            
            var card_back_flip = card_front_array[service_index-1].children[1];
            
            card_front_flip.style.transform = 'rotateY(180deg)';
            card_back_flip.style.transform = 'rotateY(0deg)';
            
        }
        else{
            

            var card_front_array = $('#mobile-container .card-container');
            var card_front_flip = card_front_array[service_index-1].children[0];
            
            var card_back_flip = card_front_array[service_index-1].children[1];
            card_front_flip.style.transform = 'rotateY(0deg)';
            card_back_flip.style.transform = 'rotateY(180deg)';
            
        }
    }
    
}

const appearOnScroll = () => {

    const features_row = $('.features-row');
    const appearOptions = {
        threshold: 1,
        rootMargin: "0px 0px 150px 0px"
    }

    let appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            else {
                target = entry.target
                target.classList.add("appear");
                appearOnScroll.unobserve(target);
            }
        });
    }, appearOptions);
    features_row.each(feature => {
        appearOnScroll.observe(features_row[feature]);
    })
}

const slideOwlCarousel = () => {
    $(".slider").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000, //2000ms = 2s;
        autoplayHoverPause: true,
        items: 1
    });
}

const automaticAppearSignupForm = () => {
    var signup_form_section = $('#signup-form');
    var signup_form_open_close_icon = $('#signup-form-open-close-icon');

    signup_form_section.animate({ bottom: '0px' }, 1000);
    signup_form_open_close_icon.html('<i class="fa fa-angle-down" aria-hidden="true"></i>');

}

const appearSignupForm = () => {
    var signup_form_section = $('#signup-form');
    signup_form_section.animate({ bottom: '-390px' }, 'slow');
}

const manageSignupForm = () => {
    var signup_form_section = $('#signup-form');
    var signup_form_open_close_icon = $('#signup-form-open-close-icon');

    signup_form_open_close_icon.click(() => {
        clearTimeout(automaticAppearSignupFormTimer);
        var current_bottom_value = signup_form_section.css('bottom');
        current_bottom_value = parseInt(current_bottom_value.split('px')[0]);

        if (current_bottom_value < 0) {
            signup_form_section.css('bottom', '0px');
            signup_form_open_close_icon.html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
        } else {
            signup_form_section.css('bottom', '-390px');
            signup_form_open_close_icon.html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
        }

    })
}
