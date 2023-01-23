function onSubmit(e) {
    e.preventDefault();


    //clears the previous search
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    //alert if user enters no value, displays an alert in the brwoser
    if (prompt === '') {
        alert('Add some text');
        return;
    }
    console.log('hello');
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt, 
                size,
            }),
        });

        if (!response.ok) {
            hideSpinner();
            throw new Error('The requested image cannot be created.')
        }

        const data = await response.json();
        //console.log(data);

        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;

        hideSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

//functions to show and remove the spinner to indicate loading
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');

}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
    
}


document.querySelector('#image-form').addEventListener('submit', onSubmit);