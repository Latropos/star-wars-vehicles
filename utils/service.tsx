const service = {
    getId: function (url: string): string {
        const regex = /https?:\/\/swapi.dev\/api\/vehicles\/(\d+)/;
        const id = url.match(regex)![1];
        return id ? id : "4";
    },
};

export default service;
