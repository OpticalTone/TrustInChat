# TrustInChat    
     
Install MongoDB:      
     
> `curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.10.tgz`      
> `tar -zxvf mongodb-linux-x86_64-3.2.10.tgz`      
> `mkdir -p mongodb`     
> `cp -R -n mongodb-linux-x86_64-3.2.10/. mongodb`      
> `mkdir -p /data/db`     
    
Start MongoDB server: `sudo mongod`      
Stop all processes: `sudo killall mongod`      
     
Start MongoDB shell client: `mongo`     
     
Mongo commands:     
> Choose database: `use simple`    
> Collections: `show collections`      
> Find all documents in the collection: `db.collection.find().pretty()`     
> Delete all documents from the collection: `db.collection.remove({})`     
      
----------------     
     
Project setup:     
     
TrustInChat/TrustInChatServer:         
> Install dependencies(package.json): `sudo npm install`     
> Start server: `npm start`     
> Run development build: `npm run build`    
> Run production build: `npm run build:prod`      
> https://localhost:3000        
       
TrustInChat/SendEmailServer:     
> Install dependencies(package.json): `sudo npm install`     
> Start server: `npm start`    
> Create ignored file: parameters.js     
> `var parameters = { "apiKey": "your_api_key", "timeout": 5000 };`    
> `exports.parameters = parameters;`   
> and set `your_api_key`      
> https://localhost:2000       
      
----------------    
    
Exit terminal:    
> Ctrl + c    
    
----------------    
    
Configure a browser to work with self-signed SSL certificate:    
> chrome://settings/    
> HTTPS/SSL: Manage certificates...   
> 000_Test_Certificates: Test CA     
> Import... : ca.crt    
     



     
    
    

