import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //15 minutes
    max: 2,
    message:{
        succeess:false,
        message:"Too many requests, please try again later"
    },
    standardHeaders:true,
    legacyHeaders:false

});
export default apiLimiter;


