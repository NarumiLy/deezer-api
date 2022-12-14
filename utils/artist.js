const Base = require("./base");

class Artist extends Base {

    constructor(token) {
        super();
        this.token = token;
        this.urid = this.uri + "artist/";
        this.suri = this.uri + "search/artist?q="
    }
    
    async getArtist(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.name,
            "link": res.link,
            "share": res.share,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "nb_albums": res.nb_album,
            "nb_fan": res.nb_fan,
            "radio": res.radio,
            "tracklist": res.tracklist
        }       
    }

    /**
     * @name searchArtist
     * @param {string} name 
     */
    async searchArtist(name) {

        if(typeof name != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.suri + `"${name}"`)).data;

        return {
            "data": res.data,
            "nb_results": res.total
        }
    }

    async addFavorite(artist_id) {

        if(typeof artist_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.uri + "/user/me/artists", { data: {}}, { params: { access_token: this.token, artist_id: artist_id }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }

    async deleteFavorite(artist_id) {

        if(typeof artist_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.delete(this.uri + "/user/me/artists", { params: { access_token: this.token, artist_id: artist_id }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }
}

module.exports = Artist;
