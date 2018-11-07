const fetch = require("node-fetch")

const Queries = {

    dogs(parent, args, ctx, info) {
        global.dogs = global.dogs || []
        return global.dogs
    },

    getPerson: async (_, {id}) => {
        const response = await fetch(`https://swapi.co/api/people/${id}/`)
        return response.json()
    }

}

const PersonResolver = {
    films: parent => {
        const promises = parent.films.map(async url => {
            const response = await fetch(url)
            return response.json()
        })
        return Promise.all(promises)
    }
}


module.exports = {Queries, PersonResolver};
