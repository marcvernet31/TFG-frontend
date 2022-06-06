The front-end because of it being a React app, it’s fully contained and needs very  
little configuration.  The only requirement is to have installed the Node Package  
Manager (npm) for Javascript. Assuming that npm is installed, the front-end  
files can be installed with: 
```
> git clone https://github.com/marcvernet31/TFG-frontend.git  
>  cd TFG-frontend
>  npm install  
```
And the program can be executed with:  
```
> npm start
```  
By default, the frontend is hosted on the  localhost:3000, and it assumes that the  
back-end is hosted on  localhost:8000. The base url for the back-end is hardcoded  
in many places in the front-end, and it should be changed if the back-end is not  
running on the same local machine.
