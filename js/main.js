document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://reqres.in/api/users';
    const telegramApiUrl = 'https://api.telegram.org/bot7214060527:AAGu2-P3c_SpYRAP1kiuKSqsgUh9JchXVfk/';
    const channelId = '-1002220971792';
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const users = data.data;
        const container = document.getElementById('user-cards-container');
        users.forEach(user => {
          const card = document.createElement('div');
          card.classList.add('user-card');
          
          const userImage = document.createElement('img');
          userImage.src = user.avatar;
          
          const userInfo = document.createElement('div');
          userInfo.classList.add('user-info');
          
          const userName = document.createElement('h3');
          userName.textContent = `${user.first_name} ${user.last_name}`;
          
          const userEmail = document.createElement('p');
          userEmail.textContent = user.email;

          const userId = document.createElement("p");
          userId.textContent = `#${user.id}`;
          userId.className = "user-id"
          
          const sendButton = document.createElement('button');
          sendButton.classList.add('send-button');
          sendButton.textContent = 'Send';
          sendButton.addEventListener('click', () => {
            const message = `Username: ${user.first_name} ${user.last_name}\nEmail: ${user.email}`;
            const photoUrl = user.avatar;
            
            fetch(telegramApiUrl + 'sendPhoto', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: channelId,
                photo: photoUrl,
                caption: message
              })
            }).then(response => response.json())
              .then(result => {
                if (result.ok) {
                  alert('Message sent successfully!');
                } 
                else {
                  alert('Failed to send message.');
                }
              });
          });
          
          userInfo.appendChild(userName);
          userInfo.appendChild(userEmail);
          userInfo.appendChild(userId);
          userInfo.appendChild(sendButton);
          card.appendChild(userImage);
          card.appendChild(userInfo);
          container.appendChild(card);
        });
      })
  });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const telegramApiUrl = 'https://api.telegram.org/bot7214060527:AAGu2-P3c_SpYRAP1kiuKSqsgUh9JchXVfk/';
    const channelId = '-1002220971792';
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const number = document.getElementById('number').value;
      const email = document.getElementById('email').value;
  
      const message = `-----User data-----\nName: ${name}\nNumber: ${number}\nEmail: ${email}`;
      
      try {
        await fetch(telegramApiUrl + 'sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: channelId,
            text: message
          })
        }).then(response => response.json())
          .then(result => {
            if (result.ok) {
              alert('Message sent successfully!');
            } else {
              alert('Failed to send message.');
            }
          });
        } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message.');
      }
    });
  });
  