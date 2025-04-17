import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription Name is Required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    price:{
        type: Number,
        required: [true, 'Subscription Price is Required'],
        min: [0,'Price must be greater than 0'],
    },
    currency:{
        type: String,
        required: [true, 'Subscription Currency is Required'],
        default: 'USD',
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category:{
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        required: true,
    },
    paymentMethod:{
        type: String,
        enum: ['Credit Card', 'paypal', 'bank_transfer'],
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: [true, 'Subscription Start Date is Required'],
        validate:{
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past or present',
        }
    },
    renewalDate:{
        type: Date,
        // required:true,
        validate:{
            validator: function(value){
                return value > this.startDate;
            }, 
            message: 'Renewal date must be after start date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true,
    },
}, { timestamps: true });

// Auto calulate the renewal date based on frequency 
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }
    // auto update the status of the subscription to inactive if the renewal date is in the past
    if (this.renewalDate < new Date()) {
        this.status = 'inactive';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;