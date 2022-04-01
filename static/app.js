class chatbox {
    constructor() {
        this.args = {
            // get selector name from class name in html file
            Openbutton:document.querySelector('.chatbox__button'),
            chatVox: document.querySelector('chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
        // to keep the chatbot closed
        this.state = false;
        this.message = []; 
    }

    // function
    display() {
        const {openButton, chatBox, sendButton} = this.args;
        
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.toggleState(chatBox))

        const node = chatBox.querySelector('input');

        // if want to send message using enter
        node.addEventListener("keyup", ({key})=>{
            if(key === "Enter"){
                this.onsendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hide the box
        if(this.state){
            chatbox.classList.add('.chatbox--active')
        }else{
            chatbox.classList.remove('.chatbox--active')
        }
    }

    onsendButton(chatbox) {
    // extract the text by using the query selectors
       var textField = chatbox.querySelector('input');
       let text1 = textField.value
    //    check if the text is empty
       if(text1 === ""){
           return;
       }
// the message object must be same with the app.py 
       let msg1 = {name :"User", message : text1}
       this.message.push(msg1);

       // /predict

       fetch($SCRIPT_ROOT + '/predict', {
           method: 'POST',
           body: JSON.stringify({message :text1}),
           mode: 'cors',
           headers:{
               'Content-Type': 'application/json'
           },
       }) 
    //    response , send message back to the user
       .then(r =>r.json())
       .then(r=>{
           let msg2 = {name :"Cyga", message: r.answer};
           this.message.push(msg2);
           this.updateChatText(chatbox)
           textField.value=''
       
        }).catch((error) => {
            console.error('Error: ', error);
            this.updateChatText(chatbox)
            textField.value=''
        });
    }
    updateChatText(chatBox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, number){
            if (item.name === "Cyga"){
                html += '<div class="messages__item messages__item--visitor">' +item.message + '<div>'
            }else{
                html += '<div class="messages__item messages__item--operator">' +item.message + '<div>'
            }
        });
        
        const chatmessage = chatBox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatBox =new Chatbox();
chatBox.display();