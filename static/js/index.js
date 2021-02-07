$(document).ready(() => {
    appearOnScroll()
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
            
            var card_front_array = $('.card-container-mobile');
            var card_front_flip = card_front_array[service_index-1].children[0];
            
            var card_back_flip = card_front_array[service_index-1].children[1];
            
            card_front_flip.style.transform = 'rotateY(180deg)';
            card_back_flip.style.transform = 'rotateY(0deg)';
            
        }
        else{
            

            var card_front_array = $('.card-container-mobile');
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
