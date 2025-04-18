import dayjs from "dayjs";

import Subscription  from "../models/subscription.model.js";
import User  from "../models/user.model.js";


import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7,5,2,1]; // days before renewal date

export const sendReminders = serve(async(context) => {
    const { subscriptionId } = context.requestPayload;
    console.log(subscriptionId)
    const subscription = await fetchSubscription(context,subscriptionId);

    if (!subscription || subscriptionId.status !== 'active') {
        return;
    }
    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscriptionId} has expired`);
        return;     
        
    }

    for(const daysBefore of REMINDERS) {
        const remainderDate = renewalDate.subtract(daysBefore, 'day');

        if(remainderDate.isAfter(dayjs)){
            await sleepUntilReminder(context, `Subscription ${subscriptionId} ${daysBefore} reminder`, remainderDate);
        }
        await triggerRemainder(context, `Subscription ${daysBefore} reminder`);
    }
});


const fetchSubscription = async (context, subscriptionId) => {
    console.log(subscriptionId)
    return await context.run('get subscription',async ()=> {
        console.log("--------------------------")
        console.log(subscriptionId)
        console.log(Subscription)
        console.log("--------------------------")

        return Subscription.findById(subscriptionId).populate("user",'name email');



    })
}

const sleepUntilReminder = async(context, label, date)=>{
    console.log(`Sleeping until ${label} remainder at ${date}`);
    await context.sleepUntil(date.toDate());
    console.log(`Woke up for ${label} reminder`);
    
}

const triggerRemainder = async(context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // email.sms.mail
    });
}