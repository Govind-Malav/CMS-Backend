import cron from 'node-cron';
export const testing =()=>{
    console.log("Testing function schedule")
    cron.schedule("* * * * *",()=>{
        console.log("running testing")

    })
}

//minute/ hour/ day/ month /year