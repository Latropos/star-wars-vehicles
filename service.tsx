const service = {
    getId: function ({ item }) {
        const regex = /https?:\/\/swapi.dev\/api\/vehicles\/\d*/;
        const uniform_url = item.url.match(regex)[0];
        console.log(uniform_url);
        return uniform_url.split("/")[uniform_url.split("/").length - 1];
    },
};

export default service;
