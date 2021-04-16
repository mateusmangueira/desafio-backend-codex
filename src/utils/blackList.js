class BlackList {
    constructor () {
        this.list = [];
    }

    addToken (token) {
        this.list.push(token);
    }

    contains (token) {
        return this.list.includes(token);
    }

    clear () {
        this.list = [];
    }

}

export default new BlackList();