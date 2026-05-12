Fpr connecting to server we have .pem file 
connect using this command 
ssh -i C:\Users\TanvirKaurBedi\Downloads\devTinder-secret.pem ubuntu@32.192.7.124

1> Sign in into AWS
2> Launch an EC2 instance
3> chmod 400 <secret>.pem (change the permission for pem file)
4> Install dependicies for running the project like nodejs , version shld be same as u r using in ur local
5> git clone the project into ur server
cd frontend =>
6> npm install
7> npm run build
8> install nginx
-> sudo apt update
-> sudo apt install nginx
-> sudo systemctl start nginx
-> sudo systemctl enable nginx

9>Copy code from dist(build files) to /var/www/html/
-> sudo scp -r dist/\* /var/www/html/ (scp means copy, from dist folder to this => /var/www/html/)

10>Enable port :80 of ur instance

Backend steps for deployment

=> npm install
=> npm run start
=> add port to aws
=> install pm2 (to keep ur backend running 24 hrs all the time in background)
=> pm2 start npm --start
=> some more commands for pm2 (pm2 list,pm2 flush <name>, pm2 stop <name> , pm2 delete<name>)

Proxy
Frontend running on => http://32.192.7.124/
Backend runnning on => http://32.192.7.124:3000/

Domain name : DevTinder => 32.192.7.124

Frontend => devtinder.com
Backend => devtinder.com:3000 => devtinder.com/api (This is done by nginx proxy pass)
whenever request comes for devtinder.com/api => It redirects to devtinder.com:3000

nginx config

=>sudo nano /etc/nginx/sites-available/default
=>server_name 32.192.7.124
=>
location /api/ {
proxy_pass http://localhost:3000/;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}

=> restart nginx
sudo systemctl restart nginx

=> modify the frontend base url
