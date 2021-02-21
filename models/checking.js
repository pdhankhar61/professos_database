

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



const Schema = mongoose.Schema;

const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    a: {type:Number,
    alias:"age"},
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});


//instance methods
personSchema.methods.findSimilarTypes = function (cb) {
    return mongoose.model('Person').find({ name: this.name }, cb);
};


// virtual
personSchema.virtual('ageName').get(function () {
    return this.age + ' ' + this.name;
});


const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);


const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'prince',
    a: 50
});


//using virtual(virtual fields does not exist in database. They use predefined fields using get funtions basically they combine them together.And set decomposes them.)
console.log(author.ageName + "djfksdjflk");
// console.log(author.toObject({ virtuals: true }) + "djfksdjflk");


// story is populated in this piece of code
author.save(function (err) {
    // if (err) return handleError(err);

    const story1 = new Story({
        title: 'Casino Royale',
        author: author._id    // assign the _id from the person
    });

    author.findSimilarTypes((err, author) => {
        console.log(author);
    })

    story1.save(function (err) {
        console.log(err + "hello");
        // that's it!
    });
});



// Story.find({ title: 'Casino Royale' }).
//     populate('author').
//     exec(function (err, story) {
//         if (err) { console.log(err); }
//         console.log(`The author is ${story.author.name} and ${story.author.age}`);
//         // prints "The author which is stored in database"
//     });