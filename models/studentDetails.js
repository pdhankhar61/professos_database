const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost:27017/professos_database", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTD");
    })
    .catch((error) => {
        console.log(error);
    });


// education schema
const educationSchema = new mongoose.Schema({
    secondary: {
        sl: {
            type: String,
            required: true,
            alias: 'secondary.school'
        },
        bd: {
            type: String,
            required: true,
            alias: 'secondary.board'
        },
        op: {
            type: Number,
            required: true,
            alias: 'secondary.overall_percentage'
        },
        yop: {
            type: Number,
            required: true,
            alias: 'secondary.year_of_passing'
        },
    },
    senior_secondary: {
        sl: {
            type: String,
            required: true,
            alias: 'senior_secondary.school'
        },
        bd: {
            type: String,
            required: true,
            alias: 'senior_secondary.board'
        },
        st: {
            type: String,
            required: true,
            alias: "senior_secondary.stream"
        },
        op: {
            type: Number,
            required: true,
            alias: 'senior_secondary.overall_percentage'
        },
        yop: {
            type: Number,
            required: true,
            alias: 'senior_secondary.year_of_passing'
        },

    },
    graduation: {

    },
    post_graduation: {

    },
    intermediate: {
        grp_1: {
            type: Array,
            required: true
        },
        grp_2: {
            type: Array,
            required: true
        }
    },
    ca_cpt_foundation_score: {
        type: Number,
        required: true
    }

})

// other details

const otherSchema = new mongoose.Schema({
    work: [
        {
            company_name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            time: {
                type: Number,
                required: true
            },
            certificate: [{

            }]
        }]
})


// addressSchema 
const addressSchema = new mongoose.Schema({
    h: {
        type: Number,
        alias: "house_no"
    },
    c: {
        type: String,
        alias: "city"
    },
    d: {
        type: String,
        alias: "district"
    },
    s: {
        type: String,
        alias: "state"
    },
    co: {
        type: String,
        alias: "country"
    }


});

//basiProfile - personal details
const basicProfile = new mongoose.Schema({
    f: {
        type: String,
        required: true,
        alias: 'firstName'
    },
    m: {
        type: String,
        alias: 'middleName'
    },
    l: {
        type: String,
        required: true,
        alias: 'lastName'
    },
    address: addressSchema,
    g: {
        type: String,
        required: true,
        alias: 'gender'
    },
    srn: {
        type: String,
        required: true,
    },
    et: {
        type: String,
        required: true,
        alias: 'entry_type'
    },
    dob: {
        type: Date,
        require: true,
    }

});

//application
const applicationSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    date_applied: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Applied",
        enum: ["Applied", "Cancelled"]
    },
    job_id: {
        type: Number
    }
})

const studentProfileSchema = mongoose.Schema({
    basic: basicProfile,
    otherdetails: otherSchema,
    education: educationSchema,
    applications: [applicationSchema]
})

//collection formed
const BasicProfile = new mongoose.model("BasicProfile", basicProfile);
const Address = new mongoose.model("Address", addressSchema);
const Education = new mongoose.model("Education", educationSchema);
const OtherDetails = new mongoose.model("OtherDetails", otherSchema);
const Applications = new mongoose.model("Applications", applicationSchema);
const StudentProfile = new mongoose.model("StudentProfile", studentProfileSchema);





// doucment creation
const userApplication = new Applications({
    company_name: "Hero PVT LTD",
    profile: "Tax Audit",
    status: "Applied",
    job_id: 12541
})

const userOtherDetails = new OtherDetails({
    work: {
        company_name: "commerce PVT LTD",
        description: "Tax AUDIT",
        time: 6,
        certificate: "not"
    }
})

const userEducation = new Education({
    secondary: {
        sl: "DPS",
        bd: "CBSE",
        op: 100,
        yop: 2015,
    },
    senior_secondary: {
        sl: "DPS",
        bd: "CBSE",
        st: "Commerce",
        op: 100,
        yop: 2017,

    },
    graduation: "",
    post_graduation: "",
    intermediate: {
        grp_1: [100, 100, 100, 100],
        grp_2: [100, 100, 100, 100]
    },
    ca_cpt_foundation_score: 100
});

const userAddress = new Address({
    house_no: 4,
    city: "delhi"
});
const userBasicProfile = new BasicProfile({
    firstName: "chirag",
    middleName: "gupta",
    lastName: "gupta",
    gender: "male",
    address: userAddress,
    srn: "cnv2123131",
    et: "direct",
    dob: Date("22/07/2000")
})

const userProfile = new StudentProfile({
    basic: userBasicProfile,
    otherdetails: userOtherDetails,
    education: userEducation,
    applications: userApplication
})



userProfile.save();

module.exports = { BasicProfile, Address, Education, OtherDetails, Applications, StudentProfile };







