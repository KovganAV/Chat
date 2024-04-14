# vue-webchat
# NODE: 14.15.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
## API routes:

login: POST http://localhost:3000/login

формат данных: { "user": { "username": "ked1", "password": "123456" } }

register: POST http://localhost:3000/register

формат данных: { "user": { "username": "ked1", "password": "123456",
"password_confirmation": "12345" } }

logout: DELETE http://localhost:3000/logout

формат данных: { "user_id": "2" }

create message: POST http://localhost:3000/messages

формат данных: { "user_id": "1", "content": "text" }

destroy message: DELETE http://localhost:3000/messages/id

формат данных: { "user_id": "1", }

edit message: PATCH http://localhost:3000/messages/id

формат данных: { "user_id": "2", "content": "text1" }
