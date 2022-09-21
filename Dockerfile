# ----lama----
# FROM node:14-alpine

# WORKDIR /usr/src/app

# ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json ./

# RUN yarn install
# RUN npm install -g serve

# COPY . .

# EXPOSE 3002

# RUN yarn build

# CMD serve -s build -l 3002


FROM node:16.16-alpine

WORKDIR /usr/src/app

COPY ../pens-vlab-student-css ./

RUN yarn install
RUN yarn global add serve

EXPOSE 3004

RUN yarn build

CMD yarn serve -s build -l 3004
