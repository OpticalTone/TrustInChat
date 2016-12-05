# TrustInChat    
     
Install MongoDB:      
     
> `curl -O` https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.10.tgz      
> `tar -zxvf` mongodb-linux-x86_64-3.2.10.tgz      
> `mkdir -p` mongodb     
> `cp -R -n` mongodb-linux-x86_64-3.2.10/. mongodb      
> `mkdir -p` /data/db     
    
Start MongoDB server: `sudo mongod`      
Stop all processes: `sudo killall mongod`      
     
Start MongoDB shell client: `mongo`     
     
Mongo commands:     
> Choose database: `use simple`    
> Collections: `show collections`      
> Find all documents in the collection: `db.collection.find()`     
> Delete all documents from the collection: `db.collection.remove({})`         
     
----------------     
     
Project setup:     
     
TrustInChatServer:     
> Navigate to TrustInChat/TrustInChatServer     
> Install dependencies(package.json): `sudo npm install`     
> Start server: `sudo npm start`     
> Run build: `npm run build`    
     
SendEmailServer:     
> Navigate to TrustInChat/SendEmailServer     
> Install dependencies(package.json): `sudo npm install`     
> Start server: `sudo npm start`    
     
----------------     
      
Open Chromium Web Browser:     
> Install Chromium web browser from Ubuntu software     
> TrustInChatServer: localhost:3000    
> SendEmailServer: localhost:2000    
> Open console: F12      
     
     
    
    

