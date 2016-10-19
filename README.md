# TrustInChat    
     
----------------------------------          
Install tools:       
----------------------------------      
      
Install MongoDB:     
      
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.10.tgz        
       
tar -zxvf mongodb-linux-x86_64-3.2.10.tgz       
        
mkdir -p mongodb      
       
cp -R -n mongodb-linux-x86_64-3.2.10/. mongodb      

mkdir -p /data/db

     
----------------------------------     
Setup project:   
----------------------------------           
     
mkdir dev     
cd dev          
git clone https://github.com/OpticalTone/TrustInChat.git      
     
Terminal 1:    
> Navigate to project folder       
> Install dependencies(package.json): sudo npm install           
> Start npm server: sudo npm start      
    
Terminal 2:   
> Navigate to project folder     
> Run Gulp: sudo npm run gulp     
    
Terminal 3:    
> Start MongoDB server: sudo mongod    
> Stop all processes: sudo killall mongod     
      
Terminal 4:     
> Start Mongo: mongo    
      
Exit terminal:    
> Ctrl + c     
     
Mongo commands:     
> Choose database: use chatdb     
> Collections: show collections       
> Find all documents in the collection: db.collection.find()    
> Delete all documents from the collection: db.collection.remove({})      
      
Open Chromium Web Browser:  
> Install Chromium web browser from Ubuntu software    
> Navigate to: localhost:3000      
> Open console: F12     
    
