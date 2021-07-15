## Cara run Frontend (Student)

1.  Install node js
2.  Install yarn
3.  Setup file .env
    | env | deskripsi |
    |------------|----------------|
    | PORT | Port dimana website berjalan |
    | REACT_APP_DOMAIN | Domain / URL web ini (Untuk cookie) |
    | REACT_APP_DOMAIN_DEV | Domain / URL web ini (Untuk ENV DEV) |
    | REACT_APP_ENV | Environment development/production (DEV/PROD) |
    | REACT_APP_BACKEND_URL | URL backend server |
4.  Run

```sh
yarn install
yarn build
npm install -g serve
serve -s build -l 3003
```
