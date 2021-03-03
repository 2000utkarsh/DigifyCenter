$(document).ready(() => {
    setTimeout(() => {
        appearSignupFormDesktop();
        appearSignupFormMobile();
    }, 7000);
    automaticAppearSignupFormTimer = setTimeout(() => {
        automaticAppearSignupFormDesktop();
        automaticAppearSignupFormMobile();
    }, 20000);
    manageSignupFormDesktop();
    manageSignupFormMobile();
    // console.clear();
})
const automaticAppearSignupFormDesktop = () => {
    var signup_form_section_pricing = $('#desktop-container-pricing #signup-form');
    var signup_form_open_close_icon_pricing = $('#desktop-container-pricing #signup-form-open-close-icon');

    signup_form_section_pricing.animate({ bottom: '0px' }, 1000);
    signup_form_open_close_icon_pricing.html('<i class="fa fa-angle-down" aria-hidden="true"></i>');

}

const appearSignupFormDesktop = () => {
    var signup_form_section_pricing = $('#desktop-container-pricing #signup-form');
    signup_form_section_pricing.animate({ bottom: '-390px' }, 'slow');
}

const manageSignupFormDesktop = () => {
    var signup_form_section_pricing = $('#desktop-container-pricing #signup-form');
    var signup_form_open_close_icon_pricing = $('#desktop-container-pricing #signup-form-open-close-icon');

    signup_form_open_close_icon_pricing.click(() => {
        clearTimeout(automaticAppearSignupFormTimer);
        var current_bottom_value = signup_form_section_pricing.css('bottom');
        current_bottom_value = parseInt(current_bottom_value.split('px')[0]);

        if (current_bottom_value < 0) {
            signup_form_section_pricing.css('bottom', '0px');
            signup_form_open_close_icon_pricing.html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
        } else {
            signup_form_section_pricing.css('bottom', '-390px');
            signup_form_open_close_icon_pricing.html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
        }

    })
}

const automaticAppearSignupFormMobile = () => {
    var signup_form_section_pricing = $('#mobile-container-pricing #signup-form');
    var signup_form_open_close_icon_pricing = $('#mobile-container-pricing #signup-form-open-close-icon');
    var signup_form_extension_right_pricing = $('#mobile-container-pricing .signup-form-extension-right');
    var signup_form_header_pricing = $('#mobile-container-pricing .signup-form-header');

    signup_form_section_pricing.animate({ left: '0px' }, 1000);
    signup_form_open_close_icon_pricing.html('<i class="fa fa-angle-left" aria-hidden="true"></i>');
    signup_form_extension_right_pricing.css('background-color','rgb(233, 245, 250)');
    signup_form_header_pricing.css('border-bottom-right-radius','0px');
}

const appearSignupFormMobile = () => {
    
    var signup_form_section_pricing = $('#mobile-container-pricing #signup-form');
    var left_value = '-230px'
    var window_size = $(window).width();
    if(window_size<280){
        left_value = '-205px'
    }

    signup_form_section_pricing.animate({ left: left_value }, 'slow');
}

const manageSignupFormMobile = () => {
    var signup_form_section_pricing = $('#mobile-container-pricing #signup-form');
    var signup_form_open_close_icon_pricing = $('#mobile-container-pricing #signup-form-open-close-icon');
    var signup_form_extension_right_pricing = $('#mobile-container-pricing .signup-form-extension-right');
    var signup_form_header_pricing = $('#mobile-container-pricing .signup-form-header');

    signup_form_open_close_icon_pricing.click(() => {
        clearTimeout(automaticAppearSignupFormTimer);
        var current_left_value = signup_form_section_pricing.css('left');
        current_left_value = parseInt(current_left_value.split('px')[0]);
        var left_value = '-230px'
        var window_size = $(window).width();

        if(window_size<280){
            left_value = '-200px'
        }

        if (current_left_value < 0) {
            signup_form_section_pricing.css('left', '0px');
            signup_form_open_close_icon.html('<i class="fa fa-angle-left" aria-hidden="true"></i>');
            signup_form_extension_right_pricing.css('background-color','rgb(233, 245, 250)');
            signup_form_header_pricing.css('border-bottom-right-radius','0px');
        } else {
            signup_form_section_pricing.css('left', left_value);
            signup_form_open_close_icon_pricing.html('<i class="fa fa-angle-right" aria-hidden="true"></i>');
            signup_form_extension_right_pricing.css('background-color','transparent');
            signup_form_header_pricing.css('border-bottom-right-radius','15px');
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
    console.log("aaya");
    $.ajax({
        url: "/get_details/",
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

const submitForm = (device) => {

    if (device === 'desktop'){
        var signup_name = $('#signup-name-desktop').val()
        var signup_email = $('#signup-email-desktop').val()
        var signup_contact_number = $('#signup-contact-number-desktop').val()
    }else{
        var signup_name = $('#signup-name-mobile').val()
        var signup_email = $('#signup-email-mobile').val()
        var signup_contact_number = $('#signup-contact-number-mobile').val()
    }

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