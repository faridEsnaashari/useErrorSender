import { useState, useEffect } from "react";
import axios from "axios";

const useErrorSender = (url) => {
    const [err, setError] = useState(null);

    const sendError = async err => {
        if(!url){
            throw new Error("url is invalid");
        }

        const error = {
            message: err.message,
            source: err.fileName,
            linenumber: err.lineNumber,
            name: err.name,
            err: err.stack,
            ...err,
        };

        try{
            await axios.post(url, error);
        }
        catch(err){
            throw new Error("network error or url is invalid");
        }
    };

    useEffect(() => {
        if(window.onerror){
            return;
        }

        window.onerror = (message, source, lineno, colno, err) => {
            sendError(err);
        };

        return () => window.onerror = null;
    }, []);

    useEffect(() => {
        if(!err){
            return;
        }

        sendError(err);
    }, [err]);

    return setError;
};

export default useErrorSender;
