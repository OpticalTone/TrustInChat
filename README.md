# TrustInChat    
    
Start terminal: `ctrl + shift + t`    
Exit terminal: `ctrl + c`  
    
----------------        
   
Install latest Nodejs and NPM:        
> Install python-software-properties package:         
> `sudo apt-get install python-software-properties`     
> Add node.js PPA:    
> `curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`     
> Install Nodejs and NPM:   
> `sudo apt-get install nodejs`     
> Check Node.js and NPM version:   
> Node.js (v7.10.0): `node -v`     
> NPM (4.2.0): `npm -v`     
     
Install MongoDB:      
     
> `curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.10.tgz`      
> `tar -zxvf mongodb-linux-x86_64-3.2.10.tgz`      
> `mkdir -p mongodb`     
> `cp -R -n mongodb-linux-x86_64-3.2.10/. mongodb`      
> `mkdir -p /data/db`     
    
----------------     
    
Start MongoDB server: `sudo mongod`      
Stop all processes: `sudo killall mongod`      
     
Start MongoDB shell client: `mongo`     
     
Mongo commands:     
> Choose database: `use simple`    
> Collections: `show collections`      
> Find all documents in the collection: `db.collection.find().pretty()`     
> Delete all documents from the collection: `db.collection.remove({})`     
      
----------------     
    
Configure browser to work with self-signed SSL certificate:    
    
> chrome://settings/    
> Show advanced settings...   
> HTTPS/SSL: Manage certificates...   
> Add test certificate:      
> Certificate manager/Authorities: Import... :    
> TrustInChat/TrustInChatServer/bin/ssl/ca.crt  
> Select all checkboxes(trust all)     
> Certificate manager/Authorities:   
> 000_Test_Certificates: Test CA     
    
---------------- 

Project setup:     
     
TrustInChat/TrustInChatServer:     

> Install dependencies(package.json): `sudo npm install`     
> Start server: `npm start`     
> Run development build: `npm run build`    
> Run production build: `npm run build:prod`      
    
> In Chrome browser navigate to:        
> `https://localhost:3000`        
       


TrustInChat/SendEmailServer:      

> Install dependencies(package.json): `sudo npm install`     
> Start server: `npm start`    
> Create ignored file: `parameters.js`     
    
> `var parameters = { "apiKey": "your_api_key", "timeout": 5000 };`     
> `var emailServerSecret = 'hardcoded-email-server-secret';`     
>       
> `module.exports = {`     
> `  parameters: parameters,`     
> `  emailServerSecret: emailServerSecret`     
> `}`     
     
> and set `your_api_key` and `hardcoded-email-server-secret`     
   
> In Chrome browser navigate to:        
> `https://localhost:2000`        
      

    
   
    



     
    
    

