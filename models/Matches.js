module.exports = function(mongoose) {

    const Schema = mongoose.Schema;

    const match = new Schema ({
        id: Number,
    }, 
    {collection:'matches'});

    const models = {

        matches : mongoose.model('matches', match)

    };

    return models;
};