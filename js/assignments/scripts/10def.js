

function display(buttonElement){
   
    if(!buttonElement.classList.contains('is-toggled')){
       buttonElement.classList.add('is-toggled');
    }
    else{
        buttonElement.classList.remove('is-toggled');
    }
}



