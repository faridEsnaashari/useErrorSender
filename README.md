# Description:

this hook uses for sends errors to a url that gets as an argument. this hook send two kind of errors:
- errors you handle them your self. use **sendError** method that returns from hook to send these errors.
- errors you don't handle them and maybe fires unexpectedly.

# How to use:

1- First need to install the package:

```
npm install use-error-sender
```

2- Then import the hook in every component you need and call it with the needed [arguments](https://github.com/faridEsnaashari/useErrorSender#api). then use the returned method of it to send errors to server to save them.

```javascript
import useErrorSender from "use-error-sender";

const App = () => {
    const url = "http://localhost:3001/api/catchError";
    const sendError = useErrorSender(url);

    useEffect(() => {
        try{
            throw new Error("error sender test");
        }
        catch(err){
            sendError(err);
        }
    }, []);
};
```

the sendError method gets an object(error object) and send it to the given url. you can add your custom properties to this object and useErrorSender hook sends all of them. for example

```javascript
import useErrorSender from "use-error-sender";

const App = () => {
    const url = "http://localhost:3001/api/catchError";
    const sendError = useErrorSender(url);

    useEffect(() => {
        try{
            throw new Error("error sender test");
        }
        catch(err){
            //add custom properties to error object 
            err.fileName = "App.js";
            err.details = "this error happend in app.js and it is for test";

            sendError(err);
        }
    }, []);
};
```

# How it works?

this hook uses for two kind of errors:
- errors that you handle them yourself:
    - you catch these errors your self in some try catches. you can use returned method from the hook to send them to the api you want. you can add custom properties to the error object.
- errors that you don't handle them:
    - some errors happend unexpectedly. if you use this hook, a call back function add to the **onerror** event of the global **window** object. so when this kind of errors fires, the hook sends them to your api as well.

# API:

```javascript
const sendError = useErrorSender(url);
```

### Arguments:

- **url**: api that you want send errors to it.


### return value:

- **sendError**: a method that you can use it to send errors to the api using hook.


### Errors:

- **url is invalid**: if use the hook with no url pass in as argument, this error fires.
- **network error or url is invalid**: if invalid url pass to the hook or some thing happend that cause problem in send data to the given url, this error fires.


# Contact me:

- linkdin - [farid esnaashari](https://www.linkedin.com/in/farid-esnaashar-8bb139199)
