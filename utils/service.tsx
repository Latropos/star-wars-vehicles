const service = {
  getId: function (url: string): string | undefined {
    const regex = /https?:\/\/swapi.dev\/api\/vehicles\/(\d+)/;
    const id = url.match(regex)![1];
    return id ? id : undefined;
  },
};

export default service;
