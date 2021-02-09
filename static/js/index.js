$(document).ready(() => {
    appearOnScroll();
    slideOwlCarousel();
    setTimeout(() => {
        appearSignupForm();
    }, 7000);
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

const validateFormData = (name, email, contact_number) => {
    
    var valid_contact_number = /^\d{10}$/;
    if (!(valid_contact_number.test(contact_number))) {
        return false;
    }

    var valid_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!(valid_email.test(email))) {
        return false
    }

    if (!(name.length > 0)) {
        return false;
    }

    // Every input is successfully validated
    return true;
}

const sendRequest = (name, email, contact_number) => {
    $.ajax({
        url: "get_details",
        method: 'POST',
        data: {
            'name': name,
            'email': email,
            'contact_number': contact_number,
        },
        dataType: 'json',
        success: function(){
            $('.form-signup-form').css('display','none');
            $('.submit-btn-signup-form').css('display','none');
            $('.form-validation-warning').css('display','none');
            $('.img-form-success').css('display','block');
        }
        
    });
}

const submitForm = () => {
    var signup_name = $('#signup-name').val()
    var signup_email = $('#signup-email').val()
    var signup_contact_number = $('#signup-contact-number').val()

    data_is_valid = validateFormData(
        signup_name,
        signup_email,
        signup_contact_number
        )

    if (data_is_valid) {
        $('.form-validation-warning').css('display', 'none');
        sendRequest(
            signup_name,
            signup_email,
            signup_contact_number
        )
    } else {
        $('.form-validation-warning').css('display', 'block');
    }


}
